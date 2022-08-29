import { Component } from '@wordpress/element';

export class ElementorIcon extends Component {
	createRandomString( length ) {
		let str = '';
		while ( str.length < length ) {
			str += Math.random().toString( 36 ).substr( 2 );
		}
		return str.substr( 0, length );
	}

	render() {
		const gradId = 'elementorGradient-' + this.createRandomString( 5 );
		return (
			<svg viewBox={ '0 0 448 512' }>
				<defs>
					<linearGradient
						id={ gradId }
						gradientTransform="rotate(150)"
						x1="0"
						y1="75%"
						x2="100%"
						y2="25%"
					>
						<stop offset="0%" stopColor="#ED345D" stopOpacity="1" />
						<stop
							offset="100%"
							stopColor="#362B74"
							stopOpacity="1"
						/>
					</linearGradient>
				</defs>
				<path
					d={
						'M425.6 32H22.4C10 32 0 42 0 54.4v403.2C0 470 10 480 22.4 480h403.2c12.4 0 22.4-10 22.4-22.4V54.4C448 42 438 32 425.6 32M164.3 355.5h-39.8v-199h39.8v199zm159.3 0H204.1v-39.8h119.5v39.8zm0-79.6H204.1v-39.8h119.5v39.8zm0-79.7H204.1v-39.8h119.5v39.8z'
					}
					fill={ 'url(#' + gradId + ')' }
				/>
			</svg>
		);
	}
}
