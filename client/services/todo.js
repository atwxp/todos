/**
 * @file   todo service
 * @author wxp201013@163.com
 */

import Vue from 'Vue';

function getTodoList() {
    return Vue.http.get('/api/todos');
}

function addTodo(todo) {
    return Vue.http.post('/api/todos', todo);
}

function deleteTodo(id) {
    return Vue.http.delete('/api/todos/' + id);
}

function updateTodo(id, todo) {
    return Vue.http.put('/api/todos/' + id, todo);
}

export default {
    getTodoList,
    addTodo,
    deleteTodo,
    updateTodo
};
