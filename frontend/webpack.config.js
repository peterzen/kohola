const path = require("path")
const webpack = require("webpack")

module.exports = {
    mode: 'none',
    target: 'web',
    entry: ["react-hot-loader/patch", path.resolve("src/index.tsx")],
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
                    loader: "babel-loader",
                },
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader",
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" },
                    { loader: "postcss-loader" },
                    { loader: "sass-loader" },
                ],
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: "babel-loader",
                    },
                    {
                        loader: "react-svg-loader",
                        options: {
                            jsx: true, // true outputs JSX tags
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: ["file-loader"],
            },
        ],
    },
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx", "*.scss", "*.css"],
        alias: { 
            "react-dom": "@hot-loader/react-dom",
            "process": "process/browser",
        },
        fallback: {
            "fs": false,
            "tls": false,
            "net": false,
            "path": false,
            "zlib": false,
            "http": false,
            "https": false,
            "crypto": false,
            "stream": require.resolve("stream-browserify"),
            "buffer": require.resolve("buffer")
            // "crypto-browserify": require.resolve('crypto-browserify'),
          } 
    },
    externals: {
        // "react": "React",
        // "react-dom": "ReactDOM"
    },
    output: {
        path: __dirname + "/dist",
        publicPath: "/",
        filename: "bundle.js",
    },
    devServer: {
        static: "./dist",
        historyApiFallback: true,
        hot: true,
    },
    plugins: [
        // new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
        }),
    ],
    // dev build perf optimization
    optimization: {
        removeAvailableModules: false,
        removeEmptyChunks: false,
        splitChunks: false,
    },
    performance: {
        hints: false,
        maxEntrypointSize: 600000,
        maxAssetSize: 600000,
    },
}
