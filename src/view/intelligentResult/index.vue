<template>
	<div class="ZA_template">
		<comHeader title="智能结果"></comHeader>
		<div class="ZA_template_S" :class="{ haveHeader: ISWX, haveFoot: true }">
			<img class="acceptIMg" src="../../assets/accept.png" />
			<!--  -->
			<div class="desc">抱歉，该被保人未能通过本次投保审核 被保人如下症状不符合投保条件：</div>
			<div class="resaon">血脂增高</div>
			<div class="comBtn thisB1">返回首页</div>
			<div class="comBtn thisB2">联系客服</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'intelligentResult',
	components: {
	},
	data() {
		return {
			isShow: true,
		};
	},
	 watch: {
			},
	computed: {},
	methods: {
		closeEx() {
			this.isShow = false;
		},
		test: function() {
			let tepData = {};
			var self = this;
			this.$axios('../../../static/falseData.json', tepData, 'get').then(function(res) {
				console.log(res.data);
				// 6666
				let { answerList } = res.data;
				self.answerList = answerList;
			});
		},
		getData: function() {
			// alert(1)
			var self = this;
			let param = {
				pageNo: '1',
				pageSize: '10',
				userNo: '123456'
			};
			this.Axios('GrowthClub', param).then(results => {
				console.log(results);
				self.someData = results;
			});
		}
	},
	created() {
		this.$setTitle('智能结果')
		this.test();
	},
	mounted() {
		// this.test()
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import './index.scss';
</style>
