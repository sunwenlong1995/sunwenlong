// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'


import {
	ConfirmPlugin,
	AlertPlugin,
	ToastPlugin,
	LoadingPlugin 
} from 'vux'
Vue.use(ConfirmPlugin)
Vue.use(AlertPlugin)
Vue.use(ToastPlugin, {
	position: 'middle'
})
Vue.use(LoadingPlugin)

Vue.mixin({
	mounted() {
	},
	methods: {
		$toastStop(){
			this.$vux.toast.text('不可更改', 'middle')
		},
		$toast(value) {
			this.$vux.toast.text(value, 'middle')
		},
		$loading(value,title) {
			if(value){
				this.$vux.loading.show({
				 text: title || 'Loading'
				})
			}else{
				this.$vux.loading.hide()
			}
			
		},
		$alert(value){
			this.$vux.alert.show({
				title: '提示',
				content: value,
			})
		}
	}
})
import {
	Axios,
	longData,
	timeout,
	formatmyyear,
	setTitle
} from './commonJS/common.js'
Vue.prototype.Axios = Axios;
Vue.prototype.$axios = axios;
Vue.prototype.$longData = longData;
Vue.prototype.$timeout = timeout;
Vue.prototype.$formatmyyear = formatmyyear;
Vue.prototype.$setTitle = setTitle;

Vue.prototype.ISWX = false;
// bus
let vm = new Vue();
Vue.prototype.$bus = vm;
// 图片懒加载
import vueLazyload from 'vue-lazyload'

Vue.use(vueLazyload, {
	adapter: {
		loading: function(listender, Init) {
			listender.el.style.backgroundImage = 'url(' + require('./assets/load.gif') + ')'
			listender.el.style.backgroundRepeat = 'no-repeat'
			listender.el.style.backgroundPosition = 'center'
			listender.el.style.backgroundSize = '10vw'
			listender.el.style.backgroundColor = 'rgb(238,238,240)'
			listender.el.style.opacity = '0.7'
		},
		loaded: function(listender, Init) {
			listender.el.style.backgroundImage = ''
			listender.el.style.opacity = '1'
			listender.el.style.transition = 'opacity .2s linear'
		},
		error: function(listender, Init) {
			if (listender.src === undefined) {
				listender.el.style.backgroundImage = 'url(' + require('./assets/load.gif') + ')'
			}
		}
	}
})
import comHeader from './components/comHeader'
// Vue.use(comHeader)
Vue.component('comHeader', comHeader)
Vue.config.productionTip = false
import store from './store/store'
/* eslint-disable no-new */
window.onload = function() {
    // 阻止双击放大
    var lastTouchEnd = 0;
    document.addEventListener('touchstart', function(event) {
        if (event.touches.length > 1) {
            event.preventDefault();
        }
    });
    document.addEventListener('touchend', function(event) {
        var now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);

    // 阻止双指放大
    document.addEventListener('gesturestart', function(event) {
        event.preventDefault();
    });
}

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  console.error(to.meta.title)
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
new Vue({
	el: '#app',
	router,
	store,
	components: {
		App
	},
	template: '<App/>'
})
