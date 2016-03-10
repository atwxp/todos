<template>
    <div class="todo-item" v-bind:class="editing ? 'editing' : ''" v-on:mouseenter="showDel=true" v-on:mouseleave="showDel=false">
        <div class="view" v-bind:class="todo.done ? 'done' : ''">

            <input type="checkbox" v-model="todo.done">

            <p class="todo-text" v-on:dblclick="editing=true">{{todo.text}}</p>

            <span class="del" v-on:click="delTodo" v-show="showDel"></span>
        </div>

        <div class="edit">
            <input type="text" value="{{todo.text}}" v-on:keyup.enter="cancelEdit($event)" v-on:blur="cancelEdit($event)">
        </div>
    </div>
</template>

<script>
    var util = require('../util');

    module.exports = {
        props: ['todo'],

        data: function () {
            return {
                editing: false,
                showDel: false
            };
        },

        watch: {
            'todo.done': function () {
                this.$dispatch('update-done', this.todo);
            }
        },

        methods: {
            cancelEdit: function (e) {
                var text = util.trim(e.target.value);

                if (!text) {
                    this.$dispatch('del-todo', this.todo);
                }

                if (text !== this.todo.text) {
                    this.todo.text = text;
                    this.$dispatch('modify-todo', this.todo);
                }

                this.editing = false;
            },

            delTodo: function () {
                this.$dispatch('del-todo', this.todo);
            }
        }
    }
</script>

<style lang="less">
    .todo-item {
        position: relative;
        padding: 18px 0;
        font-size: 24px;
        border-bottom: 1px solid #ccc;
        .view {
            input[type=checkbox] {
                float: left;
                -webkit-appearance: none;
                width: 22px;
                height: 22px;
                border-radius: 50%;
                border: 1px solid #ccc;
                margin: 7px 10px 0 0;
                &::before {
                    display: none;
                    content: '';
                    width: 10px;
                    height: 5px;
                    border: 2px solid #f9a4ad;
                    border-top-color: transparent;
                    border-right-color: transparent;
                    transform: rotate(-45deg) translate(0px, 4px);
                }
            }

            .del {
                position: absolute;
                right: 10px;
                top: 27px;
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background-color: #ccc;
                &:before,
                &:after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    bottom: 0;
                    right: 0;
                    width: 2px;
                    height: 10px;
                    margin: auto;
                    box-sizing: border-box;
                    background-color: #fff;
                }
                &:before {
                    transform: rotate(-45deg);
                }
                &:after {
                    transform: rotate(45deg);
                }
                &:hover {
                    background-color: #000;
                }
            }

            &.done {
                .todo-text {
                    text-decoration: line-through;
                    color: #ccc;
                }

                input[type=checkbox] {
                    &::before {
                        display: block;
                    }
                }
            }
        }

        .edit {
            display: none;

            input[type=text] {

            }
        }

        &.editing {
            .view {
                display: none;
            }
            .edit {
                display: block;
            }
        }
    }
</style>
