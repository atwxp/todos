<template>
    <div class="todo-item" v-bind:class="editing ? 'editing' : ''" v-on:mouseenter="showDel=true" v-on:mouseleave="showDel=false">
        <div class="view" v-bind:class="todo.done ? 'done' : ''">

            <input type="checkbox" v-model="todo.done">

            <p class="todo-text" v-on:dblclick="editing=true">{{todo.text}}</p>

            <span class="del" v-on:click="delTodo(todo)" v-show="showDel"></span>
        </div>

        <div class="edit">
            <input type="text" value="{{todo.text}}" v-on:keyup.enter="cancelEdit($event)" v-on:blur="cancelEdit($event)">
        </div>
    </div>
</template>

<script>
    var todoData = require('../../services/todo');
    var util = require('../../util');

    module.exports = {
        props: ['todo'],

        data: function () {
            return {
                editing: false,
                showDel: false
            };
        },

        watch: {
            'todo.done': function (v) {
                var oldTodo = this.todo;
                var me = this;

                todoData
                    .updateTodo(oldTodo._id, {
                        done: v,
                        text: oldTodo.text
                    })
                    .then(function (res) {
                        me.todo = res.data;
                    });
            }
        },

        methods: {
            cancelEdit: function (e) {
                var text = util.trim(e.target.value);
                var oldTodo = this.todo;
                var me = this;

                if (!text) {
                    this.delTodo(oldTodo)
                        .then(function () {
                            me.todo = null;
                        });

                    return;
                }

                if (text !== oldTodo.text) {
                    todoData
                        .updateTodo(oldTodo._id, {
                            done: oldTodo.done,
                            text: text
                        })
                        .then(function (res) {
                            me.todo = res.data;

                            me.editing = false;
                        })
                        .catch(function (err) {
                            console.log('update todo: ', err);
                        });
                }
            },

            delTodo: function (todo) {
                var me = this;

                return todoData
                    .deleteTodo(todo._id)
                    .then(function (res) {
                        me.$dispatch('delTodo', res.data);
                    })
                    .catch(function (err) {
                        console.log('delete todo: ', err);
                    });
            }
        }
    }
</script>

<style src="./index.less" lang="less"></style>
