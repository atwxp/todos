'use strict';

import express from 'express';
import todos from '../controllers/todo';

const router = express.Router();

router.get('/todos', todos.read);

router.post('/todos', todos.create);

router.put('/todos/:id', todos.update);

router.delete('/todos/:id', todos.remove);

export default router;
