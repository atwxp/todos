export default async function responseFormatter(ctx, next) {
    await next()

    ctx.body = Object.assign({
        status: 0,
        msg: 'success'
    }, ctx.body || {})
}
