<template>
	<div class="someBOttm">
		<div class="someDiv">
			<span class="font1">{{title}}<span v-if="isHave" style="color: red;">*</span></span>
			<span style='flex: 1;'>
				<input :class="{timeStyle: isTime}" :type="type" ref="focus" @blur="hideX" :disabled="isRight || disabled"
				 :placeholder="placeholder" @input="changeValue($event.target.value)" :value="value" class="comInput1" />
				<span @click="clearInput" v-show="isShow" class="listRight some"><img class="comicon iconCenter" src="../assets/Group 6.png" /></span>
				<span v-if="isRight" class="listRight some"><img class="comicon iconCenter" src="../assets/arr.png" /></span>
				<div class="redError" v-if="showError">{{errorDesc || other() || placeholder}}</div>
			</span>
		</div>
		<div v-if='modefine' @click="$toastStop" class="disabledCom"></div>
	</div>
</template>
<script>
	import {
		regTemplate
	} from '../commonJS/common.js'
	export default {
		name: 'comInput',
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
				default: false
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
			modefine: {
				required: false,
				default: false
			},
		},
		data() {
			return {
				isShow: false,
				autofocus: false,
				placeholder: '',
				obj: {
					phone: {
						reg: 'phone',
						placeholder: '请输入正确的手机号'
					},
					email: {
						reg: 'email',
						placeholder: '请输入正确的邮箱'
					},
					bankNum: {
						reg: 'bankNum',
						placeholder: '请输入正确的银行卡号'
					},
					name: {
						reg: 'name',
						placeholder: '请输入正确的名字'
					},
					zipcode: {
						reg: 'zipcode',
						placeholder: '请输入正确的邮编'
					}
				}
			}
		},
		watch: {},
		created() {
			let self = this;
			this.placeholder = '请输入' + this.title;
		},
		methods: {
			other(){
				try{
					return this.obj[this.id].placeholder
				}catch(e){
					//TODO handle the exception
					return null
				}
				
			},
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
					return
				} else{
					this.changeError(false)
				}
				// if(id == '')
// 				email: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
// 				phone: /^[1][0-9]{10}$/,
// 				number: /^\d*$/,
// 				intPattern: /^0$|^[1-9]\d*$/,
// 				idCard: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
				if(!this.reg){
					try{
						this.reg = this.obj[this.id].reg || '';
						console.log(this.reg)
					}catch(e){
						//TODO handle the exception
					}
				}
				
				
				if(!this.reg) return
				if (!regTemplate(this.value, this.reg)) {
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
