<template>
    <div class="app">
        <header>
            <h1 class="title">Todos</h1>
            <input type="text" v-model="todo" placeholder="Enter Todo" v-on:keyup.enter="addTodo">
        </header>

        <section class="todo-list">
            <div class="tips">
                <input type="checkbox" id="toggle-all" v-model="allDone">
                <label for="toggle-all">Mark all as complete</label>
            </div>

            <todo-item v-for="td in todos" :todo="td"></todo-item>
        </section>
        
        <footer>
            <span class="remaing-text">{{remaining}} item<template v-if="remaining>1">s</template> left</span>
            <a href="" class="status all">All</a>
            <a href="" class="status active">Active</a>
            <a href="" class="status done">Done</a>
            <span class="clear-done" v-show="done" v-on:click="clearDone">Clear Done</span>
        </footer>
    </div>
</template>

<script>
    var util = require('./util');

    module.exports = {
        data: function () {
            return {
                todo: '',
                allDone: false,
                todos: []
            };
        },

        watch: {
            allDone: function (v) {
                this.todos.forEach(function (t) {
                    t.done = v;
                });
            }
        },

        computed: {
            remaining: function () {
                return this.todos.filter(function (v) {
                    return !v.done;
                }).length;
            },

            done: function () {
                return this.todos.filter(function (v) {
                    return v.done;
                }).length;
            }
        },

        components: {
            'todo-item': require('./components/todo-item')
        },

        ready: function () {
            this.$http.get('/api/todos')
                .then(function (res) {
                    this.$set('todos', res.data);
                })
                .catch(function (err) {
                    console.log('get err: ', err);
                });
        },

        methods: {
            addTodo: function () {
                this.$http.post('/api/todos', {
                    id: util.gid(),
                    text: this.todo,
                    done: false
                })
                .then(function (res) {
                    this.todos.unshift(res.data);
                })
                .catch(function (err) {
                    console.log(err);
                });

                this.todo = '';
            },

            clearDone: function () {
                // 批量删除
            }
        },

        events: {
            'update-done': function (todo) {
                this.$http.put('/api/todos', todo)
                    .then(function (res) {
                        todo = res.data;
                    })
                    .catch(function (err) {
                        console.log('update done: ', err);
                    });
            },

            'modify-todo': function (todo) {
                this.$http.put('/api/todos/', todo)
                    .then(function (res) {
                        todo = res.data;
                    })
                    .catch(function (err) {
                        console.log('modify todo: ', err);
                    });
            },

            'del-todo': function (todo) {
                this.$http.delete('/api/todos/' + todo.id)
                    .then(function (res) {
                        this.todos = this.todos.filter(function (v) {
                            return v.id !== res.data.id;
                        });
                    })
                    .catch(function (err) {
                        console.log('delete todo: ', err);
                    });
            }
        }
    };
</script>

<style lang="less">
    ul, ol,
    p,
    input {
        margin: 0;
        padding: 0;
    }

    li {
        list-style: none;
    }

    input {
        outline: none;
    }

    body {
        font: 14px/1.5 "Helvetica Neue", Helvetica, Arial, sans-serif;
        background-color: #eeeeee;
        color: #333;
    }

    .app {
        width: 480px;
        padding: 20px;
        margin: 0 auto;
        background-color: #fff;
        -webkit-box-shadow: rgba(0, 0, 0, 0.2) 0 2px 6px 0;
        box-shadow: rgba(0, 0, 0, 0.2) 0 2px 6px 0;
        border-radius: 4px;

        .title {
            text-align: center;
        }

        input[type=text] {
            width: 466px;
            padding: 6px;
            font-size: 24px;
            line-height: 1.5;
            border: 1px solid #999;
            -webkit-box-shadow: rgba(0, 0, 0, 0.2) 0 1px 2px 0 inset;
            box-shadow: rgba(0, 0, 0, 0.2) 0 1px 2px 0 inset;
        }

        .tips {
            margin: 10px 0;
        }

        footer {
            padding-top: 10px;
            text-align: center;

            .remaing-text {
                float: left;
            }

            .status {
                margin-right: 8px;
            }

            .clear-done {
                float: right;
                &:hover {
                    text-decoration: underline;
                }
            }
            
        }
    }
</style>
