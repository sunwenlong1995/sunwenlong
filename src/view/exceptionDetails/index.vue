<template>
	<div ref="content" class="ZA_template">
		<comHeader title="异常详情"></comHeader>
		<div class="ZA_template_S" :class="{ haveHeader: ISWX, haveFoot: true }">
			<!-- 异常列表 -->
			<div class="Thislist">
				<div v-for="(item,index) in detailList" :key="index" class="deteil">
					<div class="content">
						<span class="font_1">Q{{index + 1}}</span>
						<span class="font_right">
							{{item.name0}}
							<span v-if="item.name1" class="font_2" >({{item.name1}})</span>
						</span>
					</div>
					<div class="yAnswer">{{item.name2}}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'exceptionDetails',
	components: {
	},
	data() {
		return {
			detailList: [],
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
				let { detailList } = res.data;
				self.detailList = detailList;
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
