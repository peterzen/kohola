module.exports = {
	entry: [
		'./src/index.tsx'
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
			}
		]
	},
	resolve: {
		extensions: ['.js', '.jsx', ".ts", ".tsx"]
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
		contentBase: './dist'
	},

	// dev build perf optimization
	optimization: {
		removeAvailableModules: false,
		removeEmptyChunks: false,
		splitChunks: false,
	}
};
