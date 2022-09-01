import { Component, createElement } from '@wordpress/element';
import { Placeholder } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import ElementorIcon from './elementor-icon';

const selectString = __( 'Select a template from your library or', 'block-builder' ) + ' ',
	createString = __( 'create a new one.', 'block-builder' );

const getInstructions = ( withLink = false ) => {
	return withLink ? (
		<div>
			{ selectString }
			<a
				target={ '_blank' }
				href={ elementorBlockBuilderConfig.create_new_post_url }
			>
				{ createString }
			</a>
		</div> ) :
		(
			selectString + createString
		);
}

const ElementorPlaceholder = ( props ) => {
	const {
		withLink = false,
		instructions = false,
		...restProps
	} = props;

	let renderInstructions;

	if ( instructions ) {
		renderInstructions = instructions;
	} else {
		renderInstructions = getInstructions( withLink );
	}

	return (
		<Placeholder
			icon={ <ElementorIcon color={ '#93003F' } /> }
			label={ __( 'Elementor Library', 'block-builder' ) }
			instructions={ renderInstructions }
			{ ...restProps }
		/>
	);
}

export default ElementorPlaceholder;
