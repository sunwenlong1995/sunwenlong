<template>
	<div class="someBOttm">
		<div :class="{pb0: !showError}" class="someDiv">
			<span class="font1">{{title}}<span v-if="isHave" style="color: red;">*</span></span>
			<span class="checkBox" >
				<!-- {{questionnaire.optionList}} -->
				<span @click="changeIndex(item.value)" :key="index" :class="{chooseStyle : value == item.value}" v-for="(item,index) in radioInfo" class="boxItem">{{item.name}}</span>
			<div class="redError" v-if='showError'>{{errorDesc || '请选择' + title}}</div>
			</span>
		</div>	
		<div v-if='modefine' @click="$toastStop" class="disabledCom"></div>
	</div>
</template>
<script>
	export default {
		name: 'comRadio',
		props: {
			title: {
				type: String,
				required: false,
				default: '打开App, 浏览更多'
			},
			isHave: {
				type: Boolean,
				required: false,
				default: false
			},
			radioInfo: {
					type: Array,
					required: true
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
			value: {
				required: false,
				default: ''
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
				// RadioList: {
			}
		},
		watch: {},
		methods: {
			clearInput: function() {
			},
			changeIndex(value){
				console.log(value)
				// this.radioKey = value;
				if(value){
					this.$emit("update:showError", false)				
				}else{
					this.$emit("update:showError", true)
				}
				this.$emit('update:value',value)
			}
		},
	}
</script>

<style lang="scss" scoped>
	.chooseStyle {
		color: #fff !important;
		background-color: $snail-light-color !important;
		border: 1px solid $snail-light-color !important;
	}
	.boxItem {
		padding: px(10) px(30);
		background-color: #fff;
		color: $light-color2;
		border-radius: px(6);
		border: 1px solid $border-color;
		margin-bottom: px(20);
		margin-right: px(20);
		display: inline-block;
		font-size: px(28);
	}
	.timeStyle{
			color: $snail-light-color;
		}
		.comicon {
			width: px(48);
			height: px(48);
		}
		.otherBg{
			background-color: #F8F8F8 !important;
		}
		.otherFont{
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
		.font1{
			color: #494949;
			font-size: px(28);
			display: inline-block;
			min-width: px(180);
			position: relative;
			top: -5px;
			// padding-top: px(12);
		}
		.someDiv{
			// padding-b: 0;
		}
		.checkBox{
			flex: 1
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
	    margin-top: 9px;
	    margin-bottom: 9px;
	    width: 86%;
	}
		.listHeight {
			height: 4rem;
			text-align: center;
		}
		
		.iconCenter {
			margin-top: 10px;
		}
</style>
