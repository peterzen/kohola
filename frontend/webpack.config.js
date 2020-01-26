const path = require('path')
const webpack = require('webpack')

module.exports = {
	entry: [
		'react-hot-loader/patch',
		path.resolve('src/index.tsx')
	],
	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/,
				include: /src/,
				exclude: /node_modules/,
				loader: "ts-loader",
				options: {
					transpileOnly: true,
					experimentalWatchApi: true,
				},
			},
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				}
			},
			{
				enforce: "pre",
				test: /\.js$/,
				loader: "source-map-loader"
			},
			{
				test: /\.(scss|css)$/,
				use: [{
					loader: 'style-loader', // inject CSS to page
				}, {
					loader: 'css-loader', // translates CSS into CommonJS modules
				}, {
					loader: 'postcss-loader', // Run postcss actions
					options: {
						plugins: function () { // postcss plugins, can be exported to postcss.config.js
							return [
								require('autoprefixer')
							];
						}
					}
				}, {
					loader: 'sass-loader' // compiles Sass to CSS
				}]
			}
		]
	},
	resolve: {
		extensions: ['.js', '.jsx', ".ts", ".tsx", "*.scss", "*.css"]
	},
	externals: {
		// "react": "React",
		// "react-dom": "ReactDOM"
	},
	output: {
		path: __dirname + '/dist',
		publicPath: '/',
		filename: 'bundle.js'
	},
	devServer: {
		contentBase: './dist',
		historyApiFallback: true,
		hot: true,
	},

	plugins: [
		new webpack.HotModuleReplacementPlugin(),
	],

	// dev build perf optimization
	optimization: {
		removeAvailableModules: false,
		removeEmptyChunks: false,
		splitChunks: false,
	}
};
