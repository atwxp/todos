var Vue = require('vue');
var App = require('./app.vue');
var VueRouter = require('vue-router');
var VueResource = require('vue-resource');

// install router
Vue.use(VueRouter);
Vue.use(VueResource);

// config router
var router = new VueRouter();

router.start(App, '#app');
