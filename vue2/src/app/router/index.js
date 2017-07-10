import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../components/login'
import Todo from '../components/todo'

Vue.use(VueRouter)

export default new VueRouter({
    mode: 'history',

    routes: [
        {
            path: '/',
            component: Login
        },

        {
            path: '/todos',
            component: Todo
        },
        
        {
            path: '*',
            redirect: '/'
        }
    ]
})
