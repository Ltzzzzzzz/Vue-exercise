<template>
	<div id="home">
		<v-header :seller='seller'></v-header>
		<v-tab></v-tab>
		<keep-alive>
			<router-view :seller='seller'></router-view>
		</keep-alive>
	</div>
</template>
<script>
	import Headers from './headers/Headers.vue'
	import Tab from './tab/Tab.vue'
	import {getID} from '../assets/js/getID.js';
	export default {
		data(){
			return {
				seller:{
					id:(()=>{
						let queryParam = getID();
						return queryParam.id;
					})()
				},
			}
		},
		components:{
			'v-header': Headers,
			'v-tab': Tab
		},
		created(){
			this.$axios.get('/api/seller?id='+this.seller.id).then(
				res=>{
					this.seller = Object.assign({},this.seller,res.data.data);
				}
			);
		}
	}
</script>