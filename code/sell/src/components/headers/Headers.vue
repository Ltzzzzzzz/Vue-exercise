<template>
	<div id="header">
		<!-- 内容区 -->
		<div class="content-wrapper">
			<div class="header-l">
				<img class="logo" width="64" height="64" :src="seller.avatar" alt="logo">
			</div>
			<div class="header-r">
				<h1 class="title">
					<span class="brand"></span>
					<span class="name">{{seller.name}}</span>
				</h1>
				<p class="desc">{{seller.description}} / {{seller.deliveryTime}}分钟送达</p>
				<p v-if="seller.supports" class="supports">
					<span class="icon" :class="classMap[seller.supports[i].type]" ></span>
					<span class="content">{{seller.supports[i].description}}</span>
				</p>
				<button v-if="seller.supports" class="btn" @click="showDetail"><span class="text">{{seller.supports.length}}个</span><i class="icon-keyboard_arrow_right"></i></button>
			</div>
		</div>	
		<!-- 公告区 -->
		<div class="bulletin" @click="showDetail">
			<span class="bulletin-icon"></span><span class="bulletin-text">{{seller.bulletin}}</span>
			<i class="icon-keyboard_arrow_right"></i>
		</div>
		<!-- 背景区 -->
		<div class="bgimg-box">
			<img class="bgimg" :src="seller.avatar" width="100%">
		</div>
		<!-- 详情弹窗 -->
		<transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
			<div class="detail" v-show="detailShow">
				<div class="detail-wrapper clearfix" @click="closeDetail">
					<div class="detail-main">
						<h1 class="name">{{seller.name}}</h1>
						<div class="star-wrapper">
							<star :size="48" :score='seller.score'></star>
						</div>
						<div class="title-wrapper">
							<div class="line onePx"></div>
							<div class="title">优惠信息</div>
							<div class="line onePx"></div>
						</div>
						<ul  v-if="seller.supports" class="supports-wrapper">
							<li v-for="(support,index) in seller.supports" :key="index" class="support">
								<span class="icon" :class="classMap[index]" ></span>
								<span class="content">{{seller.supports[index].description}}</span>
							</li>
						</ul>
						<div class="title-wrapper">
							<div class="line onePx"></div>
							<div class="title">商家公告</div>
							<div class="line onePx"></div>
						</div>
						<div class="bulletin-wrapper">
							<p class="bulletin-text">{{seller.bulletin}}</p>
						</div>
					</div>
				</div>
				<div class="detail-close" @click="closeDetail">
					<i class="icon-close"></i>
				</div>
			</div>
		</transition>
	</div>
</template>
<script>
	import star from '../star/star.vue'
	export default {
		props:{
			seller:{
				type:Object
			}
		},
		data(){
			return {
				classMap:[],
				i:0,
				detailShow:false
			}
		},
		created(){
			this.classMap = ['decrease','discount','guarantee','invoice','special'];
		},
		components:{
			star
		},
		methods:{
			event(){
				setInterval(()=>{
					if(this.i==4){
						this.i = 0;
					}else{
						this.i++
					}
				},3000)
			},
			showDetail(){
				this.detailShow = true;
			},
			closeDetail(){
				this.detailShow = false;
			}
		}
	}
</script>