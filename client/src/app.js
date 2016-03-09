var Vue = require('vue');
var App = require('./app.vue');
var VueRouter = require('vue-router');

// install router
Vue.use(VueRouter);

// config router
var router = new VueRouter();

router.start(App, '#app');
