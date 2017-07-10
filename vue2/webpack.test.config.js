const path = require('path')

module.exports = {
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },

    devtool: '#inline-source-map',

    module: {
        rules: [
            {
                test: /\.js$/,

                include: [path.resolve('src', 'app'), path.resolve('test')],

                exclude: /(node_modules|bower_components)/,

                loader: 'babel-loader',

                options: {
                    plugins: ['istanbul']
                }
            },

            // https://github.com/webpack-contrib/istanbul-instrumenter-loader
            // {
            //     test: /\.jsx?$/,
            //     loader: 'istanbul-instrumenter-loader',
            //     options: {
            //         esModules: true
            //     },
            //     exclude: /node_modules|\.spec\.js$/,
            //     include: path.resolve('src/app'),
            //     enforce: 'post'
            // },

            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        css: 'vue-style-loader!css-loader',
                        less: 'vue-style-loader!css-loader!less-loader'
                    },
                    // 为了统计代码覆盖率，对 vue 文件加入 istanbul-instrumenter-loader
                    postLoaders: {
                        js: 'istanbul-instrumenter-loader'
                    }
                }
            }
        ]
    },

    resolve: {
        extensions: ['.js', '.vue', '.json'],

        modules: [path.resolve(__dirname, 'src', 'app'), 'node_modules'],

        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': path.resolve(__dirname, 'src', 'app')
        }
    }
 }
 