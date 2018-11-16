<template>
	<div id="experience" class="bg">
		<arrowUp></arrowUp>
		<h1 class="title">我的经历</h1>
		<div class="experience-wrapper">
			<div class="content" ref="content"  v-for="(exp,index) in experience" :key="index" @click="showInfo(index)">
				<span class="exp">EXP{{index+1}}</span>
				<div class="info">
					<h4 class="name">{{exp.name}}</h4>
					<p class="time">{{exp.time}}</p>
					<p class="position">&lt;{{exp.position}}&gt;</p>
					<ul class="duty">
						<li v-for="(duty,index) in exp.duty" :key="index">
							<span class="dot"></span>{{duty}}
						</li>
					</ul>
				</div>
			</div>
		</div>
		<arrowDown></arrowDown>
	</div>
</template>

<script>
	import arrowDown from './arrowDown.vue';
	import arrowUp from './arrowUp.vue';
	export default {
		props: {
			experience: {
				type: Array,
				default(){
					return []
				}
			},
		},
		data(){
			return {
				
			}
		},
		methods: {
			showInfo(i) {
				let content = this.$refs.content[i];
				let contents = this.$refs.content;
				contents.forEach((item)=>{
					item.classList.remove('active');
				});
				content.classList.add('active');
			}
		},
		watch: {
			experience() {
				this.$nextTick(()=>{
					this.showInfo(1);
				})
			}
		},
		components:{
			arrowUp,
			arrowDown
		},
	}
</script>

<style lang="scss" scoped="scoped">
	#experience {
		position: relative;
		background-color: #945c4c;
		.title {
			position: absolute;
			top: 100px;
			width: 100%;
			text-align: center;
			font-size: 24px;
			color: #fff;
			-ms-user-select: none;
			-moz-user-select: none;
			-webkit-user-select: none;
			@media (max-width:500px){
				top: 60px;
				font-size: 18px;
			}
		}
		.experience-wrapper {
			position: absolute;
			top: 300px;
			width: 100%;
			text-align: center;
			opacity: 0;
			transform: translateX(-20px);
			transition: .5s ease-in;
			transition-delay: .4s;
			@media (max-width:500px){
				top: 160px;
			}
			.content {
				position: relative;
				display: inline-block;
				vertical-align: top;
				padding-left: 50px;
				color: #fff;
				background: rgba(51,51,51,.5);
				border-radius: 10px;
				margin-right: 3px;
				height: 300px;
				width: 0;
				overflow: hidden;
				box-shadow: inset 0 0 70px rgba(0,0,0,.5),10px 10px 10px rgba(0,0,0, 0.5); 
				transition: all .3s ease-in-out;
				-ms-user-select: none;
				-moz-user-select: none;
				-webkit-user-select: none;

				&.active {
					width: 550px;
					animation: change 5s ease-in-out infinite;
					@media(max-width:500px){
						width: 50%
					}
					.info {
						opacity: 1;
					}
				}
				@media(max-width:500px){
					padding-left: 40px;
				}
				.exp {
					padding: 50px 0;
					line-height: 50px;
					display: block;
					position: absolute;
					top: 0;
					left: 0;
					width: 50px;
					font-size: 30px;
					letter-spacing: 20px;
					word-break: break-all;
					text-align: right;
					cursor: pointer;
					@media(max-width:500px){
						width: 40px;
						font-size: 16px;
						letter-spacing: 15px;
					}
				}
				.info {
					margin-top: 20px;
					padding: 0 50px 50px 0;
					text-align: left;
					opacity: 0;
					transition: all .3s;
					@media(max-width:500px){
						padding: 0 5px 50px;
					}
					.name {
						margin-bottom: 10px;
						font-size: 30px;
						@media(max-width:500px){
							margin-bottom: 5px;
							font-size: 16px;
						}
					}
					.time {
						margin-bottom: 10px;
						font-size: 14px;
						color: #8ca870;
						@media(max-width:500px){
							margin-bottom: 5px;
							font-size: 12px;
						}
					}
					.position {
						margin-bottom: 10px;
						font-size: 14px;
						color: #e6de8d;
						@media(max-width:500px){
							margin-bottom: 5px;
							font-size: 12px;
						}
					}
					.duty {
						li {
							line-height: 1.5;
							font-size: 16px;
							@media(max-width:500px){
								font-size: 12px;
							}
							.dot {
								display: inline-block;
								vertical-align: middle;
								margin-right: 10px;
								width: 2px;
								height: 2px;
								border: 1px solid #ffd200;
								border-radius: 50%;
							}
						}
					}
				}
			}
		}
	}
	@keyframes change{
		0% {
			background: rgba(51,51,51,.5);
		}
		50% {
			background: rgba(51,51,51,1);
		}
		100% {
			background: rgba(51,51,51,.5);
		}	
	}
</style>

