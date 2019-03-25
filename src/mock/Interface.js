let mockObj = {
	// fillINfo
	proposal: {
		url: '/proposalInfo/rest/proposal'
	},
	// 商品详情
	goodDetail1: {
		url: '/goods/getGoodsDetail'
	},
	// 健康告知
	getHealthNotifyList: {
		url: '/policyInform/getHealthNotifyList'
	},
	// 录入信息提交
	proposalSave: {
		url: '/proposalInfo/rest/proposal/save'
	},
	getGoodsPremVars: {
		url: '/goods/getGoodsPremVars'
	},
	realNameAuthentication: {
		url: '/rest/user/realNameAuthentication'
	},
	getAllProvince: {
		url: '/area/getAllProvince'
	},
	getCityList: {
		url: '/area/getCityList'
	},
	getCityNamesByCodes: {
		url: '/area/getCityNamesByCodes'
	},
	getPayInfo: {
		url: '/rest/payInfo/getPayInfo'
	},
	saveGoodsPremVars: {
		url: '/goods/saveGoodsPremVars'
	},
	listDisease: {
		url: '/intelligentUnderwriting/listDisease'
	},
	listQuestion: {
		url: '/intelligentUnderwriting/listQuestion'
	},
	pay: {
		url: '/proposalInfo/rest/proposal/pay'
	},
	
	saveQuestion: {
		url: '/intelligentUnderwriting/saveQuestion'
	},
	saveHealthNotifyList: {
		url: '/policyInform/saveHealthNotifyList'
	},
	saveQuestion: {
		url: '/intelligentUnderwriting/saveQuestion'
	},
	getOrderStatusByOrderId: {
		url: '/rest/payInfo/getOrderStatusByOrderId'
	},
	selectInfoList: {
		url: '/profession/selectInfoList'
	},
	getFactor: {
		url: '/goods/getFactor'
	},
	
	// 试算
	trialData: {
		url: '/frontTrialFactorService/getTrialFactorInfo'
	},
	// 试算保费
	trialPremium: {
		url: '/frontTrialFactorService/submitTrialFactorInfo'
	},
	// 健康告知
	healthNotification: {
		url: '/frontHealthNotifyService/getHealthNotifyList'
	},
	// 健康告知提交
	healthNotification: {
		url: '/frontHealthNotifyService/saveHealthNotifyList'
	},
	// 获取智能评估地址
	getAddress: {
		url: '/frontSmartService/getSmartUrl'
	},
	// 投保信息初始化界面
	fillInfo: {
		url: '/frontProposalService/getProposalInfo'
	},
	// 职业查询接口
	getOccupationList: {
		url: '/frontOccupationService/getOccupationList'
	},
	// 投保接口
	saveProposalInfo: {
		url: '/frontProposalService/saveProposalInfo'
	},
	
	
}

export default mockObj