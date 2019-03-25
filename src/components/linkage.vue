<template>
	<div class="ZA_template">
		<div class="someHeader">
			<span @click="toCancel">取消</span>
			<span class="sure" @click="toComplete">完成</span>
		</div>
		<div class="ZA_template_S">
			<div class="litterTitle">请选择职业相关信息</div>
			<Occupation :OtherItem="OtherItem"  :isF="true" :item="item" :index="index" :key="index" v-for="(item, index) in OccupationList">
				<Occupation :OtherItem="OtherItem"  :insuranceRiskLevel="insuranceRiskLevel" :item="itemS" :index="indexS" :key="indexS" v-for="(itemS, indexS) in item.OccupationList">
					<Occupation :OtherItem="OtherItem"  :item="itemF" :index="indexF" :key="indexF" v-for="(itemF, indexF) in itemS.OccupationList">
						<Occupation :OtherItem="OtherItem"  :isL="false" :item="itemT" :index="indexT" :key="indexT" v-for="(itemT, indexT) in itemF.OccupationList">

						</Occupation>
					</Occupation>
				</Occupation>
			</Occupation>
		</div>

	</div>

</template>

<script>
	import Occupation from './Occupation.vue'
	export default {
		name: 'linkage',
		components: {
			Occupation
		},
		props: {
			isShow: {
				type: Boolean,
				default: false
			},
			OtherItem: {
				type: Object
			},
		},
		data() {
			return {
				OccupationList: [],
				insuranceRiskLevel: 3,
				item: ''
			}
		},
		methods: {
			toCancel() {
				this.$emit('closeOccupation')
			},
			toPro() {
				// this.$emit('closeOccupation')
			},
			toComplete() {
				console.log(1111)
				console.log(this.item)
				let self = this;
				if (this.item) {
					// alert(1)
					this.$emit('pushOccupation', self.item)
				} else {
					// alert(2)
					this.$toast('请选择职业')
				}

			}
		},
		created() {
			console.error(this.OtherItem)
			let self = this;
			let obj = {
				codeList: self.OtherItem.codeList,
				medicalRiskLevel: self.OtherItem.medicalRiskLevel,
				insuranceRiskLevel: self.OtherItem.insuranceRiskLevel,
				diseaseLevel: self.OtherItem.diseaseLevel,
				accidentalLevel: self.OtherItem.accidentalLevel,
				specialType: self.OtherItem.specialType,
				type: 1,
				parentCode: ''
			}
			self.Axios('selectInfoList', obj, 'post').then(res => {
					console.log(res.data.data);
					self.OccupationList = res.data.data;
					self.OccupationList.forEach((item, index) => {
						self.$set(self.OccupationList[index], 'OccupationList', [])
					})
				})
				.catch(err => {
					self.$loading(false)
				})
			this.$bus.$on('pushValue', (item) => {
				self.item = item
			});
			// 			let tepData = {};
			// 			var self = this;
			// 			this.$axios('../../static/falseData.json', tepData, 'get').then(function(res) {
			// 				console.log(res.data);
			// 				// 6666
			// 				let {
			// 					diseaseLsit
			// 				} = res.data;
			// 				self.diseaseLsit = diseaseLsit;
			// 			});
		},
		mounted() {}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	.sure {
		color: $snail-light-color !important;
	}

	.someHeader {
		box-sizing: border-box;
		width: 100%;
		color: black;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 px(28);
		height: px(98);
		background: #fff;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 70000;
	}

	.ZA_template {
		z-index: 70000;
	}

	.litterTitle {
		font-size: px(32);
		color: $light-color2;
		padding: px(28) 0;
	}
</style>
