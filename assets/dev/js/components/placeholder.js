import { Component } from '@wordpress/element';
import { Placeholder } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import { ElementorIcon } from './elementor-icon';

export class ElementorPlaceholder extends Component {
	render() {
		return (
			<Placeholder
				icon={ ElementorIcon.prototype.render() }
				lable={ __( 'Elementor', 'block-builder' ) }
				{ ...this.props }
			/>
		);
	}
}
