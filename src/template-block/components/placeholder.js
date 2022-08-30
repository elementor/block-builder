import { Component, createElement } from '@wordpress/element';
import { Placeholder } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import ElementorIcon from './elementor-icon';

export class ElementorPlaceholder extends Component {
	static get defaultProps() {
		return {
			withLink: false,
		};
	}

	render() {
		const selectString = __(
				'Select a template from your library or',
				'block-builder'
			),
			createString = __( 'create a new one.', 'block-builder' ),
			props = { ...this.props };

		let instructions = selectString + ' ' + createString;

		if ( this.props.withLink ) {
			instructions = createElement(
				'div',
				{},
				selectString + ' ',
				createElement(
					'a',
					{
						target: '_blank',
						href: elementorBlockBuilderConfig.create_new_post_url,
					},
					createString
				)
			);
		}
		delete props.withLink;

		if ( this.props.instructions ) {
			instructions = this.props.instructions;
			delete props.instructions;
		}

		return (
			<Placeholder
				icon={ <ElementorIcon color={'#93003F'} /> }
				label={ __( 'Elementor Library', 'block-builder' ) }
				instructions={ instructions }
				{ ...props }
			/>
		);
	}
}
