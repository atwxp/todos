var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');

mongoose.connection.on('connected', function () {
    console.log('Mongoose connected');
});
mongoose.connection.on('error', function (err) {
    console.log('Mongoose connected err: ' + err);
});
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected');
});

function shutdown(msg, callback) {
    mongoose.connection.close(function () {
        console.log('Mongoose Disconnect through ' + msg);
        callback();
    });
}

process.on('SIGINT', function () {
    shutdown('app terminal exit', function () {
        process.exit(0);
    });
});

process.once('SIGUSR2', function () {
    shutdown('nodemon restart', function () {
        process.kill(process.pid, 'SIGUSR2');
    });
});

module.exports = require('./todo');
