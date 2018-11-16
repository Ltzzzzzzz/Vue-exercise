import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import './assets/css/reset.scss'
import './assets/css/icon.scss'
import 'font-awesome/css/font-awesome.css'
Vue.use(VueAwesomeSwiper)
Vue.prototype.$axios = axios

new Vue({
  el: '#app',
  render: h => h(App)
})
