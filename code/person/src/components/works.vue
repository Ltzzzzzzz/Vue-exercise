<template>
	<div id="works" class="bg">
		<arrowUp></arrowUp>
		<h1 class="title">作品集</h1>
		<div class="content">
			<div class="works-wrapper" ref="worksWrapper">
				<div ref="worksList">
					<div class="work" ref="work" v-for="(work,index) in works" :key="index" 
					@mouseover = "showBack(index)"
					@mouseout = "showFront(index)"
					@click = "show(index)"
					>
						<div class="work-wrapper">
							<div class="front">
								<div class="mask">
									<div class="img">
										<img :src="work.src" :alt="work.name" width="100%">
									</div>
								</div>
								<h4 class="name">{{work.name}}</h4>
							</div>
							<div class="back">
								<div class="back-wrapper">
									<div class="back-content">
										<div class="desc">{{work.desc}}</div>
										<div class="duty">{{work.duty}}</div>
										<ul class="main">
											<li v-for="(text,index) in work.main" :key="index">{{text}}</li>
										</ul>
									</div>
									<div class="footer">
										<div class="link">
											<a target="_blank" :href="work.link">
												<span class="fa fa-link"></span>
											</a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<arrowDown></arrowDown>
	</div>
</template>

<script>
	import arrowDown from './arrowDown.vue';
	import arrowUp from './arrowUp.vue';
	import BScroll from 'better-scroll';
	
	export default {
		props: {
			works: {
				type: Array,
				default(){
					return []
				}
			},
		},
		created(){
			this.$nextTick(()=>{
				this.scrollInit();
				this.delay();
			})
		},
		watch: {
			works() {
				this.$nextTick(()=>{
					this.scrollInit();
					this.delay();
				})
			}
		},
		methods: {
			delay(){
				let works = this.$refs.work;
				for(let i in works){
					works[i].style.transitionDelay = i * 0.2 + 0.4 +'s';
				}
			},
			scrollInit() {
				if (window.innerWidth < 500) { 
					let worksWrapper = this.$refs.worksWrapper;
					let worksList = this.$refs.worksList;
					let w = 240;
					let mr = 20;
					let length = this.works.length;
					worksList.style.width = (w + mr) * length + 'px';
					worksList.style.padding = '0 20px';
					if(!this.workScroll){
						this.workScroll = new BScroll(worksWrapper,{
							scrollX:true,
							click:true
						})
					}else{
						this.workScroll.refresh();
					}
				}else{
					let worksList = this.$refs.worksList;
					worksList.style.padding = 0 ;
				}
			},
			showBack(i) {
				if (/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)) { 
					return
				}
				let work = this.$refs.work[i];
				let works = this.$refs.work;
				works.forEach(item => {
					item.classList.remove('active');
				})
				work.classList.add('active');
			},
			showFront(i) {
				if (/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)) { 
					return
				}
				let works = this.$refs.work;
				works.forEach(item => {
					item.classList.remove('active');
				})
			},
			show(i) {
				let work = this.$refs.work[i];
				let classArr = work.className.split(' ');
				let works = this.$refs.work;
				works.forEach(item => {
					item.classList.remove('active');
				})
				if(classArr.indexOf('active') === 1){
					work.classList.remove('active');
				}else{
					work.classList.add('active');
				}
				
			}
		},
		components:{
			arrowUp,
			arrowDown
		},
	}
</script>

<style lang="scss" scoped="scoped">
	#works {
		position: relative;
		background-color: #4b85a0;
		.title {
			position: absolute;
			top: 100px;
			width: 100%;
			text-align: center;
			font-size: 24px;
			color: #fff;
			-ms-user-select: none;
			-moz-user-select: none;
			-webkit-user-select: none;
			@media (max-width: 500px) {
				top: 60px;
				font-size: 18px;
			}	
		}
		.content {
			position: absolute;
			top: 160px;
			right: 0;
			bottom: 0;
			left: 0;
			@media (max-width: 500px) {
				top: 120px;
			}	
			.works-wrapper {
				display: flex;
				flex-wrap: wrap;
				margin: 0 auto;
				max-width: 1000px;
				@media(max-width:500px){
					max-width: 100%;
					white-space: nowrap;
				}
				.work {
					display: inline-block;
					vertical-align: top;
					margin-right: 10px;
					margin-bottom: 10px;
					width: 240px;
					-ms-user-select: none;
					-moz-user-select: none;
					-webkit-user-select: none;
					opacity: 0;
					transition: .5s linear;
					@media(max-width:500px){
						margin-right: 20px;
						margin-bottom: 10px;
					}
					&.active {
						.front {
							transform: rotateY(180deg)!important;
							@media(max-width:500px){
								opacity: 0!important;
							}
						}
						.back {
							transform: rotateY(0deg)!important;
							@media(max-width:500px){
								opacity: 1!important;
							}
							.footer {
								.link {
									visibility: visible!important;
									opacity: 1!important;
									transform: translateY(0)!important;
								}
							}
						}
					}
					.work-wrapper {
						position: relative;
						height: 350px;
						
						.front {
							position: absolute;
							top: 0;
							right: 0;
							bottom: 0;
							left: 0;
							display: flex;
							justify-content: center;
							align-items: center;
							backface-visibility: hidden;
							box-shadow: 2px 2px 10px gold, 2px 2px 10px purple;
							transition: all 1s;
							border-radius: 10px;
							.name {
								padding: 5px;
								border: 1px solid #fff;
								border-radius: 4px;
								color: #fff;
								z-index: 2;
							}
							.mask {
								position: absolute;
								width: 100%;
								height: 100%;
								border-radius: 10px;
								overflow: hidden;
								&:before {
									content: '';
									position: absolute;
									top: 0;
									left: 0;
									width: 100%;
									height: 100%;
									background: rgba(0,0,0,.5);
									border-radius: 10px;
									z-index: 1;
								}
								.img {
									border-radius: 10px;
									opacity: .7;
								}
							}
						}
						.back {
							height: 100%;
							box-shadow: 2px 2px 10px gold, 2px 2px 10px purple;
							transform: rotateY(-180deg);
							backface-visibility: hidden;
							border-radius: 10px;
							transition: all 1s;
							@media(max-width:500px){
								opacity: 0;
							}
							.back-wrapper {
								width: 100%;
								height: 100%;
								border-radius: 10px;
								background: rgba(0,0,0,.5);
								overflow: hidden;
								.back-content {
									padding: 10px 10px 60px;
									line-height: 1.5;
									min-height: calc(100% - 70px);
									color: #fff;
									font-size: 12px;
									
									@media(max-width:500px){
										white-space: initial;
									}
									.main {
										li:before {
											content: '';
											display: inline-block;
											vertical-align: middle;
											margin-right: 5px;
											width: 2px;
											height: 2px;
											border: 1px solid #fff;
											border-radius: 50%;
										}
									}
								}
								.footer {
									margin-top: -40px;
									.link {
										padding: 5px 10px;
										margin: 0 auto;
										line-height: 20px;
										width: 30px;
										height: 20px;
										text-align: center;
										border: 1px solid #fff;
										border-radius: 4px;
										visibility: hidden;
										opacity: 0;
										transform: translateY(10px);
										transition: transform 1s,opacity 1s;
										transition-delay: .5s;
										a {
											color: #fff;
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
</style>

