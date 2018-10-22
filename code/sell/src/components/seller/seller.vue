<template>
	<div id="seller" ref="seller">
		<div class="seller-wrapper">
			<div class="overview">
				<h1 class="title">{{seller.name}}</h1>
				<div class="desc onePx">
					<star :size="36" :score="seller.score"></star>
					<span class="text">({{seller.ratingCount}})</span>
					<span class="text">月售{{seller.sellCount}}单</span>
				</div>	
				<ul>
					<li class="block">
						<div class="text">起送价</div>
						<div class="num">{{seller.minPrice}}<span class="unit">元</span></div>
					</li>
					<li class="block">
						<div class="text">商家配送</div>
						<div class="num">{{seller.deliveryPrice}}<span class="unit">元</span></div>
					</li>
					<li class="block">
						<div class="text">平均配送时间</div>
						<div class="num">{{seller.deliveryTime}}<span class="unit">分钟</span></div>
					</li>
				</ul>
				<div class="favorite" @click="toggleFavorite">
					<i class="icon-favorite" :class="{'active':favorite}"></i>
					<span class="text">{{favoriteText}}</span>
				</div>
			</div>
			<split></split>
			<div class="bulletin-wrapper">
				<h1 class="title">公告与活动</h1>
				<p class="bulletin onePx">{{seller.bulletin}}</p>
				<ul>
					<li class="supports-item onePx" v-for="(support,index) in seller.supports" :key="index">
						<span class="icon" :class="mapClass[support.type]"></span><span class="text">{{support.description}}</span>
					</li>
				</ul>
			</div>
			<split></split>
			<div class="pics">
				<h1 class="title">商家实景</h1>
				<div class="pic-wrapper" ref="picWrapper">
					<ul class="pic-list" ref="picList">
						<li class="pic-item" v-for="(pic,index) in seller.pics" :key="index">
							<img :src="pic" width="120" height="90">
						</li>
					</ul>
				</div>
			</div>
			<split></split>
			<div class="info">
				<h1 class="title onePx">商家信息</h1>
				<ul>
					<li class="info-item onePx" v-for="(info,index) in seller.infos" :key="index">
						{{info}}
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
	import BScroll from 'better-scroll';
	import star from '../star/star.vue';
	import split from '../split/split.vue';
	import {saveToLocal,loadFromLocal} from '../../assets/js/store.js';
	export default {
		props: {
			seller: {
				type: Object
			},
		},
		data(){
			return {
				mapClass:[],
				favorite:loadFromLocal(this.seller.id,'favorite',false),
			}
		},
		computed:{
			favoriteText(){
				return this.favorite?'已收藏':'收藏';
			}
		},
		created(){
			this.mapClass = ['decrease','discount','guarantee','invoice','special'];
			this.$nextTick(()=>{
				this.initScroll();
				this.initPicScroll();
			})
		},
		watch:{
			seller(){
				this.$nextTick(()=>{
					this.initPicScroll();
				})
			}
		},
		methods: {
			initScroll() {
				if(!this.scroll){
					let sellerScroll = this.$refs.seller;
					this.scroll = new BScroll(sellerScroll,{
						click:true
					})
				}else{
					this.scroll.refresh();
				}
			},
			initPicScroll() {
				if(this.seller.pics){
					let picWidth = 120;
					let margin = 6;
					let length = this.seller.pics.length;
					let listWidth = (picWidth + margin) * length - margin;
					this.$refs.picList.style.width = listWidth + 'px';
					if(!this.picScroll){
						let picWrapper = this.$refs.picWrapper;
						this.picScroll = new BScroll(picWrapper,{
							scrollX:true
						})
					}else{
						this.picScroll.refresh();
					}
				}
			},
			toggleFavorite(event){
				if(!event._constructed){
					return;
				}
				this.favorite = !this.favorite;
				saveToLocal(this.seller.id,'favorite',this.favorite);
			}
		},
		components:{
			star,
			split
		}
	}
</script>