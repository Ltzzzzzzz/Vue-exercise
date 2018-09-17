<template>
	<div id="main">
		<div class="box">
			<h1>任务追踪</h1>
			<router-link to="/list/create">创建一个新的计划</router-link>
		</div>
	</div>
</template>
<style scoped="scoped">
	#main {
		padding: 20px;
	}
	#main .box {
		background-color: #eeeeee;
		border-radius: 10px;
		padding: 50px;
	}
	
	#main .box h1 {
		margin: 0;
	}
	#main .box a {
		display: block;
		margin-top: 20px;
		text-decoration: none;
	}
	#main .box a:hover {
		text-decoration: underline;
	}
</style>