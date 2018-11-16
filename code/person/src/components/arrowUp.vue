<template>
	<div class="arrow up">
		<div class="arrow-up"></div>
		<div class="arrow-up"></div>
		<div class="arrow-up"></div>
	</div>
</template>

<script>
	export default {}
</script>

<style lang="scss">
	.arrow.up {
		position: absolute;
		top: 2%;
		left: 50%;
		.arrow-up {
			position: relative;
			animation: jumpUp 1s infinite;
			&:nth-child(2) {
				top: 10px;
				&:before {
					left: -12px;
					transform: scale(.8) rotateZ(-45deg);
				}
				&:after {
					left: -4px;
					transform: scale(.8) rotateZ(45deg);
				}
			}
			&:nth-child(3) {
				top: 20px;
				&:before {
					left: -11px;
					transform: scale(.6) rotateZ(-45deg);
				}
				&:after {
					left: -5px;
					transform: scale(.6) rotateZ(45deg);
				}
			}
			&:before {
				content: '';
				position: absolute;
				left: -13px;
				bottom: 3px;
				width: 15px;
				height: 2px;
				background: #fff;
				transform: rotateZ(-45deg);
			}
			&:after {
				content: '';
				position: absolute;
				left: -3px;
				bottom: 3px;
				width: 15px;
				height: 2px;
				background: #fff;
				transform: rotateZ(45deg);
			}
		}
	}
	@keyframes jumpUp {
		0% {
			transform: translateY(30px);
		}
		50% {
			transform: translateY(5px);
		}
		100% {
			opacity: 0;
			transform: translateY(0px);
		}
	}
</style>
