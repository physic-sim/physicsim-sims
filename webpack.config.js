const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
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
            template: './src/templates/index.html',
            filename: 'index.html',
            chunks: ["index"],
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: './src/static/robots.txt', to: 'robots.txt' },
                { from: './src/static/_redirects', to: path.resolve(__dirname, 'dist/_redirects'), toType: 'file'},
                { from: './src/static', to: 'static' }, 
            ],
        }),
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        port: 8080,
        historyApiFallback: true,
        open: true,
        hot: true,
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