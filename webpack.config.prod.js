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
        path: path.join(__dirname, "dist"),
        filename: "bundle.js",
        publicPath: "/static/"
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
        // creates a stats.json
        new StatsPlugin('webpack.stats.json', {
            source: false,
            modules: false
        }),
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify("production")
        })
    ]
};
