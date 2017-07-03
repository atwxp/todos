import jwt from 'jsonwebtoken'
import user from '../models/user'

export async function login(ctx) {
    const data = ctx.request.body

    const userInfo = await user.getUserByAccount(data.account)

    if (!userInfo) {
        ctx.body = {
            status: 1,
            msg: 'User Not Found'
        }
    }
    else {
        if (!data.password || data.password !== userInfo.password) {
            ctx.body = {
                status: 2,
                msg: 'Password Error'
            }
        }
        else {
            const token = jwt.sign({
                id: userInfo._id,
                account: userInfo.account
            }, 'vue2-todo', {
                expiresIn: 60 * 60 * 24
            })

            ctx.body = {
                data: {
                    token
                }
            }
        }
    }
}

export async function getUserInfo(ctx) {
    const userInfo = await user.getUserById(ctx.params.id)

    if (!userInfo) {
        ctx.body = {
            status: 1,
            msg: 'User Not Found'
        }
    }
    else {
        ctx.body = {
            data: userInfo
        }
    }
}
