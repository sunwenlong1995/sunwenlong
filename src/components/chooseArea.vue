<template>
	<div class="comtemplate">

		<div class="content">
			<div class="handel">
				<span class="handelLeft" @click="toClose">取消</span>
				<span class="handelRight" @click="fill">完成</span>
			</div>
			<div class="thisOV">
				<VDistpicker @selected="onSelected" type="mobile"></VDistpicker>
			</div>
		</div>
	</div>
</template>
<script>
	import VDistpicker from './Distpicker1.vue'
	// import VDistpicker from 'v-distpicker'

	export default {
		name: 'chooseArea',
		components: {
			VDistpicker
		},
		props: {
			// Banner title
			title: {
				type: String,
				required: false,
				default: '打开App, 浏览更多'
			},
			isShowArea: {
				type: Boolean,
				required: true
			},
			code: {
				required: true
			}
		},
		data() {
			return {
				address: '',
				province: '',
				area: '',
				city: ''
			}
		},
		methods: {
			fill() {
				if (this.address) {
					this.$emit("update:isShowArea", false)
					this.$emit('input', this.address)
				} else {
					this.$vux.toast.text('请选择城市', 'middle')
				}
			},
			onSelected: function(a, b, c, d, e, f) {

				console.log(a, b, c, d, e, f)
				// 				let {area, city, province} = val;
				// 				this.address = `${province.value},${city.value},${area.value}`;
				let address = {};
				address.name = a + ',' + c + ',' + e
				address.value = b + ',' + d + ',' + f;
				this.address = address
				// this.$emit('input',address)
			},
			toClose: function() {
				// console.log(66)
				this.$emit("update:isShowArea", false)
				// isShowArea
			},
			toPreview: function(value) {
				this.$router.push({
					name: 'preview',
					params: {
						activityInfo: value
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.comtemplate {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.4);
		z-index: 999999999999999999
	}

	.content {
		padding-bottom: px(98);
		position: absolute;
		width: 100%;
		height: 50%;
		left: 0;
		bottom: 0;

	}

	.handel {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: px(98);
		padding: 0 px(30);
		background-color: #fff;
		font-size: px(32);

		.handelLeft {
			color: $light-color2;
		}

		.handelRight {
			color: $snail-light-color;
		}
	}

	.thisOV {
		width: 100%;
		height: 100%;
		overflow: auto;
		background-color: #fff;
	}
</style>
