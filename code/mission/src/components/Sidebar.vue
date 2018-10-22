<template>
	<div id="sidebar">
		<div class="box">
			<h3>已有时长</h3>
			<p>{{totalTime}} 小时</p>
		</div>
	</div>
</template>
<script>
	import {mapGetters} from 'vuex'
	export default {
		computed:mapGetters([
			'totalTime'
		]),
	}
</script>
<style scoped="scoped">
	#sidebar {
		padding: 20px;
	}
	#sidebar .box {
		border: 1px solid #eee;
		text-align: center;
		box-shadow: 0 0 2px #ccc;
		border-radius: 4px;
	}
	#sidebar .box h3 {
		border-bottom: 1px solid #eee;
		background-color: rgba(0,0,0,.1);
		padding: 11px 0;
		margin: 0;
	}
	#sidebar .box p {
		margin: 0;
		padding: 11px 0;
	}
</style>