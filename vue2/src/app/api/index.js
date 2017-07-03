import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8000'

export function login(user) {
    return axios.post('/auth/user', user)
}

export function fetchTodo() {
    return axios.get('/api/todo')
}

export function createTodo(todo) {
    return axios.post('/api/todo', todo)
}

export function deleteTodo(id) {
    return axios.delete(`/api/todo/${id}`)
}

export function updateTodo(todo) {
    return axios.put(`/api/todo/${todo._id}`, todo)
}
