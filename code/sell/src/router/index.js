import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home.vue'
import Goods from '../components/goods/Goods.vue'
import Ratings from '../components/ratings/Ratings.vue'
import Seller from '../components/seller/Seller.vue'

Vue.use(Router)

export default new Router({
  routes: [
	  {
			path:'/',
			redirect:'/goods',
			component:Home,
			children:[
				{path:'/goods',component:Goods},
				{path:'/ratings',component:Ratings},
				{path:'/seller',component:Seller},
			]
	  }
    
  ]
})
