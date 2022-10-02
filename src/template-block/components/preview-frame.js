import { useState, useEffect } from '@wordpress/element';
import { Spinner } from '@wordpress/components';
import ElementorPlaceholder from './placeholder';

const ElementorPreviewIFrame = ( { ref, srcDoc, id, templateId,  className, iFrameDisplayProp } ) => {
	const [ nodeElement, setNodeElement ] = useState( null );
	const [ iFrameDisplay, setIFrameDisplay ] = useState( iFrameDisplayProp || false );
	const [ transformScale, setTransformScale ] = useState( 1 );
	const [ previewHeight, setPreviewHeight ] = useState( '900px' );

	useEffect( () => {
		if ( '' === srcDoc || ! nodeElement?.parentElement ) {
			return;
		}
		nodeElement.parentElement.style = 'height: initial';
		// conditionally update if needed
		if ( iFrameDisplay ) {
			setIFrameDisplay( false );
		}
	}, [ srcDoc ] );

	// re calc transform scale after preview loaded
	const onIframeLoaded = () => {
		setIFrameDisplay( true );
		const element = nodeElement,
			coverElement = element.children[0].children[0],
			previewFrame = coverElement.children[0],
			blockContainer = element.parentElement;

		if ( previewFrame ) {
			const iframeWidth = ( previewFrame.contentWindow?.document?.body?.offsetWidth || 1440 ),
				relation = blockContainer.offsetWidth / iframeWidth,
				newHeight = Math.min( previewFrame.contentWindow?.document?.body?.offsetHeight, 900 ),
				containerHeight = ( newHeight * relation ) + 'px';

			setTransformScale( relation );
			setPreviewHeight( containerHeight );
		}
	};

	return (
		<div
			className="elementor-preview-wrapper"
			ref={ ( nodeElement ) => {
				setNodeElement( nodeElement );
			} }
			style={ {
				height: previewHeight,
			} }
		>
			<div
				className={ `elementor-cover-container` }
				style={ { maxWidth: '100%' } }
			>
				<div
					id={ `elementor-cover-${ templateId }` }
					className={ 'elementor-block-preview-cover' }
					style={ {
						transform: `scale(${ transformScale })`,
						display: iFrameDisplay ? 'block' : 'none',
					} }
				>
					<iframe
						src={ srcDoc }
						scrolling="no"
						node={ nodeElement }
						frameBorder={ 0 }
						style={ {
							opacity: iFrameDisplay ? 1 : 0,
						} }
						onLoad={ () =>  setTimeout( () => onIframeLoaded(), 550 ) }
					/>
				</div>
			</div>
			<div
				id={ `elementor-preview-loader-${ templateId }` }
				className={ 'elementor-block-preview-loader' }
				style={ {
					display: iFrameDisplay ? 'none' : 'block',
					minHeight: '200px',
				} }
			>
				<ElementorPlaceholder>
					<Spinner />
				</ElementorPlaceholder>
			</div>
		</div>
	);
}
export default ElementorPreviewIFrame;
