<template>
	<div v-if="false" class="comHeader" :class="{noS: isTab}">
		{{title}}
		<div class="imgDiv">
			<img @click="toBack()" class="imgBack" src="../assets/ZA_back.png" />
			<!-- <img v-if="isShare" @click="toShare()" class="imgShare" src="../../assets/health/ZA_share.png" /> -->
			<img v-if="isMore" @click="toShare()" class="imgShare" src="../assets/more.png" />
		</div>
		<span v-if="label" @click="doSomething" class="someLabel">{{label}}</span>
	</div>
</template>
<script>
	export default {
		name: 'comHeader',
		components: {
		},
		props: {
			title: {
				type: String,
				required: true
			},
			label: {
				type: String,
				required: false,
				default: ''
			},
			isShare: {
				type: Boolean,
				required: false,
				default: false
			},
			isMore: {
				type: Boolean,
				required: false,
				default: false
			},
			isTab: {
				type: Boolean,
				required: false,
				default: false
			},
			fallBack: {
				required: false,
				default: false
			}
		},
		data() {
			return {
				lineLeft: 37,
				tabIndex: 0
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
			doSomething(){
				console.log(666)
				this.$emit('doSomething')
			}
		},
		mounted() {
		}
	}
</script>

<style lang="scss" scoped>
	.someLabel{
		position: absolute;
		top: px(31);
		right: px(26);
		font-size: px(28);
		color: #333;
	}
	.noS{
		box-shadow:none !important;
	}
	.comHeader{
		display: flex;
		overflow: auto;
		justify-content: space-around;
		align-items: center;
		height: px(98);
		background: #fff;
		box-shadow:0px px(2) px(4) 0px rgba(0,0,0,0.2);
		color: #333333;
		font-size: px(36);
		// font-weight: 5;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		font-weight: 600;
		z-index: 6999;
	}
	.imgDiv{
		position: absolute;
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		padding-left: px(32);
		padding-right: px(25);
		display: flex;
		justify-content: space-between;
		align-items: center;
		left: 0;
		top: 0;
		
		.imgBack{
			width:px(24);
			height:px(34);
		}
		.imgShare{
			width:px(40);
			height:px(37);
		}
	}
</style>
