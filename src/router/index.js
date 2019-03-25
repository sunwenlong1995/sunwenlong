import Vue from 'vue'
import Router from 'vue-router'
// 从外部url 直接跳转过来的页面不建议使用懒加载，可能会导致路由加载出错
import productDetail from '@/view/productDetail/index.vue'
import payStatus from '@/view/payStatus/index.vue'
import fillInfo from '@/view/fillInfo/index.vue'
import HomePages from '@/view/homePage/index.vue'
// 懒加载页面
const healthNotification = () => import('@/view/healthNotification/index')
const intelligentUnderwriting = () => import('@/view/intelligentUnderwriting/index')
const answer = () => import('@/view/answer/index')
const intelligentResult = () => import('@/view/intelligentResult/index')
const intelligentResultS = () => import('@/view/intelligentResultS/index')
const exceptionDetails = () => import('@/view/exceptionDetails/index')
const orderPay = () => import('@/view/orderPay/index')

// const productDetail = () => import('@/view/productDetail/index')
// const fillInfo = () => import('@/view/fillInfo/index')
// const payStatus = () => import('@/view/payStatus/index')
// import healthNotification from '@/view/healthNotification/index.vue'
// import intelligentUnderwriting from '@/view/intelligentUnderwriting/index.vue'
// import answer from '@/view/answer/index.vue'
// import intelligentResult from '@/view/intelligentResult/index.vue'
// import intelligentResultS from '@/view/intelligentResultS/index.vue'
// import exceptionDetails from '@/view/exceptionDetails/index.vue'
// import orderPay from '@/view/orderPay/index.vue'


Vue.use(Router)

export default new Router({
	routes: [{
			path: '/pages',
			component: HomePages,
			children: [{
					path: '',
					redirect: '/pages/productDetail'
				},
				{
					path: 'productDetail',
					name: 'productDetail',
					component: productDetail
				},
				{
					path: 'healthNotification',
					name: 'healthNotification',
					component: healthNotification,
					meta: {
						title: '健康告知'
					}
				},
				{
					path: 'intelligentUnderwriting',
					name: 'intelligentUnderwriting',
					component: intelligentUnderwriting,
					meta: {
						title: '智能核保'
					}
				},
				{
					path: 'answer',
					name: 'answer',
					component: answer,
					meta: {
						title: '智能核保'
					}
				},
				{
					path: 'intelligentResult',
					name: 'intelligentResult',
					component: intelligentResult,
					meta: {
						title: '智能核保'
					}
				},
				{
					path: 'intelligentResultS',
					name: 'intelligentResultS',
					component: intelligentResultS,
					meta: {
						title: '核保结果'
					}
				},
				{
					path: 'exceptionDetails',
					name: 'exceptionDetails',
					component: exceptionDetails,
					meta: {
						title: '智能核保'
					}
				},
				{
					path: 'orderPay',
					name: 'orderPay',
					component: orderPay,
					meta: {
						title: '支付订单'
					}
				},
				{
					path: 'fillInfo',
					name: 'fillInfo',
					component: fillInfo,
					meta: {
						title: '投保信息'
					}
				},
				{
					path: 'payStatus',
					name: 'payStatus',
					component: payStatus
				}

			]
		},
		{
			path: '*',
			redirect: '/pages/productDetail'
		}
	]
})
