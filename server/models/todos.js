'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TodoSchema = new Schema({
    id: String,
    text: String,
    done: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Todos', TodoSchema);
