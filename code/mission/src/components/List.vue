<template>
	<div id="list">
		
		<div v-show="$route.path!='/list/create'">
			<router-link to="/list/create"><el-button type="primary">创建</el-button></router-link>
			
			<hr>
			<p v-show="this.list.length==0">暂无计划</p>
			<div class="mission">
				<ul>
					<transition-group leave-active-class="animated zoomOutRight">
						<li v-for="(plan,index) in list" :key="index">
							<el-row>
								<el-col :span="4">
									<div class="person">
										<img :src="plan.pic">
										<p>{{plan.name}}</p>
									</div>
								</el-col>
								<el-col :span="20">
									<div class="content">
										<el-row>
											<el-col :span="6">
												<div class="left">
													<div class="time">
														<h2><i class="el-icon-time"></i> {{plan.hour}}小时</h2>
														<h4><i class="el-icon-date"></i> {{plan.date}}</h4>
													</div>
													
												</div>
											</el-col>
											<el-col :span="18">
												<div class="right">
													<div class="close">
														<el-button type="danger" @click="del(index)"><i class="el-icon-close"></i></el-button>
													</div>
													<p>{{plan.text}}</p>
												</div>
											</el-col>
										</el-row>
									</div>
								</el-col>
							</el-row>
						</li>
					</transition-group>
				</ul>
				
			</div>
		</div>
		
		<router-view></router-view>
	</div>
	
</template>
<script>
	import {mapGetters} from 'vuex'
	export default {
		computed:mapGetters([
			'list'
		]),
		methods:{
			del(index){
				this.$store.dispatch('decTotalTime',this.list[0].hour);
				this.$store.dispatch('del',index);
				
			}
		}
	}
</script>
<style scoped="scoped">
	ul {
		margin: 0;
		padding: 0;
		list-style: none;
	}
	#list {
		padding: 20px;
	}
	#list a {
		text-decoration: none;
		color: #ffffff;
	}
	#list .mission ul li {
		border: 1px solid #ddd;
		border-radius: 4px;
		margin-bottom: 10px;
	}
	#list .mission .person {
		text-align: center;
		border-right: 1px solid #ddd;
		background-color: #eee;
		padding: 10px 0;
	}
	#list .mission .person img {
		max-width: 80%;
		border-radius: 50%;
	}
	#list .mission .person p {
		margin: 0;
	}
	#list .content .left {
		display: flex;
		text-align: center;
		flex-direction: column;
		justify-content: center;
		min-height: 160px;
	}
	#list .content .left h2 {
		margin: 0;
	}
	#list .content .left h4 {
		margin: 0;
		padding: 5px;
		background-color: #409EFF;
		width: 65%;
		color: #fff;
		border-radius: 4px;
		margin-left: auto;
		margin-right: auto;
	}
	#list .content .right .close {
		padding: 10px;
		text-align: right;
	}
	
	#list .content .right .close button {
		padding: 5px;
	}
	#list .content .right p {
		margin: 0;
		padding: 0 25px 0 5px;
		font-size: 14px;
	}
</style>