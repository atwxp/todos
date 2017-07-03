import todo from '../models/todo'

export async function fetch(ctx) {
    ctx.body = {
        data: await todo.fetchById(ctx.params.userid)
    }
}

export async function create(ctx) {
    ctx.body = {
        data: await todo.create(ctx.request.body)
    }
}

export async function update(ctx) {
    const id = ctx.params.id
    const userid = ctx.params.userid
    const data = ctx.request.body

    await todo.updateById(userid, id, data)

    ctx.body = {}
}

export async function remove(ctx) {
    const id = ctx.params.id
    const userid = ctx.params.userid

    await todo.removeById(userid, id)

    ctx.body = {}
}
