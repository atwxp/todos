'use strict';

var express = require('express');
var router = express.Router();

var todos = require('../controllers/todo');

router.get('/todos', todos.read);

router.post('/todos', todos.create);

router.put('/todos/:id', todos.update);

router.delete('/todos/:id', todos.remove);

module.exports = router;
