/**
 * @file   app entry
 * @author wxp201013@163.com
 */

import Vue from 'Vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

import App from './index';

// install router
Vue.use(VueRouter);
// config router
const router = new VueRouter();

// install resource
Vue.use(VueResource);

router.start(App, '#app');
