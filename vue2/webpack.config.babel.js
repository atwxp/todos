import path from 'path'
import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import HTMLWebpackPlugin from 'html-webpack-plugin'
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const isProduction = process.env.NODE_ENV === 'production'

export default {
    context: path.resolve(__dirname, 'src', 'app'),

    entry: {
        app: 'index.js'
    },

    output: {
        path: path.resolve(__dirname, 'dist'),

        filename: isProduction ? 'static/js/[name].[chunkhash].js' : '[name].js',

        chunkFilename: isProduction ? 'static/js/[id].[chunkhash].js' : '',

        sourceMapFilename: isProduction ? '' : '[name].map.js',

        publicPath: isProduction ? '/' : '/'
    },

    devtool: isProduction ? false : 'cheap-module-source-map',

    module: {
        rules: [
            // {
            //     test: /\.js$/,
            //     exclude: /(node_modules|bower_components)/,
            //     enforce: 'pre',
            //     loader: 'fecs-loader'
            // },

            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader'
                }
            },

            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        css: ExtractTextPlugin.extract({
                            use: ['css-loader'],
                            fallback: 'vue-style-loader'
                        }),

                        less: ExtractTextPlugin.extract({
                            use: ['css-loader', 'less-loader'],
                            fallback: 'vue-style-loader'
                        })
                    }
                }
            }
        ]
    },

    plugins: [
        new ExtractTextPlugin('static/css/[name].[contenthash].css'),

        new HTMLWebpackPlugin({
            template: 'index.html',
            filename: 'index.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
                // more options:
                // https://github.com/kangax/html-minifier#options-quick-reference
            }
        })
    ].concat(isProduction ? [
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false,
        //         drop_console: false
        //     },
        //     exclude: [/\.min\.js$/gi]
        // }),

        // split vendor js into its own file
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',

            minChunks: function (module) {
                // any required modules inside node_modules are extracted to vendor
                return (module.resource && /\.js$/.test(module.resource)
                    && module.resource.indexOf(path.join(__dirname, 'node_modules')) === 0)
            }
        }),

        // extract webpack runtime and module manifest to its own file in order to
        // prevent vendor hash from being updated whenever app bundle is updated
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            chunks: ['vendor']
        })

        // copy custom static assets
        // new CopyWebpackPlugin([
        //     {
        //         from: path.resolve(__dirname, '../static'),
        //         to: config.build.assetsSubDirectory,
        //         ignore: ['.*']
        //     }
        // ]),

        // new BundleAnalyzerPlugin()
    ] : []),

    resolve: {
        extensions: ['.js', '.json', '.vue'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        },
        modules: [path.resolve(__dirname, 'src', 'app'), 'node_modules']
    }
}
