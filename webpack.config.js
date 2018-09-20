//const ExtractText = require( 'extract-text-webpack-plugin' );
//const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require( 'uglifyjs-webpack-plugin' );
const debug = process.env.NODE_ENV !== 'production';
const path = require( 'path' );

// const extractEditorSCSS = new ExtractText( {
// 	filename: './blocks.editor.build.css',
// } );

const plugins = [ UglifyJsPlugin ];//extractEditorSCSS ];

const externals = {
	react: 'React',
};

const wpDependencies = [
	'components',
	'element',
	'blocks',
	'utils',
	'date',
	'data',
	'i18n',
	'editPost',
	'plugins',
	'apiRequest',
	'editor',
	'compose',
];

wpDependencies.forEach( ( wpDependency ) => {
	externals[ '@wordpress/' + wpDependency ] = {
		this: [ 'wp', wpDependency ],
	};
} );

// const scssConfig = {
// 	use: [
// 		{
// 			loader: 'css-loader',
// 		},
// 		{
// 			loader: 'sass-loader',
// 			options: {
// 				outputStyle: 'compressed',
// 			},
// 		},
// 	],
// };

const moduleRules = {
	rules: [
		{
			enforce: 'pre',
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'eslint-loader',
		},
		{
			test: /\.js$/,
			exclude: /node_modules/,
			use: [
				{
					loader: 'babel-loader',
					query: {
						presets: [ '@wordpress/default' ],
						plugins: [
							[ 'transform-react-jsx', {
								pragma: 'wp.element.createElement',
							} ],
						],
					},
				},
			],
		},
		// {
		// 	test: /editor\.scss$/,
		// 	exclude: /node_modules/,
		// 	use: extractEditorSCSS.extract( scssConfig ),
		// },
	],
};

const entryPoints = {
	'template-block': path.resolve( __dirname, './assets/dev/js/template-block.js' ),
};

module.exports = {
	context: __dirname,
	devtool: debug ? 'inline-sourcemap' : null,
	mode: debug ? 'development' : 'production',
	entry: entryPoints,
	externals,
	output: {
		path: path.resolve( __dirname, './assets/js' ),
		filename: '[name].js',
		library: [ 'wp', '[name]' ],
	},
	module: moduleRules,
	//plugins: plugins,
};
