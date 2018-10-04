/**
 * Grunt webpack task config
 * @package block-builder
 */
const path = require( 'path' );

const UglifyJsPlugin = require( 'uglifyjs-webpack-plugin' );

const externals = {
	react: 'React'
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
	'compose'
];

wpDependencies.forEach( wpDependency => {
	externals[ `@wordpress/${wpDependency}` ] = {
		this: [ 'wp', wpDependency ]
	};
} );

const moduleRules = {
	rules: [
		{
			enforce: 'pre',
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'eslint-loader',
			//options: {
			//	failOnError: true,
			//}
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
								'pragma': 'wp.element.createElement',
							} ]
						]
					},
				},
			],
		},
	],
};

const entry = {
	'template-block': path.resolve( __dirname, '../assets/dev/js/template-block.js' ),
};

const webpackConfig = {
	target: 'web',
	context: __dirname,
	devtool: 'source-map',
	mode: 'development',
	output: {
		path: path.resolve( __dirname, '../assets/js' ),
		filename: '[name].js',
		devtoolModuleFilenameTemplate: '../[resource]',
		libraryTarget: 'this'
	},
	externals,
	resolve: {
		modules: [ __dirname, 'node_modules' ]
	},
	module: moduleRules,
	entry: entry,
	watch: true,
};

const webpackProductionConfig = {
	target: 'web',
	context: __dirname,
	devtool: 'source-map',
	mode: 'production',
	output: {
		path: path.resolve( __dirname, '../assets/js' ),
		filename: '[name].js',
		libraryTarget: 'this'
	},
	entry: {},
	resolve: {
		modules: [ __dirname, 'node_modules' ]
	},
	externals,
	module: moduleRules,
	performance: { hints: false },
	optimization: {
		minimize: true,
		minimizer: [
			new UglifyJsPlugin( {
				include: /\.min\.js$/
			} ),
		],
	},
};

// Add minified entry points
for ( const entryPoint in entry ) {
	webpackProductionConfig.entry[ entryPoint ] = entry[ entryPoint ];
	webpackProductionConfig.entry[ entryPoint + '.min' ] = entry[ entryPoint ];
}

const gruntWebpackConfig = {
	development: webpackConfig,
	production: webpackProductionConfig
};

module.exports = gruntWebpackConfig;
