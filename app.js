/**
 * @file  server entry
 * @author wxp201013@163.com
 */

// set up =====================================
import path from 'path';
import logger from 'morgan'; // log requests to the console
import mongoose from 'mongoose'; // mongoose for mongodb
import favicon from 'serve-favicon';
import bodyParser from 'body-parser'; // pull information from HTML POST
import cookieParser from 'cookie-parser';
import express from 'express';
import httpProxy from 'http-proxy';
import browserSync from 'browser-sync';

import webpackDevConfig from './webpack.dev.config.babel';
import routesAPI from './api/routes';

const app = express();
const bs = browserSync.create();
const proxy = httpProxy.createProxyServer();

const debug = require('debug')('vemn-todo:index');

const port = process.env.PORT || 3000;
const isDev = process.env.NODE_ENV !== 'production';

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
    webpackDevConfig();

    app.all('/static/', () => {
        proxy.web(req, res, {
            target: 'http://localhost:8080/static/'
        });
    });

    app.use('/', (req, res) => {
        proxy.web(req, res, {
            target: 'http://localhost:8080/'
        });
    });
    // add browserSync
}
else {
    app.use((req, res) => {
        res.sendFile(path.join(__dirname, 'output', 'index.html'));
    });
}

// It is important to catch any errors from the proxy or the
// server will crash. An example of this is connecting to the
// server when webpack is bundling
proxy.on('error',  (e) => {
  console.log('Could not connect to proxy, please try again...');
});

// error handlers =====================================
// catch 404 and forward to error handler
app.use((req, res, next) => {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler will print stacktrace
if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.render('error', {
          message: err.message,
          error: err
        });
    });
}

// production error handler no stacktraces leaked to user
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

// listen on port
app.listen(port, () => {
    bs.init({
        open: false,
        proxy: 'localhost:' + port,
        files: ['api/views/**/*']
    });

    debug('server started on port ' + port);
});

export default app;
