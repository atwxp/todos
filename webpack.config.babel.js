/**
 * @file webpack base config file
 * @author wxp201013@163.com
 */

'use strict';

import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const abs = (...values) => {
    let p = [__dirname].concat(values);

    return path.resolve.apply(null, p);
};

const isProduction = process.env.NODE_ENV === 'production';

const srcPath = abs('client');

const outputPath = abs('output');

// todo: modify your own static path
const assetsPath = isProduction ? '/' : '/static/';

export default {
    context: srcPath,

    entry: {
        index: ['index.js']
    },

    output: {
        path: outputPath,

        filename: isProduction ? '[name].[chunkhash].js' : '[name].js',

        publicPath: assetsPath,

        sourceMapFilename: '[file].map'
    },

    devtool: isProduction ? null : 'source-map',

    module: {
        preLoaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'fecs-loader'
            }
        ],

        loaders: [
            {
                test: /\.(png|jpe?g|gif)$/,
                loader: 'url',
                query: {
                    // inline files smaller then 10kb as base64 dataURL
                    limit: 10000,
                    // fallback to file-loader with this naming scheme
                    name: '[name].[ext]?[hash]'
                }
            },

            {
                test: /\.(eot|woff|woff2|ttf|svg)([a-z0-9\?#]+)?$/,
                loader: 'file-loader'
            },

            {
                test: /\.vue$/,
                loader: 'vue'
            },

            {
                test: /\.json$/,
                loader: 'json'
            },

            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ],

        noParse: /\.min\.js/
    },

    // https://github.com/vuejs-templates/webpack/tree/master/template/build
    vue: {
        loaders: {
            css: ExtractTextPlugin.extract('vue-style', 'css'),
            less: ExtractTextPlugin.extract('vue-style', 'css!less')
        }
    },

    plugins: (function () {
        return (isProduction
            ? [
                new webpack.optimize.UglifyJsPlugin({
                    compress: {
                        warnings: false
                    }
                }),

                new webpack.BannerPlugin('(c) ' + new Date().getFullYear() + ' wxp. All Rights Reserved')
            ]
            : []
            )
            .concat([
                new ExtractTextPlugin(isProduction ? '[name].[chunkhash].css' : '[name].css'),

                new HtmlWebpackPlugin({
                    template: 'index.html'
                })
            ]);
    })(),

    resolve: {
        root: srcPath,
        extensions: ['', '.vue', '.js']
    }
};
