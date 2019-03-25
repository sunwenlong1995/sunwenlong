<template>
	<div>
		<transition  :name="transitionName">
			<keep-alive include="intelligentUnderwriting">
				<router-view></router-view>
			</keep-alive>
		</transition>
		<!-- <PopupPicker class='thisThis' title="" v-model="value" :data="[arrList]" v-if="isOpen" :show.sync="isOpen"></PopupPicker> -->
	</div>
</template>

<script>
	import {
		PopupPicker
	} from 'vux';
	export default {
		name: 'HomePages',
		components: {
			PopupPicker
		},
		data() {
			return {
				id: '',
				value: [],
				arrList: [{
						name: '111',
						value: 0
					},
					{
						name: '222',
						value: 1
					}
				],
				isOpen: false,
				transitionName: '',
				routerObj: {
					'myOrderList': ['myQh', 'service'],
					'service': ['myCollection', 'allService', 'myOrder'],
					'sfrz': ['service'],
					'myPassword': ['selfInfo', 'service'],
					'AllCard': ['myWelfare'],
					'myOrder': ['myWelfare', 'AllCard'],
				}
			}
		},
		methods: {},
		watch: {
			'$route'(to, from) {
				let self = this;
				let start = from.path.slice(7)
				let end = to.path.slice(7)
				console.log(start, end)
				const isHave = (real) => {
					console.log(this.routerObj)
					if (start in this.routerObj) {
						if (this.routerObj[start].includes(end)) {
							return true
						} else {
							return false
						}

					} else {
						return false
					}

				}
				//				console.log(to.meta.keepAlive,from.meta.keepAlive)
				if (to.path == '/pages/sy' || to.path == '/pages/myQh' || to.path == '/pages/myOrderList') {
					if (from.path == '/pages/sy') {
						this.transitionName = 'slide-left'
					} else {

						this.transitionName = 'slide-right'
					}

					if (from.path == '/pages/myQh' && to.path == '/pages/myOrderList') {
						this.transitionName = 'slide-left'
					}

					if (from.path == '/pages/myOrderList' && to.path == '/pages/myQh') {
						this.transitionName = 'slide-right'
					}

					if (from.path == '/pages/service' && to.path == '/pages/sy') {
						this.transitionName = 'slide-right'
					}

					// 					if(from.path == '/pages/service'){
					// 						this.transitionName = 'slide-left'
					// 					}



				} else {
					if (isHave()) {
						console.error(666)
						this.transitionName = 'slide-right'
					} else {
						this.transitionName = 'slide-left'
					}
					console.error(this.transitionName)
				}




			}
		},
		mounted: function() {

		},
		created() {
// 			this.$bus.$on('ShowPoup', (value) => {
// 				this.arrList = value;
// 				this.isOpen = true;
// 			})
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.slide-left-enter-active {
		animation: bounce-right .5s;
	}

	.slide-left-leave-active {
		animation: bounce-leave1 0.5s;
	}

	.slide-right-enter-active {
		animation: bounce-left .5s;
	}

	.slide-right-leave-active {
		animation: bounce-leave .5s;
	}

	@keyframes bounce-leave1 {
		0% {
			opacity: 1;
			transform: translateX(0);
		}

		100% {
			opacity: 0.5;
			transform: translateX(-50%);
		}
	}

	@keyframes bounce-leave {
		0% {
			opacity: 1;
			transform: translateX(0%);
		}

		100% {
			opacity: 0;
			transform: translateX(50%);
		}
	}

	@keyframes bounce-right {
		0% {
			transform: translateX(100%);
		}

		100% {
			transform: translateX(0);
		}
	}

	@keyframes bounce-left {
		0% {
			transform: translateX(-100%);
		}

		100% {
			transform: translateX(0);
		}
	}
</style>
