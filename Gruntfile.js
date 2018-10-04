module.exports = function( grunt ) {
	'use strict';

	const pkgInfo = grunt.file.readJSON( 'package.json' );

	require( 'load-grunt-tasks' )( grunt );

	// Project configuration
	grunt.initConfig( {
		pkg: pkgInfo,

		banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
				'<%= grunt.template.today("dd-mm-yyyy") %> */',

		checktextdomain: require( './.grunt-config/checktextdomain' ),
		usebanner: require( './.grunt-config/usebanner' ),
		sass: require( './.grunt-config/sass' ),
		postcss: require( './.grunt-config/postcss' ),
		watch: require( './.grunt-config/watch' ),
		bumpup: require( './.grunt-config/bumpup' ),
		replace: require( './.grunt-config/replace' ),
		shell: require( './.grunt-config/shell' ),
		release: require( './.grunt-config/release' ),
		copy: require( './.grunt-config/copy' ),
		clean: require( './.grunt-config/clean' ),
		webpack: require( './.grunt-config/webpack' ),
		qunit: {
			src: 'tests/qunit/index.html',
		},
	} );

	// Default task(s).
	grunt.registerTask( 'default', [
		'i18n',
		'scripts',
		'styles',
	] );

	grunt.registerTask( 'i18n', [
		'checktextdomain',
	] );

	grunt.registerTask( 'scripts', ( isDevMode = false ) => {
		let taskName = 'webpack:production';

		if ( isDevMode ) {
			taskName = 'webpack:development';
		}

		grunt.task.run( taskName );
	} );

	grunt.registerTask( 'watch_scripts', () => {
		grunt.task.run( 'webpack:development' );
	} );

	grunt.registerTask( 'styles', ( isDevMode = false ) => {
		grunt.task.run( 'sass' );

		if ( ! isDevMode ) {
			grunt.task.run( 'postcss' );
		}
	} );

	grunt.registerTask( 'watch_styles', () => {
		grunt.task.run( 'watch:styles' );
	} );

	grunt.registerTask( 'build', [
		'default',
		'usebanner',
		'clean',
		'copy',
		'default', // Remove banners for GitHub
	] );

	grunt.registerTask( 'publish', ( releaseType ) => {
		releaseType = releaseType ? releaseType : 'patch';

		var prevStableVersion = 'patch' === releaseType ? pkgInfo.prev_stable_version : pkgInfo.version;

		grunt.config.set( 'prev_stable_version', prevStableVersion );

		grunt.task.run( 'default' );
		grunt.task.run( 'bumpup:' + releaseType );
		grunt.task.run( 'replace' );
		grunt.task.run( 'shell:git_add_all' );
		grunt.task.run( 'release' );
	} );

	grunt.registerTask( 'test', [
		'qunit',
		'clean:qunit',
	] );
};
