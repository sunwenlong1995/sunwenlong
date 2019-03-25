// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		questionList: [],
	},
	mutations: {
		updateQuestionList: (state,val) => {
			// let idList state.questionList.map(item => item.quesId);
// 			val.forEach(item => {
// 				if(idList)
// 			})
// 			state.questionList.push(...val)
		}
	},
	actions: {
		
		getAcitivityList: ({
			commit
		}, tepData) => {
		
		}
	}
})

export default store