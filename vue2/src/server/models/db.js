import mongoose from 'mongoose'
import readLine from 'readline'

import config from '../config'

mongoose.connect(config.database)

const db = mongoose.connection

db.on('connected', () => {
    console.log('Mongoose connected');
})

db.on('error', (err) => {
    console.log('Mongoose connected err: ' + err);
})

db.on('disconnected', () => {
    console.log('Mongoose disconnected');
})

function shutdown(msg, callback) {
    db.close(() => {
        console.log('Mongoose disconnect through ' + msg)
        callback()
    })
}

if (process.platform === 'win32') {
    const rl = readLine.createInterface({
        input: process.stdin,
        output: process.stdout
    })

    rl.on ('SIGINT', () => {
        shutdown('app terminal exit', () => {
            process.exit(0)
        })
    })
}

process.on('SIGINT', function () {
    shutdown('app terminal exit', function () {
        process.exit(0)
    })
})

process.once('SIGUSR2', function () {
    shutdown('nodemon restart', function () {
        process.kill(process.pid, 'SIGUSR2')
    })
})

export default db
