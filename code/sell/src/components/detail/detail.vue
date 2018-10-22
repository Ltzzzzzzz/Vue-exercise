<template>
	<transition name="move">
		<div id="detail" v-show="showSwitch" ref="foodDetail">
			<div class="detail-wrapper">
				<div class="detail-header">
					<img class="food-img" :src="food.image" :alt="food.name">
					<i class="icon-arrow_lift" @click="hide"></i>
				</div>
				<div class="content">
					<div class="content-header">
						<h1 class="title">{{food.name}}</h1>
						<div class="desc">
							<span class="sellCount">月售{{food.sellCount}}份</span><span class="rating">好评率{{food.rating}}%</span>
						</div>
						<div class="price">
							<span class="new">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
						</div>
					</div>
					<div class="cartcontrol-wrapper">
						<cartcontrol :food="food" @add-cart="drop"></cartcontrol>
					</div>
					<transition name="fade">
						<div @click="addFirst" class="buy" v-show="!food.count || food.count===0">加入购物车</div>
					</transition>
				</div>
				<split v-show="food.info"></split>
				<div class="info-wrapper" v-show="food.info">
					<h1 class="title">商品介绍</h1>
					<p class="info">{{food.info}}</p>
				</div>
				<split></split>
				<ratingselect 
					:ratings="food.ratings"
					:onlyContent="onlyContent"
					:selectType="selectType"
					@sType="sType"
					@onlyContentShow="onlyContentShow"
				></ratingselect>
				<div class="ratings-wrapper">
					<div v-show="food.ratings">
						<ul>
							<li v-show="needShow(rating.rateType,rating.text)" class="ratings onePx" v-for="(rating,index) in food.ratings" :key="index">
								<div class="time">{{rating.rateTime | normalTime}}</div>
								<div class="user">
									<span class="name">{{rating.username}}</span>
									<img class="avatar" :src="rating.avatar" :alt="rating.username" width="12" height="12">
								</div>
								<div class="rating">
									<i :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></i>
									<span class="text">{{rating.text}}</span>
								</div>
							</li>
						</ul>
					</div>
					<div class="no-ratings" v-show="!food.ratings || !food.ratings.length">
						暂无评论
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>
<script>
	import BScroll from 'better-scroll';
	import cartcontrol from '../cartcontrol/cartcontrol.vue';	
	import split from '../split/split.vue';
	import ratingselect from '../ratingselect/ratingselect.vue';
	import {normalTime} from '../../assets/js/data.js';
	
	const POSITIVE = 0;
	const NEGATIVE = 1;
	const ALL = 2;
	export default{
		props:{
			food:{
				type:Object
			}
		},
		data(){
			return {
				showSwitch:false,
				onlyContent:true,
				selectType:ALL
			}
		},
		filters:{
			normalTime(time) {
				let date = new Date(time);
				return normalTime(date);
			}
		},
		methods:{
			show() {
				this.selectType = ALL;
				this.showSwitch = true;
				this.$nextTick(() => {
					let foodDetail = this.$refs.foodDetail;
					if(!this.detailScroll){//better-scroll计算的是目标元素第一个子元素的高度是否超过目标元素的高度
						this.detailScroll = new BScroll(foodDetail,{
							click:true
						})
					}else{//重新计算
						this.detailScroll.refresh();
					}
				})
			},
			hide() {
				this.showSwitch = false;
			},
			addFirst(event) {
				if(!event._constructed){
					return;
				}
				this.$emit('add-cart',event.target);
				this.$set(this.food,'count',1);
			},
			drop(target) {
				this.$nextTick(() => {
					this.$emit('add-cart',target);
				})
			},
			onlyContentShow(toggle){
				this.onlyContent = toggle;
				this.$nextTick(()=>{
					this.detailScroll.refresh();
				})
			},
			needShow(type,text){
				//判断是否有内容
				if(this.onlyContent && !text){
					return false;
				}
				//判断选择的类型是否为全部
				if(this.selectType === ALL){
					return true;
				}else{//判断rating.rateType是否等于选择的类型，返回true
					return type === this.selectType;
				}
			},
			sType(type){
				this.selectType = type;
				this.$nextTick(()=>{
					this.detailScroll.refresh();
				})
			}
		},
		components:{
			cartcontrol,
			split,
			ratingselect
		}
	}
</script>