<template>
	<div id="goods">
		<div class="menu-wrapper" ref="menuWrapper">
			<ul>
				<li class="menu-item onePx" v-for="(item,index) in goods" :key="index" :class="{'current':index===currentIndex}" @click="select(index,$event)">
					<span class="text">
						<span v-if="item.type>0" class="icon" :class="mapClass[item.type]"></span>{{item.name}}
					</span>
				</li>
			</ul>
		</div>
		<div class="foods-wrapper" ref="foodsWrapper">
			<ul>
				<li v-for="(item,index) in goods" :key="index" :data-index="index" class="food-item-hook">
					<h1 class="title">{{item.name}}</h1>
					<div class="foods-list">
						<ul>
							<li class="food-item" v-for="(food,index) in item.foods" :key="index" @click="selectedFood(food,$event)">
								<div class="food">
									<div class="icon">
										<img class="icon-img" width="57" height="57" :src="food.icon">
									</div>
									<div class="content">
										<h2 class="name">{{food.name}}</h2>
										<p class="desc">{{food.description}}</p>
										<div class="extra">
											<span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}</span>
										</div>
										<div class="price">
											<span class="new">￥{{food.price}}</span><span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
										</div>
									</div>
								</div>
								<div class="cartcontrol-wrapper">
									<cartcontrol :food="food" @add-cart="addCart"></cartcontrol>
								</div>
							</li>
						</ul>
					</div>
				</li>
			</ul>
		</div>
		<detail :food="foodDetail" @add-cart="addCart" ref="foodDetailWrapper"></detail>
		<shopcart ref="shopcart" :selectFood="selectFood" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></shopcart>
	</div>
</template>
<script>
	import BScroll from 'better-scroll';
	import shopcart from '../shopcart/shopcart.vue';
	import cartcontrol from '../cartcontrol/cartcontrol.vue';
	import detail from '../detail/detail.vue';
	const ERR_NO = 0;
	export default {
		props:{
			seller:{
				type:Object
			}
		},
		data() {
			return {
				goods: [],
				mapClass: [],
				listHeight: [],
				scrollY: 0,
				foodDetail:{},
			}
		},
		components:{
			shopcart,
			cartcontrol,
			detail
		},
		computed: {
			currentIndex() {
				for (let i = 0; i < this.listHeight.length; i++) {
					let heightStart = this.listHeight[i];
					let heightEnd = this.listHeight[i + 1];
					if (!heightEnd || this.scrollY >= heightStart&&this.scrollY<heightEnd){
						return i;
					}
				}
				return 0;
			},
			selectFood() {
				let goodList = [];
				this.goods.forEach((good)=>{
					good.foods.forEach((food)=>{
						if(food.count){
							goodList.push(food);
						}
					})
				})
				return goodList;
			}
		},
		created() {
			this.mapClass = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
			this.$axios.get('api/goods?id='+this.seller.id).then(res => {
				if (res.data.errorno === 0) {
					this.goods = res.data.data;
					
					this.$nextTick(() => { //数据渲染后
						
						this.calculationHeight();
						this.initScroll();
					})

				}
			});
		},
		methods: {
			addCart(target) {
				//参数target是子组件cartcontrol传过来的evnet.target
				//console.log(target)
				//console.log(this.$refs.shopcart.drop),在shopcart组件里面定义的drop函数
				// 体验优化，异步执行下落动画
				this.$nextTick(()=>{
					this.$refs.shopcart.drop(target);
				})
				
			},
			initScroll() {
				let menuWrapper = this.$refs.menuWrapper;
				let foodsWrapper = this.$refs.foodsWrapper;
// 				let lastHeight = this.listHeight.pop();
// 				let lastSecondHeight = this.listHeight.slice(-1).pop();
				
				this.menuScroll = new BScroll(menuWrapper, {
					click:true // 首先要使点击有效，因为 better-scroll将默认事件都阻止了
				});

				this.foodsScroll = new BScroll(foodsWrapper, {
					probeType: 3,
					click:true
				});
				//监控scroll事件，获取滚动高度
				this.foodsScroll.on('scroll', (pos) => {
					this.scrollY = Math.abs(Math.round(pos.y)); 
					
					// console.log(lastHeight,lastSecondHeight)
// 					if(this.scrollY > lastSecondHeight && this.scrollY <lastHeight){
// 						this.menuScroll.scrollTo(0,-46,300)
// 					}else{
// 						this.menuScroll.scrollTo(0,0,300)
// 					}

				});
			},
			calculationHeight() {
				//获取右边每个分栏的高度存进数组
				let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-item-hook');
				let height = 0;
				this.listHeight.push(height);
				for (let i = 0; i < foodList.length; i++) {
					let item = foodList[i];
					height += item.clientHeight;
					this.listHeight.push(height);
				}
				//console.log(this.listHeight);
			},
			select(index,event){
				//判断是否为pc端，pc端则返回，不做click:true的设置，以免触发两次点击事件
				// better-scroll 默认会阻止浏览器的原生 click 事件。当设置为 true，
				//better-scroll 会派发一个 click 事件，
				//我们会给派发的 event 参数加一个私有属性 _constructed，值为 true。
				if(!event._constructed){
					return
				}
				let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-item-hook');
				this.foodsScroll.scrollToElement(foodList[index],300);
			},
			selectedFood(food,event) {
				if(!event. _constructed){
					return;
				}
				this.foodDetail = food;
				this.$refs.foodDetailWrapper.show();
			}
		}
	}
</script>
