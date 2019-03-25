<template>
	<div>
		<!-- {{isShow}}{{parentIndex}} -->
		<div v-show="isShow">
			<comInput :reg='item.reg' :value.sync='item.value' :id='item.id' v-if="item.type == 'input'" :showError.sync='item.error'
			 :errorDesc="item.errorMsg" :title="item.name" :modefine="item.modefine"></comInput>
			<comRadio :value.sync='item.value' v-else-if="item.type == 'radio'" :showError.sync='item.error' :errorDesc="item.errorMsg"
			 :radioInfo="transfer(item.selectArr || item.arrList)" :title="item.name" :modefine="item.modefine"></comRadio>
			<comTime :BBBBIndex="SYBIndex || BBBIndex || TBBIndex" :value.sync='item.value' v-else-if="item.type == 'date' || item.type == 'dateever'"
			 :minYear="item.minYear" :maxYear="item.maxYear" :showError.sync='item.error' :errorDesc="item.errorMsg" :ageT="item.ageT"
			 :title="item.name" :isSome="item.type == 'dateever' ? true : false" :modefine="item.modefine"></comTime>

			<specialInput :BBBBIndex="SYBIndex || BBBIndex || TBBIndex" :id='item.id' :value.sync='item.value' :isSelect="true"
			 v-else-if="item.type == 'select' || item.type == 'amount'" :showError.sync='item.error' :errorDesc="item.errorMsg"
			 :title="item.name" :radioInfo="transfer(item.selectArr || item.arrList)" :modefine="item.modefine"></specialInput>
			<comCheckBox :value.sync='item.value' v-else-if="item.type == 'checkbox'" :showError.sync='item.error' :errorDesc="item.errorMsg"
			 :radioInfo="item.selectArr || item.arrList || []" :title="item.name" :modefine="item.modefine"></comCheckBox>
			<comArea :value.sync='item.value' :showError.sync='item.error' v-else-if="item.type == 'address'" :errorDesc="item.errorMsg"
			 :radioInfo="item.selectArr || item.arrList || []" :title="item.name" :modefine="item.modefine"></comArea>
			<div class="thisCard" v-else-if="item.type == 'ocr'">
				<input ref="file" v-show="false" id="fileZA" class="hidden" type="file" @change="fileChange" />
				<div class="ThisTitle">身份证正反照片</div>
				<div class="idcard">
					<div @click="chooseImg(0)" class="cardThis">
						<img v-if="!cardInfo[0]" src="../assets/idCard.png">
						<img v-else :src="cardInfo[0]">
						<div>上传身份证人像面</div>
					</div>
					<div @click="chooseImg(1)" class="cardThis">
						<img v-if="!cardInfo[1]" src="../assets/idCard.png">
						<img v-else :src="cardInfo[1]">
						<div>上传身份证国徽面</div>
					</div>
				</div>
				<div class="redError" v-if="item.error">{{item.errorDesc || '请选择身份证正反照片'}}</div>
			</div>
			<!-- occupation -->
			<comOCC @click.native='openOc' :isRight="true" :disabled="true" :value.sync='item.value' :valueName='item.valueName'
			 :id='item.id' v-else-if="item.type == 'occupation'" :showError.sync='item.error' :errorDesc="item.errorMsg" :title="item.name" :modefine="item.modefine"></comOCC>
			<!-- <comOCC title="职业选择"  :isRight="true" :disabled="true"></comOCC> -->
		</div>
	</div>
</template>
<script>
	import {
		compress,
		getfilesize
	} from '../commonJS/common.js'
	import comInput from './comInput.vue'
	import comOCC from './comOCC.vue'
	import comArea from './comArea.vue'
	import comCheckBox from './comCheckBox.vue'
	import comRadio from './comRadio.vue'
	import comTime from './comTime.vue'
	import specialInput from './specialInput.vue'
	export default {
		name: 'formCom',
		components: {
			comInput,
			comArea,
			comCheckBox,
			comRadio,
			comTime,
			specialInput,
			comOCC
		},
		props: {
			item: {
				type: Object,
				required: false
			},
			BBData: {
				type: Object,
				required: false
			},
			TBData: {
				type: Object,
				required: false
			},
			isSY: {
				type: Boolean,
				required: false,
				default: false
			},
			index: {
				type: Number,
			},
			parentIndex: {
				type: String,
			},
			BTindex: {
				type: [String, Number],
			},
			SYBIndex: {
				type: Array,
			},
			BBBIndex: {
				type: Array,
			},
			TBBIndex: {
				type: Array,
			},

		},
		data() {
			return {
				// 1法定受益人
				cardInfo: [0, 0],
				cardT: '',
				cardF: '',
				// 0 正 1 反
				type: '',
				isShow: true,
				canUp: true,
			}
		},
		watch: {
			cardInfo: {
				handler: function(value) {
					if (value[0] != 0 && value[1] != 0) {
						this.item.value = value[0] + ',' + value[1];
						this.item.error = false;
					}
				},
				deep: true,
				//				immediate: true
			},
			'item.value': {
				handler: function() {
					console.error(this.item.value)
					if(this.item.value){
						this.$emit('changeLD')
					}
					let value = this.item;
					let self = this;
					if (value.modefine && value.once) {
						if (this.$longData(1, 'goodsId') != 38) {
							this.$vux.confirm.show({
								title: '提示',
								content: '与试算填写信息不符，请返回试算页',
								// 组件除show外的属性
								onCancel() {
									// 								console.log(this) // 非当前 vm
									// 								console.log(_this) // 当前 vm
								},
								onConfirm() {
									self.$router.push({
										name: 'productDetail',
										query: {
											goodsId: self.$longData(1, 'goodsId')
										}
									});
								}
							})
						}

						// this.$alert('试算数据不一样，是否继续');
						// value.modefine = false
					}
					if (!value.once) {
						value.once = true
					}

					if (value.id == "benefitsType" && value.value == "2") {
						this.$bus.$emit('showDown', this.parentIndex, true)
						this.$emit('notAdd', this.parentIndex, 1)
					} else if (value.id == "benefitsType" && value.value == "1") {
						this.$bus.$emit('showDown', this.parentIndex, false)
						this.$emit('notAdd', this.parentIndex, 2)
					} else if (value.id == "relationToAppnt" && value.value == "00") {
						// console.error(this.parentIndex)
						this.$emit('copyTB', this.BTindex)
					}
				},
				deep: true,
				//				immediate: true
			}
		},
		created() {

			if (this.item.type == 'ocr') {
				if (this.item.value) {
					this.cardInfo = this.item.value.split(',')
				}
			}
			if (this.isSY) {
				if (this.index != 0) {
					this.isShow = false
				}
			}
			let self = this;
			this.$bus.$on('showDown', function(parentIndex, value) {
				console.log(parentIndex, self.parentIndex, value)
				if (parentIndex == self.parentIndex) {
					if (self.index != 0) {
						self.isShow = value
					}
				}
			})
			try {

				if (this.BBData[this.item.id]) {
					this.$set(this.item, 'once', false)
					this.$set(this.item, 'modefine', true)
					this.$set(this.item, 'value', this.BBData[this.item.id])

				}
			} catch (e) {
				//TODO handle the exception
			}
			try {
				if (this.TBData[this.item.id]) {
					this.$set(this.item, 'once', false)
					this.$set(this.item, 'modefine', true)
					this.$set(this.item, 'value', this.TBData[this.item.id])
				}
			} catch (e) {
				//TODO handle the exception
			}

		},
		methods: {
			openOc() {
				console.log(this.SYBIndex)
				console.log(this.BBBIndex)
				console.log(this.TBBIndex)
				console.error(1111)

				this.$bus.$emit('openOc', this.SYBIndex || this.BBBIndex || this.TBBIndex, this.item)
			},
			transfer(value) {
				if (!value) return []
				return value.map(item => {
					return {
						name: item.name || item.value,
						value: item.id || item.value
					}
				})
			},
			async fileChange(e) {
				let self = this;
				try {
					let file = e.target.files[0];
					console.log(getfilesize(file.size))
					console.log(parseFloat(getfilesize(file.size)))
					if (parseFloat(getfilesize(file.size)) > 1.5) {
						file = await compress(e.target.files[0]);
					}
					console.log(getfilesize(file.size))
					console.log(file)
					self.canUp = false;
					let tepdata = new FormData();
					tepdata.append('idcardPhoto', file)
					tepdata.append('frontBack', self.type == 0 ? 'front' : 'back')
					self.Axios('realNameAuthentication', tepdata, 'post').then(function(res) {
							console.log(res.data.data.url)

							self.$set(self.cardInfo, self.type, res.data.data.url)
							self.canUp = true;

						})
						.catch(err => {
							self.canUp = true;
						})
				} catch (e) {
					//TODO handle the exception
					console.log(999)
				}

			},
			chooseImg(index) {
				if (this.canUp) {
					var obj = document.getElementById('fileZA');
					this.$refs.file.value = ''
					this.type = index;
					obj.click();
				} else {
					this.$toast('正在上传，请等待')
				}
				// index  0  1 0是正面，1是反面


			},
		},
	}
</script>

<style lang="scss" scoped>
	.redError {
		margin-bottom: px(30);
	}

	.thisCard {
		padding: px(29) 0;
		padding-bottom: 0;
		border-bottom: 1px solid $border-color;
	}

	.hidden {
		position: fixed;
		left: -2000px;
	}

	.ThisTitle {

		text-align: left;
		font-size: px(28);
		color: $deep-color;
		padding-left: px(40);
	}

	.idcard {
		display: flex;
		justify-content: space-around;
		padding: px(40) 0;
		color: #858B9C;
		font-size: px(24);

		img {
			width: px(168);
			height: px(112);
			margin-bottom: px(15);
		}

	}
</style>
