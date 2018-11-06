module.exports = {
	plugin_main: {
		src: [ 'elementor.php' ],
		overwrite: true,
		replacements: [
			{
				from: /Version: \d{1,1}\.\d{1,2}\.\d{1,2}/g,
				to: 'Version: <%= pkg.version %>'
			},
			{
				from: /ELEMENTOR_BLOCK_BUILDER_VERSION', '.*?'/g,
				to: 'ELEMENTOR_BLOCK_BUILDER_VERSION\', \'<%= pkg.version %>\''
			}
		]
	},

	readme: {
		src: [ 'readme.txt' ],
		overwrite: true,
		replacements: [
			{
				from: /Stable tag: \d{1,1}\.\d{1,2}\.\d{1,2}/g,
				to: 'Stable tag: <%= pkg.version %>'
			}
		]
	},

	packageFile: {
		src: [ 'package.json' ],
		overwrite: true,
		replacements: [
			{
				from: /prev_stable_version": ".*?"/g,
				to: 'prev_stable_version": "<%= grunt.config.get( \'prev_stable_version\' ) %>"'
			}
		]
	}
};
