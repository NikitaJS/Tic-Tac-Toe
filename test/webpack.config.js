var path = require('path');

module.exports = {
	output: {
		path: __dirname + '/test/',
		filename: 'test.js'
	},	
	devtool: "sourcemap",
	mode: "development",
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /node_modules\/(?!bullets-js)/,
			use: {
				loader: 'babel-loader',
				options: {
					presets: ['@babel/preset-env', '@vue/babel-preset-jsx']
				}
			}
		}]
	},
	resolve: {
		modules: [
			"node_modules"
		],
		alias: {
			src: path.resolve(__dirname, '../public/js/src/'),
			vue: __dirname + '/../public/js/libs/vue/dist/vue.js'
		}
	}
};
