/**
 * Grunt watch task config
 * @package Elementor
 */
const watch = {
	styles: {
		files: [
			'assets/dev/scss/**/*.scss',
			'modules/**/*.scss',
		],
		tasks: [ 'styles:true' ],
		options: {
			spawn: false,
			livereload: true
		}
	},
};

module.exports = watch;
