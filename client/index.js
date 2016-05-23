var Vue = require('vue');
var VueRouter = require('vue-router');
var VueResource = require('vue-resource');

var App = require('./index.vue');

// install router
Vue.use(VueRouter);
// config router
var router = new VueRouter();

// install resource
Vue.use(VueResource);

router.start(App, '#app');
