Function.prototype.bind = require('function-bind')

// require all test files (files that ends with .spec.js)
const testsContext = require.context('./specs', true, /\.spec$/)
testsContext.keys().forEach(testsContext)

// const srcContext = require.context('../../src', true, /^\.\/(?!main(\.js)?$)/)
const srcContext = require.context('../../src/app', true, /^\.\/(?!index(\.(js|html))?$)/)
srcContext.keys().forEach(srcContext)
