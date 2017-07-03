import * as api from '../../api'

const state = {
    todos: []
}

const getters = {
    isAllDone: state => state.todos.length && state.todos.every(todo => todo.done),
    existDone: state => state.todos.some(todo => todo.done)
}

const mutations = {
    SET_TODO (state, todos = []) {
        state.todos = todos.reverse()
    },

    ADD_TODO (state, todo) {
        state.todos.unshift(todo)
    },

    DELETE_TODO (state, todo) {
        state.todos.splice(state.todos.indexOf(todo), 1)
    },

    UPDATE_TODO (state, todo) {
        for (const value of state.todos) {
            if (value._id === todo._id) {
                const index = state.todos.indexOf(value)
                state.todos.splice(index, 1, Object.assign(value, todo))
                return
            }
        }
    }
}

const actions = {
    async fetchTodo ({ commit }) {
        try {
            const res = await api.fetchTodo()
            commit('SET_TODO', res.data && res.data.data)
        }
        catch (e) {

        }
    },

    async addTodo ({ commit }, todoText) {
        if (!todoText || !todoText.trim()) {
            await Promise.reject('No Todo exists')
        }

        try {
            const res = await api.createTodo({
                text: todoText,
                done: false
            })

            if (res.data && !res.data.status) {
                commit('ADD_TODO', res.data.data)
            }

            else {
                await Promise.reject('create todo failed')
            }
        }
        catch (e) {
            await Promise.reject('create api error')
        }
    },

    async deleteTodo ({ commit }, todo) {
        try {
            await api.deleteTodo(todo._id)
            commit('DELETE_TODO', todo)
        }
        catch (e) {

        }
    },

    async updateTodo ({ commit }, todo) {
        try {
            await api.updateTodo(todo)
            commit('UPDATE_TODO', todo)
        }
        catch (e) {

        }
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
