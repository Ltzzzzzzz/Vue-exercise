<template>
	<div id="ratings" ref="ratingsWrapper">
		<div class="ratings-wrapper">
			<div class="ratings-header">
				<div class="ratings-left">
					<h1 class="title">{{seller.score}}</h1>
					<div class="score-text">综合评分</div>
					<div class="compare">高于周边商家{{seller.rankRate}}%</div>
				</div>
				<div class="ratings-right">
					<div class="score-wrapper">
						<span class="text">服务态度</span>
						<star :size="36" :score="seller.serviceScore"></star>
						<span class="score">{{seller.serviceScore}}</span>
					</div>
					<div class="score-wrapper">
						<span class="text">食物品质</span>
						<star :size="36" :score="seller.foodScore"></star>
						<span class="score">{{seller.foodScore}}</span>
					</div>
					<div class="deliveryTime-wrapper">
						<span class="text">送达时间</span>
						<span class="deliveryTime">{{seller.deliveryTime}}分钟</span>
					</div>
				</div>
			</div>
			<split></split>
			<ratingselect 
				:ratings="ratings" 
				:selectType="selectType"
				:onlyContent="onlyContent"
				@onlyContentShow="onlyContentShow"
				@sType="sType"
			></ratingselect>
			<div class="ratings">
				<ul>
					<li v-show="needShow(rating.rateType,rating.text)" class="rating-item onePx" v-for="(rating,index) in ratings" :key="index">
						<div class="avatar">
							<img :src="rating.avatar" :alt="rating.username" width="28" height="28">
						</div>
						<div class="rating-wrapper">
							<h1 class="user">{{rating.username}}</h1>
							<star :size="24" :score="rating.score"></star>
							<span class="deliveryTime" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟到达</span>
							<p class="rating">{{rating.text}}</p>
							<div class="recommend" v-show="rating.recommend && rating.recommend.length>0">
								<i class="icon-thumb_up"></i>
								<span class="item" v-for="(item,index) in rating.recommend" :key="index">{{item}}</span>
							</div>
							<div class="time">{{rating.rateTime | normalTime}}</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
	import star from '../star/star.vue';
	import split from '../split/split.vue';
	import ratingselect from '../ratingselect/ratingselect.vue';
	import BScroll from 'better-scroll';
	import {normalTime} from '../../assets/js/data.js';
	const ERROR_OK = 0;
	const ALL = 2;
	export default {
		props:{
			seller:{
				type:Object
			}
		},
		data(){
			return {
				ratings:[],
				selectType:ALL,
				onlyContent:true
			}
		},
		components: {
			star,
			split,
			ratingselect
		},
		filters:{
			normalTime(time){
				let date = new Date(time);
				return normalTime(date);
			}
		},
		created() {
			this.$axios.get('/api/ratings?id='+this.seller.id).then(res=>{
				if(res.data.errorno === 0){
					this.ratings = res.data.data;
					this.$nextTick(() => {
						let ratingsScroll = this.$refs.ratingsWrapper
						this.scroll = new BScroll(ratingsScroll,{
							click:true
						})
					})
				}
				
			})
		},
		methods: {
			sType(type) {
				this.selectType = type;
				this.$nextTick(()=>{
					this.scroll.refresh();
				})
			},
			onlyContentShow(show){
				this.onlyContent = show;
				this.$nextTick(()=>{
					this.scroll.refresh();
				})
			},
			needShow(type,text){
				if(this.onlyContent && !text){
					return false;
				}
				if(this.selectType === ALL){
					return true;
				}else{
					return type === this.selectType;
				}
			}
		},
	}
</script>