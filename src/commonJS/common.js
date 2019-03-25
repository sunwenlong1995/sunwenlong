import router from '../router'
import axios from 'axios'
import Vue from 'vue'
import mock from '../mock/Interface.js'
import {
	ToastPlugin
} from 'vux'
Vue.use(ToastPlugin, {
	position: 'middle'
})

const toast = (value) => {
	Vue.$vux.toast.text(value)
}
const alertT = (value) => {
	Vue.$vux.alert.show({
		title: '提示',
		content: value,
	})
}
// import {baseUrl} from '../../static/base.js'
// console.error(baseUrl)
// console.log(mock)
// http 修改处
// const http = 'https://twitter/';
// const http = 'http://192.168.43.114:9011';
let http = '';
console.log(location.hostname)
if (location.hostname == 'localhost') {
	// 生产环境
	http = 'http://120.79.171.80:9011';
	// http = 'http://47.107.233.162:9011';
	// kaifa
} else if (location.hostname == '120.79.57.37') {
	// http = 'http://47.107.233.162:9011';
	http = 'http://120.79.171.80:9011';
	// http = 'http://172.20.171.80:9011';

	// CESHI
} else if (location.hostname == 'web.yingbaobei.com.cn') {
	http = 'http://47.107.233.162:9011';
} else if (location.hostname == 'uat.yingbaobei.com.cn') {	
	http = 'http://120.76.61.76:9011';
} else {
	http = 'http://47.107.233.162:9011';
}
// http = '/api';
// console.error(baseUrl);
// const http = baseUrl;
// const http = 'http://47.107.233.162:9011';
// const http = 'http://192.168.43.114:9011';
// const http = 'http://www.royyun.info:9000/';
// const http = 'https://sjwxxcx.sh.tobacco.com.cn/yc-mobile/';
// const http = '';

const headerGet = {
	"Content-Type": "application/json"
};

const headerPost = {
	"Content-Type": "application/x-www-form-urlencoded"
};

const Axios = function(url, tepData, method = 'get', isConfirm = false) {

	let data = tepData;
	// 	if (isNeed) {
	// 		let {
	// 			token
	// 		} = store.state.userInfo;
	// 		data = Object.assign(data, {
	// 			token: token
	// 		})
	// 	}
	let realUrl;
	try {
		realUrl = mock[url].url;
	} catch (e) {
		throw new Error('此接口未定义')
		// console.error('此接口未定义')
	}
	if (method == 'get') {
		realUrl = realUrl + '?' + tepData
	}

	console.info('%c 接口入参：' + realUrl, 'background:#0e51ba;color:#fff')
	console.log(data)
	// 	data = JSON.stringify(data)
	// 	var params = new URLSearchParams();
	// 	params.append('data', data);
	return new Promise(function(resolve, reject) {
		axios({
				url: http + realUrl, //仅为示例，并非真实的接口地址
				data: tepData,
				// header: method == 'get' ? headerGet : headerPost,
				header: headerGet,
				method: method,
				success: function(res) {}
			})
			.then((res) => {
				console.info('%c 接口返回：', 'background:#999999;color:#fff')
				console.log(res)
				// 状态码成功时执行
				if (res.status == 200) {
					// resolve(res)
					if (res.data.success) {
						// console.log("before %c after","color:yellow"); 
						console.info('%c 接口名称：' + url, 'background:#0e51ba;color:#fff')
						console.log(res.data)
						console.log(
							'%c --------------------------------------------------   分割线   ----------------------------------------------',
							'color: #0e51ba')
						if (res.data.code == '9999') {
							resolve({
								code: '9999',
								msg: res.data.message
							})
						} else {
							resolve(res)
						}

					} else {

						console.error(`接口名称 ${url} 接口错误码 ${res.data.code}`)
						console.error(`接口错误信息 ${res.data.message}`)
						if(isConfirm){
							alertT(res.data.message)
						}else{
							toast(res.data.message);
						}
						
						reject(res.data.message)
					}
					// 
				} else {
					reject(1)
					console.error(`接口错误码 ${res.data.code}`)
					console.error(`接口错误信息 ${res.statusCode}`)
					toast(res.status);
				}
			})
			.catch((e) => {
				reject(1)
				console.error(e)
				// alert('网络超时')
				// Axios(url,tepData)
				toast(e);
			});
	})

}
let obj = {
	email: /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/,
	phone: /^[1][0-9]{10}$/,
	number: /^\d*$/,
	intPattern: /^0$|^[1-9]\d*$/,
	idNumA: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
	idNumB: /^\d{7,}$/,
	idNumD: /^\d{8,}$/,
	idNumC: /^\d{10,18}$/,
	idNumE: /^[0-9a-zA-Z]{1,18}$/,
	bankNum: /^\d{16,19}$/,
	nameC: /^[\u4e00-\u9fa5\\.\\,\\ ]{2,4}$/,
	nameE: /^[a-zA-Z\\.\\,\\ ]{4,}$/,
	zipcode: /^\d{6}$/
}
const regTemplate = (value, reg, warn) => {
	console.error(value, reg, warn)
	// console.log(obj[reg])
	if (reg == 'name') {
		let regular = obj['nameC'];
		let regular1 = obj['nameE'];
		console.log(regular, regular1)
		if (regular.test(value) || regular1.test(value)) {
			// toast(warn);
			return true;
		} else {
			return false
		}
	} else {
		let regular = obj[reg];
		if (!regular.test(value)) {
			// toast(warn);
			return false;
		} else {
			return true
		}
	}

}


// 延时函数
const timeout = async function(ms) {

	await new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}

// 缓存封装
const longData = (type, key, value) => {
	try {
		let obj = {
			0: () => {
				localStorage.setItem(key, JSON.stringify(value))
			},
			1: () => {

				return JSON.parse(localStorage.getItem(key))
			},
			2: () => {
				localStorage.removeItem(key)
			},

		}
		return obj[type]()
	} catch (e) {
		//TODO handle the exception
		return ''
	}

}

// form 表单提交
const formSubmmit = (url, param) => {
	let temp = document.createElement("form"); //创建form标签
	temp.action = url; //这里写URL
	temp.method = "post"; //post方式提交
	temp.style.display = "none"; //设置为不可见

	for (let k in param) {
		//创建input标签并设置相关参数
		let inputTemp = document.createElement("input");
		// inputTemp.setAttribute("type", "text");
		inputTemp.setAttribute("name", k);
		inputTemp.setAttribute("value", param[k]);
		temp.appendChild(inputTemp); //把input标签添加到form标签内
	}
	document.body.appendChild(temp); //将form标签添加到body标签内
	temp.submit(); //提交form
}

const formatmyyear = function formatmyyear(data) {
	if (data) {
		var date = new Date(data);
		var y = date.getFullYear();
		var m = date.getMonth() + 1;
		m = m < 10 ? '0' + m : m;
		var d = date.getDate();
		d = d < 10 ? '0' + d : d;
		var h = date.getHours();
		h = h < 10 ? '0' + h : h;
		var minute = date.getMinutes();
		minute = minute < 10 ? '0' + minute : minute;
		var mydate = y + '-' + m + '-' + d;
		return mydate;
	} else {
		return null;
	}
};
const getfilesize = function getfilesize(size) {
	if (!size)
		return "";

	var num = 1024.00; //byte

	if (size < num)
		return size + "B";
	if (size < Math.pow(num, 2))
		return (size / num).toFixed(2) + "K"; //kb
	if (size < Math.pow(num, 3))
		return (size / Math.pow(num, 2)).toFixed(2) + "M"; //M
	if (size < Math.pow(num, 4))
		return (size / Math.pow(num, 3)).toFixed(2) + "G"; //G
	return (size / Math.pow(num, 4)).toFixed(2) + "T"; //T
}
const dataURLtoFile = function dataURLtoFile(dataurl, filename) { //将base64转换为文件
	var arr = dataurl.split(','),
		mime = arr[0].match(/:(.*?);/)[1],
		bstr = atob(arr[1]),
		n = bstr.length,
		u8arr = new Uint8Array(n);
	while (n--) {
		u8arr[n] = bstr.charCodeAt(n);
	}
	return new File([u8arr], filename, {
		type: mime
	});
}
const compress = function compress(file) {
	return new Promise((resolve,reject) => {
		try{
			var windowURL = window.URL || window.webkitURL;
			var dataURL = windowURL.createObjectURL(file);
			console.log(file);
			console.log(getfilesize(file.size))
			var img = new Image();
			img.src = dataURL;
			var canvas = document.createElement('canvas');
			var ctx = canvas.getContext('2d')
			img.onload = function() {
				canvas.width = img.width;
				canvas.height = img.height;
				ctx.drawImage(img, 0, 0, img.width, img.height);
				var base64 = canvas.toDataURL('image/jpeg', 0.8);
				console.log(base64)
				let filr = dataURLtoFile(base64, '99');
				console.log(getfilesize(filr.size))
				// this.src = windowURL.createObjectURL(filr);
				resolve(filr)
			}
		}catch(e){
			//TODO handle the exception;
			console.log('压缩失败')
			resolve(file)
		}
		
	})
	
};

const debonce = (fn, delay, atOnce = false) => {
	let time = '';
	const layOut = (value) => {
		time = setTimeout(() => {
			fn(...value)
			time = ''
		}, delay)
	}
	return function() {
		// console.log(3333)
		if (!time) {
			if (atOnce) {
				fn(...arguments)
				time = 1
			} else {
				layOut(arguments)
			}
		} else {
			clearTimeout(time);
			layOut(arguments)
		}
	}
}

const setTitle = (value) => {
	// alert(value)
	document.title = value;
}


export {
	timeout,
	Axios,
	regTemplate,
	longData,
	formSubmmit,
	formatmyyear,
	compress,
	getfilesize,
	setTitle,
	debonce
}
