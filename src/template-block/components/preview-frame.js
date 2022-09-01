import { useState, useEffect } from '@wordpress/element';
import { Spinner } from '@wordpress/components';
import ElementorPlaceholder from './placeholder';

const ElementorPreviewIFrame = ( { ref, srcDoc, id, templateId,  className, iFrameDisplayProp } ) => {
	const [ nodeElement, setNodeElement ] = useState( null );
	const [ iFrameHeight, setIFrameHeight ] = useState( '0px' );
	const [ iFrameDisplay, setIFrameDisplay ] = useState( iFrameDisplayProp || false );
	const [ transformScale, setTransformScale ] = useState( 1 );
	const [ overlayStyle, setOverlayStyle ] = useState( { display: iFrameDisplay ? 'block' : 'none' } );

	useEffect( () => {
		if ( '' === srcDoc || ! nodeElement?.parentElement ) {
			return;
		}
		nodeElement.parentElement.style = 'height: initial';
		setIFrameDisplay( false );
	}, [ srcDoc ] );

	const styleScale = {
		transform: `scale( ${ transformScale } )`,
		display: iFrameDisplay ? 'block' : 'none',
	};

	// re calc transform scale after preview loaded
	const onIframeLoaded = () => {
		// Set minimum height for better preview
		setIFrameHeight( '1000px' );
		setIFrameDisplay( true );
		const element = nodeElement,
			previewFrame = element.children[ 0 ],
			blockContainer = element.parentElement,
			relation = blockContainer.offsetWidth / ( wp?.media?.view?.settings?.contentWidth || 1170 );

		if ( previewFrame ) {
			const newHeight = previewFrame.contentWindow.document.body.scrollHeight,
				containerHeight = newHeight * relation + 'px';

			// Safari Fix set min height first
			setIFrameHeight( '10px' );

			setIFrameHeight( newHeight + 'px' );
			setTransformScale( relation );
			blockContainer.style = `height: ${ containerHeight }`;
			setOverlayStyle( {
				height: containerHeight,
				top: '-' + ( newHeight + 10 ) + 'px',
				display: 'block',
			} );
		}
	};

	return (
		<div
			className="elementor-preview-wrapper"
			ref={ ( nodeElement ) => {
				setNodeElement( nodeElement );
			} }
		>
			<iframe
				src={ srcDoc }
				scrolling="no"
				node={ nodeElement }
				frameBorder={ 0 }
				height={ iFrameHeight }
				style={ styleScale }
				onLoad={ () =>  setTimeout( () => onIframeLoaded(), 550 ) }
			/>
			<div
				id={ `elementor-overlay-${templateId}` }
				className={ 'elementor-block-preview-overlay' }
				style={ overlayStyle }
			/>
			<div
				id={ `elementor-preview-loader-${templateId}` }
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
