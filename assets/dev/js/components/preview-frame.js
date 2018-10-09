import { Component } from '@wordpress/element';

export class ElementorPreviewIFrame extends Component {
	constructor() {
		super();
		this.state = {
			iFrameHeight: '0px',
			transformScale: 1,
		};
	}

	render() {
		const styleScale = {
			transform: 'scale( ' + this.state.transformScale + ' )',
		};

		return <div className="elementor-preview-wrapper" ref={ ( nodeElement ) => {
			this.nodeElement = nodeElement;
		} }>
			<iframe src={ this.props.srcDoc }
				scrolling="no"
				node={ this.nodeElement }
				frameBorder={ 0 }
				height={ this.state.iFrameHeight }
				style={ styleScale }
				onLoad={ () => setTimeout( () => {
					// Set minimum height for better preview
					this.setState( {
						iFrameHeight: '1000px',
					} );

					const element = this.nodeElement,
						previewFrame = element.children[ 0 ],
						overlay = element.children[ 1 ],
						blockContainer = element.parentElement,
						relation = blockContainer.offsetWidth / 1170;
					if ( previewFrame ) {
						const newHeight = previewFrame.contentWindow.document.body.scrollHeight,
							containerHeight = ( newHeight * relation ) + 'px';

						// Safari Fix set min height first
						this.setState( {
							iFrameHeight: '10px',
						} );

						this.setState( {
							iFrameHeight: newHeight + 'px',
							transformScale: relation,
						} );
						blockContainer.style = 'height: ' + containerHeight;
						overlay.style = 'height: ' + containerHeight + '; top: -' + ( newHeight + 10 ) + 'px;';
					}
				}, 550 ) } />
			<div
				id={ 'elementor-overlay-' + this.props.templateId }
				className={ 'elementor-block-preview-overlay' } />
		</div>;
	}
}
