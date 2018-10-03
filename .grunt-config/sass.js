const sass = {
	dist: {
		options: {
			sourceMap: true
		},
		files: [ {
			expand: true,
			cwd: 'assets/dev/scss',
			src: '*.scss',
			dest: 'assets/css',
			ext: '.css'
		} ]
	}
};

module.exports = sass;
