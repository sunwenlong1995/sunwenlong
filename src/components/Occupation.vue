<template>
	<div>
		<!-- <div :ref="'ref' + index" :style="{height: height + 'px'}" :class="{bordernone: index == 0}" class="noticeDiv"> -->
		<div class="noticeDiv">
			<div :class="{chooseStyleO: isChoose}" @click="changeRed(item.code,item.type,item)" :ref="'ref1' + index" class="thisFF">
				<div v-if="isF">
					<span class="noticeLeft">{{item.cname}}</span>
					<span class="noticeRight">
						<img :class="{up: !isShow}" src="../assets/upDown.png" />
					</span>
				</div>
				<div v-else>
					<span v-if="item.type" class="noticeLeft1">
						<img :class="{up: !isShow}" src="../assets/upDown.png" />
					</span>
					<span class="noticeRight1">
						{{item.cname}}
					</span>
				</div>
			</div>
			<div class="detail" v-if="isShow">
				<slot></slot>
			</div>

		</div>
	</div>
</template>

<script>
	import Vue from 'vue'

	export default {
		name: 'Occupation',
		components: {},
		props: {
			// Banner title
			item: {
				type: Object,
				required: true,
			},
			OtherItem: {
				type: Object,
				required: true,
			},
			index: {
				type: Number,
			},
			chooseArr: {
				type: Object
			},
			isF: {
				default: false
			},
			isL: {
				default: true
			},
			insuranceRiskLevel: {},

		},
		data() {
			return {
				someTop: '',
				height: '',
				isShow: false,
				pushArr: [],
				tep: '',
				desc: '',
				isChoose: false
			}
		},
		computed: {},
		methods: {
			chooseList(value) {
				let {
					diseaseCode,
					diseaseName
				} = value;
				let isIN = diseaseCode in this.chooseArr
				if (isIN) {
					this.$delete(this.chooseArr, diseaseCode)
				} else {
					// this.chooseArr[diseaseCode]=diseaseName;
					this.$set(this.chooseArr, diseaseCode, diseaseName)
				}
			},
			toUrl: function(url) {
				if (url) {
					window.location.href = url
				} else {
					this.$vux.toast.text('暂无详情')
				}

			},
			http: function() {
				console.log(this.$http.http())
				return this.$http.http()
			},
			getData(code, type) {
				console.log(111111)
				let self = this;
				let obj = {
					codeList: self.OtherItem.codeList,
					medicalRiskLevel: self.OtherItem.medicalRiskLevel,
					insuranceRiskLevel: self.OtherItem.insuranceRiskLevel,
					diseaseLevel: self.OtherItem.diseaseLevel,
					accidentalLevel: self.OtherItem.accidentalLevel,
					specialType: self.OtherItem.specialType,
					type: type,
					parentCode: code
				}
				self.Axios('selectInfoList', obj, 'post').then(res => {
						self.item.OccupationList = res.data.data;
						self.item.OccupationList.forEach((item, index) => {
							self.$set(self.item.OccupationList[index], 'OccupationList', [])
						})
						// resolve(payStatus)
					})
					.catch(err => {
						// self.$loading(false)
					})
			},
			changeRed: function(code, type, item) {
				if (!this.item.type) {
					console.log(item)
					this.$bus.$emit('pushValue', item);
					this.isChoose = true;
				} else {
					this.getData(code, type);
					this.isShow = !this.isShow;
				}

			}
		},
		created() {
			let self = this;

			this.$bus.$on('pushValue', () => {
				self.isChoose = false;
			});
		},
		mounted() {
			console.log(this.$refs['ref' + this.index])
			if (!this.tep) {
				this.tep = this.$refs['ref1' + this.index].offsetHeight;
				this.height = this.tep;
			}

		}
	}
</script>

<style lang="scss" scoped>
	.chooseStyleO {
		background: $snail-light-color !important;
		color: #fff !important;
	}

	.chooseStyle {
		color: $snail-light-color !important;
		// background-color: $snail-light-color !important;
		border: 1px solid $snail-light-color !important;
	}

	.thisBtn {
		border: 1px solid #fff;
		background-color: #fff;
		width: auto;
		padding: px(11) px(35);
		color: $light-color;
		font-weight: 400;
		font-size: px(28);
		margin-right: px(26);
		margin-bottom: px(30);
		// margin-top: px(30);
		display: inline-block;
	}

	.bordernone {
		border-top: 0 !important;
	}

	.detail {
		padding: 0 0;
		padding-left: px(20);
		padding-bottom: 0;
		// background-color: 
	}

	.thisFF {
		padding: px(24) px(30);
		background-color: #FFFFFF;
		position: relative;
	}

	.noticeDiv {
		box-sizing: border-box;
		padding: px(0) 0;
		text-align: left;
		overflow: hidden;
		transition: all 0.5s;
		// margin-bottom: 11px;
		// background-color: #FFFFFF;
		color: $deep-color;
		position: relative;
		font-size: px(28);
		border-bottom: 1px solid #EEEEEE;
		// border-top: 1px solid #EEEEEE;
		font-weight: 600;

		.noticeLeft1 {

			img {
				width: px(28);
				height: px(28);
				transform: rotate(0deg);
				transition: all 0.5s;
				margin-right: px(20);
			}

			.up {
				transform: rotate(180deg);
			}
		}

		.infoDetail {
			font-size: px(24);
			color: $light-color2;
			margin-top: px(10);
			font-weight: normal;
			max-width: 95%;

		}

		.noticeRight1 {
			// 			position: absolute;
			// 			color: #053767;
			// 			top: 50%;
			// 			transform: translateY(-50%);
			// 			/*float: right;*/
			// 			right: px(26);
		}

		.noticeRight {
			position: absolute;
			color: #053767;
			top: 50%;
			transform: translateY(-50%);
			/*float: right;*/
			right: px(26);

			img {
				width: px(28);
				height: px(28);
				transform: rotate(0deg);
				transition: all 0.5s;
			}

			.up {
				transform: rotate(180deg);
			}
		}
	}
</style>
