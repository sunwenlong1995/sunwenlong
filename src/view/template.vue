<template>
	<div class="comtemplate">

		<div class="content sybg">
			
		</div>
	</div>
</template>
<script>
	import Vue from 'vue'
	import { mapState } from 'vuex'
//import screenshot from '../components/screenshot'

export default {
  name: 'ThirdView',
//components: { screenshot},
  props: {
    // Banner title
    title: {
      type: String,
      required: false,
      default: '打开App, 浏览更多'
    },
    total: {
				type: [String,Number],
				required: false
			},
  },
  data () {
    return {}
  },
  computed: {
			...mapState({
				mycm: state => state.activities.mycm,
				mytest1: state => state.activities.mytest1,
				mytest2: state => state.mytest.mytest1,
			}),
			xzmycm: function() {
				var self = this
				return self.mycm.filter(function(cm) {
					return cm.name.indexOf(self.cmjt) !== -1
				})
			}
		},
  watch: {
			pickerValue: {
				handler: function() {
					this.newData.time = this.formatmyyear(this.pickerValue);
				},
				deep: true,
//				immediate: true
			}
		},
  methods: {
  	http: function() {
				console.log(this.$http.http())
				return this.$http.http()
				self.$vux.toast.text(res.data.errDesc)

			},
  	getcustomer: function() {
				this.$store.dispatch('getmycustomer')
				//提交action异步
				this.$store.dispatch('getmycustomer');
				//提交mutations同步修改state
				this.$store.commit('resetDel')
				this.$store.commit("setHttp",1)

			},
  	back: function() {
				history.back(-1);
			},
	toPreview: function(value) {
				this.$router.push({
					name: 'preview',
					params: {
						activityInfo: value
					},
					query: {
						activityInfo: value
					}
				});
				this.$toast({
								message: '姓名不允许超过10个字',
								position: 'bottom',
								duration: 1000
							});
			},
  },
  created() {
			if(this.$route.params.activityInfo) {
				this.haveData = true;
				console.log(this.$route.params.activityInfo)
				console.log(this.$route.query.activityInfo)
				this.previewInfo = this.$route.params.activityInfo
				//转对象
				this.newData = JSON.parse(localStorage.getItem("sun_newData"))
				//转字符串
				localStorage.setItem("sun_newData", JSON.stringify(this.newData))
			} else {
				this.haveData = false;
			}
		},
		mounted() {
			@input="mytest($event.target.value)"
			self.$vux.toast.text(res.data.errDesc)
            
        },
  beforeRouteLeave(to, from, next) {
			// 导航离开该组件的对应路由时调用
			// 可以访问组件实例 `this`
			console.log(111)
			localStorage.removeItem("mycantop")
			localStorage.removeItem("mycanleft")
			next();
		},
}
</script>

<style lang="scss" scoped>
	@import './index.scss';
</style>
