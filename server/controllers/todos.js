'use strict';

var Todos = require('../models/todos');

exports.create = function (req, res) {
    var todo = new Todos(req.body);

    todo.save(function (err) {
        res.json(todo);
    });
};

exports.read = function (req, res) {
    Todos.find(function (err, todos) {
        res.json(todos);
    });
};

exports.update = function (req, res) {
    Todos.findByIdAndUpdate(req.body.id, {
        done: req.body.done,
        text: req.body.text
    }, {}, function (err, todo) {
        res.json(todo);
    });
};

exports.remove = function (req, res) {
    Todos.findByIdAndRemove(req.params.id, function (err, todo) {
        res.json(todo);
    });
};
