<template>
	<div class="someBOttm">
		<div class="someDiv">
			<span class="font1">{{title}}<span v-if="isHave" style="color: red;">*</span></span>
			<span @click="openArea" style='flex: 1;'>
				<input :class="{timeStyle: isTime}" :type="type" ref="focus" :disabled="true" :placeholder="placeholder"
				 @input="changeValue($event.target.value)" :value="valueName" class="comInput1" />
				<span v-if="isRight" class="listRight some"><img class="comicon iconCenter" src="../assets/arr.png" /></span>
				<div class="redError" v-if="showError">{{errorDesc || placeholder}}</div>
			</span>
		</div>
		<chooseArea v-if="isShowArea" :code="value" :isShowArea.sync="isShowArea" v-model='cityInfo'></chooseArea>
	</div>
</template>
<script>
	import chooseArea from './chooseArea.vue'
	export default {
		name: 'comArea',
		components: {
			chooseArea
		},
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
				required: false
			},
			isRight: {
				required: false,
				default: true
			},
			disabled: {
				required: false,
				default: true
			},
			isHave: {
				required: false,
				default: false
			},
			isTime: {
				required: false,
				default: false
			},
		},
		watch: {
			cityInfo: {
				handler: function(value) {
					if(value){
						this.$emit("update:showError", false)
					}
					console.error(value)
					this.valueName = value.name
					this.$emit('update:value', value.value)
				},
			},
			value: {
				handler: function(value) {
					if(!this.value) return
					var self = this;
					this.Axios('getCityNamesByCodes',`codes=${self.value}`).then(function(res){
						console.log(res.data.data)
						self.valueName = res.data.data
					})
				},
				immediate: true
			},
		},
		created() {
			this.placeholder = '请选择' + this.title;
		},
		data() {
			return {
				cityInfo: '',
				isShow: false,
				autofocus: false,
				isShowArea: false,
				valueName: ''
			}
		},
		methods: {

			openArea: function() {
				this.isShowArea = true;
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
		height: 23px;
		outline: 0;
		-webkit-opacity: 1;
		width: 85%;
		opacity: 1;
		// flex: 1;
	}

	.listHeight {
		height: 4rem;
		text-align: center;
	}
</style>
