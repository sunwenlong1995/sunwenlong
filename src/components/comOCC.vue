<template>
	<div class="someBOttm">
		<div class="someDiv">
			<span class="font1">{{title}}<span v-if="isHave" style="color: red;">*</span></span>
			<span style='flex: 1;'>
				<input :class="{timeStyle: isTime}" :type="type" ref="focus" @blur="hideX" :disabled="isRight || disabled"
				 :placeholder="placeholder" @input="changeValue($event.target.value)" :value="valueName" class="comInput1" />
				<span @click="clearInput" v-show="isShow" class="listRight some"><img class="comicon iconCenter" src="../assets/Group 6.png" /></span>
				<span v-if="isRight" class="listRight some"><img class="comicon iconCenter" src="../assets/arr.png" /></span>
				<div class="redError" v-if="showError">{{errorDesc || placeholder}}</div>
			</span>


		</div>

	</div>
	</div>
</template>
<script>
	import {
		regTemplate
	} from '../commonJS/common.js'
	export default {
		name: 'comOCC',
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
			},
			valueName: {
				required: false,
			},
			isRight: {
				required: false,
				default: false
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
				default: false
			},
			reg: {
				required: false,
				default: null
			},
			id: {
				required: false,
				default: null
			},
		},
		data() {
			return {
				isShow: false,
				autofocus: false,
				placeholder: '',
			}
		},
		watch: {},
		created() {
			this.placeholder = '请输入' + this.title;
		},
		methods: {
			changeError(value){
				console.error(value)
				this.$emit("update:showError", value)
			},
			changeValue: function(name) {
				if (name) {
					this.isShow = true;
				} else {
					this.changeError(false)
					this.isShow = false;
				};
				console.log(name)
				this.$emit("update:value", name)
			},
			clearInput: function() {
				// alert(1)
				this.$emit("update:value", '')
				this.isShow = false;
			},
			hideX: function() {
				this.isShow = false;
				if(!this.value){
					this.changeError(true)
				} else{
					this.changeError(false)
				}
				if(!this.reg) return
				// if(id == '')
				if (!regTemplate(this.value, this.reg, this.placeholder)) {
					this.changeError(true)
				}else{
					this.changeError(false)
				}
			}
		},
	}
</script>

<style lang="scss" scoped>
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
		height: px(46);
		outline: 0;
		-webkit-opacity: 1;
		width: 85%;
		// flex: 1;
	}

	.listHeight {
		height: 4rem;
		text-align: center;
	}

	.iconCenter {
		// margin-top: 10px;
	}
</style>
