<template>
	<div>
		<div class="answerItem">
			<img class="headImg" src="../assets/headImg.png" />
			<!-- 描述 -->
			<div class="rightContent">
				<div class="answerType">
					<span class="thisBtn">{{ answerType[type] }}</span>
					<div class="someBottom">{{index + 1}}. {{ desc }}</div>
				</div>
				<div v-if="type == 0"></div>
				<!-- 单选提问 -->
				<div v-if="type == 1">
					<div @click="chooseRadio(item.value,index)" :key="index" :class="{noBoder: index == 1}" class="raidoItem" v-for="(item, index) in arrList1">
						<!-- {{item.value}} -->
						<img class="imgT" v-if="answerObj.value === item.value" src="../assets/radioChoose.png" />
						<img class="imgT" v-else src="../assets/noChoose.png" />
						{{ item.key }}
					</div>

					<div v-if="!isShow" class="radioSure comBtn" @click="sureShow" :class="{ greyBg: answerObj.value == -1 }">
						确定
					</div>
				</div>
				<!-- 多选题 -->
				<div v-if="type == 2">
					<div @click="chooseCheckBox(item)" class="raidoItem" v-for="(item, index) in arrList">
						<img class="imgT" v-if="checkBoxKey.includes(item.value)" src="../assets/checkBoxChoose.png" />
						<img class="imgT" v-else src="../assets/noChoose.png" />
						{{ item.key }}
					</div>

					<div v-if="!isShow" class="radioSure comBtn" @click="sureShow" :class="{ greyBg: checkBoxKey.length == 0 }">
						确定
					</div>
				</div>
				<!-- 问答题 -->
				<div v-if="type == 3">
					<textarea v-model="textAreaValue" class="someTextarea" placeholder="请输入" :disabled="isShow"></textarea>

					<div v-if="!isShow" class="radioSure comBtn" @click="sureShow" :class="{ greyBg: !textAreaValue }">
						确定
					</div>
				</div>
				<!-- 用户回答 -->
				<div v-if="type == 4"></div>
			</div>
		</div>
		<!-- 单选 -->
		<!-- {{answerObj.value}}{{isShow}} -->
		<div v-if="answerObj.value!=-1 && isShow" class="myAnswerCon">
			<div class="myAnswer rightContent">
				<div class="answerQ">{{ otherIndex == 0 ? '是' : '否' }}</div>
				<!-- 重新选择 -->
				<div @click="reset" class="reset">
					重新选择
					<img src="../assets/reset.png" />
				</div>
				<div v-if="false" @click="toPost" class="answerQ thisQ">提交</div>
			</div>
		</div>
		<!-- 多选 -->
		<div v-if="checkBoxKey.length != 0 && isShow" class="myAnswerCon">
			<div class="myAnswer rightContent">
				<div class="answerQ">
					<div class="cheUI" v-for="item in checkName">{{ item }}</div>
				</div>
				<!-- 重新选择 -->
				<div @click="reset" class="reset">
					重新选择
					<img src="../assets/reset.png" />
				</div>
			</div>
		</div>
		<!-- 问答 -->
		<div v-if="textAreaValue && isShow" class="myAnswerCon">
			<a name="miao"></a>
			<div class="myAnswer rightContent">
				<div class="answerQ">{{ textAreaValue }}</div>
				<!-- 重新选择 -->
				<div @click="reset" class="reset">
					重新填写
					<img src="../assets/reset.png" />
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'answerItem',
		components: {},
		props: {
			title: {
				type: String,
				required: false
			},
			answerObj: {
				type: Object,
				required: true
			},
			index: {
				type: Number,
				required: true
			},
			answerProgressIndex: {
				type: Number,
				required: true
			},
			isLast: {
				type: Boolean,
				required: true
			},
			tepData: {
				required: false
			}
		},
		data() {
			return {
				textAreaValue: '',
				isShow: false,
				disabled: false,
				desc: '在未经过药物控制的情况下,是否甘油三酯<14mmol/L且总胆固醇<7mmol/L ？',
				radioKey: -1,
				checkBoxKey: [],
				checkName: [],
				arrList1: [{
						key: '是',
						value: 1
					},
					{
						key: '否',
						value: 0
					}
				],
				answerType: {
					1: '单选题',
					2: '多选题',
					3: '问答题'
				},
				lineLeft: 37,
				type: 1,
				otherIndex: 0
			};
		},
		watch: {
			textAreaValue: {
				handler: function(value) {}
			}
		},
		methods: {
			toPost(){
				this.$emit('toPost')
			},
			sureShow() {
				if (this.answerObj.value != -1) {
					// alert(2)
					this.isShow = true;
					console.log(this.answerProgressIndex,this.index)
					if(this.answerProgressIndex <= this.index){
						this.$emit('update:answerProgressIndex', this.index + 1);
					}
				} else if (this.checkBoxKey.length !== 0) {
					this.isShow = true;
					this.$emit('input', this.index);
				} else if (this.textAreaValue) {
					this.$emit('input', this.index);
					this.isShow = true;
				}
			},
			// radio 选择
			chooseRadio(value,otherIndex) {
				// this.$emit('indexChange',this.index)
				// 判断是否可以点击
				if (!this.isShow) {
					this.otherIndex = otherIndex;
					this.$set(this.answerObj,'value',value)
				}
			},
			// 复选
			chooseCheckBox(value) {
				if (!this.isShow) {
					let index = this.checkBoxKey.indexOf(value.value);
					if (index != -1) {
						this.checkBoxKey.splice(index, 1);
						this.checkName.splice(index, 1);
					} else {
						this.checkBoxKey.push(value.value);
						this.checkName.push(value.key);
					}
				}
			},
			reset() {
				this.disabled = false;
				this.isShow = false;
			},
			doSomething() {
				console.log(666);
				this.$emit('doSomething');
			}
		},
		created() {
			// this.answerObj.value = this.tepData;
			if(this.answerObj.value != -1 && this.answerObj.value != undefined){
				this.isShow = true
			}
			this.$set(this.arrList1[0],'value',this.answerObj.yesOpt)
			this.$set(this.arrList1[1],'value',this.answerObj.noOpt)
			this.desc = this.answerObj.ques;
		},
		mounted() {}
	};
</script>

<style lang="scss" scoped>
	.noBoder{
		border: none !important;
	}
	.post{
		border-top: 1px solid #fff;
	}
	textarea::-webkit-input-placeholder {
		/* WebKit browsers */
		color: #c3c6d2;
		font-size: px(34);
		font-weight: 400;
	}

	textarea:-moz-placeholder {
		/* Mozilla Firefox 4 to 18 */
		color: #c3c6d2;
		font-size: px(34);
		font-weight: 400;
	}

	textarea::-moz-placeholder {
		/* Mozilla Firefox 19+ */
		color: #c3c6d2;
		font-size: px(34);
		font-weight: 400;
	}

	textarea:-ms-input-placeholder {
		/* Internet Explorer 10+ */
		color: #c3c6d2;
		font-size: px(34);
		font-weight: 400;
	}

	.someTextarea {
		resize: none;
		border-radius: 2px;
		/*margin-left: 17px;
		margin-right: 17px;*/
		display: block;
		padding-top: px(30);
		padding-left: px(0);
		width: 85%;
		font-size: px(34);
		// margin: 0 auto;
		height: px(200);
		border: none;
		outline: 0;
		background-color: #fff;
		/*background-color: red;*/
	}

	// danxuan1
	.radioSure {
		height: px(99);
		border-radius: px(99);
		width: px(300);
		box-sizing: border-box;
		margin-top: px(31);
	}

	.greyBg {
		background-color: #d4d4d4;
	}

	// duo
	.cheUI {
		margin-bottom: px(10);
	}

	.answerItem {
		text-align: left;
		display: flex;
		// margin-bottom: px(40);

		.headImg {
			width: px(70);
			height: px(70);
			margin-right: px(20);
		}

		.thisBtn {
			padding: px(8) px(16);
			background-color: $bg-light-color;
			color: $light-color2;
			border-radius: px(48);
			font-size: px(24);
			margin-bottom: px(26);
			display: inline-block;
		}

		.someBottom {
			padding-bottom: px(38);
			border-bottom: 1px solid $border-color;
		}
	}

	.rightContent {
		flex: 1;
		padding: px(30);
		background: rgba(254, 255, 253, 1);
		border-radius: px(20);
		margin-right: px(68);
		color: $deep-color;
		font-size: px(34);
		margin-bottom: px(60);
		.imgT {
			width: px(46);
			height: px(46);
			margin-right: px(30);
		}

		.raidoItem {
			display: flex;
			align-items: center;
			height: px(110);
			border-bottom: 1px solid $border-color;
		}
	}

	// 客户回答
	.myAnswerCon {
		display: flex;
		justify-content: flex-end;
		// margin-bottom: px(60);
	}

	.myAnswer {
		text-align: left;
		color: #fff;
		background-color: $snail-light-color;
		width: px(200);
		
		padding: px(30) 0;
		flex: none;
		margin-right: 0;

		.answerQ {
			word-break: break-all;
			padding-left: px(30);
			padding-right: px(20);
			padding-bottom: px(15);
			border-bottom: 1px solid #e7fdff;
		}
		.thisQ{
			margin-top: px(23);
			border-bottom: none;
			padding-top: px(15);
			padding-bottom: 0;
			border-top: 1px solid #e7fdff;
		}

		.reset {
			// display: inline-block;
			font-size: px(26);
			padding: 0 px(30);
			padding-top: px(23);

			img {
				width: px(24);
				height: px(23);
			}
		}
	}
</style>
