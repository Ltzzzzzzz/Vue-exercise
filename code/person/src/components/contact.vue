<template>
	<div id="contact" class="bg">
		<arrowUp></arrowUp>
		<h1 class="title">联系我</h1>
		<div class="content">
			<h4 class="text">勤奋 好学 百炼成钢</h4>
			<div class="contact-wrapper">
				<div class="main">
					<ul class="desc">
						<li v-for="(text,index) in contact.desc" :key="index">{{text}}</li>
					</ul>
				</div>
				<div class="footer">
					<div class="icon-wrapper">
						<a class="icon qq" href="javascript:;">
							<i class="fa fa-qq"></i>
							<div class="img-wrapper" :style="{backgroundImage:'url('+contact.qq+')'}"></div>
						</a>
						<a class="icon wx" href="javascript:;">
							<i class="fa fa-wechat"></i>
							<div class="img-wrapper" :style="{backgroundImage:'url('+contact.wx+')'}"></div>
						</a>
						<a class="icon git" :href="contact.github" target="_blank"><i class="fa fa-github"></i></a>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import arrowUp from './arrowUp.vue';
	export default {
		props: {
			contact: {
				type: Object,
				default(){
					return {};
				}
			},
		},
		components:{
			arrowUp
		},
	}
</script>

<style lang="scss" scoped="scoped">
	#contact {
		position: relative;
		background-color: #a29971;
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
			-ms-user-select: none;
			-moz-user-select: none;
			-webkit-user-select: none;
			opacity: 0;
			transform: translateX(-20px);
			transition: .5s ease-in;
			transition-delay: .4s;
			@media (max-width:500px){
				top: 120px;
			}
			.text {
				margin: 30px 0;
				font-size: 30px;
				word-spacing: 10px;
				text-align: center;
				color: #fff;
				text-shadow: 0 0 20px #a0f2dc, 10px -10px 30px #a9d5f4, -20px -20px 40px #26cff0, 20px -40px 50px #1ccaf9, -20px -60px 60px #3762be, 0 -80px 70px #9d82d5, 10px -90px 80px #5b5173;
			}
			.contact-wrapper {
				margin: 0 auto;
				width: 300px;
				height: 300px;
				.main {
					width: 100%;
					min-height: 100%;
					.desc {
						margin-top: 64px;
						padding-bottom: 64px;
						line-height: 2;
						color: #fff;
						text-align: center;
						font-size: 18px;
					}
				}
				.footer {
					margin-top: -64px;
					position: relative;
					&:after {
						content: '';
						display: block;
						position: absolute;
						left: 0;
						bottom: 0;
						width: 100%;
						height: 24px;
						border: 5px solid #ffd200;
						border-top: 0;
					}
					.icon-wrapper {
						line-height: 64px;
						display: flex;
						justify-content: space-around;
						.icon {
							position: relative;
							display: block;
							padding: 0 10px;
							font-size: 18px;
							color: #fff;
							z-index: 1;
							&:hover {
								.img-wrapper {
									opacity: 1;
								}
							}
							.img-wrapper {
								position: absolute;
								top: 0;
								left: 50%;
								width: 128px;
								height: 128px;
								background-position: center;
								background-size: cover;
								transform: translate(-50%,-100%);
								border: 1px solid;
								border-radius: 10px;
								opacity: 0;
								transition: .5s;
								&:after {
									content: '';
									position: absolute;
									bottom: -9px;
									left: 50%;
									transform: translateX(-50%);
									border-top: 8px solid;
									border-right: 8px solid transparent;
									border-bottom: none;
									border-left: 8px solid transparent;
								}
							}
							&.wx {
								font-size: 20px;
								color:#87dc49;
							}
							&.git {
								font-size: 22px;
								color: #24292e;
							}
							
						}
					}
				}
			}
		}
	}
</style>

