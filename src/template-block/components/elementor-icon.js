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
		return (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="32"
				height="32"
				viewBox="0 0 27 27"
				color="#93003F"
				fill="none"
			>
				<path
					fillRule={ 'evenodd' }
					clipRule={ 'evenodd' }
					fill={ 'currentColor' }
					d={
						'M0 13.2084C0 20.4107 5.83624 26.2501 13.0347 26.2501C20.2332 26.2501 26.0695 20.4107 26.0695 13.2084C26.0695 6.00609 20.2332 0.166748 13.0347 0.166748C5.83624 0.166748 0 6.00609 0 13.2084ZM9.77554 7.77424H7.60342V18.6426H9.77554V7.77424ZM11.9477 7.77424H18.4641V9.94753H11.9477V7.77424ZM18.4641 12.1208H11.9477V14.2941H18.4641V12.1208ZM11.9477 16.4693H18.4641V18.6426H11.9477V16.4693Z'
					}
				/>
			</svg>
		);
	}
}
