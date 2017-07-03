import Vue from 'vue'
import Axios from 'axios'

import store from './store'
import router from './router'

import App from './components/app'

router.beforeEach((to, from, next) => {
    const token = store.state.user.token

    if (to.path === '/') {
        if (token) {
            next('/todos')
        }
        else {
            next()
        }
    }

    else {
        if (token) {
            Axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
            next()
        }
        else {
            next('/')
        }
    }
})

new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App)
})
