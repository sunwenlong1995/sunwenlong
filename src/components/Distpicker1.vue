<template>
	<div class="distpicker-address-wrapper">
		<template>
			<div :class="addressHeader">
				<ul>
					<li :class="{'active': tab === 1}" @click="resetProvince">{{ currentProvince && !staticPlaceholder ? currentProvince : placeholders.province }}</li>
					<template v-if="!onlyProvince">
						<li v-if="showCityTab" :class="{'active': tab === 2}" @click="resetCity">{{ currentCity && !staticPlaceholder ? currentCity : placeholders.city }}</li>
						<li v-if="showAreaTab && !hideArea" :class="{'active': tab === 3}">{{ currentArea && !staticPlaceholder ? currentArea : placeholders.area }}</li>
					</template>
				</ul>
			</div>
			<div :class="addressContainer">
				<ul v-if="tab === 1">
					<li v-for="(value, key) in provinces" :class="{'active': value === currentProvince}" @click="chooseProvince(value,key)"
					 :key="key">
						{{ value }}
					</li>
				</ul>
				<ul v-if="tab === 2">
					<li v-for="(value, key) in cities" :class="{'active': value === currentCity}" @click="chooseCity(value,key)"
					 :key="key">
						{{ value }}
					</li>
				</ul>
				<ul v-if="tab === 3 && !hideArea">
					<li v-for="(value, key) in areas" :class="{'active': value === currentArea}" @click="chooseArea(value,key)"
					 :key="value">
						{{ value }}
					</li>
				</ul>
			</div>
		</template>
	</div>
</template>

<script>
	export default {
		name: 'VDistpicker',
		props: {
			province: {
				type: [String, Number],
				default: ''
			},
			city: {
				type: [String, Number],
				default: ''
			},
			area: {
				type: [String, Number],
				default: ''
			},
			hideArea: {
				type: Boolean,
				default: false
			},
			onlyProvince: {
				type: Boolean,
				default: false
			},
			staticPlaceholder: {
				type: Boolean,
				default: false
			},
			placeholders: {
				type: Object,
				default () {
					return {
						province: '省',
						city: '市',
						area: '区',
					}
				}
			},
			disabled: {
				type: Boolean,
				default: false
			},
			addressHeader: {
				type: String,
				default: 'address-header'
			},
			addressContainer: {
				type: String,
				default: 'address-container'
			},
		},
		data() {
			return {
				tab: 1,
				showCityTab: false,
				showAreaTab: false,
				provinces: {},
				cities: {},
				areas: {},
				currentProvince: this.determineType(this.province,0) || this.placeholders.province,
				currentCity: this.determineType(this.city,1) || this.placeholders.city,
				currentArea: this.determineType(this.area,2) || this.placeholders.area,
				type: '',
				currentProvinceId: "",
				currentCityId: "",
				currentAreaId: ""
			}
		},
		created() {
			if (this.area) {
			  this.tab = 3
			  this.showCityTab = true
			  this.showAreaTab = true
			  this.getCityOrArea(2,this.city)
			} else if (this.city) {
			  this.tab = 2
			  this.showCityTab = true
			  this.getCityOrArea(1,this.provinces)
			} else {
			  this.getProvince()
			}
// 			this.provinces = {
// 				10001: '社会功能1',
// 				10002: '社会功能2'
// 			}
		},
		watch: {
			currentAreaId(value) {
				this.$emit('selected', this.currentProvince, this.currentProvinceId, this.currentCity, this.currentCityId, this.currentArea,
					this.currentAreaId, )
			},
			province(value) {
				// this.currentProvince = this.province || this.placeholders.province
			},
			city(value) {
				// this.currentCity = this.city || this.placeholders.city
			},
			area(value) {
				// this.currentArea = this.area || this.placeholders.area
			},
		},
		computed: {
		},
		methods: {
// 			provinces: {},
// 			cities: {},
// 			areas: {},
			getProvince(){
				var self = this;
				this.Axios('getAllProvince','').then(function(res){
					console.log(res.data.data)
					self.provinces = res.data.data
				})
			},
			getCityOrArea(index,code){
				var self = this;
				this.Axios('getCityList', `parentAreaCode=${code}`).then(function(res){
					console.log(res.data.data)
					// 6666
					// let {productDetail} = res.data;
					if(index == 1){
						self.cities = res.data.data
					}else{
						self.areas = res.data.data
					}
				})
			},
			determineType(code,index){
				if(!code) return
				let self = this;
				let obj = {
					0: self.provinces[code],
					1: self.cities[code],
					2: self.areas[code],
				}
				return obj[index]
			},
			getCities(code) {
				this.currentCity = this.placeholders.city
				this.currentArea = this.placeholders.area
				this.cleanList('areas')
				if (this.cities === null) {
					this.emit('selected')
					this.tab = 1
					this.showCityTab = false
				}
				// 获取 城市
				this.getCityOrArea(1,code)
// 				this.cities = {
// 				10001: '城市功能11',
// 				10002: '城市功能222'
// 				}
			},
			getAreas(code) {
				this.currentArea = this.placeholders.area;
				// 获取 地区
				this.getCityOrArea(2,code)
// 				this.areas = {
// 				10001: '地区功能11',
// 				10002: '地区功能222'
// 				}
				if (this.areas === null) {
					this.emit('selected')
					this.tab = 2
					this.showAreaTab = false
				}
			},
			resetProvince() {
				this.tab = 1
				this.currentProvince = '省';
				this.currentProvinceId = '';
				this.showCityTab = false
				this.showAreaTab = false
				this.cleanList('areas')
				this.cleanList('cities')
				
			},
			resetCity() {
				this.tab = 2
				this.currentCity = '市';
				this.currentProvinceId = '';
				this.showCityTab = true
				this.showAreaTab = false
				this.cleanList('areas')
			},
			chooseProvince(name, id) {
				this.currentProvince = name
				this.currentProvinceId = id
				this.tab = 2
				this.showCityTab = true
				this.showAreaTab = false
				this.getCities(id)
			},
			chooseCity(name, id) {
				this.currentCity = name
				this.currentCityId = id
				this.tab = 3
				this.showCityTab = true
				this.showAreaTab = true
				this.getAreas(id)
			},
			chooseArea(name, id) {
				this.currentArea = name
				this.currentAreaId = id
			},
			cleanList(name) {
				this[name] = []
			},
		}
	}
</script>

<style lang="scss">
	.distpicker-address-wrapper {
		color: #9caebf;

		select {
			padding: .5rem .75rem;
			height: 40px;
			font-size: 1rem;
			line-height: 1.25;
			color: #464a4c;
			background-color: #fff;
			background-image: none;
			-webkit-background-clip: padding-box;
			background-clip: padding-box;
			border: 1px solid rgba(0, 0, 0, .15);
			border-radius: .25rem;
			-webkit-transition: border-color ease-in-out .15s, -webkit-box-shadow ease-in-out .15s;
			transition: border-color ease-in-out .15s, -webkit-box-shadow ease-in-out .15s;
			-o-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
			transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
			transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s, -webkit-box-shadow ease-in-out .15s;

			option {
				font-weight: normal;
				display: block;
				white-space: pre;
				min-height: 1.2em;
				padding: 0px 2px 1px;
			}
		}

		ul {
			margin: 0;
			padding: 0;

			li {
				list-style: none;
			}
		}

		.address-header {
			background-color: #fff;

			ul {
				display: flex;
				justify-content: space-around;
				align-items: stretch;

				li {
					display: inline-block;
					padding: 10px 10px 7px;

					&.active {
						border-bottom: #52697f solid 3px;
						color: #52697f;
					}
				}
			}
		}

		.address-container {
			background-color: #fff;

			ul {
				height: 100%;
				overflow: auto;

				li {
					padding: 8px 10px;
					border-top: 1px solid #f6f6f6;

					&.active {
						color: #52697f;
					}
				}
			}
		}
	}
</style>
