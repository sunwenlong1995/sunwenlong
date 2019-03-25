<template>
	<div ref='content' :class="{ZA_template: !isLeave,ZA_templateS: isLeave}">
		<comHeader title='产品详情' :isMore="true"></comHeader>
		<div :class="{haveHeader: ISWX,haveFoot: true,ZA_template_SS: isLeave,ZA_template_S: !isLeave}">
			<div class="listContent">
				<img id='Img' style="width: 100%;display: block;" :src="productData.mainImageUrl" alt="">
				<!-- <div v-for="(item,index) in productData.info" class="listItem" :class="{noBorder: index == productData.info.length-1}">
					<span class="listItemLeft">{{item.key}}</span>
					<span class="listItemRight">{{item.value}}</span>
				</div> -->
				<div class="listItem">
					<span class="listItemLeft">产品名称</span>
					<span class="listItemRight" v-html="productData.goodsName"></span>
				</div>
				<div v-html="productData.baseInfo" style="padding: 10px 0;">
					<!-- <span class="listItemLeft">产品基本信息</span>
					<span class="listItemRight" v-html="productData.baseInfo"></span> -->
				</div>
			</div>
			<!-- {{chooseIndex}} -->
			<tab ref="tab" :class="{Fixed: isShow}" default-color="#999999" bar-active-color="#17c3d2" active-color="#17c3d2">
				<tab-item :key="index" :selected="chooseIndex == index" v-for="(item,index) in productData.productDistr"
				 @on-item-click="changeChooseIndex(index)">{{item.key}}</tab-item>
			</tab>
			<div :id=' "ref" + index' v-if="productData.productDistr" :key="index" v-for="(item,index) in productData.productDistr"
			 v-html="item.value" class="tabContent">

			</div>

		</div>
		<premiumTrial :orderId='orderId' :itemArr='productData.itemArr' :errName.sync="errName" v-model="thisData" :goodsId="goodsId"
		 v-if="isShow" :productInfo="obj" @closeEx="closeEx"></premiumTrial>
		<priceFoot :notitle='true' :price="price" :minPremium='productData.minPremium' :isCan.sync="isCan" @changeShow="changeShow"></priceFoot>
	</div>

</template>

<script>
	import {
		formSubmmit,
		debonce
	} from '../../commonJS/common.js'
	import {
		Tab,
		TabItem
	} from 'vux'
	import priceFoot from '../../components/priceFoot.vue'
	import premiumTrial from '../../components/premiumTrial.vue'
	export default {
		name: 'productDetail',
		components: {
			Tab,
			TabItem,
			priceFoot,
			premiumTrial
		},
		data() {
			return {
				isCan: true,
				isLeave: true,
				obj: {
					name0: '盛世赢家年金保险',
					name1: '*承保年龄：28天~55周岁'
				},
				isFixed: false,
				isShow: false,
				productData: {},
				srcTest: 'http://10.1.14.206:9090/bg1.png',
				chooseIndex: 0,
				goodsId: '',
				boothCode: '',
				// 试算数据
				thisData: {},
				price: 0,
				// 缓存数据
				postData: {},
				errName: '',
				trialId: '',
				Parr: [],
				isCHange: true,
				orderId: '',
				scrollTop: 0,
				debonceScroll: '',
				debonceGetPrice: '',
			}
		},
		watch: {
			isShow: {

				handler: function(value) {
					// var scrollTop = 0;
					function to(scrollTop) {
						document.body.scrollTop = document.documentElement.scrollTop = scrollTop;
					}

					function getScrollTop() {
						return document.body.scrollTop || document.documentElement.scrollTop;
					}

					function fixedBody() {
						var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
						document.body.style.cssText += 'position:fixed;top:-' + scrollTop + 'px;';
					}

					function looseBody() {
						var body = document.body;
						body.style.position = '';
						var top = body.style.top;
						document.body.scrollTop = document.documentElement.scrollTop = -parseInt(top);
						body.style.top = '';
					}
					if (value) {
						// 在弹出层显示之前，记录当前的滚动位置
						this.scrollTop = getScrollTop();

						// 使body脱离文档流
						document.body.classList.add('dialog-open');

						// 把脱离文档流的body拉上去！否则页面会回到顶部！
						document.body.style.top = -this.scrollTop + 'px';
					} else {
						// body又回到了文档流中（我胡汉三又回来啦！）
						document.body.classList.remove('dialog-open');

						// 滚回到老地方
						to(this.scrollTop);
					}
				},
				immediate: true
			},
			thisData: {
				handler: function(value) {
					console.error(888)
					// 条件满足调取获取价格
					this.debonceGetPrice()
				},
				deep: true,
			}
		},
		computed: {},
		methods: {
			getPrice() {
				console.error(666)
				let obj = {
					insured: {},
					policyUser: {}
				}
				this.thisData.trialConfig.forEach(item => {
					if (item.sign == 'b') {
						obj.insured[item.id] = item.value
					} else if (item.sign == 't') {
						obj.policyUser[item.id] = item.value
					} else {
						obj[item.id] = item.value
					}

				})
				this.$longData(0, 'TBData', obj.policyUser);
				this.$longData(0, 'BBData', obj.insured);
				var self = this;
				obj.goodsId = this.goodsId;
				obj.hasRidder = this.thisData.hasRidder || 0;
				obj.coverageId = this.thisData.coverageId;

				this.Axios('saveGoodsPremVars', obj, 'post', true).then(function(res) {
						self.isCan = true;
						console.log(res.data.data)
						// 6666
						let {
							premium,
							id
						} = res.data.data;
						// self.productData = res.data.data
						self.$longData(0, 'price', premium);
						self.price = premium;
						self.trialId = id;
					})
					.catch(err => {
						self.errName = '试算失败';
						self.isCan = false;
					})
			},
			touchmove() {
				try {
					console.error(1234567890)
					let self = this;
					let lengthP = self.productData.productDistr.length;
					// let Parr = []
					if (self.Parr.length == 0) {
						for (let i = 1; i < lengthP; i++) {
							let dome = document.getElementById(`ref${i}`)
							// self.Parr.push((dome.offsetTop || dome.pageYOffset) - 93)
							self.Parr.push(dome.offsetTop - 93)
						}
						// alert(JSON.stringify(self.Parr))
					}

					// let top = document.querySelector('html').scrollTop;
					let top = document.body.scrollTop;
					let length = this.Parr.length;
					let chooseIndex = 0;
					for (let i = 0; i < length; i++) {
						let F = this.Parr[i];
						let B = this.Parr[i + 1];

						if (top >= F - 10) {
							chooseIndex = i + 1;
						} else if (top < F) {
							chooseIndex = i;
							if (chooseIndex < 0) {
								chooseIndex = 0
							}
							break
						}
					}
					self.chooseIndex = chooseIndex;
					// alert(top)
				} catch (e) {
					//TODO handle the exception
					// alert(e)
				}

			},
			closeEx() {
				this.isShow = false;
				this.isCan = true;
			},
			postHData(value) {
				let tep = this.$longData(1, 'goodsInfo');
				let self = this;
				let tepdata = {
					requestChannel: 'H5',
					pass: 'Y',
					answerArr: [{
						key: "1097",
						value: "Y"
					}],
					goodsId: self.goodsId,
					trialId: self.trialId,
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
				return new Promise((resolve) => {
					self.Axios('saveHealthNotifyList', tepdata, 'post')
						.then(res => {
							console.log(res)
							resolve(res.data.data.orderId)
							if (value == 0) {
								formSubmmit(res.data.data.formObj.url, res.data.data.formObj.param)
							}

						})
				})


			},
			async changeShow() {
				let self = this;
				if (!this.isShow) {
					this.isCan = false;
					this.isShow = true;
				} else {
					if (!this.isCan) {
						this.$toast(this.errName)
						return
					}
					if (!this.price) {
						if (this.errName == '试算失败') {
							this.$toast(this.errName)
						} else {
							this.$toast(`请完善${this.errName}`)
						}

					} else {
						let code = this.productData.productCode
						if (code == '110032' || code == '110048') {
							let wait = await this.postHData(0);
						} else {
							if (this.productData.hasHealthNotice == 'Y') {
								this.isLeave = false;
								this.$router.push({
									name: 'healthNotification',
									query: {
										trialId: self.trialId,
										goodsId: self.goodsId
									},
								});
							} else {
								let orderId = await this.postHData(1);
								this.$router.push({
									name: 'fillInfo',
									query: {
										goodsId: self.goodsId,
										orderId: orderId,
									}
								});
							}



						}

					}

				}
			},
			changeChooseIndex(index) {
				try {
					this.chooseIndex = index;
					console.error(this.chooseIndex)
					let dome = document.getElementById(`ref${index}`)
					document.body.scrollTop = dome.offsetTop - 93;
				} catch (e) {
				}
			},
			test: function() {
				let tepData = {};
				var self = this;
				this.$axios('../../../static/falseData.json', tepData, 'get').then(function(res) {
					console.log(res.data)
					// 6666
					let {
						productDetail
					} = res.data;
					self.productData = productDetail
				})
			},
			getData: function() {
				let goodsId = this.goodsId;
				let boothCode = this.boothCode;
				var self = this;
				this.Axios('goodDetail1', `goodsId=${goodsId}&boothCode=${boothCode}`).then(function(res) {
					console.log(res.data.data)
					// 6666
					// let {productDetail} = res.data;
					self.productData = res.data.data;
					self.$setTitle(self.productData.goodsName)
					self.$longData(0, 'minPremium', self.productData.minPremium)
				})
			},

		},
		created() {
			let obj = this.$route.query;
			this.goodsId = this.$route.query.goodsId;
			this.orderId = this.$route.query.orderId;
			this.boothCode = this.$route.query.boothCode;
			console.log(this.$longData(1, 'goodsId'))
			this.$longData(0, 'goodsInfo', obj)
			// 生产放开，id 不一样时清除缓存
			if (this.goodsId != this.$longData(1, 'goodsId')) {
				this.$longData(2, 'goodsId')
				this.$longData(2, 'BBData')
				this.$longData(2, 'SSDATA')
				this.$longData(2, 'TBData')
				this.$longData(2, 'answerList')
				this.$longData(2, 'answerLong')
				this.$longData(2, 'chooseArr')
				this.$longData(2, 'fillInfo')
				this.$longData(2, 'orderId')
				this.$longData(2, 'price')
				this.$longData(2, 'minPremium')
				// this.$longData(2, 'goodsInfo')
			}
			// this.test();
			this.getData();


		},
		mounted() {
			// this.test()
			let self = this;
			this.debonceGetPrice = debonce(self.getPrice,500)
			this.debonceScroll = debonce(self.touchmove, 1000, true)
			document.getElementById('Img').onload = () => {
				console.error(3333)
				window.onscroll = () => {
					// console.log(self.debonceScroll)
					self.debonceScroll()
				}
			}

		},
		beforeDestroy() {
			document.body.classList.remove('dialog-open');
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	@import './index.scss';
</style>
