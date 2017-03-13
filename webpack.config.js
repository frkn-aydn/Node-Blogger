const webpack = require("webpack");
module.exports = {
	module: {
		loaders: [{
				test: /\.less$/,
				loader: "style!css!less!"
			},
			{
				test: /\.css$/,
				loader: "style!css!"
			},
			{
				test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: 'base64-font-loader'
			},
			{
				test: /\.js/,
				loader: "babel",
				query: {
					presets: ['es2015', {
						compact: true
					}]
				}
			}
		],
		plugins: [
			new webpack.optimize.OccurrenceOrderPlugin(),
			new webpack.optimize.UglifyJsPlugin(),
			new webpack.optimize.DedupePlugin(),
			new webpack.DefinePlugin({
				'process.env': {
					NODE_ENV: '"development"'
				}
			})
		]
	}
}