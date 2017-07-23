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

    <u-swiper :options="options" ref="mswiper">
        <u-swiper-slide v-for="(banner, index) in bannerList" :key="index">
            <img :src="banner"></img>
        </u-swiper-slide>
        <div class="mypagination" slot="pagination"></div>
    </u-swiper>
</div>
</template>

<script>
import todoItem from './todo-item'

import uInput from '../ui/input'
import uRadio from '../ui/radio'
import uButton from '../ui/button'
import uCheckbox from '../ui/checkbox'
import { uSwiper, uSwiperSlide } from '../ui/swiper'

import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'todo',

    data() {
        return {
            name: '',
            todoText: '',
            filterType: 'all',

        bannerList: [
                'https://gsp0.baidu.com/6bNXsjip0QIZ8Aqbn9fN2DC/timg?size=b640_2000000&quality=85&name=cmoive&di=3d4a99624de8ed1db71dbac5d5b74c88&sec=0&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fbainuo_cmovie%2Fpic%2Fitem%2F7acb0a46f21fbe09b5bcab9061600c338644ad50.jpeg',
                'https://gsp0.baidu.com/6bNXsjip0QIZ8Aqbn9fN2DC/timg?size=b640_2000000&quality=85&name=cmoive&di=2a1aa931a582771329bd6b397509a27c&sec=0&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fbainuo_cmovie%2Fpic%2Fitem%2F562c11dfa9ec8a139f354677fd03918fa0ecc07e.jpeg',
                // 'https://gsp0.baidu.com/6bNXsjip0QIZ8Aqbn9fN2DC/timg?size=b640_2000000&quality=85&name=cmoive&di=d5c3c0d3cd4448a6130bfd7c0b1f8500&sec=0&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fbainuo_cmovie%2Fpic%2Fitem%2F738b4710b912c8fca1ad9e49f6039245d78821d3.jpeg',
                // 'https://gsp0.baidu.com/6bNXsjip0QIZ8Aqbn9fN2DC/timg?size=b640_2000000&quality=85&name=cmoive&di=dad0bdcd9ec2b66d405e9417da3de473&sec=0&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fbainuo_cmovie%2Fpic%2Fitem%2Fd0c8a786c9177f3e0d5e818e7acf3bc79e3d56ce.jpeg'
            ],
            options: {
                pagination: '.mypagination',
                loop: true
            }
        }
    },

    mounted() {
        // setTimeout(() => {
            // this.bannerList.splice(1, 0, 'https://gsp0.baidu.com/6bNXsjip0QIZ8Aqbn9fN2DC/timg?size=b640_2000000&quality=85&name=cmoive&di=dad0bdcd9ec2b66d405e9417da3de473&sec=0&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fbainuo_cmovie%2Fpic%2Fitem%2Fd0c8a786c9177f3e0d5e818e7acf3bc79e3d56ce.jpeg')
            // this.bannerList.splice(1, 0, 'https://gsp0.baidu.com/6bNXsjip0QIZ8Aqbn9fN2DC/timg?size=b640_2000000&quality=85&name=cmoive&di=dad0bdcd9ec2b66d405e9417da3de473&sec=0&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fbainuo_cmovie%2Fpic%2Fitem%2Fd0c8a786c9177f3e0d5e818e7acf3bc79e3d56ce.jpeg')
            // this.bannerList.splice(1, 0, 'https://gsp0.baidu.com/6bNXsjip0QIZ8Aqbn9fN2DC/timg?size=b640_2000000&quality=85&name=cmoive&di=dad0bdcd9ec2b66d405e9417da3de473&sec=0&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fbainuo_cmovie%2Fpic%2Fitem%2Fd0c8a786c9177f3e0d5e818e7acf3bc79e3d56ce.jpeg')
            // this.bannerList.splice(1, 1);
        // }, 4000)
    },

    computed: {
        iswiper() {
            return this.$refs.mswiper.iswiper
        },

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
        uRadio,
        uSwiper,
        uSwiperSlide
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
.u-swiper {
    position: relative;
    overflow: hidden;
}
.u-swiper-list {
}
.u-swiper-slide {
    position: relative;
    & + & {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
    }
    img {
        display: block;
        width: 100%;
    }
}
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
