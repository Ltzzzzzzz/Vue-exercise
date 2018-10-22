import Vue from 'vue'
import './element.config.js'
import VueRouter from 'vue-router'
import store from './store/index.js'
import 'animate.css'


import App from './App.vue'
import routeConfig from './route.config.js'

Vue.use(VueRouter);

const router = new VueRouter(routeConfig);

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
