import { ElementorPreviewIFrame } from './components/preview-frame';
import { ElementorIcon } from './components/elementor-icon';

import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { InspectorControls } from '@wordpress/editor';
import { SelectControl } from '@wordpress/components';
import { withSelect } from '@wordpress/data';

registerBlockType( 'elementor/template', {
	title: __( 'Elementor Template', 'block-builder' ),
	icon: ElementorIcon,
	category: 'common', //'block-builder
	attributes: {
		selectedTemplate: {
			type: 'number',
			default: 0,
		},
		title: {
			type: 'string',
			default: '',
		},
	},

	// Defines the block within the editor.
	edit: withSelect( ( select ) => {
		const { getEntityRecords } = select( 'core' );
		return {
			templates: getEntityRecords( 'postType', 'elementor_library', { per_page: 100 } ),
		};
	} )( ( props ) => {
		if ( ! props.templates ) {
			return __( 'Loading', 'block-builder' );
		}

		if ( 0 === props.templates.length ) {
			return __( 'No templates Found', 'block-builder' );
		}

		const template = props.attributes.selectedTemplate,
			templates = [ {
				value: 0,
				label: __( 'Select a Template', 'block-builder' ),
			} ],
			className = props.className;
		let editWithElementor = '',
			display = '';

		const templateSelectControl = (
			<SelectControl
				value={ props.attributes.selectedTemplate }
				onChange={ ( value ) => props.setAttributes( { selectedTemplate: parseInt( value ) } ) }
				options={ templates } />
		);

		if ( props.templates.length > 0 ) {
			props.templates.forEach( ( p ) => {
				templates.push( {
					label: p.title.rendered,
					value: p.id,
				} );

				if ( template === p.id ) {
					props.setAttributes( {
						selectedTemplate: parseInt( p.id ),
						title: p.title.rendered,
					} );

					editWithElementor = ( <a
						className={ 'elementor-edit-link button button-primary button-large' }
						target={ '_blank' }
						href={ elementorBlockBuilderConfig.base_site_url + '/wp-admin/post.php?post=' + p.id + '&action=elementor' }>
						{ __( 'Edit Template with Elementor', 'block-builder' ) }
					</a> );

					display = (
						<div id={ 'elementor-template-block-inner-' + p.id } >
							<ElementorPreviewIFrame
								srcDoc={ elementorBlockBuilderConfig.base_site_url + '/?elementor-block=1&p=' + p.id }
								id={ 'elementor-template-' + p.id }
								templateId={ p.id }
								className={ 'elementor-block-preview-frame' } />
						</div>
					);
				}
			} );
		}

		if ( '' === display ) {
			display = (
				<div>
					{ __( 'No Template Selected', 'block-builder' ) }
					{ templateSelectControl }
				</div>
			);
		}

		const inspectorPanel = (
			<InspectorControls key="inspector">
				{ templateSelectControl }
				{ editWithElementor }
			</InspectorControls>
		);

		return (
			<div className={ className }>
				{ inspectorPanel }
				{ display }
			</div>
		);
	} ),

	save() {
		return null;
	},
} );
