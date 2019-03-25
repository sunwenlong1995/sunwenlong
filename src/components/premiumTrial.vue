<template>
	<div :class="{deepBg : isShow,somBg : !isShow}" class="shadowLayer">
		<transition name="bottomTop">
			<div v-if="isShow" class="someContent">
				<div v-if="WaitThis" class="wait">
					<Spinner type='ios'></Spinner>
				</div>
				<img @click="close" class="thisImg" src="../assets/close.png" />
				<div class="thisTitle">保费试算</div>
				<div class="sunTitle">
					{{productData.goodsName}}
					<div class="someFont">{{productData.acceptAge}}</div>
				</div>


				<div class="thisOver">
					<div class="titleBottom SYSY" :key="index_s" v-for="(item_s,index_s) in productData.trialConfig">
						<formCom @changeLD='changeLD' :item='item_s'></formCom>
					</div>
					<div class="dadad">
						<div class="ThisB">产品相关文件</div>
						<div class="othert">
							<span @click="toWord(item_s.value)" :key="index_s" v-for="(item_s,index_s) in itemArr">《{{item_s.key}}》</span>
						</div>
					</div>
				</div>

			</div>
		</transition>
	</div>
</template>
<script>
	import {
		debonce
	} from '../commonJS/common.js'
	import {
		Spinner
	} from 'vux'
	import formCom from './formCom.vue'
	export default {
		name: 'premiumTrial',
		components: {
			formCom,
			Spinner
		},
		props: {
			// Banner title
			title: {
				type: String,
				required: false,
				default: '打开App, 浏览更多'
			},
			productInfo: {
				type: Object,
				required: true,
			},
			goodsId: {
				type: [Number, String],
				required: true,
			},
			orderId: {
				type: [Number, String],
			},
			itemArr: {
				type: Array,
				required: true,
			},
			errName: {},

		},
		data() {
			return {
				productData: {},
				isShow: false,
				WaitThis: true,
				// 联动数组
				LDARR: [],
				open: true,
				debonceGetResult: '',
				deboncePushResult: ''
			}
		},
		watch: {
			// 'productData.trialConfig': {
			'productData.trialConfig': {
				handler: function(value) {
					

				},
				deep: true
			}
		},
		methods: {
			changeLD() {
				console.log(22222222)
				let self = this;
				let value = this.productData.trialConfig;
				let tepData = {}
				for (let i = 0; i < value.length; i++) {
					tepData[value[i].id] = value[i].value
				}
				for (let i = 0; i < this.LDARR.length; i++) {
					let item = this.LDARR[i];
					// 判断每一个条件因子是否填满
					let isT = true;
					for (let j = 0; j < item.length; j++) {
						let items = item[j];
// 						console.error(tepData[items.id])
// 						console.error(items.id)
// 						console.error(tepData)
						if (tepData[items.id] === '' || tepData[items.id] === null) {
							isT = false
							break
						} else {
							items.relValue = tepData[items.id]
						}
					}
					if (isT) {
						self.debonceGetResult(item)
					}else{						
						self.deboncePushResult()
					}

				}
			},
			// 预算所有参数有值后通知父页面发起预算接口
			pushResult(){
				console.log(11111111111)
				let trialConfig = this.productData.trialConfig;
// 				if (!this.open) {
// 					this.open = true;
// 					return
// 				}
				let self = this;
				let isFull = true;
				for (let i = 0; i < trialConfig.length; i++) {
					if (!trialConfig[i].value) {
						this.$emit('update:errName', trialConfig[i].name)
						isFull = false;
						break
					}
				}
				if (isFull) {
					self.$emit('input', this.productData)
				}
			},
			toWord(url) {
				this.$longData(0, 'SSDATA', this.productData);
				location.href = url;
			},
			close() {
				let self = this;
				this.isShow = false;
				setTimeout(function() {
					self.$emit("closeEx")
				}, 500)
			},
			openPicker: function() {
				document.getElementById('Date').click()
				// this.$refs.Date.click()
			},
			getData: function() {
				let goodsId = this.goodsId;
				let orderId = this.orderId || '';
				var self = this;
				this.Axios('getGoodsPremVars', `goodsId=${goodsId}&orderId=${orderId}`).then(function(res) {
					console.log(res.data.data)
					if (self.$longData(1, 'SSDATA') && self.goodsId == self.$longData(1, 'goodsId')) {
						self.productData = self.$longData(1, 'SSDATA')
					} else {
						self.productData = res.data.data;
						// 						self.productData.trialConfig.forEach((item, index) => {
						// 							self.$set(self.productData.trialConfig[index], 'value', '')
						// 						})
					}
					self.$longData(0, 'goodsId', self.goodsId)
					let factorRelation = res.data.data.factorRelation;
					let trialConfig = res.data.data.trialConfig;
					let tepData = {};
					let result = [];
					factorRelation.forEach((item) => {
// 						if(item.length == 1){
// 							tepData[item[0].id] = item;
// 						}else{
// 							// self.LDARR.push(item)
// 						}
						item.forEach((items) => {
							if(!tepData[items.id]){
								tepData[items.id] = item;
							}
						})
						
					})
					
					trialConfig.forEach((item) => {
						if(tepData[item.id]){
							result.push(tepData[item.id])
						}
					})
					
					console.log(result)
					console.log(tepData)
					console.log('22222222222222222222------------>')
					self.LDARR = factorRelation
					// console.error(arr)
				})
			},
			// 获取联动结果
			getResult: function(value) {
				
				let self = this;
				console.error(1111)
				let goodsId = this.goodsId;
				this.Axios('getFactor', value, 'post').then(function(res) {
					console.log(res)
					let obj = res.data.data;
					let value = self.productData.trialConfig;
					for (let i = 0; i < value.length; i++) {
						if (value[i].id == obj.id) {
							self.open = false;
							self.$set(self.productData.trialConfig[i], 'selectArr', obj.selectArr)
							break
						}
					}
					self.pushResult()
				})
			},
		},
		created() {
			// getGoodsPremVars
			this.debonceGetResult = debonce(this.getResult,500)
			this.deboncePushResult = debonce(this.pushResult,500)
			this.getData()
			setTimeout(() => {
				this.WaitThis = false
			}, 500)
		},
		mounted() {

			this.isShow = true
		}
	}
</script>

<style scoped lang="scss">
	a {
		outline: none;
		-moz-outline-style: none;
		color: #0670C5 !important;
	}

	.wait {
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		right: 0;
		z-index: 999;
		display: flex;
		justify-content: center;
		background: #fff;

		.vux-spinner {
			margin-top: 47%;
		}
	}

	.dadad {
		display: flex;
		padding-top: px(28);
		padding-bottom: px(16);
	}

	.othert {
		text-align: left;
		line-height: 1.5;

		span {
			font-size: px(28) !important;
			color: #0670C5 !important;
		}

		// 		display: flex;
		// 		justify-content: flex-start;
		// 		flex-wrap: wrap;
		// padding: 0 px(30);
	}

	.ThisB {
		display: inline-block;
		min-width: px(186);
		max-width: px(186);
		box-sizing: border-box;
		margin-left: px(40);
		// padding: px(28) 0;
		text-align: left;
		font-size: px(28);
		padding-bottom: px(20);
		color: #494949;
	}

	.otherInfo {
		display: inline-block;
		padding-bottom: px(20);

	}

	.thisOver {
		height: px(529);
		overflow: auto;
		-webkit-overflow-scrolling: touch;
	}

	.sunTitle {
		text-align: left;
		height: px(134);
		padding-top: px(18);
		padding-bottom: px(24);
		padding-left: px(42);
		font-size: px(36);
		font-weight: bold;
		box-sizing: border-box;
		color: $deep-color;
		background-color: $bg-light-color;

		.someFont {
			font-weight: normal;
			color: $light-color2;
			font-size: px(24);
			margin-top: px(9);
		}
	}

	.thisTitle {
		font-size: px(36);
		color: $light-color;
		font-weight: bold;
		padding-top: px(38);
		padding-bottom: px(29);
	}

	.thisImg {
		width: px(44);
		height: px(44);
		position: absolute;
		right: px(40);
		top: px(41);
	}

	.someContent {
		webkit-transform: translate3d(0, 0, 0);
		-moz-transform: translate3d(0, 0, 0);
		-ms-transform: translate3d(0, 0, 0);
		-o-transform: translate3d(0, 0, 0);
		transform: translate3d(0, 0, 0);
		height: 438px;
		border-radius: px(20) px(20) 0px 0px;
		background-color: #FFFFFF;
		// height: auto;
		left: 0;
		right: 0;
		bottom: 0;
		position: absolute;
		box-sizing: border-box;
		padding-bottom: px(98);
	}

	.shadowLayer {
		webkit-transform: translate3d(0, 0, 0);
		-moz-transform: translate3d(0, 0, 0);
		-ms-transform: translate3d(0, 0, 0);
		-o-transform: translate3d(0, 0, 0);
		transform: translate3d(0, 0, 0);
		position: fixed;
		/* 固定定位 */
		z-index: 2;
		/* 设置在顶层 */
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		overflow: auto;
		display: flex;
		align-items: center;
	}

	.deepBg {
		animation: deep 0.5s forwards;
	}

	.somBg {
		animation: deep1 0.5s forwards;
	}

	@keyframes deep1 {
		from {
			background-color: rgba(0, 0, 0, 0.6)
		}

		to {
			background-color: rgba(0, 0, 0, 0)
		}
	}

	@keyframes deep {
		from {
			background-color: rgba(0, 0, 0, 0)
		}

		to {
			background-color: rgba(0, 0, 0, 0.6)
		}
	}

	.bottomTop-enter-active {
		animation: bottomTop-com 0.5s;
	}

	.bottomTop-leave-active {
		animation: bottomTop-com 0.5s reverse;
	}

	@keyframes bottomTop-com {
		0% {
			transform: translateY(100%);
		}

		100% {
			transform: translateY(0%);
		}
	}
</style>
