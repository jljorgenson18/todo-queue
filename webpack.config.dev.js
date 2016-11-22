'use strict';

const path = require('path');
const webpack = require('webpack');

module.exports = {
    debug: true,
    devtool: 'cheap-module-eval-source-map',
    entry: [
        'react-hot-loader/patch',
        'webpack-hot-middleware/client',
        './src/index'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ['babel'],
            include: path.join(__dirname, 'src')
        }, {
            test: /\.json$/,
            loader: 'json'
        }]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /de|fr|hu|en-gb|en-ca/),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        })
    ]
};
