<template>
	<div ref="content" class="ZA_template">
		<comHeader title="健康告知"></comHeader>
		<div class="ZA_template_S" :class="{ haveHeader: ISWX, haveFoot: true }">
			<!-- 身高多少<input class="comInput1"/>哈哈哈 -->
			<div :key="index" v-for="(item,index) in healthData" class="questionItem">
				<div v-if='item.type == 1'>
					{{index + 1}}.
					<span v-html="item.title"></span>
				</div>
				<div v-else>
					{{index + 1}}.
					{{item.title}}
					<span v-html="item.title"></span>
					{{item.preQuestion}}
					<input v-model="item.value" class="comInput1" />
					{{item.postQuestion}}</div>
			</div>
		</div>
		<div class="thisFoot1">
			<div @click="Verification" class="footLeft">部分为是</div>
			<div @click="changeShow" class="footRight">以上皆否</div>
		</div>
		<div v-transfer-dom>
			<x-dialog class="thisM" v-model="isShow">
				<div class="thisModel1">
					<div style="text-align: right;">
						<img @click="closeEx" class="close" src="../../assets/yClose.png" />
					</div>
					<img class="bg" src="../../assets/robat.png" />
					<div class="modelContent">
						使用智能核保
						<div class="bigFont">了解被保人是否可以投保</div>
						<div @click="toFill" class="comBtn">智能评估</div>
						<div class="lightColor">你可以为自己或家人评测，整个过程将不超过 1 分钟，且评估结果仅对本次投保有效。</div>
					</div>
				</div>
			</x-dialog>
		</div>

	</div>
</template>

<script>
	import {
		formSubmmit
	} from '../../commonJS/common.js'
	import {
		XDialog
	} from 'vux';
	import {
		TransferDomDirective as TransferDom
	} from 'vux';
	export default {
		directives: {
			TransferDom
		},
		name: 'healthNotification',
		components: {
			XDialog
		},
		data() {
			return {
				isShow: false,
				healthData: [],
				routerInfo: {},
				orderId: '',
				Wurl: '',
				param: {}
			};
		},
		computed: {},
		methods: {
			async Verification() {
				let getInfo = await this.postData('Y');
				this.$longData(0, 'orderId', getInfo.orderId)
				if (getInfo.isSmart == 'N') {
					this.orderId = getInfo.orderId;
					this.$vux.confirm.show({
						// 组件除show外的属性
						content: '很抱歉您暂时无法投保，推荐投保其他产品',
						onCancel() {
							// console.log(this); // 非当前 vm
							// console.log(_this); // 当前 vm
						},
						onConfirm() {}
					});
				} else {
					this.isShow = true;
					console.error(getInfo.responseType)
					if (getInfo.responseType == 1) {
						let {
							param,
							url
						} = getInfo.formObj;
						this.Wurl = url;
						this.param = param;

					} else {
						this.orderId = getInfo.orderId;
					}
				}

			},
			async changeShow() {
				let getInfo = await this.postData('N');

					this.$router.push({
						name: 'fillInfo',
						query: {
							goodsId: this.routerInfo.goodsId,
							orderId: getInfo.orderId,
						}
					});
			},
			toFill() {
				let self = this;
				if (this.Wurl) {
					formSubmmit(this.Wurl, this.param)
				} else {
					this.$router.push({
						name: 'intelligentUnderwriting',
						query: {
							goodsId: this.routerInfo.goodsId,
							orderId: this.orderId,
						}
					});
				}

			},
			closeEx() {
				this.isShow = false;
			},
			postData(value) {
				let tep = this.$longData(1, 'goodsInfo');
				let self = this;
				let tepdata = {
					requestChannel: 'H5',
					pass: value,
					answerArr: [],
					goodsId: this.routerInfo.goodsId,
					trialId: this.routerInfo.trialId,
					bdCode: tep.bdCode,
					agentCode: tep.agentCode,
					userId: tep.userId,
					systemChannel: tep.systemChannel,
					promotionId: tep.promotionId,
					boothCode: tep.boothCode,
					promotionCode: tep.promotionCode,
					promotionName: tep.promotionName,
					channelCode: tep.channelCode,
					merchantName: tep.merchantName,
					merchantCode: tep.merchantCode,
					promoteMethod: tep.promoteMethod,
					merchantId: tep.merchantId,
					
				}
				let param = [];
				this.healthData.forEach(item => {
					console.log(item)
					tepdata.answerArr.push({
						key: item.id,
						value: item.value || value
					})
				})
				return new Promise((resolve) => {
					self.Axios('saveHealthNotifyList', tepdata, 'post')
						.then(res => {
							console.log(res)
							resolve(res.data.data)
						})
				})


			},
			test: function() {
				let tepData = {};
				var self = this;
				this.$axios('../../../static/falseData.json', tepData, 'get').then(function(res) {
					console.log(res.data);
					// 6666
					let {
						productDetail
					} = res.data;
					self.productData = productDetail;
				});
			},
			getData: function() {
				var self = this;
				this.Axios('getHealthNotifyList', `goodsId=${self.routerInfo.goodsId}`).then(results => {
					console.log(results.data.data);
					self.healthData = results.data.data;
				});
			}
		},
		created() {
			this.$setTitle('健康告知')
			console.log(this.$longData(1, 'testData'))
			console.log(this.$route.query)
			this.routerInfo = {
				goodsId: this.$route.query.goodsId,
				trialId: this.$route.query.trialId,
			}
			this.getData();
		},
		mounted() {
			// this.test()
		}
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	@import './index.scss';
</style>
