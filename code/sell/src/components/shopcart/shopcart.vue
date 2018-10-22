<template>
	<div class="shopcart">
		<div class="content" @click="toggleShow">
			<div class="content-left">
				<div class="icon-wrapper">
					<div class="icon" :class="{'highlight':tatolPrice>0}">
						<i class="icon-shopping_cart"></i>
					</div>
					<div class="num" v-show="tatolCount>0">{{tatolCount}}</div>
				</div>
				<div class="price" :class="{'highlight':tatolPrice>0}">￥{{tatolPrice}}</div>
				<div class="desc">另需配送费￥{{deliveryPrice}}元</div>
			</div>
			<div class="content-right" :class="ifEnough" @click.stop="pay">{{ifDelivery}}</div>
		</div>
		<div class="balls-container">
			<div v-for="(ball,index) in balls" :key="index" >
				<!-- JavaScript 钩子 -->
				<transition name="drop"
					@before-enter="beforeEnter"
					@enter="enter"
					@after-enter="afterEnter"
				>
					<div class="ball" v-show="ball.show">
						<div class="inner inner-hook"></div>
					</div>
				</transition>
			</div>	
		</div>
		<transition name="fold">
			<div class="select-list" v-show="listShow">
				<div class="list-header">
					<h1 class="title">购物车</h1>
					<span class="empty" @click="empty">清空</span>
				</div>
				<div ref="selectContent" class="list-content">
					<ul>
						<li class="food onePx" v-for="(food,index) in selectFood" :key="index">
							<div class="name">{{food.name}}</div>
							<div class="price">￥{{food.price * food.count}}</div>
							<div class="cartcontrol-wrapper">
								<cartcontrol :food="food" @add-cart="drop"></cartcontrol>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</transition>
		<transition name="show">
			<div class="list-mask" v-show="listShow" @click="hideList"></div>
		</transition>
	</div>
</template>
<script>
	import BScroll from 'better-scroll';
	import cartcontrol from '../cartcontrol/cartcontrol.vue';
	export default {
		data(){
			return {
				//创建5个小球
				balls:[{show:false},{show:false},{show:false},{show:false},{show:false}],
				dropballs:[],
				fold: true
			}		
		},
		props:{
			selectFood:{
				type: Array,
				default() { //类型是Array或Object时，default是函数形式
					return [];
				}
			},
			deliveryPrice:{
				type:Number ,
				default: 0 
			},
			minPrice:{
				type:Number,
				default: 0 
			}
		},
		components:{
			cartcontrol
		},
		methods:{
			drop(target){
				//console.log(el),通过cartcontrol组件的点击事件发射到父组件goods而获取到的元素，组件之间的通信
				//遍历balls
				for(let i = 0;i<this.balls.length;i++){
					let ball=this.balls[i];
					if(!ball.show){ //如果ball.show不为true
						ball.show = true;
						//给ball添加一个el对象保留这个传进来的el
						ball.el = target;
						this.dropballs.push(ball);
						/*
							点击一次，balls里面的1个ball.show会变成true,然后跳出循环，balls里面还有4个ball.show=false;
							点击多次，balls里面 ball.show=true 不会触发下面的语句，下一个ball.show=false会接着触发；
							
						*/
						return;
					}
				}
			},
			beforeEnter(el) {
				//console.log(el),这个el是执行动画的元素
				let count = this.balls.length;
				while (count--){//判断count的值是否为0,如果不是0，count自减并执行下面的语句
					let ball = this.balls[count];
					if(ball.show){
						let rect = ball.el.getBoundingClientRect();//获取小球相对视窗的位置
						let x = rect.left - 32;
						let y = -(window.innerHeight - rect.top - 22);
						el.style.display = '';//清除display
						el.style.webkitTransform = `translate3d(0,${y}px,0)`;
						el.style.transform = `translate3d(0,${y}px,0)`;
						let inner = el.getElementsByClassName('inner-hook')[0];
						inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
						inner.style.transform = `translate3d(${x}px,0,0)`;
					}
				}
			},
			enter(el,done){
				/*
					1.js代码的执行会阻塞页面绘制(即在js之后绘制才会对更改做出反映)
					2.获取部分样式会触发重绘重排(因为有可能在前面的js中发生了变化)
					
					重排何时发生?
					1.添加或者删除可见的DOM元素
					2.元素位置改变
					3.元素尺寸改变
					4.元素内容改变（例如：一个文本被另一个不同尺寸的图片替代）
					5.页面渲染初始化（这个无法避免）
					6.浏览器窗口尺寸改变
					
					每一次重排都会触发一次重绘
					有些时候你可能会强制刷新队列并要求计划任务立即执行
					获取布局信息的操作会导致队列刷新，比如：
					1.offsetTop, offsetLeft, offsetWidth, offsetHeight
					2.scrollTop, scrollLeft, scrollWidth, scrollHeight
					3.clientTop, clientLeft, clientWidth, clientHeight
					4.getComputedStyle() (currentStyle in IE)
				*/
				/* eslint-disable no-unused-vars */
                let rf = el.offsetHeight; // 手动触发html重绘
				this.$nextTick(()=>{ //异步执行，性能优化
					el.style.webkitTransform = 'translate3d(0,0,0)';
					el.style.transform = 'translate3d(0,0,0)';
					let inner = el.getElementsByClassName('inner-hook')[0];
					inner.style.webkitTransform = 'translate3d(0,0,0)';
					inner.style.transform = 'translate3d(0,0,0)';
					// Vue为了知道过渡的完成，必须设置相应的事件监听器
					el.addEventListener('transitionend', done);
				})
			},
			afterEnter(el) {
				
				//取已经下落的ball，shift()返回数组第一个数据
				let ball = this.dropballs.shift();
				if(ball){
					ball.show = false;
					el.style.display = 'none';
				}
			},
			toggleShow() {
				if(!this.tatolCount){
					return;
				}
				this.fold = !this.fold;
			},
			empty(){
				this.selectFood.forEach((food) => {
					food.count = 0;
					this.fold = true;
				})
			},
			hideList() {
				this.fold = true;
			},
			pay() {
				alert(`支付${this.tatolPrice}元`);
				this.empty();
			}
		},
		computed:{
			tatolPrice() {
				let total = 0;
				this.selectFood.forEach((food) => {
					total += food.price * food.count;
					return total;
				})
				return total;
			},
			tatolCount() {
				let count = 0;
				this.selectFood.forEach((food) => {
					count += food.count;
				})
				return count;
			},
			ifDelivery() {
				if(this.tatolPrice === 0){
					return `￥${this.minPrice}起送`;
				}else if (this.tatolPrice < this.minPrice){
					let diff = this.minPrice - this.tatolPrice;
					return `还差￥${diff}起送`;
				}else{
					return '去结算';
				}
			},
			ifEnough() {
				if(this.tatolPrice<this.minPrice) {
					return 'not-enough';
				}else{
					return 'enough'
				}
			},
			listShow() {
				if(!this.tatolCount){
					return false;
				}
				let show = !this.fold;
				if(show){
					this.$nextTick(() => {
						let _this = this;
						if(!this.scroll){
							_this.scroll = new BScroll(_this.$refs.selectContent, {
								click:true
							})
						}else{
							_this.scroll.refresh();
						}
					})
				}
				return show;
			}
		}
	}
</script>