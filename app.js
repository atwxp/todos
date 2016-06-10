/**
 * @file  server entry
 * @author wxp201013@163.com
 */

// set up =====================================
var path = require('path');
var logger = require('morgan'); // log requests to the console
var express = require('express');
var mongoose = require('mongoose'); // mongoose for mongodb
var favicon = require('serve-favicon');
var bodyParser = require('body-parser'); // pull information from HTML POST
var cookieParser = require('cookie-parser');
var httpProxy = require('http-proxy');

var app = express();
var routesAPI = require('./api/routes/index');

var isDev = process.env.NODE_ENV !== 'production';
var proxy = httpProxy.createProxyServer();

// view engine =====================================

// Middleware config =====================================
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'output')));

// routes =====================================
app.use('/api', routesAPI);

// We only want to run the workflow when in dev
if (isDev) {
    require('./webpack.dev.config.js')();

    app.all('/static/', function () {
        proxy.web(req, res, {
            target: 'http://localhost:8080/static/'
        });
    });

    app.use('/', function (req, res) {
        proxy.web(req, res, {
            target: 'http://localhost:8080/'
        });
    });
    // add browserSync
}
else {
    app.use(function (req, res) {
        res.sendFile(path.join(__dirname, 'output', 'index.html'));
    });
}

// It is important to catch any errors from the proxy or the
// server will crash. An example of this is connecting to the
// server when webpack is bundling
proxy.on('error', function (e) {
  console.log('Could not connect to proxy, please try again...');
});

// error handlers =====================================
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
          message: err.message,
          error: err
        });
    });
}

// production error handler no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
