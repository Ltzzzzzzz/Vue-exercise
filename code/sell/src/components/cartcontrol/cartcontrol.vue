<template>
	<div class="cartcontrol">
		<transition name="move">
			<div class="cart-decrease" v-show="food.count>0" @click.stop="remove($event)">
				<i class="icon-remove_circle_outline"></i>
			</div>
		</transition>
		
		<div class="cart-count" v-show="food.count>0">{{food.count}}</div>
		<div class="cart-increse" @click.stop="add($event)">
			<i class="icon-add_circle"></i>
		</div>
	</div>
</template>
<script>
	export default {
		props:{
			food:{
				type:Object
			}
		},
		methods:{
			add(event) {
				if(!event._constructed){
					return
				}
				if(!this.food.count){
					/*
						当生成vue实例后，当再次给数据赋值时，有时候并不会自动更新到视图上去
						eg: this.food.count = 1;
						console.log(this.food)，发现是有count这个属性，但是没有更新到视图上
						这时候要用vm.$set( target, key, value );
					*/
					this.$set(this.food,'count',1);
				}else{
					this.food.count ++;
				}
				this.$emit('add-cart',event.target);
			},
			remove(event) {
				if(!event._constructed){
					return
				}
				if(this.food.count){
					this.food.count --;
				}
			}
		}
	}
</script>