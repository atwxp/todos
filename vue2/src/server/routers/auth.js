import KoaRouter from 'koa-router'

import * as user from '../controllers/user'

const router = new KoaRouter()

router.get('/user/:id', user.getUserInfo)
router.post('/user', user.login)

export default router
