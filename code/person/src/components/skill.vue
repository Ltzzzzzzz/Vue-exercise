<template>
	<div id="skill" class="bg">
		<arrowUp></arrowUp>
		<h1 class="title">技能掌握</h1>
		<div class="content">
			<div class="skill-wrapper">
				<div class="left">
					<div class="skill-circle">
						<ul class="outer">
							<li class="outer-item" v-for="(item, index) in skill" 
								:key="index" 
								v-if="index<5" 
								@click="select(index)"
							>
								<span>{{item.name}}</span>
							</li>
						</ul>
						<ul class="inner">
							<li class="inner-item" 
								v-for="(item, index) in skill" 
								:key="index" 
								v-if="index>4"
								@click="select(index)"
							>
								<span>{{item.name}}</span>
							</li>
						</ul>
					</div>
				</div>
				<div class="right">
					<ul class="skill-rect">
						<li class="skill-item" ref="skillItem" v-for="(item, index) in skill" :key="index">
							<div class="rect" :style="{width:item.degree}">
								<span>{{item.name}}</span>
							</div>
							<div class="degree">{{item.degree}}</div>
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
			skill: {
				type: Array,
				default () {
					return []
				}
			},
		},
		data(){
			return {
				show: false
			}
		},
		methods:{
			select(i){
				this.$nextTick(()=>{
					let skillItem = this.$refs.skillItem[i];
					let skillItems = this.$refs.skillItem;
					skillItems.forEach(item => {
						item.classList.remove('active');
					});
					skillItem.classList.add('active');
				})
			}
		},
		components: {
			arrowUp,
			arrowDown
		},
	}
</script>

<style lang="scss" scoped="scoped">
	#skill {
		position: relative;
		background-color: #4d5e8f;

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
			@media (max-width: 500px) {
				top: 60px;
				font-size: 18px;
			}
		}

		.content {
			position: absolute;
			top: 300px;
			right: 0;
			bottom: 0;
			left: 0;

			@media (max-width: 500px) {
				top: 100px;
			}

			.skill-wrapper {
				margin: 0 auto;
				display: flex;
				flex-wrap: wrap;
				max-width: 800px;
				.left {
					flex: 1;

					.skill-circle {
						position: relative;
						transition: all .3s;
						@media (max-width: 500px) {
							transform: scale(.8);
						}
						.outer {
							position: relative;
							margin: 0 auto;
							width: 240px;
							height: 240px;
							border: 4px dashed #999;
							border-radius: 50%;
							transform: scale(0);
							transition: all .3s;
							transition-delay: .4s;
							.outer-item {
								position: absolute;
								line-height: 64px;
								width: 64px;
								height: 64px;
								background: rgba(71, 83, 94, 0.8);
								color: #fff;
								border-radius: 50%;
								font-size: 12px;
								text-align: center;
								transform-origin: 120px 120px;
								animation: spin 10s linear infinite;
								-webkit-user-select: none;
								-ms-user-select: none;
								-moz-user-select: none;
								opacity: 0;
								transition: all .3s linear;
								transition-delay: .8s;
								cursor: pointer;
								span {
									display: block;
									animation: alternateSpin 10s linear infinite;
								}

								&:nth-child(2) {
									animation: spin 10s linear -2s infinite;
									background: rgba(193, 131, 106, 0.8);
									transition-delay: 1s;
									span {
										animation: alternateSpin 10s linear -2s infinite;
									}
								}

								&:nth-child(3) {
									animation: spin 10s linear -4s infinite;
									background: rgba(147, 147, 189, 0.8);
									transition-delay: 1.2s;
									span {
										animation: alternateSpin 10s linear -4s infinite;
									}
								}

								&:nth-child(4) {
									animation: spin 10s linear -6s infinite;
									background: rgba(76, 157, 160, 0.8);
									transition-delay: 1.4s;
									span {
										animation: alternateSpin 10s linear -6s infinite;
									}
								}

								&:nth-child(5) {
									animation: spin 10s linear -8s infinite;
									background: rgba(117, 148, 179, 0.8);
									transition-delay: 1.6s;
									span {
										animation: alternateSpin 10s linear -8s infinite;
									}
								}

							}
						}

						.inner {
							position: absolute;
							top: 50%;
							left: 50%;
							margin: 0 auto;
							width: 120px;
							height: 120px;
							border: 4px dashed #999;
							border-radius: 50%;
							transform: translateX(-50%) translateY(-50%) scale(0);
							transition: all .3s;
							transition-delay: .6s;
							.inner-item {
								position: absolute;
								line-height: 32px;
								width: 32px;
								height: 32px;
								background: rgba(207, 184, 178, 0.8);
								color: #fff;
								border-radius: 50%;
								font-size: 12px;
								text-align: center;
								transform-origin: 60px 60px;
								animation: innSpin 8s linear infinite;
								-webkit-user-select: none;
								-ms-user-select: none;
								-moz-user-select: none;
								opacity: 0;
								transition:all .3s;
								transition-delay: 1.8s;
								cursor: pointer;
								span {
									display: block;
									animation: alternateInnSpin 8s linear infinite;
								}

								&:nth-child(2) {
									animation: innSpin 8s linear -2s infinite;
									background: rgba(179, 164, 140, 0.8);
									transition-delay: 2s;
									span {
										animation: alternateInnSpin 8s linear -2s infinite;
									}
								}

								&:nth-child(3) {
									animation: innSpin 8s linear -4s infinite;
									background: rgba(238, 215, 163, 0.8);
									transition-delay: 2.2s;
									span {
										animation: alternateInnSpin 8s linear -4s infinite;
									}
								}

								&:nth-child(4) {
									animation: innSpin 8s linear -6s infinite;
									background: rgba(171, 209, 220, 0.8);
									transition-delay: 2.4s;
									span {
										animation: alternateInnSpin 8s linear -6s infinite;
									}
								}
							}
						}
					}
				}

				.right {
					flex: 1;
					.skill-rect {
						position: relative;
						padding: 10px 0;
						margin: 0 auto;
						width: 300px;
						border-left: 4px solid #999;
						opacity: 0;
						transition: opacity .3s;
						transition-delay: .4s;
						@media (max-width: 500px) {
							transform: translateY(-15px) scale(.8);
						}
						.skill-item {
							width: 100%;
							-ms-user-select: none;
							-moz-user-select: none;
							-webkit-user-select: none;
							opacity: 0;
							transition: opacity .3s;
							transition-delay: .8s;
							&:nth-child(2) {
								transition-delay: 1s;
							}
							&:nth-child(3) {
								transition-delay: 1.2s;
							}
							&:nth-child(4) {
								transition-delay: 1.4s;
							}
							&:nth-child(5) {
								transition-delay: 1.6s;
							}
							&:nth-child(6) {
								transition-delay: 1.8s;
							}
							&:nth-child(7) {
								transition-delay: 2s;
							}
							&:nth-child(8) {
								transition-delay: 2.2s;
							}
							&:nth-child(9) {
								transition-delay: 2.4s;
							}
							.rect, .degree {
								display: inline-block;
								font-size: 14px;
								color: #fff;
								
								@media (max-width: 500px) {
									font-size: 12px;
								}
							}
							.rect {
								position: relative;
								line-height: 20px;
								height: 20px;
								margin-bottom: 10px;
								background: rgb(71, 83, 94);
								text-align: center;
								color: #fff;
								border-top-right-radius: 4px;
								border-bottom-right-radius: 4px;
								box-shadow: 0 0 10px #999;
								transition: all .3s ease-in-out;
								@media (max-width: 500px) {
									line-height: 16px;
									height: 16px;
									margin-bottom: 8px;
								}
								span {
									opacity: 0;
									transition: all .3s ease-in-out;
								}
							}
							&:nth-child(2) {
								.rect {
									background: rgb(193, 131, 106);
								}
							}
							&:nth-child(3) {
								.rect {
									background: rgb(147, 147, 189);
								}
							}
							&:nth-child(4) {
								.rect {
									background: rgb(76, 157, 160);
								}
							}
							&:nth-child(5) {
								.rect {
									background: rgb(117, 148, 179);
								}
							}
							&:nth-child(6) {
								.rect {
									background: rgb(207, 184, 178);
								}
							}
							&:nth-child(7) {
								.rect {
									background: rgb(179, 164, 140);
								}
							}
							&:nth-child(8) {
								.rect {
									background: rgb(238, 215, 163);
								}
							}
							&:nth-child(9) {
								.rect {
									background: rgb(171, 209, 220);
								}
							}
							&:nth-last-child(1) {
								.rect {
									margin-bottom: 0;
								}
							}
							&:hover, &.active {
								.rect{
									transform: scaleY(1.5);
									span {
										display: block;
										opacity: 1;
										transform: scaleY(.75);
									}
								}
							}
						}
					}
				}
			}
		}
	}

	@keyframes spin {
		to {
			transform: rotate(1turn);
		}
	}

	@keyframes alternateSpin {
		from {
			transform: rotate(360deg);
		}

		to {
			transform: rotate(0deg);
		}
	}
		@keyframes innSpin {
		to {
			transform: rotate(-1turn);
		}
	}

	@keyframes alternateInnSpin {
		from {
			transform: rotate(0deg);
		}

		to {
			transform: rotate(360deg);
		}
	}
</style>
