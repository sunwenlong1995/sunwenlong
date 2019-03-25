<template>
	<div ref="content" class="ZA_template">
		<comHeader title="智能核保"></comHeader>
		<div class="ZA_template_S" :class="{ haveHeader: ISWX, haveFoot: false,other: JSON.stringify(chooseArr) == '{}'}" >
			<div class="litterTitle">请选择被保人目前或过往的病症</div>
			<div v-for="(item, index) in diseaseLsit">
				<toggleList :chooseArr="chooseArr" :item="item" :index="index"></toggleList>
			</div>
		</div>
		<div v-if='JSON.stringify(chooseArr) != "{}"' class="listThis">
			<div class="ThisTitle">
				请选择被保人目前或过往的病症：
			</div>
			<div class="checkBox">
				<!-- {{wholeArr}} -->

				<span :key="value" v-for="(key,value) in chooseArr" class="boxItem">
					{{key}}
					<span>
						<img @click="delThis(value)" class="delImg" src="../../assets/del.png" alt="">
					</span>
				</span>
			</div>
		</div>
		<div class="comBtn thisBtn" :class="{cannotClick: JSON.stringify(chooseArr) == '{}'}" @click="postData">下一步</div>
	</div>
</template>

<script>
	import toggleList from '../../components/toggleList.vue';
	export default {
		name: 'intelligentUnderwriting',
		components: {
			toggleList
		},
		data() {
			return {
				isShow: false,
				diseaseLsit: [],
				chooseArr: {},
				wholeArr: {}
			};
		},
		computed: {},
		methods: {
			postData() {
				this.$longData(0,'chooseArr',this.chooseArr)
				let self = this;
				let codelist = this.chooseArr;
				let code = [];
				for (let key in codelist) {
					code.push(key)
				}
				this.$router.push({
					name: 'answer',
					query: {
						questionList: code.join(','),
					}
				});
			},
			delThis(code) {
				this.$delete(this.chooseArr, code)
			},
			test: function() {
				let tepData = {};
				var self = this;
				this.$axios('../../../static/falseData.json', tepData, 'get').then(function(res) {
					console.log(res.data);
					// 6666
					let {
						diseaseLsit
					} = res.data;
					self.diseaseLsit = diseaseLsit;
				});
			},
			getData: function() {
				// alert(1)
				var self = this;
				this.Axios('listDisease', '').then(res => {
					self.diseaseLsit = res.data.data;
					// self.someData = results;
				});
			}
		},
		created() {
			this.$setTitle('智能核保')
			// this.test();
			this.getData();
			console.log(this.$longData(1,'chooseArr'))
			this.chooseArr = this.$longData(1,'chooseArr') || {};
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
