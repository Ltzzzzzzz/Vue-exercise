import Home from './components/Home.vue'
import List from './components/List.vue'
import Create from './components/Create.vue'

export default {
	routes:[
		{path:'/home',component:Home},
		{
			path:'/list',
			component:List,
			children:[
				{
					path:'/list/create',
					component:Create
				}
			]
		},
		{path:'/',redirect:'/home'}
	]
}
