<template>
	<div id="app">
		<router-view />
	</div>
</template>

<script>
	export default {
		name: 'App'
	}
</script>

<style lang="scss">
	#app {
		-webkit-touch-callout: none;
		-webkit-user-select: none;
		-khtml-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		font-family: "Helvetica Neue", Helvetica, Arial, "PingFang SC", "Hiragino Sans GB", "Heiti SC", "MicrosoftYaHei", "WenQuanYi Micro Hei", sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
	}

	// 其他配置
	body.dialog-open {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
	}
	body{
		margin: 0!important;
	}
	.comicon {
		width: px(12) !important;
		height: px(20) !important;
		position: relative;
		top: px(6)
	}

	.font1 {
		min-width: px(180) !important;
		max-width: px(180) !important;
		margin-right: px(20);
		word-break: break-all;
	}

	.comInput1 {
		color: #333 !important;
		padding: 0 !important;
		position: relative;
		outline: 0;
		-webkit-opacity: 1 !important;
		opacity: 1 !important;
	}

	.tabContent img {
		width: 100%;
	}

	.someBOttm {
		position: relative;
		border-bottom: none !important;
	}

	.someDiv {
		// position: relative !important;
		// border-bottom: 0;
		// border: 1px solid red;
	}

	.contentThis .someBOttm:before {
		height: 0px !important;
	}

	.someBOttm:before {
		content: '';
		position: absolute;
		left: 0;
		bottom: 0;
		width: 200%;
		height: 2px;
		border-bottom: 1px solid #e8e8e8;
		-webkit-transform-origin: 0 0;
		-moz-transform-origin: 0 0;
		-ms-transform-origin: 0 0;
		-o-transform-origin: 0 0;
		transform-origin: 0 0;
		-webkit-transform: scale(0.5, 0.5);
		-ms-transform: scale(0.5, 0.5);
		-o-transform: scale(0.5, 0.5);
		transform: scale(0.5, 0.5);
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
	}

	// 公共样式配置	
	a {
		text-decoration: none;
		outline: none;
		-moz-outline-style: none;
		color: #0670C5 !important;
	}

	input[disabled],
	input:disabled,
	input.disabled {
		// color: #333;  
		-webkit-text-fill-color: #333;
		-webkit-opacity: 1;
		opacity: 1;
	}

	@mixin inputStyle($radius) {
		color: $radius !important;
		-webkit-text-fill-color: $radius !important;
		font-size: px(28);
	}

	input::-webkit-input-placeholder {
		@include inputStyle(#C9C9C9);
	}

	input:-moz-placeholder {
		@include inputStyle(#C9C9C9);
	}

	input::-moz-placeholder {
		@include inputStyle(#C9C9C9);
	}

	input:-ms-input-placeholder {
		@include inputStyle(#C9C9C9);
	}


	* {
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
		-webkit-tap-highlight-color: transparent;
	}

	//框架样式修改
	// vux 点击阴影效果去除
	.weui-cell_access:active {
		background-color: #fff !important;
	}

	.weui-mask_transparent {
		z-index: 9999999 !important;
	}

	.thisM .weui-dialog {
		background-color: transparent !important;
	}

	.vux-popup-header-right {
		color: $snail-light-color !important;
	}

	.distpicker-address-wrapper {
		color: #333 !important;
	}

	.distpicker-address-wrapper .address-header ul li.active {
		color: $snail-light-color !important;
		border-bottom: $snail-light-color solid 3px !important;
	}

	.distpicker-address-wrapper .address-container ul li.active {
		color: $snail-light-color !important;
	}

	.weui-dialog__btn_default {
		color: #353535 !important;
	}

	.weui-dialog__btn_primary {
		color: $snail-light-color !important;
	}

	.dp-header .dp-item.dp-right {
		color: $snail-light-color !important;
	}

	.weui-dialog__bd:first-child {
		font-size: px(32);
		color: $deep-color;
	}

	.weui-cell {
		padding: 0 !important;
		display: block !important;
	}

	.weui-cell:before {
		border-top: none !important;
	}
</style>
