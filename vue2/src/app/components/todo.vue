<template>
<div class="todos">
    <p class="sub-title">Hello {{ name }}，你的待办事项是：</p>

    <u-input type="text" size="large"
        v-model="todoText"
        :autofocus="true"
        placeholder="Enter Todo"
        v-on:enter="handleAddTodo">
    </u-input>

    <section class="toolbar">
        <u-radio v-model="filterType" true-value="all" name="filter">所有</u-radio>
        <u-radio v-model="filterType" true-value="active" name="filter">未完成</u-radio>
        <u-radio v-model="filterType" true-value="done" name="filter">已完成</u-radio>

        <u-checkbox v-model="isAllDone" :indeterminate="existDone && !isAllDone" @change="handleSelectAll">全选</u-checkbox>
        <u-button v-show="existDone" size="small" type="danger" v-on:clickHandler="handleClearDone">删除</u-button>
    </section>


    <div class="todo-list">
        <p class="todo-empty" v-if="!todos || !todos.length">暂无相关内容</p>

        <ul v-else>
            <todo-item v-for="(todo, index) in todos" :key="index" :todo="todo"></todo-item>
        </ul>
    </div>
</div>
</template>

<script>
import todoItem from './todo-item'

import uInput from '../ui/input'
import uButton from '../ui/button'
import uCheckbox from '../ui/checkbox'
import uRadio from '../ui/radio'

import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'todo',

    data () {
        return {
            name: '',

            todoText: '',

            filterType: 'all'
        }
    },

    computed: {
        ...mapGetters([
            'isAllDone',
            'existDone'
        ]),

        todos() {
            const filters = {
                all: todos => todos,

                active: todos => todos.filter(todo => !todo.done),

                done: todos => todos.filter(todo => todo.done)
            }

            return filters[this.filterType](this.$store.state.todo.todos)
        }
    },

    components: {
        todoItem,
        uInput,
        uButton,
        uCheckbox,
        uRadio
    },

    methods: {
        ...mapActions([
            'fetchTodo',
            'addTodo'
        ]),

        handleAddTodo() {
            this.addTodo(this.todoText)
                .then(() => {
                    this.todoText = ''
                })
                .catch(error => {
                    console.error(error)
                })
        },

        // todo: 批量删除
        handleClearDone() {

        },

        // todo：批量更新
        handleSelectAll() {

        }
    },

    created() {
        this.fetchTodo()
        this.name = this.$store.state.user.token.account
    }
}
</script>

<style lang="less">
.todos {
    font-size: 16px;

    > * {
        margin-top: 10px;
    }

    .toolbar {
        display: flex;
        align-items: center;
        margin-right: 10px;

        .u-radio {
            margin-right: 5px;
        }

        .u-checkbox {
            margin-left: auto;
            margin-right: 10px;
        }
    }
    .todo-list {
        border-top: 1px solid #ccc;
    }
    .todo-empty {
        padding: 20px 0;
        text-align: center;
    }
}
</style>
