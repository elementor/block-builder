import { registerBlockType } from '@wordpress/blocks';
import { InspectorControls } from '@wordpress/block-editor';
import { useState } from '@wordpress/element';
import { withSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { Button, PanelBody, SelectControl, ToggleControl } from '@wordpress/components';

import ElementorPreviewIFrame from './components/preview-frame';
import ElementorIcon from './components/elementor-icon';
import ElementorPlaceholder from './components/placeholder';

import './styles.scss';

registerBlockType( 'elementor/template', {
	title: __( 'Elementor Library', 'block-builder' ),
	icon: {
		foreground: '#93003F',
		src: ElementorIcon,
	},
	description: __(
		'Add Elementor templates to your Gutenberg content.',
		'block-builder'
	),
	category: 'common',
	attributes: {
		selectedTemplate: {
			type: 'number',
			default: 0,
		},
		title: {
			type: 'string',
			default: '',
		},
		hidePreview: {
			type: 'boolean',
			default: false,
		}
	},

	// Defines the block within the editor.
	edit: withSelect( ( select ) => {
		const { getEntityRecords } = select( 'core' );

		return {
			templates: getEntityRecords( 'postType', 'elementor_library', {
				per_page: 100,
			} ),
		};
	} )( ( props ) => {
		const previewFrameRef = React.createRef();
		const [ hidePreview, setHidePreview ] = useState( false );
		if ( ! props.templates ) {
			return (
				<div className={ props.className }>
					<ElementorPlaceholder>
						{ __( 'Loading...', 'block-builder' ) }
					</ElementorPlaceholder>
				</div>
			);
		}

		if ( 0 === props.templates.length ) {
			return (
				<div className={ props.className }>
					<ElementorPlaceholder>
						<Button
							isDefault
							target="_blank"
							href={ elementorBlockBuilderConfig.create_new_post_url }
						>
							{ __(
								'Create Your First Template',
								'block-builder'
							) }
						</Button>
					</ElementorPlaceholder>
				</div>
			);
		}

		const templates = [
				{
					value: 0,
					label:
						'— ' +
						__( 'Select a Template', 'block-builder' ) +
						' —',
				},
			],
			className = props.className;

		let editWithElementor = '',
			display = '';

		const templateSelectControl = (
			<SelectControl
				value={ props.attributes.selectedTemplate }
				onChange={ ( value ) =>
					props.setAttributes( {
						selectedTemplate: parseInt( value ),
					} )
				}
				options={ templates }
			/>
		);

		if ( props.templates.length > 0 ) {
			props.templates.forEach( ( p ) => {
				templates.push( {
					label: p.title.rendered,
					value: p.id,
				} );

				if ( props.attributes.selectedTemplate !== p.id ) {
					return;
				}

				editWithElementor = (
					<Button
						isDefault
						target={ '_blank' }
						href={
							elementorBlockBuilderConfig.edit_url_pattern +
							p.id
						}
					>
						{ __(
							'Edit Template with Elementor',
							'block-builder'
						) }
					</Button>
				);

				display = (
					<div id={ 'elementor-template-block-inner-' + p.id }>
						{ hidePreview
							? <ElementorPlaceholder
								instructions={ `
								${ __( 'Preview is hidden', 'block-editor' ) },
								${ __( 'Selected template:', 'block-editor' )} ${p.title.rendered}.
								`}>
								<Button
									isDefault
									onClick={ () => {
										setHidePreview( ( state ) => ! state );
									} }
								>
									{ __( 'Show Preview', 'block-editor' ) }
								</Button>
							</ElementorPlaceholder>
							: <ElementorPreviewIFrame
								ref={ previewFrameRef }
								srcDoc={ elementorBlockBuilderConfig.preview_url_pattern + p.id }
								id={ 'elementor-template-' + p.id }
								templateId={ p.id }
								className={ 'elementor-block-preview-frame' }
								iFrameDisplay={ false }
							/>
						}
					</div>
				);
			} );
		}

		if ( '' === display ) {
			display = (
				<ElementorPlaceholder withLink>
					{ templateSelectControl }
				</ElementorPlaceholder>
			);
		}
		const inspectorPanel = (
			<InspectorControls key="inspector">
				<PanelBody
					title={ __( 'Settings', 'block-builder' ) }
					initialOpen={ true }
				>
					<fieldset>
						{ templateSelectControl }
					</fieldset>
					<fieldset>
						<ToggleControl
							label={ __( 'Hide Preview', 'block-builder' ) }
							help={
								hidePreview
									? __( 'Show Preview', 'block-builder' )
									: __( 'Hide Preview', 'block-builder' )
							}
							checked={ hidePreview }
							onChange={ () => {
								setHidePreview( ( state ) => ! state );
							} }
						/>
					</fieldset>
					<fieldset>
						{ editWithElementor }
					</fieldset>
				</PanelBody>
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
