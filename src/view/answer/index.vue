<template>
	<div ref="content" class="ZA_template">
		<comHeader title="智能核保"></comHeader>
		<div ref="answer" class="ZA_template_S" :class="{ haveHeader: ISWX, haveFoot: true }">
			<div class="dialogMOdel">
				<span class="someBg">下面就 <span class="specialCOlor">相关疾病</span> 进行提问</span>
				<answerItem @toPost="toPost" :ref="'ref' + index" :key="index" :answerProgressIndex.sync='answerProgressIndex' v-for='(item,index) in answerList'
				 :answerObj='item' :tepData='tepData[item.quesId]' :isLast="index == answerList.length-1 ? true : false" :index="index" v-if="answerProgressIndex >= index"></answerItem>
				<!-- {{answerProgressIndex}} -->
			</div>

		</div>
		<div v-if='answerProgressIndex == answerList.length' class="thisBtn">
			<div class="comBtn otherBB" :class="{cannotClick: answerProgressIndex != answerList.length}" @click="toPost">提交</div>
		</div>
		<x-dialog v-model="isShow">
			<div class="thisModel">
				<div class="thisTitle">感谢你提供的健康信息</div>
				<div class="bigTitle">被保人可以正常投保了</div>
				<img class="thisIMg" src="../../assets/accept.png" />
				<div class="comBtn" @click="toFill">立即投保</div>
			</div>
		</x-dialog>
	</div>
</template>

<script>
	import {
		XDialog
	} from 'vux';
	import answerItem from '../../components/answerItem.vue'
	export default {
		name: 'answer',
		components: {
			answerItem,
			XDialog
		},
		data() {
			return {
				isShow: false,
				answerList: [],
				answerProgressIndex: 0,
				answerIndex: '',
				name: '',
				code: [],
				tepData: {}
			};
		},
		watch: {
			answerProgressIndex: {
				handler: function(value) {
					console.log(value)
					
					this.$nextTick(() => {
						this.$refs.answer.scrollTop = this.$refs.answer.scrollTop + 400
					})
				}
			}
		},
		computed: {},
		methods: {
			toFill(){
				let self = this;
				this.$router.push({
					name: 'fillInfo',
					query: {
						goodsId: self.$longData(1,'goodsId'),
						orderId: self.$longData(1,'orderId')
					}
				});
			},
			toPost() {
				// 	0: '拒保',
				// 	1: '正常可投保',
				// 2: '除外可投保',
				let self = this;
				let codeResult = -1;
				let descResult = [];
				let isCanCan=true;
				let length = this.answerList.length;
				for (let i = 0; i < length; i++) {
					let code = this.answerList[i].value;
					
					let desc = this.answerList[i].result;
					// codeResult = code
					if(code == -1 ){
						isCanCan = false;
						break
					}
					if (code == 0) {
						codeResult = code;
						break
					} else if (code == 2 && codeResult != 0) {
						codeResult = code;
						descResult.push(desc)
					} else if (code == 1 && codeResult != 0 && codeResult != 2) {
						codeResult = code;
					}
					
					
				}
				console.log(this.answerList)
				if(!isCanCan){
					this.$toast('请完善表单')
					return
				}
				console.log(codeResult)
				console.log(descResult)
				console.log(this.answerList)
				let tepData = {};
				self.answerList.forEach(item => {
					tepData[item.quesId] = item.value
				})
				self.$longData(0, 'answerLong', tepData)
				self.$longData(0, 'answerList', self.answerList)
				let obj = {
					0: () => {
						self.$alert('很抱歉您的条件无法投保，推荐投保其他产品')
					},
					1: () => {
						self.isShow = true;
					},
					2: () => {
						self.$router.push({
							name: 'intelligentResultS',
							query: {
								questionList: self.code,
							}
						});
					}
				}
				// alert(codeResult)
				obj[codeResult]()
				
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
					let {
						answerList
					} = res.data;
					self.answerList = answerList;
				});
			},
			getData: function() {
				// alert(1)
				var self = this;
				this.Axios('listQuestion', `code=${self.code}`).then(res => {
					// console.log(res);
					// 判断是否有缓存
					let tepData = this.$longData(1, 'answerLong');
					if(tepData){
						res.data.data.forEach(item => {
							console.error(tepData[item.quesId])
							item.value = tepData[item.quesId]
						})
						console.log(res.data.data)
						console.log(tepData)
						self.answerProgressIndex = res.data.data.length
					}else{
						res.data.data.forEach(item => {
							item.value = -1
						})
					}
					self.answerList = res.data.data;
				});
			}
		},
		created() {
			this.$setTitle('智能核保')
			this.code = this.$route.query.questionList;
			this.getData();
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
