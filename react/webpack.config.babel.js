import path from 'path'
import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import HTMLWebpackPlugin from 'html-webpack-plugin'

const isProduction = process.env.NODE_ENV === 'production'

// http://imweb.io/topic/5868e1abb3ce6d8e3f9f99bb
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

    devtool: isProduction ? false : 'cheap-module',

    module: {
        noParse: /moment/,

        rules: [
            // {
            //     test: /\.js$/,
            //     exclude: /(node_modules|bower_components)/,
            //     enforce: 'pre',
            //     loader: 'fecs-loader'
            // },

            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                include: path.resolve(__dirname, 'src', 'app'),
                use: {
                    loader: 'babel-loader?cacheDirectory',
                    options: {
                        presets: [['es2015', {modules: false}], 'react']
                        // plugins: ['transform-runtime']
                    }
                }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: 'css-loader',
                    fallback: 'style-loader'
                })
            },

            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader', 'less-loader'],
                    fallback: 'style-loader'
                })
            }
        ]
    },

    plugins: [
        new ExtractTextPlugin(isProduction ? 'static/css/[name].[contenthash].css' : '[name].css'),

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
    ].concat(isProduction
        ? [
            new webpack.optimize.UglifyJsPlugin({
                // 最紧凑的输出
                beautify: false,
                // 删除所有的注释
                comments: false,
                compress: {
                    // 在UglifyJs删除没有用到的代码时不输出警告  
                    warnings: false,
                    // 删除所有的 `console` 语句
                    // 还可以兼容ie浏览器
                    drop_console: true,
                    // 内嵌定义了但是只用到一次的变量
                    collapse_vars: true,
                    // 提取出出现多次但是没有定义成变量去引用的静态值
                    reduce_vars: true,
                },
                exclude: [/\.min\.js$/gi]
            }),

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
        ]
        : []
    ),

    resolve: {
        alias: {
            'react$': path.resolve(__dirname, './node_modules/react/dist/react.js'),
            // 'react$': path.resolve(__dirname, './node_modules/react/dist/react.min.js'),
            'react-dom$': path.resolve(__dirname, './node_modules/react-dom/dist/react-dom.js'),
            'moment': path.resolve(__dirname, './node_modules/moment/min/moment.min.js')
        },
        modules: [path.resolve(__dirname, 'src', 'app'), path.resolve(__dirname, 'node_modules')]
    }
}
