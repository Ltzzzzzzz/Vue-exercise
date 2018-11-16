<template>
	<div id="info" class="bg" ref="info">
		<arrowUp></arrowUp>
		<h1 class="title">关于我</h1>
		<div class="content">
			<div class="info-wrapper">
				<div class="info-box">
					<span class="icon icon-i_age">
						<div class="light"></div>
					</span>
					<span class="text">年龄/{{info.age}}岁</span>
				</div>
				<div class="info-box">
					<span class="icon icon-i_edu">
						<div class="light"></div>
					</span>
					<span class="text">学历/{{info.edu}}</span>
				</div>
				<div class="info-box">
					<span class="icon icon-i_site">
						<div class="light"></div>
					</span>
					<span class="text">坐标/{{info.site}}</span>
				</div>
				<div class="info-box">
					<span class="icon icon-i_status">
						<div class="light"></div>
					</span>
					<span class="text">状态/{{info.status}}</span>
				</div>
			</div>
			<div class="info">
				<dl>
					<dt></dt>
					<dt></dt>
					<dt></dt>
					<dt></dt>
				</dl>
				<p v-for="(item, index) in info.text" :key="index">{{item}}</p>
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
			info: {
				type: Object,
				default(){
					return {}
				}
			}
		},
		components:{
			arrowUp,
			arrowDown
		},
	}
</script>

<style lang="scss" scoped="scoped">
	#info {
		position: relative;
		background-color: #109085;
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
		.content {
			position: absolute;
			top: 250px;
			right: 0;
			bottom: 0;
			left: 0;
			@media (max-width:500px){
				top: 100px;
			}
			.info-wrapper {
				display: flex;
				margin: 0 auto;
				max-width: 800px;
				justify-content: space-around;
				flex-wrap: wrap;
				.info-box {
					text-align: center;
					margin: 0 24px;
					
					@media (max-width:500px){
						width: 100px;
					}
					.icon {
						position: relative;
						display: block;
						margin: 0 auto;
						width: 90px;
						height: 90px;
						line-height: 90px;
						font-size: 45px;
						border-radius: 50%;
						cursor: pointer;
						background: rgba(255,255,255,.1);
						opacity: 0;
						transform: translateY(-50px);
						transition: all .5s linear;
						.light {
							&:before {
								content: '';
								position: absolute;
								top: 0;
								left: 0;
								width: 100%;
								height: 100%;
								border-radius: 50%;
								box-shadow: inset 0 0 10px rgba(255,255,255,.4);
							}
							&:after {
								content: '';
								position: absolute;
								top: 0;
								left: 0;
								width: 100%;
								height: 100%;
								border-radius: 50%;
								box-shadow: 0 0 10px rgba(255,255,255,.4);
							}
						}
						&:hover {
							transform: scale(.9);
							background: rgba(255,255,255,.05);
							.light {
								&:before {
									animation: scale1 2s forwards;
								}
								&:after {
									animation: scale2 2s forwards;
								}
							}
						}
						@media (max-width:500px){
							line-height: 45px;
							width: 45px;
							height: 45px;
							font-size: 22px;
						}
					}
					.text {
						display: block;
						margin: 24px 0;
						font-size: 18px;
						color: #fff;
						-ms-user-select: none;
						-moz-user-select: none;
						-webkit-user-select: none;
						opacity: 0;
						transform: translateX(-100%);
						transition: all .5s linear;
						@media (max-width:500px){
							font-size: 12px;
						}
					}
					&:nth-child(2){
						.icon,.text {
							transition-delay: .2s;
						}
					}
					&:nth-child(3){
						.icon,.text {
							transition-delay: .4s;
						}
					}
					&:nth-child(4){
						.icon,.text {
							transition-delay: .6s;
						}
					}
				}
			}
			.info {
				position: relative;
				margin: 60px auto 0;
				line-height: 2;
				padding: 50px 24px;
				max-width: 800px;
				font-size: 18px;
				color: #fff;
				text-align: center;
				transform: scale(0);
				transition: all .5s;
				transition-delay: .8s;
				@media (max-width:500px){
					margin: 0 auto;
					padding: 10px 60px;
					line-height: 1.5;
					font-size: 12px;
					text-align: left;
				}
				dl {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					dt {
						@media (max-width:500px){
							display:none;
						}
						&:nth-child(1):before {
							content: '';
							display: block;
							position: absolute;
							top: 0;
							left: 0;
							width: 50px;
							height: 3px;
							background: #fff;
						}
						&:nth-child(1):after {
							content: '';
							display: block;
							position: absolute;
							top: 24px;
							left: -24px;
							width: 50px;
							height: 3px;
							background: #fff;
							transform: rotate(90deg);
						}
						&:nth-child(2):before {
							content: '';
							display: block;
							position: absolute;
							top: 0;
							right: 0;
							width: 50px;
							height: 3px;
							background: #fff;
						}
						&:nth-child(2):after {
							content: '';
							display: block;
							position: absolute;
							top: 24px;
							right: -24px;
							width: 50px;
							height: 3px;
							background: #fff;
							transform: rotate(90deg);
						}
						&:nth-child(3):before {
							content: '';
							display: block;
							position: absolute;
							bottom: 0;
							left: 0;
							width: 50px;
							height: 3px;
							background: #fff;
						}
						&:nth-child(3):after {
							content: '';
							display: block;
							position: absolute;
							bottom: 24px;
							left: -24px;
							width: 50px;
							height: 3px;
							background: #fff;
							transform: rotate(90deg);
						}
						&:nth-child(4):before {
							content: '';
							display: block;
							position: absolute;
							bottom: 0;
							right: 0;
							width: 50px;
							height: 3px;
							background: #fff;
						}
						&:nth-child(4):after {
							content: '';
							display: block;
							position: absolute;
							bottom: 24px;
							right: -24px;
							width: 50px;
							height: 3px;
							background: #fff;
							transform: rotate(90deg);
						}
					}
				}
			}
		}
	}
	@keyframes scale1 {
		0% {
			transform: scale(1);
		}
		100% {
			transform: scale(2);
			opacity: 0;
		}
	}
	@keyframes scale2 {
		0% {
			transform: scale(1);
		}
		100% {
			transform: scale(1.5);
			opacity: 0;
		}
	}
</style>
