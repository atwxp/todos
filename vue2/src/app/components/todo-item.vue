<template>
<li :class="['todo-item', { 'editing': editing }]">
    <div class="view" :class="{'done': todo.done}" v-show="!editing">
        <u-checkbox v-model="todo.done" @change="updateTodo(todo)"></u-checkbox>

        <span class="text">{{ todo.text }}</span>

        <span class="action">
            <u-button size="small" v-on:clickHandler="editing=true">Edit</u-button>
            <u-button size="small" type="danger" v-on:clickHandler="deleteTodo(todo)">Del</u-button>
        </span>
    </div>

    <div class="edit" v-show="editing">
        <u-input
            type="text"
            :autofocus="editing"
            v-on:blur="updateTodoText"
            v-on:enter="updateTodoText"
            :value="todo.text">
        </u-input>
    </div>
</li>
</template>

<script>
import uCheckbox from '../ui/checkbox'
import uButton from '../ui/button'
import uInput from '../ui/input'

import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'todo-item',

    props: ['todo'],

    data () {
        return {
            editing: false
        }
    },

    components: {
        uCheckbox,
        uButton,
        uInput
    },

    methods: {
        ...mapActions([
            'deleteTodo',
            'updateTodo'
        ]),

        async updateTodoText(e) {
            const value = e.target.value

            if (!value) {
                await this.deleteTodo(this.todo)
            }

            else if (value !== this.todo.text) {
                await this.updateTodo(Object.assign(this.todo, { text: value }))
            }

            this.editing = false
        }
    }
}
</script>

<style lang="less">
.todo-item {
    padding: 10px 0;
    border-bottom: 1px solid #ccc;

    &:last-child {
        border-bottom: none;
    }

    &:hover {
        background: rgba(241, 241, 241, 0.53);
        .view {
            .action {
                visibility: visible;
            }
        }
    }

    .view {
        display: flex;
        align-items: center;

        .action {
            visibility: hidden;
            margin-left: auto;
        }

        .u-button {
            margin-right: 10px;
        }

        .text {
            margin-left: 10px;
        }

        &.done {
            .text {
                text-decoration: line-through;
                color: #ccc;
            }
        }
    }

    .edit {
        display: none;
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
