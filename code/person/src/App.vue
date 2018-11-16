<template>
	<div id="app">
		<swiper :options="swiperOption" ref="swiper">
			<swiper-slide>
				<name :name='person.name' :style="{backgroundImage:'url('+bg+')'}"></name>
			</swiper-slide>
			<swiper-slide>
				<info :info='person.info' :style="{backgroundImage:'url('+bg+')'}"></info>
			</swiper-slide>
			<swiper-slide>
				<skill :skill='person.skill' :style="{backgroundImage:'url('+bg+')'}"></skill>
			</swiper-slide>
			<swiper-slide>
				<experience :experience='person.experience' :style="{backgroundImage:'url('+bg+')'}"></experience>
			</swiper-slide>
			<swiper-slide>
				<works :works='person.works' :style="{backgroundImage:'url('+bg+')'}"></works>
			</swiper-slide>
			<swiper-slide>
				<contact :contact='person.contact' :style="{backgroundImage:'url('+bg+')'}"></contact>
			</swiper-slide>
		</swiper>
		<div class="swiper-pagination"></div>
		<div class="person" :style="{backgroundImage:'url('+me+')'}"></div>
		<transition name="show">
			<div class="loading" v-show="show">
				<div class="circle-wrapper">
					<div class="circle"></div>
					<div class="circle"></div>
					<div class="circle"></div>
					<div class="circle"></div>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
	import name from './components/name.vue';
	import info from './components/info.vue';
	import skill from './components/skill.vue';
	import experience from './components/experience.vue';
	import works from './components/works.vue';
	import contact from './components/contact.vue';

	const url = 'https://raw.githubusercontent.com/rhtech-ltz/project/master/mock/person.json';
	
	export default {
		data(){
			return {
				swiperOption:{
					direction: 'vertical',
					mousewheel: true,
					simulateTouch: false,
					pagination: {
						el: '.swiper-pagination',
						clickable: true
					},
				},
				person: {},
				me: '',
				bg: '',
				show: true
			}
		},
		created(){
			this.$axios.get(url).then((res)=>{
				this.person = res.data;
				this.me = this.person.name.me;
				this.bg = this.person.name.bg;
				this.$nextTick(function(){
					let img = document.getElementsByTagName('img');
					let arr = [];
					for(let i = 0; i<img.length; i++){
						arr.push(img[i].complete);
					}
					let result = false;
					result = arr.every(x =>{
						return x = true;
					});
					if(result){
						this.show = !this.show;
					}
				})
			})
		},
		components:{
			name,
			info,
			skill,
			experience,
			works,
			contact
		}
	}
</script>

<style lang="scss">
	#app {
		width: 100%;
		height: 100%;
		overflow:hidden;
		.show-leave-to {
			opacity: 0;
		}
		.swiper-slide-active{
			#info {
				.icon {
					opacity: 1!important;
					transform: translateY(0px)!important;
				}
				.text {
					opacity: 1!important;
					transform: translateX(0px)!important;
				}
				.info {
					transform: scale(1)!important;
				}
			}
			#skill {
				.outer {
					transform: scale(1)!important;
					.outer-item {
						opacity: 1!important;
					}
				}
				.inner {
					transform: translateX(-50%) translateY(-50%) scale(1)!important;
					.inner-item {
						opacity: 1!important;
					}
				}
				.skill-rect {
					opacity: 1!important;
					.skill-item {
						opacity: 1!important;
					}
				}
			}
			#experience {
				.experience-wrapper {
					opacity: 1!important;
					transform: translateX(0px)!important;
				}
			}
			#works {
				.work {
					opacity: 1!important;
				}
			}
			#contact {
				.content {
					opacity: 1!important;
					transform: translateX(0px)!important;
				}
			}
		}
		.loading {
			position: fixed;
			top: 0;
			left: 0;
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100%;
			height: 100%;
			background: #000;
			z-index: 100;
			transition: 1s;
			.circle-wrapper {
				.circle {
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%,-50%) rotate(0);
					width: 100px;
					height: 100px;
					border-top: 2px solid indianred;
					border-radius: 50%;
					animation: turnRight 1s linear infinite;
					&:nth-child(2) {
						width: 75px;
						height: 75px;
						border-top: 0;
						border-right: 2px solid lightgoldenrodyellow;
						animation: turnLeft 1s linear infinite;
					}
					&:nth-child(3) {
						width: 50px;
						height: 50px;
						border-top: 0;
						border-bottom: 2px solid cadetblue;
					}
					&:nth-child(4) {
						width: 25px;
						height: 25px;
						border-top: 0;
						border-left: 2px solid seagreen;
						animation: turnLeft 1s linear infinite;
					}
				}
			}
		}
		.swiper-container,.swiper-wrapper,.swiper-slide {
			height: 100%;
			touch-action: none;
		}
		.bg {
			width: 100%;
			height: 100%;
			background-repeat: repeat;
		}
		.swiper-pagination {
			position: fixed;
			top: 50%;
			right: 30px;
			margin-top: -114px;
			z-index: 1;
			.swiper-pagination-bullet {
				position: relative;
				display: block;
				margin-bottom: 24px;
				width: 16px;
				height: 16px;
				background: #337ab7;
				border-radius: 50%;
				cursor: pointer;
				outline: none;
				&:before {
					content: '';
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translateX(-50%) translateY(-50%);
					width: 8px;
					height: 8px;
					border-radius: 50%;
					background: #fff;
				}
				&:after {
					content: '';
					position: absolute;
					top: 26px;
					left: -2px;
					width: 20px;
					height: 1px;
					border-bottom: 1px dashed #fff;
					transform: rotate(90deg);
				}
				&.swiper-pagination-bullet-active {
					animation: twinkle 1.5s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
				}
			}
		}
		.person {
			position: fixed;
			top: calc(50% + 125px);
			right: 13px;
			width: 48px;
			height: 48px;
			background-size: 100%;
			border-radius: 50%;
			animation: rotate 3s linear infinite;
		}
	}
	@keyframes twinkle {
		0% {
			box-shadow: 0 0 0 0px rgba(255,255,255,1);
		}
		100% {
			box-shadow: 0 0 0 10px rgba(255,255,255,0);
		}
	}
	@keyframes rotate {
		0% {
			transform: scale(.9);
		}
		50% {
			transform: scale(1);
		}
		100% {
			transform: scale(.9);
		}
	}
	@keyframes turnRight {
		to {
			transform: translate(-50%,-50%) rotate(1turn);
		}
	}
	@keyframes turnLeft {
		to {
			transform: translate(-50%,-50%) rotate(-1turn);
		}
	}
</style>
