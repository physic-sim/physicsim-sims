const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        threeD: "./src/3d.js",  // Handles /3d/
        twoD: "./src/2d.js",       // Handles /2d/
        index: "./src/index.js",
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        chunkFilename: '[name].[contenthash].js',
        assetModuleFilename: 'assets/[hash][ext][query]',
        publicPath: '/',
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/templates/3d.html',
            filename: '3/index.html',
            chunks: ["threeD"],
        }),
        new HtmlWebpackPlugin({
            template: './src/templates/2d.html',
            filename: '2/index.html',
            chunks: ["twoD"],
        }),
        new HtmlWebpackPlugin({
            template: './src/templates/index.html',
            filename: 'index.html',
            chunks: ["index"],
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: './src/static/robots.txt', to: 'robots.txt' },
                { from: './src/static', to: 'static' }, 
            ],
        }),
    ],
    devServer: {
        static: path.join(__dirname, 'dist'),
        port: 8080,
        historyApiFallback: {
            rewrites: [
                { from: /^\/3\/.*$/, to: '/3/index.html' },  // Handle /3/ instead of /3d/
                { from: /^\/2\/.*$/, to: '/2/index.html' },  // Handle /2/ instead of /2d/
            ],
        },
        open: true, 
    },
    module: {
        rules: [
            {
                test: /\.css$/, 
                use: ['style-loader', 'css-loader'], 
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                type: 'asset/resource',
            },
            {
                test: require.resolve('p5'),
                loader: 'expose-loader',
                options: {
                    exposes: ['p5'],
                },
            },
        ],
    },
    mode: 'development',
};