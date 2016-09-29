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

            <todo-item v-for="td in todos" :todo.sync="td"></todo-item>
        </section>

        <footer>
            <span class="remaing-text">{{remaining}} item<template v-if="remaining>1">s</template> left</span>
            <a class="status all">All</a>
            <a class="status active">Active</a>
            <a class="status done">Done</a>
            <span class="clear-done" v-show="done" v-on:click="clearDone">Clear Done</span>
        </footer>
    </div>
</template>

<script>
    import todoData from './services/todo';
    import todoItem from './components/todo-item/';

    export default {
        data () {
            return {
                todo: '',
                todos: [],
                allDone: false
            };
        },

        watch: {
            allDone (v) {
                this.todos.forEach(t => t.done = v);
            }
        },

        computed: {
            remaining () {
                return this.todos.filter(v => !v.done).length;
            },

            done () {
                return this.todos.filter(v => v.done).length;
            }
        },

        components: {
            'todo-item': todoItem
        },

        ready () {
            this.getTodo();
        },

        methods: {
            getTodo () {
                var me = this;
                todoData
                    .getTodoList()
                    .then(res => {
                        me.$set('todos', res.data);
                    })
                    .catch(err => {
                        console.log('get err: ', err);
                    });
            },

            addTodo () {
                var me = this;

                todoData
                    .addTodo({
                        text: me.todo,
                        done: false
                    })
                    .then(res => {
                        me.todos.unshift(res.data);
                        me.todo = '';
                    })
                    .catch(err => {
                        console.log(err);
                    });

            },

            // 批量删除
            clearDone () {
                console.log('clear all');
            }
        },

        events: {
            delTodo (todo) {
                this.todos = this.todos.filter(v => {
                    return v._id !== todo._id;
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

        input[type="text"] {
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
