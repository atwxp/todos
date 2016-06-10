/**
 * @file webpack production config file
 * @author wxp201013@163.com
 */

'use strict';

var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var abs = function () {

    var p = [__dirname].concat(Array.prototype.slice.call(arguments));

    return path.join.apply(null, p);
};

module.exports = {
    context: abs('client'),

    entry: ['./index.js'],

    output: {
        path: abs('output'),

        filename: 'index.js',

        publicPath: '/static/'
    },

    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style', 'css')
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract('style', 'css!less')
            },

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
                test: /\.json/,
                loader: 'json'
            }
        ],

        noParse: /\.min\.js/
    },

    // @see: http://vuejs.github.io/vue-loader/configurations/extract-css.html
    vue: {
        loaders: {
            css: ExtractTextPlugin.extract('css'),
            less: ExtractTextPlugin.extract('css!less')
        }
    },

    plugins: [
        new ExtractTextPlugin('index.css'),

        // this allows uglify to strip all warnings from Vue.js source code
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),

        // This minifies not only JavaScript, but also
        // the templates (with html-minifier) and CSS (with cssnano)!
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),

        new HtmlWebpackPlugin({
            template: 'index.html',
            inject: false
        })
    ],

    resolve: {
        extensions: ['', '.vue', '.js']
    }
};
