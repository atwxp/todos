'use strict';

import Todos from '../models/db';

var send = function (res, status, data) {
    res.status(status);
    res.json(data || {'status': 'success'});
};

exports.create = function (req, res) {
    if (!req.body.text) {
        send(res, 404, {
            message: 'todo text is required'
        });

        return;
    }

    var todo = new Todos(req.body);

    todo.save(function (err) {
        if (err) {
            send(res, 404, err);
        }
        else {
            send(res, 200, todo);
        }
    });
};

exports.read = function (req, res) {
    Todos.find(function (err, todos) {
        if (err) {
            send(res, 404, err);
        }
        else {
            send(res, 200, todos);
        }
    });
};

exports.update = function (req, res) {
    var id = req.params.id;

    if (!id) {
        send(res, 404, {
            message: 'todo id is required'
        });
        return;
    }

    Todos.findOneAndUpdate({_id: id}, {
        done: req.body.done,
        text: req.body.text
    }, {new: true}, function (err, todo) {

        if (err) {
            send(res, 404, err);
            return;
        }

        if (!todo) {
            send(res, 404, {
                message: 'todo id is not found'
            });

            return;
        }

        send(res, 200, todo);
    });
};

exports.remove = function (req, res) {
    var id = req.params.id;
    if (!id) {
        send(res, 404, {
            message: 'todo id is required'
        });

        return;
    }

    Todos.findOneAndRemove({_id: id}, function (err, todo) {
        if (err) {
            send(res, 404, err);
            return;
        }

        send(res, 200, todo);
    });
};
