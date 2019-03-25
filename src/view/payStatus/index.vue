<template>
	<div class="ZA_template">
			<comHeader title='确认交易' ></comHeader>
		<div class="ZA_template_S">
			<div v-if='success'>
				<div  class="topicBg" >
					<img width="100%" height="100%" src="../../assets/bgPay.png" />
				</div>
				<div  class="list_div test1" >
					<!-- 我是分割线 -->
					<div class="datted"></div>
					<!-- 内容 -->
					<div class="success">
						支付成功
					</div>
					<div class="info_detail">
						<div >
							<div  class="detail_content ZZ" style="border-bottom: 0;">
								<span>下单时间</span>
								<span >{{time}}</span>
							</div>
							<div  class="detail_content" style="border-bottom: 0;">
								<span>订单总价</span>
								<span class="thisSpan"><span class="OO">￥</span><span class="big">{{price}}</span> </span>
							</div>
						</div>
					</div>
					
					
				</div>
				
			</div>
			<!-- fail -->
			<div v-else>
				<div class="fail">
					<img src="../../assets/payFail.png" />
				</div>
				<div class="failContent">
					<div class="failInner">
						<div class="big bigFail" >支付失败</div>
						<span style="color: #858B9C;">下单时间: {{time}}</span>
						<div v-if="msg" style="color: #858B9C;margin-top: 10px;">失败原因: {{msg}}</div>
					</div>
					<!-- <div v-if="msg" class="failInner">
						<div class="big bigFail" >失败原因</div>
						<span style="color: #858B9C;">{{msg}}</span>
					</div> -->
				</div>
			</div>
			<!-- back -->
			<div @click="toPro" class="comBtn thisBtn">返回首页</div>
		</div>

	</div>

</template>

<script>
	export default {
		name: 'payStatus',
		components: {
		},
		data() {
			return {
				time: '',
				price: '',
				success: false,
				msg: ''
			}
		},
		methods: {
			toPro(){
				let self = this;
				this.$router.push({
					name: 'productDetail',
					query: self.$longData(1,'goodsInfo')
				});
			}
		},
		created() {
		
			this.price = this.$route.query.price;
			// if()
			this.success = this.$route.query.success == 0 || this.$route.query.success == 'false' ? false : true;
			console.log(this.success)
			this.time = this.$route.query.time;
			this.msg = this.$route.query.msg;
			},
		mounted() {	
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	@import './index.scss';
</style>
