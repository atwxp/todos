// Karma configuration
// Generated on Mon Jul 10 2017 18:26:36 GMT+0800 (CST)

const webpackConfig = require('./webpack.test.config')

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'sinon-chai'],


    // list of files / patterns to load in the browser
    files: ['./test/unit/file.js'],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      './test/unit/file.js': ['webpack', 'sourcemap']
    },

    // 设定终端上不输出 webpack 的打包信息
    webpackMiddleware: {
      noInfo: true
    },

    webpack: webpackConfig,

    plugins: [
      'karma-webpack',
      'karma-mocha',
      'karma-chai',
      'karma-sinon-chai',
      'karma-chrome-launcher',
      'karma-phantomjs-launcher',
      'karma-sourcemap-loader',
      'karma-spec-reporter',
      'karma-coverage',
      'karma-coverage-istanbul-reporter'
    ],

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    // reporters: ['spec', 'coverage-istanbul'],
    reporters: ['spec', 'coverage'],

    coverageReporter: {
      dir: './coverage',
      reporters: [
        { type: 'lcov', subdir: '.' },
        { type: 'text-summary' }
      ]
    },

    // coverage-istanbul 输出配置，报告文件输出于根目录下的 coverage 文件夹内
    // coverageIstanbulReporter: {
    //   reports: ['html', 'lcovonly', 'text-summary'],

    //   // base output directory
    //   dir: './coverage',

    //   // if using webpack and pre-loaders, work around webpack breaking the source path
    //   fixWebpackSourcePaths: true,

    //   'report-config': {
    //       html: {
    //           subdir: 'html'
    //       }
    //   }
    // },

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    // browsers: ['Chrome', 'PhantomJS'],
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
