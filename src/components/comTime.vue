<template>
	<div class="someBOttm">
		<!-- {{otherDate}} -->
		<div v-if='modefine' @click="$toastStop" class="disabledCom"></div>
		<div v-if='isSome' class="fontRight">
			<img class="imgT" @click='changeIstrue(false)' v-if='IsTrue' src="../assets/radioChoose.png" />
			<img class="imgT" @click='changeIstrue(true)' v-else src="../assets/noChoose.png" />
			长期
		</div>
		<Datetime v-model="value" :default-selected-value="otherDate" :start-date="minYear" :end-date='maxYear' :min-year="parseInt(minYearL)" :max-year="parseInt(maxYear)">
			<slot>
				<!-- <comInput :showError='true' errorDesc="请选择出生日期"  isTime="true" placeholder="请您选择出生日期" isRight="true" title="出生日期"></comInput> -->


				<div class="someDiv">
					<span class="font1">{{title}}<span v-if="isHave" style="color: red;">*</span></span>
					<span style='flex: 1;'>
						<input :class="{timeStyle: isTime}" :type="type" ref="focus" @blur="hideX" :disabled="isRight || disabled"
						 :placeholder="placeholder" @input="changeValue($event.target.value)" :value="value" class="comInput1" />
						<span v-if="!isSome" class="listRight some"><img class="comicon iconCenter" src="../assets/arr.png" /></span>
						<div class="redError" v-if="showError">{{errorDesc || placeholder}}</div>
					</span>


				</div>
			</slot>
		</Datetime>
		<!-- </div> -->
	</div>
</template>
<script>
	import {
		Datetime
	} from 'vux'
	export default {
		components: {
			Datetime
		},
		name: 'comTime',
		props: {
			title: {
				type: String,
				required: false,
				default: '打开App, 浏览更多'
			},
			errorDesc: {
				type: String,
				required: false,
				default: '来啦老弟'
			},
			showError: {
				type: Boolean,
				required: false,
				default: false
			},
			type: {
				required: false,
				default: false
			},
			value: {
				required: false,
				default: ''
			},
			isRight: {
				required: false,
				default: true
			},
			disabled: {
				required: false,
				default: false
			},
			isHave: {
				required: false,
				default: false
			},
			isTime: {
				required: false,
				default: true
			},
			isSome: {
				required: false,
				default: false
			},
			BBBBIndex: {
				required: false,
			},
			ageT: {
				required: false,
			},
			minYear: {
				required: false,
			},
			maxYear: {
				required: false,
			},
			modefine: {
				required: false,
				default: false
			},
		},
		data() {
			return {
				isSelect: true,
				IsTrue: false,
				isShow: false,
				autofocus: false,
				minYearL: 0
			}
		},
		watch: {
			value: {
				handler: function(value) {
					// console.log(value);
					if (value || this.IsTrue) {

						this.$emit("update:showError", false)
					}
					if (value && value != '0000-00-00') {
						this.IsTrue = false;
					}
					this.$emit('update:value', value)
					if (!value) return
					this.isCanLong(value)
				},
				immediate: true
			},
			IsTrue: {
				handler: function(value) {
					if (value) {
						this.$emit('update:value', '0000-00-00')
					}
				}
			}
		},
		created() {
			this.placeholder = '请选择' + this.title
				this.minYearL = this.minYear || 1900
			if (this.isSome) {
				this.minYearL = this.$formatmyyear(new Date()).slice(0, 4)
			}
			if(this.maxYear){
				this.otherDate = `${this.maxYear.slice(0, 4) - 4}-08-08`
			}else{
				this.otherDate = this.$formatmyyear(new Date()).slice(0, 4)
			}
		},
		methods: {
			isCanLong(value) {
				if (!this.BBBBIndex) return
				if (this.isShow) return
				let now = this.$formatmyyear(new Date()).slice(0, 4)
				let bir = value.slice(0, 4);
				console.log(now - bir)
				let result = now - bir > 45 ? true : false;
				console.log(this.BBBBIndex)

				this.$bus.$emit('age45', result, this.BBBBIndex)
			},
			changeIstrue(value) {
				console.error(this.ageT)
				if (!this.ageT) {
					this.$toast('不能选择长期')
					return
				}
				this.IsTrue = value;
			},
			checkLen: function(value, len) {},
			changeValue: function(name) {},
			clearInput: function() {},
			hideX: function() {}
		},
	}
</script>

<style lang="scss" scoped>
	@media screen and (max-width: 320px) {
		.fontRight {
			width: px(150) !important;
		}

		.imgT {
			width: px(46);
			height: px(46);
			margin-right: px(16) !important;
		}
	}

	.fontRight {
		z-index: 1;
		position: absolute;
		top: 50%;
		right: 0;
		transform: translateY(-50%);
		// float: right;
		height: px(92);
		display: flex;
		align-items: center;
		width: px(194);
		justify-content: center;
		border-left: 1px solid $border-color;

		// display: inline-block;
		.imgT {
			width: px(46);
			height: px(46);
			margin-right: px(30);
		}
	}

	.timeStyle {
		color: $snail-light-color;
	}

	.comicon {
		width: px(48);
		height: px(48);
	}

	.otherBg {
		background-color: #F8F8F8 !important;
	}

	.otherFont {
		font-size: px(28) !important;
		font-weight: bold;
	}

	input::-webkit-input-placeholder {
		/* WebKit browsers */
		color: #C9C9C9 !important;
		font-size: px(28);
	}

	input:-moz-placeholder {
		/* Mozilla Firefox 4 to 18 */
		color: #C9C9C9 !important;
		font-size: px(28);
	}

	input::-moz-placeholder {
		/* Mozilla Firefox 19+ */
		color: #C9C9C9 !important;
		font-size: px(28);
	}

	input:-ms-input-placeholder {
		/* Internet Explorer 10+ */
		color: #C9C9C9 !important;
		font-size: px(28);
	}

	.someBOttm {
		position: relative;
		border-bottom: 1px solid $border-color;
	}

	// 	.someDiv{
	// 		text-align: left;
	// 		position: relative;
	// 		// border-bottom: 1px solid $border-color;
	// 		// height: px(116);
	// 		padding: px(28) 0;
	// 		display: flex;
	// 		padding-left: px(40);
	// 		// justify-content: center;
	// 		align-items: center;
	// 		padding-right: 0;
	// 		padding-bottom: 0;
	// 	}
	.font1 {
		color: #494949;
		font-size: px(28);
		display: inline-block;
		min-width: px(180);
	}

	.some {
		position: absolute;
		right: 10px;
	}

	.comInput1 {
		background-color: #FFFFFF;
		position: relative;
		border: none;
		font-size: px(28);
		height: 23px;
		outline: 0;
		-webkit-opacity: 1;
		width: 85%;
		// flex: 1;
	}

	.listHeight {
		height: 4rem;
		text-align: center;
	}
</style>
