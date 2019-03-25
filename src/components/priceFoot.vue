<template>
	<div class="thisFoot" >
		<div v-if="notitle" :class="{some : !notitle}" class="footLeft">
				
				<span v-if="!price && low">
					最低保费
					<span class="litterFont">￥</span>
					<span class="moneyFont">{{minPremiumL.split(',')[0]}}</span>
					{{minPremiumL.split(',')[1]}}
				</span>
				<span v-else>
					{{title}}
					<span class="litterFont">￥</span>
					<span class="moneyFont">{{price ||  '--' }}</span>
					{{minPremiumL.split(',')[1]}}
				</span>
		</div>
		<div @click="changeShow" :class="{widthL : !notitle,canClick: !isCan}" class="footRight">立即投保</div>
	</div>
</template>
<script>
	export default {
		name: 'priceFoot',
		components: {
		},
		props: {
			title: {
				type: String,
				required: false,
				default: '保费'
			},
			price: {
				type: [Number,String],
				required: true
			},
			notitle: {
				type: Boolean,
				required: false,
				default: true
			},
			isCan: {
				type: Boolean,
				required: false,
				default: true
			},
			low: {
				type: Boolean,
				required: false,
				default: true
			},
			minPremium: {
				required: false,
				default: ''
			},
		},
		data() {
			return {
				priceL: '',
			}
		},
		computed: {
			minPremiumL() {
				// this.$longData(0,'minPremium',this.minPremiumL)
				console.log(this.$longData(1,'minPremium'))
				return this.minPremium || this.$longData(1,'minPremium')
			}
		},
		watch: {},
		methods: {
			toShare: function(){
				this.$emit('toShare')
			},
			toBack: function(){
				console.log(this.fallBack)
				if(this.fallBack){
					this.fallBack()
				}else{
					history.back(-1)
				}
				
			},
			changeShow(){
				console.log(666)
				this.$emit('changeShow')
			}
		},
		created(){
// 			console.log(this.minPremium)
// 			console.log(2222222222222222222222)
// 			this.priceL = this.price;
// 			this.minPremiumL = this.minPremium || this.$longData(1,'minPremium')
// 			this.$longData(0,'minPremium',this.minPremiumL)
		}
	}
</script>

<style lang="scss" scoped>
	.canClick{
		background-color: #B9EDF1 !important;
	}
	.some{
			padding-left: 0 !important;
	}
	.widthL{
		width: 100% !important;
	
	}
	.kf{
		// border-left: 1px solid $border-color;
		width: px(118);
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		color: $light-color;
		font-size: px(24);
		
		img{
			width: px(40);
			height: px(40);
		}
	}
	.thisFoot:before {
		content: '';
		position: absolute;
		left: 0;
		top: 0;
		width: 200%;
		height: 0;
		border-bottom: 1px solid #e8e8e8;
		// border-bottom: 1px solid red;
		-webkit-transform-origin: 0 0;
		-moz-transform-origin: 0 0;
		-ms-transform-origin: 0 0;
		-o-transform-origin: 0 0;
		transform-origin: 0 0;
		-webkit-transform: scale(0.5, 0.5);
		-ms-transform: scale(0.5, 0.5);
		-o-transform: scale(0.5, 0.5);
		transform: scale(0.5, 0.5);
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
	}
.thisFoot{
	position: fixed;
	height: px(98);
	bottom: 0;
	left: 0;
	display: flex;
	justify-content: space-between;
	align-items: center;
	background: #fff;
	width: 100%;
	z-index: 88;
	box-shadow: 0px 0px 4px 0px rgba(220, 220, 220, 1);
	
	.footRight{
		width: px(230);
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: $snail-light-color;
		color: #fff;
		font-size: px(36);
		font-weight: bold;
		height: 100%;
		transition: all .5s;
	}
	.footLeft{
		flex: 1;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 100%;
		font-size: px(32);
		padding-left: px(32);
		color: $deep-color;
		font-weight: 400;
		
		.litterFont{
			font-size: px(24);
		}
		.moneyFont{
			color: #FEAE4C;
			font-weight: bold;
			font-size: px(40);
		}
	}
}
</style>
