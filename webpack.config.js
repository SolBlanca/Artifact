var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var BUILD_DIR = path.resolve(__dirname, 'src/examples');
var APP_DIR = path.resolve(__dirname, 'src');

var config = {
	entry: APP_DIR + '/examples/index.js',
	output: {
		path: BUILD_DIR,
		filename: 'bundle.js'
	},
	module : {
		loaders : [
			{
				test : /\.js?/,
				include : APP_DIR,
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
		'd3': 'd3',
	},
    // Use the plugin to specify the resulting filename (and add needed behavior to the compiler)
    plugins: [
        new ExtractTextPlugin("styles.css")
    ]
};

module.exports = config;