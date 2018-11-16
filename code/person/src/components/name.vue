<template>
	<div id="name" class="bg">
		<div ref='nameWrapper' class="name-wrapper" @mouseenter="enter" @mousemove="move" @mouseleave="leave">
			<span ref='circleLight' class="circleLight"></span>
			<h1 class="hello">Hello!</h1>
			<strong>{{name.motto}}</strong>
			<p class="text">我叫{{name.nameCN}}</p>
			<p class="text">{{name.job}}</p>
			<p class="email">{{name.mail}}</p>
		</div>
		<arrowDown></arrowDown>
	</div>
</template>

<script>
	import arrowDown from './arrowDown.vue';
	export default {
		props:{
			name:{
				type:Object,
				default(){
					return {}
				}
			}
		},
		components:{
			arrowDown
		},
		methods:{
			enter(e){
				if (/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)) { //移动端
					return
				}
				let nameWrapper = this.$refs.nameWrapper;
				let circleLight = this.$refs.circleLight;
				let rect = nameWrapper.getBoundingClientRect();
				let w = nameWrapper.clientWidth;
				let h = nameWrapper.clientHeight;
				let x = e.clientX - rect.left;
				let y = e.clientY - rect.top;
				let rty = (x - w/2)/25;
				let rtx = (y - h/2)/20;
				let rf = nameWrapper.offsetHeight;
				this.$nextTick(()=>{
					nameWrapper.style.webkitTransform = `translate(${rty}px,${rtx}px) rotateX(${rtx}deg) rotateY(${rty}deg)`;
					nameWrapper.style.transform = `translate(${rty}px,${rtx}px) rotateX(${rtx}deg) rotateY(${rty}deg)`;
					circleLight.style.background = `radial-gradient(circle at ${x/2}px ${y/2}px,rgb(255,255,255),transparent)`;
				})
			},
			move(e){
				if (/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)) { //移动端
					return
				}
				let nameWrapper = this.$refs.nameWrapper;
				let circleLight = this.$refs.circleLight;
				let rect = nameWrapper.getBoundingClientRect();
				let w = nameWrapper.clientWidth;
				let h = nameWrapper.clientHeight;
				let x = e.clientX - rect.left;
				let y = e.clientY - rect.top;
				let rty = (x - w/2)/25;
				let rtx = (y - h/2)/20;
				let rf = nameWrapper.offsetHeight;
				this.$nextTick(()=>{
					nameWrapper.style.webkitTransform = `translate(${rty}px,${rtx}px) rotateX(${rtx}deg) rotateY(${rty}deg)`;
					nameWrapper.style.transform = `translate(${rty}px,${rtx}px) rotateX(${rtx}deg) rotateY(${rty}deg)`;
					circleLight.style.background = `radial-gradient(circle at ${x/2}px ${y/2}px,rgb(255,255,255),transparent)`;
				})
			} ,
			leave(){
				if (/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)) { //移动端
					return
				}
				let nameWrapper = this.$refs.nameWrapper;
				let circleLight = this.$refs.circleLight;
				let rf = nameWrapper.offsetHeight;
				this.$nextTick(()=>{
					nameWrapper.style.webkitTransform = 'translate(0,0) rotateX(0deg) rotateY(0deg)';
					nameWrapper.style.transform = 'translate(0,0) rotateX(0deg) rotateY(0deg)';
					circleLight.style.background = 'radial-gradient(circle at 0 0,rgb(255,255,255),transparent)';
				})
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
	#name {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #87b0a5;
		&:hover {
			.name-wrapper {
				box-shadow: 0 0 50px #000;
			}
		}
		.name-wrapper {
			position: relative;
			border-radius: 10px;
			padding: 25px 50px;
			text-align: center;
			-webkit-user-select: none;
			-ms-user-select: none;
			-moz-user-select: none;
			transition:transform .3s linear,background-color .3s linear,box-shadow .3s linear;
			//transition: transform .3s linear;
			.circleLight {
				display: block;
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				opacity: 0;
				border-radius: 10px;
				transition:all .3s;
				z-index: -1;
			}
			&:hover {
				background-color: rgba(255,255,255,.2);
				box-shadow: 0 0 70px #000;
				.circleLight {
					opacity: .3;
				}
			}
			
			.hello {
				font-size: 70px;
			}
			strong {
				display: block;
				margin-top: 10px;
				font-size: 25px;
				font-weight: bold;
			}
			.text {
				margin-top: 16px;
				font-size: 20px;
			}
			.email {
				margin-top: 16px;
				font-size: 20px;
				color: #7d2704;
			}
		}
	}
</style>
