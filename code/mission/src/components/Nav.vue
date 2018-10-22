<template>
	<div id="nav">
		<div class="logo"><i class="el-icon-time"></i> 计划表</div>
		<el-menu 
			:default-active="$route.path" 
			class="el-menu-demo" 
			mode="horizontal" 
			@select="handleSelect"
			background-color="#545c64"
			text-color="#ffffff"
			active-text-color="#ffd04b"
			router
		>
			
			<el-menu-item index="/home">首页</el-menu-item>
			<el-menu-item index="/list">计划列表</el-menu-item>
		</el-menu>
		
	</div>
</template>
<script>
	export default {
		data() {
			return {
				
			};
		},
		methods: {
			handleSelect(key, keyPath) {}
		}
	}
</script>
<style scoped="scoped">
	#nav .logo {
		float: left;
		height: 60px;
		line-height: 60px;
		color: #fff;
		padding: 0 20px;
		user-select: none;
		z-index: 1;
		position: relative;
	}
</style>