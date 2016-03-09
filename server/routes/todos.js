'use strict';

var express = require('express');
var router = express.Router();

var todos = require('../controllers/todos');

router.get('/', function (req, res) {
    res.render('index');
});

router.get('/api/todos', todos.read);

router.post('/api/todos', todos.create);

router.put('/api/todos', todos.update);

router.delete('/api/todos/:id', todos.remove);

module.exports = router;
