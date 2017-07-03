import * as api from '../../api'

const getToken = function () {
    const token = sessionStorage.getItem('todo-token')

    let payload = null

    if (token) {
        try {
            payload = JSON.parse(window.atob(token.split(/\./)[1]))

            if (payload.exp < Date.now() / 1000) {
                payload = null
            }
        }
        catch (e) {
        }
    }

    return payload
}

const state = {
    token: getToken()
}

const mutations = {
    USER_LOGIN (state, token) {
        sessionStorage.setItem('todo-token', token)
        state.token = token
    }
}

const actions = {
    async doLogin({ commit }, user) {
       if (!user.account || !user.password) {
            await Promise.reject({
                status: 3,
                msg: !user.account ? 'account' : 'password'
            })
        }

        try {
            let res = await api.login(user)

            if (res.data && !res.data.status) {
                commit('USER_LOGIN', res.data.data.token)
            }
            else {
                await Promise.reject(res.data)
            }
        }
        catch (e) {
            commit('USER_LOGIN', null)
            await Promise.reject(e)
        }
    }
}

export default {
    state,
    actions,
    mutations
}
