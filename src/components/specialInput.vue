<template>
	<div class="someBOttm">
		<div v-if='modefine' @click="$toastStop" class="disabledCom"></div>
		<div v-if='false' class="fontRight">
			<img class="imgT" @click='IsTrue = false' v-if='IsTrue' src="../assets/radioChoose.png" />
			<img class="imgT" @click='IsTrue = true' v-else src="../assets/noChoose.png" />
			长期
		</div>
		<div @click="ShowPoup" class="someDiv">
			<span class="font1">
				{{ title }}
			</span>
			<span style="flex: 1;">
				<input :type="type" ref="focus" @blur="hideX" :disabled="true" :placeholder="placeholder" @input="changeValue($event.target.value)"
				 :value="valueName" class="comInput1" />
				<span v-if="true" class="listRight some">
					<img class="comicon iconCenter" src="../assets/arr.png" />
				</span>
				<div class="redError" v-if="showError">{{ errorDesc || placeholder }}</div>
			</span>
		</div>
		<PopupPicker class='thisThis' title="" v-model="poupValue" :data="[radioInfo]" v-if="isOpen" :show.sync="isOpen"></PopupPicker>
	</div>
</template>
<script>
	import {
		PopupPicker
	} from 'vux';
	export default {
		name: 'specialInput',
		components: {
			PopupPicker
		},
		props: {
			title: {
				type: String,
				required: false,
				default: '打开App, 浏览更多'
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
			isRight: {
				required: false,
				default: false
			},
			isSelect: {
				required: false,
				default: false
			},
			errorDesc: {
				required: false,
				default: ''
			},
			radioInfo: {
				type: Array,
				required: true,
			},
			id: {
				required: true,
			},
			BBBBIndex: {
				required: false,
			},
			modefine: {
				required: false,
				default: false
			},
		},
		data() {
			return {
				valueName: '',
				isOpen: false,
				poupValue: [],
				IsTrue: true,
				isShow: false,
				autofocus: false,
				isShowPicker: false,
				arrList: [],
// 				1.身份证，18位，需进行身份证号码有效性校验；护照，最少7位；军人证、士兵证，必须为10-18位；回乡证，最少8位；出生证证件号码：只能输入数字和字母（不能是中文和特殊字符），最大18位长度。户口本证件号码，校验同身份证号码。驾照、学生证、工作证、临时身份证、警官证、台胞证，港、澳、台通行证，这些证件号码先不做限制，按照数据库长度做个最大长度输入限制即可。 其它、无证件，这种证件类型选项不需要在前端页面显示
// 2.邮箱：只允许以“数字/字母/下划线/点/中划线+@+数字/字母/中划线/点”格式的邮箱填写，不允许*、%、&、$等非法字符的输入
// 3.手机号：11位数字
// 4.银行卡号：不得少于16位且都是数字
// 5.密码：6至20位字符，可使用字母，数字和符号的组合，字母区分大小写。强制规则：密码中必需至少要有字母和数字。
// 6.地址：不少于5个字符且需包含数字
// 7.姓名：可填中英文，但不允许同时存在中英文；姓名中间可接受空格、“，”（逗号）及“•”（中点），其它数字及符号不可接受；中文名不可少于一个汉字；英文名时不可少于4个英文字母；
// 8.邮政编码：6位数字。
				objReg: {
					0: 'idNumA',
					1: 'idNumB',
					2: 'idNumC',
					4: 'idNumA',
					7: 'idNumE',
					A: 'idNumC',
					B: 'idNumD'
				}
			};
		},
		watch: {
			poupValue: {
				handler: function(value) {
					console.log(value[0],this.id)
					if(this.id == 'idType'){
						console.error(1)
						this.$bus.$emit('cardReg', this.objReg[value[0]], this.BBBBIndex)
					}
					// idNum
					this.IsTrue = false,
					this.$emit('update:value', value[0])
					this.$emit("update:showError", false)
				},
				deep: true,
			},
			value: {
				handler: function(value) {
					for (var i = 0; i < this.radioInfo.length; i++) {
						let item = this.radioInfo[i];
						if (item.value == value) {
							this.valueName = item.name;
							break
						}
					}
				},
				deep: true,
				immediate: true
			}
		},
		methods: {
			ShowPoup() {
				this.isOpen = true;
				// 			this.id = Math.random();
				// 			this.$bus.$emit('ShowPoup',this.radioInfo)
			},
			clearInput: function() {
				this.$emit('update:value', '');
				this.isShow = false;
			},
			hideX: function() {
				this.isShow = false;
			}
		},
		created() {
			this.placeholder = '请选择' + this.title;
		}
	};
</script>

<style lang="scss" scoped>
	.thisThis {
		position: absolute;
		z-index: -999;
	}

	.fontRight {
		z-index: 1;
		position: absolute;
		top: 50%;
		right: 0;
		transform: translateY(-50%);
		// float: right;
		height: px(108);
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
		background-color: #f8f8f8 !important;
	}

	.otherFont {
		font-size: px(28) !important;
		font-weight: bold;
	}

	input::-webkit-input-placeholder {
		/* WebKit browsers */
		color: #c9c9c9 !important;
		font-size: px(28);
	}

	input:-moz-placeholder {
		/* Mozilla Firefox 4 to 18 */
		color: #c9c9c9 !important;
		font-size: px(28);
	}

	input::-moz-placeholder {
		/* Mozilla Firefox 19+ */
		color: #c9c9c9 !important;
		font-size: px(28);
	}

	input:-ms-input-placeholder {
		/* Internet Explorer 10+ */
		color: #c9c9c9 !important;
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
	.someDiv {
		padding-top: px(29);
		padding-bottom: px(29);
	}

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
		background-color: #ffffff;
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
