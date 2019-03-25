<template>
	<div>
		<div :ref="'ref' + index" :style="{height: height + 'px'}" :class="{bordernone: index == 0}" class="noticeDiv">
			<div @click="changeRed()" :ref="'ref1' + index" class="thisFF">
				<span class="noticeLeft">{{item.classesName}}</span>
				<div class="infoDetail">{{desc}}</div>
				<span  class="noticeRight">
					<img :class="{up: !isShow}" src="../assets/upDown.png" />
				</span>
			</div>
			<div :ref="'ref2' + index" class="detail">
				<slot></slot>
				<div @click='chooseList(item_s)' :class="{chooseStyle: item_s.diseaseCode in chooseArr,min: item_s.diseaseName.length <= 4,middle: item_s.diseaseName.length > 4 && item_s.diseaseName.length < 10,max: item_s.diseaseName.length >= 10,}" class="comBtn thisBtn"
				 v-for="(item_s,index_s) in item.diseaseList">{{item_s.diseaseName}}</div>
			</div>
			
		</div>
	</div>
</template>

<script>
	import Vue from 'vue'

	export default {
		name: 'toggleList',
		components: {},
		props: {
			// Banner title
			item: {
				type: Object,
				required: true,
			},
			index: {
				type: Number,
			},
			chooseArr: {
				type: Object
			},
		},
		data() {
			return {
				someTop: '',
				height: '',
				isShow: true,
				pushArr: [],
				tep: '',
				desc: ''
			}
		},
		computed: {},
		methods: {
			chooseList(value) {
				let {diseaseCode,diseaseName} = value;
				let isIN = diseaseCode in this.chooseArr
				if (isIN) {
					this.$delete(this.chooseArr,diseaseCode)
				} else {
					// this.chooseArr[diseaseCode]=diseaseName;
					this.$set(this.chooseArr,diseaseCode,diseaseName)
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
			changeRed: function() {
				if (this.isShow) {
					var self = this;
					let height = this.$refs['ref2' + this.index].offsetHeight;
					self.height = self.tep + height
					self.isShow = !self.isShow;
				} else {
					this.height = this.tep
					this.isShow = !this.isShow;
				}

			}
		},
		created() {
			let desc = this.item.diseaseList.map(item => item.diseaseName)
			this.desc = desc.join(',')
			this.item.diseaseList = this.item.diseaseList.sort((a,b) => {
				console.log(a.diseaseName.length,b.diseaseName.length)
				return a.diseaseName.length - b.diseaseName.length
			})
		},
		mounted() {
			// console.log(this.$refs['ref' + this.index])
			if (!this.tep) {
				this.tep = this.$refs['ref1' + this.index].offsetHeight;
				this.height = this.tep;
			}

		}
	}
</script>

<style lang="scss" scoped>
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

		display: flex;
		justify-content: center
	}
	.min{
				min-width: 69px;
	}
	.middle{
				min-width: 129px;
	}
	.max{
				min-width: 85%;
	}
	
@media screen and (max-width: 320px) {
		.thisBtn{
			min-width: px(130) !important;
			padding: px(11) px(20)!important;
		}
	}
	.bordernone {
		border-top: 0 !important;
	}

	.detail {
		padding: px(30) px(34);
		padding-bottom: 0;
		padding-right: 0;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-wrap: wrap;
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

		.noticeLeft {}

		.infoDetail {
			font-size: px(24);
			color: $light-color2;
			margin-top: px(10);
			font-weight: normal;
			max-width: 95%;
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
				transform: rotate(180deg);
				transition: all 0.5s;
			}

			.up {
				transform: rotate(0deg);
			}
		}
	}
</style>
