<template>
    <div class="app">
        <h1 class="title">Todo App</h1>

        <div class="todo-wrap">
            <input type="text" class="todo-ipt" v-model="todo" placeholder="enter todo" v-on:keyup.enter="addTodo">
        
            <div class="todo-list">
                <ul>
                    <li v-for="td in todos">
        
                        <input class="checkbox" type="checkbox" v-model="td.done">
        
                        <button class="del-btn" v-on:click="delTodo(td.id)">Delete</button>
        
                        <p v-on:dblclick="editable=!editable">
                            <span v-show="!editable" v-bind:class="td.done ? 'done' : ''">{{td.text}}</span>
                            <input class="edit-ipt" type="text" v-on:keyup.enter="modifyTodo" value="{{td.text}}" v-show="editable">
                            <button class="cancel-btn" v-on:click="editable=!editable" v-show="editable">Cancel</button>
                        </p>
                    </li>
                </ul>
            </div>
        
            <footer>
                <span>left/{{todos.length}} total</span>
                <a href="" class="not done">not done</a>
                <a href="" class="done">done</a>
                <span class="clear">clear all items</span>
            </footer>
        </div>
    </div>
</template>

<script>
    var util = require('./util');
    // http://vegibit.com/vue-js-tutorial/
    // https://segmentfault.com/a/1190000003968020
    module.exports = {
        data: function () {
            return {
                todo: '',
                todos: [],
                editable: false
            };
        },

        watch: {
            'todo.done': 'updateStatus'
        },

        methods: {
            updateStatus: function () {

            },

            addTodo: function () {
                console.log('add todo');

                this.todos.push({
                    id: util.gid(),
                    text: this.todo,
                    done: false
                });

                this.todo = '';
            },

            delTodo: function () {

            },

            modifyTodo: function () {

            }
        }
    };
</script>

<style lang="less">
    ul, ol {
        margin: 0;
        padding: 0;
    }
    li {
        list-style: none;
    }
    input,
    button {
        padding: 0;
        margin: 0;
        outline: none;
    }
    button {
        border: none;
    }

    .app {
        width: 400px;
        margin: 0 auto;
        .title {
            text-align: center;
        }
    }
    .todo-wrap {
        width: 80%;
        margin: 0 auto;
        .todo-ipt {
            width: 100%;
            height: 36px;
            padding: 0 5px;
            box-sizing: border-box;
        }
        .todo-list {
            li {
                height: 30px;
                padding: 10px 0;
                border-bottom: 1px solid #ccc;
            }
            p {
                margin: 0 70px 0 20px;
                line-height: 30px;
                font-size: 13px;
                span {

                }

                .edit-ipt {

                }
            }
            .checkbox {
                float: left;
                margin-top: 8px;
            }
            .del-btn {
                float: right;
                margin-top: 2px;
                height: 26px;
                line-height: 26px;
                padding: 0 10px;
                background: #F94747;
                border-radius: 5px;
                color: #fff;
                text-align: center;
                cursor: pointer;
                &:hover {
                    background: #D53232;
                }
            }
        }
    }
</style>
