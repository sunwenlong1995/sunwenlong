<template>
	<div ref='content' class="ZA_template">
		<comHeader title='投保信息'></comHeader>
		<div class="ZA_template_S" :class="{haveHeader: ISWX,haveFoot: true}">
			<div class="contentThis">
				<!-- 填写投保人信息 -->
				<!-- <formCom ></formCom> -->
					<div class="title" style="margin-top: 0;">填写投保人信息</div>
					<div class="titleBottom" :key="index+'a'" v-for="(item,index) in consumerArr">
						<formCom :TBBIndex=[index] :TBData="TBData" :item='item'></formCom>
					</div>
					
					
					<!--填写被保人信息  -->
					<div :key="index+'a'" v-for="(item,index) in insuredArr">
						<div class="title">
							<span>填写被保人信息({{index+1}})</span>
							<span v-if="index != 0" @click="spliceBB(index)" class="litterFont">删除</span>
						</div>
						<div class="titleBottom" :key="index_s + 'e'" v-for="(item_s,index_s) in item.insureInfo">
							<formCom :BBBIndex=[index,index_s] @copyTB="copyTB" :BTindex="index" :item='item_s'  :BBData="BBData"></formCom>
						</div>
						<!-- 受益人信息 -->
						<div :key="index_t+'b'" v-for="(item_t,index_t) in item.benefitsArr">
							<div class="title">
								<span>填写受益人信息({{index_t+1}})</span>
								<span v-if="index_t != 0" @click="spliceSY(index,index_t)" class="litterFont">删除</span>
							</div>
							<div class="titleBottom" :key="index_f+'c'" v-for="(item_f,index_f) in item_t">
								<formCom :SYBIndex=[index,index_t,index_f] @notAdd="notAdd" :item='item_f' :parentIndex="index_t + ',' + index " :index="index_f" :isSY="true"></formCom>
							</div>
						</div>
	
						<div @click="addSY(index)" class="comBtn thisthisBtn">
							<img class="btnIMg" src="../../assets/addb.png" alt="">
							添加保险金归属受益人
						</div>
					</div>
				</div>
				<!-- 增加被保人按钮 -->
				<div @click="addBB()" class="btnContent">
					<div class="comBtn thisthisBtnB">
						<img class="btnIMg" src="../../assets/addb.png" alt="">
						添加被保人信息
					</div>
				</div>
				<div @click="saveData" class="agree">
					<img @click="isChoose = false" class="imgT" v-if='isChoose' src="../../assets/spc.png" />
					<img @click="isChoose = true" class="imgT" v-else src="../../assets/sqcn.png" />
					<div>
						<span :key="index+'d'" v-for="(item,index) in otherArr" class="font_2" v-html="item.value"></span>
					</div>
				</div>

		</div>
		<div class="otherS"></div>
		<transition name='bottomTop'>
			<linkage :OtherItem="OtherItem" v-if="isShow" @pushOccupation="pushOccupation" @closeOccupation='closeOccupation' ></linkage>
		</transition>
		
		<priceFoot :low="false" :notitle='true' title='需支付' :price="price" @changeShow="postData"></priceFoot>
</div>
</template>

<script>
	import priceFoot from '../../components/priceFoot.vue'
	import formCom from '../../components/formCom.vue'
	import comArea from '../../components/comArea.vue'
	import linkage from '../../components/linkage.vue'
	export default {
		name: 'fillInfo',
		components: {
			priceFoot,
			formCom,
			comArea,
			linkage,
		},
		data() {
			return {
				isShow: false,
				TBData: {},
				BBData: {},
				isChoose: false,
				items: ['保险条款', '投保须知', '投保提示书'],
				consumerArr: [],
				insuredArr: [],
				otherArr: [],
				// 被保人模板
				templateBB: '',
				// 受益人模板
				templateSY: '',
				idInfo: {},
				canAddSY: true,
				canClick: true,
				maxBenefitsNum: 0,
				maxInsuredNum: 0,
				arrIndex: [],
				OtherItem: {}
			}
		},
		computed: {},
		methods: {
			pushOccupation(value){
				let self = this;
				let length = this.arrIndex.length;
				let arrIndex = this.arrIndex;
					if(length == 1){
						self.consumerArr.forEach((item,index) => {
							if(item.id == 'occupationId'){
								// item.age45 = value;
								self.$set(self.consumerArr[index],'value',value.code)
								self.$set(self.consumerArr[index],'valueName',value.cname)
							}
						})
					}else if(length == 2){
						console.log(self.insuredArr)
						console.log(arrIndex[0])
						self.insuredArr[arrIndex[0]].insureInfo.forEach((item,index) => {
							if(item.id == 'occupationId'){
								self.$set(self.insuredArr[arrIndex[0]].insureInfo[index],'value',value.code)
								self.$set(self.insuredArr[arrIndex[0]].insureInfo[index],'valueName',value.cname)
								// item.age45 = value
							}
						})
					}else if(length == 3){
						self.insuredArr[arrIndex[0]].benefitsArr[arrIndex[1]].forEach((item,index) => {
							if(item.id == 'occupationId'){
								self.$set(self.insuredArr[arrIndex[0]].benefitsArr[arrIndex[1]][index],'value',value.code)
								self.$set(self.insuredArr[arrIndex[0]].benefitsArr[arrIndex[1]][index],'valueName',value.cname)
								// item.age45 = value
							}
						})
					}
				this.closeOccupation()
			},
			// 关闭职业弹窗
			closeOccupation(){
				this.isShow = false;
			},
			copyTB(index) {
				let tepData = {}
				let valueName = '';
				this.consumerArr.forEach(item => {
					tepData[item.id] = item.value;
					if(item.valueName){
						valueName = item.valueName;
					}
				})
				console.log(valueName)
				this.insuredArr[index].insureInfo.forEach(item => {
					item.value = tepData[item.id] || item.value;
					if(item.id == 'occupationId'){
						item.valueName = valueName;		
					}			
				})
			},
			ValidateRules() {
				console.log(this.consumerArr)
				let result = true;
				// 头保人信息校验
				this.consumerArr.forEach(item => {
					if (!item.value || item.error) {
						item.error = true;
						result = false;
					}
				})
				// 被保人 受益人校验
				this.insuredArr.forEach(item => {
					// 受益人
					item.benefitsArr.forEach(item_s => {

						for (let i = 0; i < item_s.length; i++) {
							let item_t = item_s[i];
							if (item_t.id == "benefitsType" && item_t.value == "1") break
							if (!item_t.value || item_t.error) {
								item_t.error = true;
								result = false;
							}
						}
					})
					// 被保人
					item.insureInfo.forEach(item_s => {
						if (!item_s.value || item_s.error) {
							item_s.error = true;
							result = false;
						}
					})
				})
				return result
			},
			postData() {
				
				// 				this.$router.push({
				// 					name: 'orderPay',
				// 					query: {
				// 						activityInfo: 'value'
				// 					}
				// 				});
				if (!this.isChoose) {
					this.$alert('请同意勾选')
					return
				}
				console.log(this.insuredArr)
				console.log(this.consumerArr)
				if (!this.ValidateRules()) {
					this.$alert('请完善表单')
					return
				}
				if (this.canClick) {
					this.canClick = false;
				} else {
					return
				}
				let {
					goodsId,
					orderId
				} = this.idInfo;
				let param = {
					goodsId: goodsId,
					// 					insuredDTOList: {
					// 						benefitsDTOList: []
					// 					},
					insuredDTOList: [],
					orderId: orderId,
					policyUserDTO: {}
				}
				// 投保人
				this.consumerArr.forEach(item => {
					param.policyUserDTO[item.id] = item.value
				})
				// 被保人受益人
				this.insuredArr.forEach((item, index) => {
					let tep = {
						benefitsDTOList: []
					};
					item.benefitsArr.forEach((item_s) => {
						let tep_s = {}
						item_s.forEach(item_t => {
							tep_s[item_t.id] = item_t.value
						})
						tep.benefitsDTOList.push(tep_s)
					})
					item.insureInfo.forEach(item_s => {
						tep[item_s.id] = item_s.value
					})
					param.insuredDTOList.push(tep)
				})
				console.log(param)

				let self = this;
				this.$loading(true)
				this.Axios('proposalSave', param, 'post')
					.then(res => {
						self.canClick = true;
						self.$loading(false)
						if (res.code == '9999') {
							self.$alert(res.msg)
						} else {
							console.log(res.data.data)
							// 如果价格相同
							if (res.data.data == self.price) {
								self.$router.push({
									name: 'orderPay',
									query: {
										goodsId: self.idInfo.goodsId,
										orderId: self.idInfo.orderId,
									},
								})
							} else {
								self.price = res.data.data;
								// 不同的话
								self.$vux.confirm.show({
									// 组件除show外的属性
									title: '操作提示',
									content: `保费变化至${self.price}，是否立即投保？`,
									onCancel() {
// 										console.log(this) // 非当前 vm
// 										console.log(_this) // 当前 vm
									},
									onConfirm() {
										self.$router.push({
											name: 'orderPay',
											query: {
												goodsId: self.idInfo.goodsId,
												orderId: self.idInfo.orderId,
											},
										})
									}
								})

							}

						}
						console.log(res)
					})
					.catch(err => {
						self.canClick = true;
						self.$loading(false)
					})
			},
			//新增 被保人
			addBB() {
				if(this.insuredArr.length == this.maxInsuredNum){
					this.$toast('已达被保人上限，不能添加')
					return
				}
				this.insuredArr.push(this.deepCopy(this.templateBB))
			},
			spliceBB(index) {
				this.insuredArr.splice(index, 1)
			},
			notAdd(parentIndex, value) {
				console.log(parentIndex, value)
				let BBIndex = parentIndex.split(',')[1]
				this.insuredArr[BBIndex].canAddSY = value
			},
			// 新增受益人
			addSY(index) {
				if(this.insuredArr[index].benefitsArr.length == this.maxBenefitsNum){
					this.$toast('已达受益人上限，不能添加')
					return
				}
				if (this.insuredArr[index].canAddSY != 2) {
					let thisData = this.insuredArr[index].benefitsArr;
					console.log(thisData)
					let tep = '';
					if (thisData[thisData.length - 1][0].value == '2') {
						tep = this.deepCopy(this.templateSY);
						tep[0].selectArr.splice(0, 1)
					}

					if (thisData[thisData.length - 1][0].value == null || thisData[thisData.length - 1][0].value == '') {
						this.$toast('请先完成上一个受益人信息')
						return
					}
					this.insuredArr[index].benefitsArr.push(tep || this.deepCopy(this.templateSY))
				} else {
					this.$toast('法定受益人不可添加多个受益人')
				}

			},
			spliceSY(pindex, index) {
				this.insuredArr[pindex].benefitsArr.splice(index, 1)
			},
			deepCopy(value) {
				return JSON.parse(JSON.stringify(value))
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
			// 创建模板
			creatTemplate(value) {
				let tep = this.deepCopy(value[0]);
				tep.insureInfo.forEach(item => {
					item.value = ''
				})
				tep.benefitsArr.splice(1, tep.benefitsArr.length - 1);
				tep.benefitsArr[0].forEach(item => {
					item.value = ''
				})

				this.templateBB = this.deepCopy(tep)
				this.templateSY = this.deepCopy(tep.benefitsArr[0])
				console.log(this.templateBB)
				console.log(this.templateSY)
			},
			saveData(){
				let self = this;
				let obj = {
					consumerArr: self.consumerArr,
					insuredArr: self.insuredArr,
					id: self.idInfo.goodsId,
				}
				this.$longData(0,'fillInfo',obj)
			},
			getData: function() {
				let {
					goodsId,
					orderId
				} = this.idInfo;
				let self = this;
				this.Axios('proposal', `goodsId=${goodsId}&orderId=${orderId}`)
					.then(results => {
						console.log(results.data.data)
						let {
							consumerArr,
							insuredArr,
							otherArr,
							maxInsuredNum,
							maxBenefitsNum
						} = results.data.data;
						let fillInfo = self.$longData(1,'fillInfo');
						// let fillInfo = '';
						if(fillInfo && (fillInfo.id == self.idInfo.goodsId)){
							self.consumerArr = fillInfo.consumerArr;
							self.insuredArr = fillInfo.insuredArr;
						}else{
							self.consumerArr = consumerArr;
							self.insuredArr = insuredArr;
						}
						
						// self.benefitsObj = benefitsObj;
						self.otherArr = otherArr;
						self.maxInsuredNum = maxInsuredNum;
						self.maxBenefitsNum = maxBenefitsNum;
						self.creatTemplate(insuredArr)
					})
			},
			setAge45(){
				let self = this;
				this.$bus.$on('age45', function(value, arrIndex) {
					console.log(arrIndex)
					let length = arrIndex.length;
						if(length == 1){
							self.consumerArr.forEach((item,index) => {
								if(item.id == 'idPeriod'){
									// item.age45 = value;
									self.$set(self.consumerArr[index],'ageT',value)
								}
							})
						}else if(length == 2){
							console.log(self.insuredArr)
							console.log(arrIndex[0])
							self.insuredArr[arrIndex[0]].insureInfo.forEach((item,index) => {
								if(item.id == 'idPeriod'){
									self.$set(self.insuredArr[arrIndex[0]].insureInfo[index],'ageT',value)
									// item.age45 = value
								}
							})
						}else if(length == 3){
							self.insuredArr[arrIndex[0]].benefitsArr[arrIndex[1]].forEach((item,index) => {
								if(item.id == 'idPeriod'){
									self.$set(self.insuredArr[arrIndex[0]].benefitsArr[arrIndex[1]][index],'ageT',value)
									// item.age45 = value
								}
							})
						}
					
				})
			},
			setCardReg(){
				// alert(1)
				let self = this;
				this.$bus.$on('cardReg', function(value, arrIndex) {
					console.log(arrIndex)
					let length = arrIndex.length;
						if(length == 1){
							self.consumerArr.forEach((item,index) => {
								if(item.id == 'idNum'){
									// item.age45 = value;
									self.$set(self.consumerArr[index],'reg',value)
								}
							})
						}else if(length == 2){
							console.log(self.insuredArr)
							console.log(arrIndex[0])
							self.insuredArr[arrIndex[0]].insureInfo.forEach((item,index) => {
								if(item.id == 'idNum'){
									self.$set(self.insuredArr[arrIndex[0]].insureInfo[index],'reg',value)
									// item.age45 = value
								}
							})
						}else if(length == 3){
							self.insuredArr[arrIndex[0]].benefitsArr[arrIndex[1]].forEach((item,index) => {
								if(item.id == 'idNum'){
									self.$set(self.insuredArr[arrIndex[0]].benefitsArr[arrIndex[1]][index],'reg',value)
									// item.age45 = value
								}
							})
						}
					
				})
			},
			setOc(){
				let self = this;
				this.$bus.$on('openOc', function(arrIndex,item) {
					console.log(arrIndex)
					self.isShow = true;
					self.arrIndex = arrIndex
					self.OtherItem = item
				})
			}

		},
		watch: {
			consumerArr: {
				handler: function(value) {
					let self = this;
					console.log(value)
				},
				deep: true,
			},
			insuredArr: {
				handler: function(value) {
					console.log(value)
				},
				deep: true,
			},
			benefitsObj: {
				handler: function(value) {
					console.log(value)
				},
				deep: true,
			}

		},
		created() {
			this.$setTitle('投保信息')
			if(location.href.indexOf('%')){
				let tep = {}
				let href = decodeURIComponent(location.href).split('?')[1];
				console.log(href)
				// tep[href.split('&')[0]]=href.split('=')[1].split('=')[0];
				tep[href.split('&')[1].split('=')[0]] = href.split('&')[1].split('=')[1];
				tep[href.split('&')[0].split('=')[0]] = href.split('&')[0].split('=')[1];
				console.log(tep)
				this.idInfo = {
					goodsId: tep['goodsId'],
					orderId: tep['orderId'],
				}
			}else{
				this.idInfo = {
					goodsId: this.$route.query.goodsId,
					orderId: this.$route.query.orderId,
				}
			}
			// this.$toast(88)
			let self = this;
			try{
				this.setOc()
				this.setAge45()
				this.setCardReg()
			}catch(e){
				console.error(e)
				//TODO handle the exception
			}
			
			this.price = this.$longData(1, 'price') || 0;
			
			this.getData()
			this.TBData = this.$longData(1, 'TBData');
			this.BBData = this.$longData(1, 'BBData');
			// console.log(this.otherData)
		},
		mounted() {
			// this.test()

		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	@import './index.scss';
</style>
