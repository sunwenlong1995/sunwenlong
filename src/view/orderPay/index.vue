<template>
	<div ref="content" class="ZA_template">

		<comHeader title="支付订单"></comHeader>
		<div class="ZA_template_S" :class="{ haveHeader: ISWX, haveFoot: false }">
			<div class="test1 list_div">
				<div class="datted"></div>
				<!-- 订单信息 -->
				<div class="title">实付金额</div>
				<div class="price">
					<span class="font1">￥</span>
					<span class="font2">{{payInfo.premium}}</span>
				</div>

				<div class="productInfo">
					<div class="listItem">
						<div class="itemLeft">投保产品</div>
						<div class="itemRight">{{payInfo.goodsName}}</div>
					</div>
					<div class="listItem">
						<div class="itemLeft">保额</div>
						<div class="itemRight">{{payInfo.amount}}</div>
					</div>
					<div class="listItem">
						<div class="itemLeft">缴费期间</div>
						<div class="itemRight">{{payInfo.premPeriodNumber}}</div>
					</div>
					<div class="listItem">
						<div class="itemLeft">保障期间</div>
						<div class="itemRight">{{payInfo.insurePeriod}}</div>
					</div>
					<div class="listItem">
						<div class="itemLeft">起保日期</div>
						<div class="itemRight">{{payInfo.effectDate}}</div>
					</div>
					<div class="listItem">
						<div class="itemLeft">保费</div>
						<div class="itemRight">{{payInfo.premium}}</div>
					</div>

				</div>
			</div>
			<!-- 支付方式 -->
			<div class="title1">支付方式</div>
			<div :key="index" v-for="(item,index) in payInfo.payType" @click="chooseIndex = item.id" class="payWayItem">
				<!-- <img class="wx" src="../../assets/wx.png" alt=""> -->
				<!-- 90wx91zfb92card -->
				<img v-if="item.id == 90" class="wx" src="../../assets/wx.png" alt="">
				<img v-else-if="item.id == 92" class="card" src="../../assets/card.png" alt="">
				<img v-else-if="item.id == 91" class="zfb" src="../../assets/zfb.png" alt="">
				<div class="rightItem">
					<span>{{item.name}}</span>
					<img v-if="chooseIndex == item.id" class="imgT" src="../../assets/radioChoose.png" alt="">
					<img v-else class="imgT" src="../../assets/noChoose.png" alt="">
				</div>
			</div>
			<!-- <div @click="chooseChooseIndex(0)" class="payWayItem">
				<img class="wx" src="../../assets/wx.png" alt="">
				<div class="rightItem">
					<span>微信支付</span>
					<img v-if="chooseIndex == 0" class="imgT" src="../../assets/radioChoose.png" alt="">
					<img v-else class="imgT" src="../../assets/noChoose.png" alt="">	
				</div>
			</div>
			<div @click="chooseChooseIndex(1)" class="payWayItem">
				<img class="card" src="../../assets/card.png" alt="">
				<div class="rightItem">
					<span>银行卡支付</span>
					<img v-if="chooseIndex == 1" class="imgT" src="../../assets/radioChoose.png" alt="">
					<img v-else class="imgT" src="../../assets/noChoose.png" alt="">	
				</div>
			</div> -->
			<!-- aniu -->
			<div class="comBtn thisBtn" @click="payMoney">立即支付</div>
		</div>
	</div>
</template>

<script>
	import {
		formSubmmit
	} from '../../commonJS/common.js'
	export default {
		name: 'orderPay',
		components: {},
		data() {
			return {
				productList: [],
				chooseIndex: 1,
				goodsId: '',
				orderId: '',
				payInfo: {},
				payType: ''
			};
		},
		watch: {},
		computed: {},
		methods: {
			async payMoney() {
				let self = this;
				let isAceept = await this.postData();
				let payStatus = 3
				// 支付中
				while (payStatus == 3) {
					payStatus = await this.checkStatus()
					if (payStatus == 3) {
						await self.$timeout(3000)
					}
				}
				if (payStatus == 4) {
					this.$loading(false)
					this.$router.push({
						name: 'payStatus',
						query: {
							success: 0,
							time: self.$formatmyyear(new Date()),
							price: self.payInfo.premium,
						}
					});
				} else if (payStatus == 5) {
					this.$loading(false)
					this.$router.push({
						name: 'payStatus',
						query: {
							success: true,
							time: self.$formatmyyear(new Date()),
							price: self.payInfo.premium,
						}
					});
				}
			},
			payWx(){
				let self = this;
				function pay() {
					WeixinJSBridge.invoke(
						'getBrandWCPayRequest', {
							"appId": data.appId,
							"timeStamp": data.timeStamp,
							"nonceStr": data.nonceStr,
							"package": `prepay_id=${data.prepay_id}`,
							"signType": data.signType,
							"paySign": data.paySign
						},
						function(res) {
							// alert(res.err_msg);
							if (res.err_msg == "get_brand_wcpay_request:ok") {
							
								// 使用以上方式判断前端返回,微信团队郑重提示：
								//res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
							} else {
				
							}
						});
				}
				if (typeof WeixinJSBridge == "undefined") {
					if (document.addEventListener) {
						document.addEventListener('WeixinJSBridgeReady', pay, false);
					} else if (document.attachEvent) {
						document.attachEvent('WeixinJSBridgeReady', pay);
						document.attachEvent('onWeixinJSBridgeReady', pay);
					}
				} else {
					pay();
				}
			},
			postData() {
				var self = this;

				function isWeiXin() {
					//window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
					var ua = window.navigator.userAgent.toLowerCase();
					//通过正则表达式匹配ua中是否含有MicroMessenger字符串
					if (ua.match(/MicroMessenger/i) == 'micromessenger') {
						return true;
					} else {
						return false;
					}
				}
				let tepData = {
					orderId: this.orderId,
					goodsId: this.goodsId,
					payType: this.chooseIndex,
					payChannel: isWeiXin() ? 'WX' : 'H5'
				}
				return new Promise(resolve => {
					self.Axios('pay', tepData, 'post').then(res => {
							console.log(res);
							// form 表单形式
							let type = res.data.data.responseType;
							if (type == '4') {
								let {
									url,
									param
								} = res.data.data.formObj;
								formSubmmit(url, param)
							} else if(type == '3'){
								location.href = res.data.data.url
							} else if(type == '6'){
								self.payWx(data)
								
							}else if(type == '2'){
								self.$loading(true,'支付中...')
								resolve(true)
							}else if(type == '1'){
								self.$router.push({
									name: 'payStatus',
									query: {
										success: res.data.data.result,
										time: self.$formatmyyear(new Date()),
										price: self.payInfo.premium,
										msg: res.data.data.resultCode
									}
								});
							}

						})
						.catch(err => {
							self.$loading(false)
						})
				})
			},
			checkStatus() {
				let self = this;
				return new Promise(resolve => {
					self.Axios('getOrderStatusByOrderId', `orderId=${self.orderId}`).then(results => {
							console.log(results.data.data);
							let {
								payStatus
							} = results.data.data;
							resolve(payStatus)
						})
						.catch(err => {
							self.$loading(false)
						})
				})
			},
			chooseChooseIndex(index) {
				if (index == 0) {
					this.$toast('暂不支持')
					return
				}
				this.chooseIndex = index;
			},
			test: function() {
				let tepData = {};
				var self = this;
				this.$axios('../../../static/falseData.json', tepData, 'get').then(function(res) {
					console.log(res.data);
					// 6666
					let {
						productList
					} = res.data;
					self.productList = productList;
				});
			},
			getData: function() {
				// alert(1)
				var self = this;
				let tepData = {
					goodsId: this.goodsId,
					orderId: this.orderId,
				}
				this.Axios('getPayInfo', tepData, 'post').then(results => {
					console.log(results);
					self.payInfo = results.data.data;
				});
			}
		},
		created() {
			this.$setTitle('支付订单')
			// this.test();
			this.goodsId = this.$route.query.goodsId;
			this.orderId = this.$route.query.orderId;
			this.getData()
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
