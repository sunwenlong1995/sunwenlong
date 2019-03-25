<template>
	<div class="ZA_template">
		<comHeader title="核保结果"></comHeader>
		<div class="ZA_template_S" :class="{ haveHeader: ISWX, haveFoot: true }">
			<div class="someContent">
				<div class="thisTitle">感谢你提供的健康信息</div>
				<div class="bigTitle">被保人可以正常投保了</div>
				<img class="thisIMg" src="../../assets/success.png" />
				<!-- <div class="comBtn">立即投保</div> -->
			</div>
			
			<!-- 异常列表 -->
			<div v-for="(item,index) in infoList" :key="index" class="otherList">
				<!-- title -->
				<div class="titleThis">
					<span class="lineThis"></span>
					<span>{{index + 1}}.异常情况</span>
					<img @click="toAnswer" class="otherIMg" src="../../assets/arr.png" />
				</div>
				
				<div class="contentThis">
					<!--  -->
					<div class="grey">健康异常问题</div>
					<div>{{item.ques}}</div>
					<div class="grey font1">特别约定</div>
					<div>{{item.result}}</div>
				</div>
				
			</div>
			<div @click="toChooseD" class="comBtn thisthisBtn">
				<img class="btnIMg" src="../../assets/addb.png" alt="">
				添加其它异常
			</div>
		</div>
		<priceFoot :notitle='false' title="" :price="1.75" @changeShow="changeShow"></priceFoot>
	</div>
</template>

<script>
	import priceFoot from '../../components/priceFoot.vue'
export default {
	name: 'intelligentResultS',
	components: {
		priceFoot
	},
	data() {
		return {
			isShow: true,
			infoList: [],
			code: '',
			tepData: []
		};
	},
	 watch: {
			},
	computed: {},
	methods: {
		toAnswer(){
			this.$router.push({
				name: 'answer',
				query: {
					questionList: this.code,
				}
			});
		},
		toChooseD(){
			this.$router.push({
				name: 'intelligentUnderwriting'
			});
		},
		changeShow(){
			var self = this;
			
			
			let param = {
				orderId: this.$longData(1, 'orderId') || 478,
				questionList: []
			};
			param.questionList = this.tepData.map(item => {
				return {
					quesId: item.quesId,
					answer: item.yesOpt == item.value ? 'Y' : 'N'
				}
			})
			this.Axios('saveQuestion', param,'post').then(res => {
				console.log(res.data.data);
				self.$router.push({
				name: 'fillInfo',
				query: {
						goodsId: this.$longData(1, 'goodsId'),
						orderId: res.data.data
				}
				// self.someData = results;
			});
			});
			
		},
		closeEx() {
			this.isShow = false;
		},
		test: function() {
			let tepData = {};
			var self = this;
			this.$axios('../../../static/falseData.json', tepData, 'get').then(function(res) {
				console.log(res.data);
				// 6666
				let { infoList } = res.data;
				self.infoList = infoList;
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
		this.$setTitle('核保结果')
		this.code = this.$route.query.questionList;
		let tepData = this.$longData(1, 'answerList');
		this.tepData = tepData;
		console.log(tepData)
		this.infoList = tepData.filter(item => item.value == 2)
		console.error(this.$store.state.questionList)
		// this.test();
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
