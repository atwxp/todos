import path from 'path'
import Koa from 'koa'
import cors from 'koa2-cors'
import serve from 'koa-static'
import KoaRouter from 'koa-router'
import bodyParser from 'koa-bodyparser'
import historyApiFallback from 'koa-history-api-fallback'

import db from './models/db'
import auth from './routers/auth'
import todo from './routers/todo'

import responseFormatter from './middlewares/response_formatter'

const app = new Koa()
const router = new KoaRouter()

// middlewares
app.use(cors())
app.use(bodyParser())
app.use(responseFormatter)

// router
router.use('/auth', auth.routes())
router.use('/api', todo.routes())
app.use(router.routes())

app.use(historyApiFallback())

// static
app.use(serve(path.resolve(__dirname, '../../dist')))

app.listen(8000, () => {
    console.log('koa is listening on 8000')
})

export default app
