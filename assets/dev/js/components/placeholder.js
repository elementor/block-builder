import { Component } from '@wordpress/element';
import { Placeholder } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import { ElementorIcon } from './elementor-icon';

export class ElementorPlaceholder extends Component {
	render() {
		return (
			<Placeholder
				icon={ ElementorIcon.prototype.render() }
				label={ __( 'Elementor Library', 'block-builder' ) }
				{ ...this.props }
			/>
		);
	}
}
