/**
 * Grunt copy task config
 * @package Elementor
 */
const getBuildFiles = [
	'**',
	'!node_modules/**',
	'!build/**',
	'!bin/**',
	'!.git/**',
	'!tests/**',
	'!.github/**',
	'!.travis.yml',
	'!.jscsrc',
	'!.jshintignore',
	'!.jshintrc',
	'!ruleset.xml',
	'!README.md',
	'!phpunit.xml',
	'!vendor/**',
	'!Gruntfile.js',
	'!package.json',
	'!package-lock.json',
	'!npm-debug.log',
	'!composer.json',
	'!composer.lock',
	'!.gitignore',
	'!.gitmodules',
	'!yarn.lock',

	'!assets/dev/**',
	'!assets/**/*.map',

	'!assets/js/template-block.js',
	'!assets/css/template-block.css',

	'!*~'
];

const copy = {
	main: {
		src: getBuildFiles,
		expand: true,
		dest: 'build/'
	},
	secondary: {
		src: getBuildFiles,
		expand: true,
		dest: '/tmp/block-builder-builds/<%= pkg.version %>/'
	}
};

module.exports = copy;
