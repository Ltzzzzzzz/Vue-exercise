<template>
  <div id="app">
    
    <myNav></myNav>
		<el-row>
			<el-col :span="6">
				<sidebar></sidebar>
			</el-col>
			<el-col :span="18">
				<router-view></router-view>
			</el-col>
		</el-row>
    
  </div>
</template>

<script>
import Nav from './components/Nav.vue'
import Sidebar from './components/Sidebar.vue'

export default {
  name: 'app',
	components:{
		sidebar:Sidebar,
		'myNav':Nav
	}
}
</script>

<style>
	html,body {
		margin: 0;
		padding: 0;
		overflow-x: hidden;
	}
</style>
