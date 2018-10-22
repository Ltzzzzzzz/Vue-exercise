<template>
	<div class="ratingselect">
		<div class="select-content">
			<h1 class="title">商品评价</h1>
			<div class="select-wrapper">
				<div class="block positive" @click="select(2,$event)" :class="{'active':selectType===2}">{{desc.all}}<span class="num">{{ratings.length}}</span></div>
				<div class="block positive" @click="select(0,$event)" :class="{'active':selectType===0}">{{desc.positive}}<span class="num">{{positives.length}}</span></div>
				<div class="block negative" @click="select(1,$event)" :class="{'active':selectType===1}">{{desc.negative}}<span class="num">{{negatives.length}}</span></div>
			</div>
		</div>
		<div class="only-content">
			<i @click="toggleContent" :class="{'active':toggleOnlyContent}" class="icon-check_circle"></i><span @click="toggleContent" class="text">只看有内容的评价</span>
		</div>
	</div>
</template>
<script>
	const POSITIVE = 0;
	const NEGATIVE = 1;
	const ALL = 2;
	export default {
		props:{
			ratings:{
				type:Array,
				default() {
					return [];
				}
			},
			onlyContent:{
				type:Boolean
			},
			selectType:{
				type:Number,
			},
			desc:{
				type:Object,
				default() {
					return {
						all:'全部',
						positive:'推荐',
						negative:'吐槽'
					}
				}
			}
		},
		data(){
			return {
				sType:this.selectType,
				toggleOnlyContent:this.onlyContent
			}
		},
		computed:{
			positives(){
				//array.filter(function(currentValue,index,arr), thisValue)
				return this.ratings.filter((rating)=>{
					return rating.rateType === POSITIVE;
				})
			},
			negatives(){
				return this.ratings.filter((rating)=>{
					return rating.rateType === NEGATIVE;
				})
			},
		},
		methods:{
			toggleContent(event) {
				if(!event._constructed){
					return;
				}
				this.toggleOnlyContent = !this.toggleOnlyContent;
				this.$emit('onlyContentShow',this.toggleOnlyContent);
			},
			select(type,event){
				if(!event._constructed){
					return;
				}
				this.sType = type;
				this.$emit('sType',type);
			}
		}
	}
</script>