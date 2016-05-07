var Webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var BUILD_DIR = path.resolve( __dirname, 'examples' );
var APP_DIR = path.resolve( __dirname, 'source' );

var config = {
	entry: BUILD_DIR + '/index.js',
	output: {
		path: BUILD_DIR,
		filename: 'artifact.js',
	},
	module : {
		loaders : [
			{
				test : /\.js?/,
				include : [APP_DIR, BUILD_DIR],
				loader : 'babel'
			},
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract(
                    // activate source maps via loader query
                    'css?sourceMap!' +
                    'less?sourceMap'
                )
            }
		]
	}, 
	externals: {
		// require("jquery") is external and available
		//  on the global var jQuery
		'jquery': 'jQuery',
		'd3' : 'd3',
	},
    // Use the plugin to specify the resulting filename (and add needed behavior to the compiler)
    plugins: [
        new ExtractTextPlugin("artifact.css"),
		new Webpack.optimize.DedupePlugin(),
		new Webpack.optimize.AggressiveMergingPlugin(),
		new Webpack.optimize.UglifyJsPlugin( {
			sourceMap: false,
			compress: {
				sequences: true,
				dead_code: true,
				conditionals: true,
				booleans: true,
				if_return: true,
				join_vars: true,
				drop_console: true,
        		warnings: false
			},
			output: {
				comments: false
			}
		} )
    ]
};

module.exports = config;