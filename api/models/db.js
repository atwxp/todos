import mongoose from 'mongoose';
import readLine from 'readline';
import todo from './todo';

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

if (process.platform === 'win32') {
    var rl = readLine.createInterface ({
        input: process.stdin,
        output: process.stdout
    });
    rl.on ('SIGINT', function (){
        shutdown('app terminal exit', function () {
            process.exit(0);
        });
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

export default todo;
