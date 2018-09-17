<template>
	<div id="create">
		<h2>创建</h2>
		<hr>
		<el-row>
			<el-col :span="12">
				<p class="title">日期</p>
				<el-date-picker
					v-model="date"
					type="date"
					placeholder="选择日期"
					:picker-options="disable"
					value-format="yyyy-MM-dd"
				>
				</el-date-picker>
			</el-col>
			<el-col :span="12">
				<p class="title">时间</p>
				<el-input-number 
					v-model="hour" 
					controls-position="right" 
					@change="handleChange" 
					:min="1" 
					:max="24"
				>
				</el-input-number>
			</el-col>
		</el-row>
		<div class="content">
			<p class="title">内容</p>
			<el-input
			type="textarea"
			:rows="2"
			placeholder="请输入内容"
			v-model="text"
			>
			</el-input>
		</div>
		<div class="btns">
			<el-button type="primary" @click="submit">保存</el-button>
			<router-link to="/list"><el-button type="danger">取消</el-button></router-link>
		</div>
		
	</div>
</template>
<script>
	export default {
		data(){
			return {
				date:'',
				hour:'',
				text:'',
				disable:{
					disabledDate(time){
						return time.getTime() < Date.now() - 8.64e7;//8.64e7等于24小时
					}
				}
			}
		},
		methods:{
			handleChange(){},
			submit(){
				if(this.date=='' || this.text==''){
					alert('请输入日期和内容');
					return
				};
				const plan = {
					date:this.date,
					hour:this.hour,
					text:this.text
				};
				this.$store.dispatch('savePlan',plan);
				this.$store.dispatch('addTotalTime',this.hour);
				this.$router.push('/list');
			},
			
		}
	}
</script>
<style scoped="scoped">
	#create hr {
		border: 0;
		border-top: 1px solid #eee;
	}
	#create .title {
		margin-bottom: 5px;
	}
	#create .el-input-number,#create .el-date-editor {
		width: 90%;
	}
	#create .content {
		margin-top: 10px;
	}
	#create .content textarea {
		width: 95%;
	}
	#create .btns {
		margin-top: 10px;
	}
</style>