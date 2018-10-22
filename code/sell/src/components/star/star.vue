<template>
	<div class="star" :class="starSize">
		<span v-for="(starClass,index) in starClasses" class="star-item" :class="starClass" :key="index"></span>
	</div>
</template>
<script>
	const LENGTH = 5;
	const CLS_ON = 'on';
	const CLS_HALF = 'half';
	const CLS_OFF = 'off';
	export default {
		props:{
			size: Number,
			score: Number
		},
		computed:{
			starClasses(){
				let list = [];
				let score = Math.floor(this.score * 2) / 2;//以0.5分界
				//全星个数
				let onLength = Math.floor(score);
				//判断是否有半星
				let isHalf = score % 1 !== 0;
				for(let i = 0; i<onLength; i++){
					list.push(CLS_ON);
				};
				if(isHalf){
					list.push(CLS_HALF);
				};
				while(list.length<LENGTH){
					list.push(CLS_OFF);
				};
				return list;
			},
			starSize(){
				let starSize;
				starSize = 'starSize' + this.size;
				return starSize;
			}
		}
	}
</script>
