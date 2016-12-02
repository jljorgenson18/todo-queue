"use strict";

const path = require("path");
const webpack = require("webpack");
const StatsPlugin = require('stats-webpack-plugin');

module.exports = {
    cache: false,
    entry: [
        "./src/index",
    ],
    output: {
        path: path.join(__dirname, 'public/js'),
        filename: 'bundle.js',
        publicPath: '/public/js/'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ["babel"],
            include: path.join(__dirname, "src")
        }, {
            test: /\.json$/,
            loader: "json"
        }]
    },
    plugins: [
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /de|fr|hu|en-gb|en-ca/),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false,
                screw_ie8: true
            }
        }),
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify("production")
        })
    ]
};
