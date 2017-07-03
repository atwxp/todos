import KoaRouter from 'koa-router'

import * as todo from '../controllers/todo'

const router = new KoaRouter()

router.get('/todo', todo.fetch)

router.post('/todo', todo.create)

router.put('/todo/:id', todo.update)

router.delete('/todo/:id', todo.remove)

export default router
