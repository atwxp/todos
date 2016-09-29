'use strict';

import mongoose from 'mongoose';

var Schema = mongoose.Schema;

var TodoSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    done: {
        type: Boolean,
        default: false
    }
});

export default mongoose.model('Todo', TodoSchema);
