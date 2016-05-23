var Vue = require('vue');

exports.getTodoList = function () {
    return Vue.http.get('/api/todos');
};

exports.addTodo = function (todo) {
    return Vue.http.post('/api/todos', todo);
};

exports.deleteTodo = function (id) {
    return Vue.http.delete('/api/todos/' + id);
};

exports.updateTodo = function (id, todo) {
    return Vue.http.put('/api/todos/' + id, todo);
};
