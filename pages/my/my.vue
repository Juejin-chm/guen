<template>
	<view>
		<BarBg :bgtype='1'></BarBg>
		<CustomBar :barConfig='barConfig'></CustomBar>
		
		<view class="outer">
			<view class="header">
				<view class="head">
					<image :src="avatarUrl || '/static/image/head.png'"></image>
					<view>
						<view class="b name">
							<button v-if="!access_token" class="phone-number-btn" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">点击授权登录</button>
							<template v-else>{{ nickname }}</template>
						</view>
						<view class="ul" style="display: flex;" v-if="identity>0">
							<view class="li" v-if="identity==1">
								<image src="@/static/image/n1.png"></image>
								<text>{{user.role_info.bus_store_name}}</text>
							</view>
							<template v-if="identity==2">
								<view class="li">
									<image src="@/static/image/n1.png"></image>
									<text>{{ user.role_info.name }}</text>
								</view>
								<view class="li" style="margin-top: 0;margin-left: 30rpx;">
									<image src="@/static/image/n2.png"></image>
									<text>{{user.role_info.ds_plug_addr}}</text>
								</view>
							</template>
							<view class="li" v-if="identity==3">
								<image src="@/static/image/n3.png"></image>
								<text>{{user.role_info.ggz_company}}</text>
							</view>
						</view>
					</view>
				</view>
				<view class="rolename"><image src="@/static/image/switch.png"></image><text>切换角色</text></view>
				<view class="roles flex-between">
					<view v-for="(item,index) in idenArr" :key="index" :class="{'cur':identity==(index+1),'opc':identity==0}" @tap="changeIden(index+1,item.hasAuth,item.title, item.key)">
						<image :src="`../../static/image/r${index+1}.png`"></image>
						<text>{{item.title}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="box">
			<view class="outer">
				<template v-if="identity==0">
					<view class="mh">我的申请</view>
					<view class="mul">
						<view @tap="goApply('all')">
							<image src="../../static/image/m1.png"></image>
							<view>全部审核</view>
						</view>
						<view @tap="goApply(0)">
							<image src="../../static/image/m2.png"></image>
							<view>待审核</view>
						</view>
						<view @tap="goApply(2)">
							<image src="../../static/image/m3.png"></image>
							<view>审核驳回</view>
						</view>
					</view>
				</template>
				
				<template v-if="identity==1">
					<view class="column flex-between">
						<view class="column-li column-1" @click="gotoApplyBox">
							<view class="txt">申请领取盒子
								<image class="ri" src="@/static/image/turn-right.png"></image>
							</view>
							<image class="ico ico1" src="@/static/image/column1.png"></image>
						</view>
						<view class="columns">
							<view class="column-li">
								<view>总盒子数量</view>
								<view class="b">{{user.total_box_num}}</view>
							</view>
							<view class="column-li">
								<view>本月盒子剩余数量</view>
								<view class="b">{{ user.month_box_num }}</view>
							</view>
						</view>
					</view>
					
					<view class="mh">盒子订单</view>
					<view class="mul">
						<view @tap="goBox('all')">
							<image src="../../static/image/order1.png"></image>
							<view>全部订单</view>
						</view>
						<view @tap="goBox('1')">
							<image src="../../static/image/order2.png"></image>
							<view>未派送</view>
						</view>
						<view @tap="goBox('2')">
							<image src="../../static/image/order3.png"></image>
							<view>已派送</view>
						</view>
						<view @tap="goBox('3')">
							<image src="../../static/image/order4.png"></image>
							<view>已完成</view>
						</view>
					</view>
				</template>
				
				<view class="column flex-between" v-if="identity==2">
				    <view class="column-li column-1">
						<view class="flex-between">
							<view>
								<view>可提取</view>
								<view class="b">{{user.money}}</view>
							</view>
							<view>
								<view>不可提取</view>
								<view class="b">{{user.frozen_money}}</view>
							</view>
						</view>
						<image class="ico ico2" src="@/static/image/column2.png"></image>
				    </view>
				    <view class="columns">
						<navigator class="column-li" hover-class="none" url="../myCommission/myCommission">
							<view class="txt">我的佣金
								<image class="ri" src="@/static/image/turn-right.png"></image>
							</view>
							<view>点击查看佣金明细</view>
						</navigator>
						<navigator class="column-li" hover-class="none" url="../myTeam/myTeam">
							<view class="txt">我的团队
								<image class="ri" src="@/static/image/turn-right.png"></image>
							</view>
							<view>点击查看团队列表</view>
						</navigator>
				    </view>
				</view>
	
				<template v-if="identity==3">
					<view class="column">
						<view class="column-li column-2">
							<view class="percentage-text">曝光进度</view>
							<view class="b percentage-value">{{user.percentage}}</view>
							<view class="percentage-bar">
								<text class="percentage-num">{{ user.exposure }}</text>
								<text class="percentage-num-r">{{ user.total_exposure }}</text>
								<text class="percentage-bar__left" :style="{width: user.exposure / user.total_exposure * 100 + '%'}"></text>
								<!-- <text class="percentage-bar__right"></text> -->
							</view>
							<image class="ico ico3" src="@/static/image/column3.png"></image>
						</view>
					</view>
					
					<view class="mh">投放订单状态</view>
					<view class="mul">
						<navigator v-for="item in orderList" hover-class="none" :key="item.key" :url="`../order/order?key=${item.key}`">
							<image :src="item.src"></image>
							<view>{{item.value}}</view>
						</navigator>
						<!-- <navigator hover-class="none" url="../order/order?id=1">
							<image src="../../static/image/order2.png"></image>
							<view>未派送</view>
						</navigator>
						<navigator hover-class="none" url="../order/order?id=2">
							<image src="../../static/image/order3.png"></image>
							<view>已派送</view>
						</navigator>
						<navigator hover-class="none" url="../order/order?id=3">
							<image src="../../static/image/order4.png"></image>
							<view>已结束</view>
						</navigator> -->
					</view>
				</template>
				
				<view class="mh">其他</view>
				<view class="mul mulsma">
					<view v-if="identity!=3" @click="goBusiness">
						<image src="../../static/image/mo1.png"></image>
						<view>我要推广</view>
					</view>
					<navigator v-if="identity==1" url="../record/record" hover-class="none">
						<image src="../../static/image/mo3.png"></image>
						<view>发放记录</view>
					</navigator>
					<view v-if="identity==2" @click="push">
						<image src="../../static/image/mo4.png"></image>
						<view>推广海报</view>
					</view>
					<view v-if="identity==3" @click="goDiscount">
						<image src="../../static/image/mo5.png"></image>
						<view>投放套餐</view>
					</view>
					<navigator :url="`../message/message?isNotRole=${identity}`" hover-class="none" v-if="identity==0||identity==1">
						<image src="../../static/image/mo2.png"></image>
						<view>消息通知</view>
						<text v-if="user.no_read_msg_count" class="num">{{user.no_read_msg_count}}</text>
					</navigator>
					<navigator url="../commission/commission" hover-class="none" v-if="identity==2">
						<image src="../../static/image/mo2.png"></image>
						<view>消息通知</view>
						<text v-if="user.no_read_msg_count" class="num">{{user.no_read_msg_count}}</text>
					</navigator>
					<navigator url="../orderNotic/orderNotic" hover-class="none" v-if="identity==3">
						<image src="../../static/image/mo2.png"></image>
						<view>消息通知</view>
						<text v-if="user.no_read_msg_count" class="num">{{user.no_read_msg_count}}</text>
					</navigator>
				</view>
				
			</view>
		</view>
		
		<view class="loginwarp" v-if="showAuth">
			<view class="login">
				<view class="head">
					<image src="@/static/image/head.png"></image>
					<text>金盒子小程序</text>
					<text>申请</text>
				</view>
				<view class="h2">获取你的昵称、头像</view>
				<view class="loginfo">
					<text>头像：</text>
					<button class="avatar-wrapper" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
					  <image class="avatar" :src="avatarUrl"></image>
					</button>
				</view>
				<view class="loginfo">
					<text>昵称:</text>
					<input type="nickname" class="weui-input" placeholder="点击填写" name="nickname" @blur="blur"/>
				</view>
				<button class="btn confirm" @click="sumbit">允许</button>
				<button class="btn refuse" @click="showAuth = false">拒绝</button>
			</view>
		</view>
		
	</view>
</template>

<script>
	import { login } from '@/request/auth.js'
	export default {
		data() {
			return {
				barConfig: {
					title:'我的',
					isCenter:true,
				},
				identity: uni.getStorageSync('now_level') && (+uni.getStorageSync('now_level') - 1) || 0, //0-无角色 1-商家 2-推广大师 3-广告主
				idenArr:[{
					icon:'../../static/image/r1.png',
					iconAct:'../../static/image/r1-1.png',
					title:'商家',
					hasAuth:false,
				},{
					icon:'../../static/image/r2.png',
					iconAct:'../../static/image/r1-2.png',
					title:'推广大使',
					hasAuth:false,
				},{
					icon:'../../static/image/r3.png',
					iconAct:'../../static/image/r1-3.png',
					title:'广告主',
					hasAuth:false,
				}],
				
				avatarUrl: uni.getStorageSync('avatarUrl'),
				nickname: uni.getStorageSync('nickname'),
				access_token: uni.getStorageSync('access_token'),
				showAuth:false,
				
				user: {
					role_info: {}
				},
				orderList: []
			}
		},
		onLoad(options) {
			console.log(options, 'my options')
			const scene = decodeURIComponent(options.scene)
			console.log(scene, 'scene...')
			if (scene) {
				uni.setStorageSync('scene', scene)
			}			
			// this.scanCode()
		},
		onShow() {
			const token = uni.getStorageSync("access_token")
			if (token) {
				this.getRoleList()
				this.getPersonInfo()
			} else {
				uni.showToast({
					icon: 'none',
					title: '请先登录'
				})
			}
			
		},
		methods: {
			scanCode() {
				// 允许从相机和相册扫码
				uni.scanCode({
					scanType: ['qrCode'],
					success: function(res) {
						// 微信小程序
						if (res.errMsg == "scanCode:ok") {
							// 扫描到的信息
							console.log(res, '扫码返回的结果')
						} else {
							uni.showToast({
								icon: 'none',
								title: '二维码扫描失败'
							})
						}
					}
				});
			},
			getRoleList() {
				this.$api('/role-list').then(({data}) => {
					this.idenArr[0].hasAuth = data[1].has_role
					this.idenArr[0].title = data[1].val
					this.idenArr[0].key = data[1].key
					this.idenArr[1].hasAuth = data[2].has_role
					this.idenArr[1].title = data[2].val
					this.idenArr[1].key = data[2].key
					this.idenArr[2].hasAuth = data[3].has_role
					this.idenArr[2].title = data[3].val
					this.idenArr[2].key = data[3].key
				})
			},
			goBusiness() {
				this.goToForm(4)
			},
			goDiscount() {
				uni.navigateTo({
					url:'/pages/discount/discount'
				})
			},
			push() {
				uni.navigateTo({
					url: '/pages/poster/poster'
				})
			},
			blur(e) {
				const { value: nickname } = e.detail
				uni.setStorageSync('nickname', nickname)
			},
			getAvatar(tempFilePath) {
				return new Promise((resolve, rej) => {
					uni.uploadFile({
						url: 'http://guen_czd.juejinvr.cn:8089/api/upload-img',
						filePath: tempFilePath,
						name: 'file',
						header: {
							Authorization: uni.getStorageSync('access_token')
						},
						formData: {
							file: tempFilePath
						},
						success: (res) => {
							const path = JSON.parse(res.data).data.path
							resolve(path)
						}
					})
				})
				
			},
			
			
			gotoApplyBox() {
				// if (this.user.has_no_finish_order) {
				// 	return uni.showToast({
				// 		icon: 'none',
				// 		title: '有未确认的订单，不能申请盒子',
				// 		duration: 3000
				// 	})
				// }
				uni.navigateTo({
					url: '/pages/applyBox/applyBox'
				})
			},
			async onChooseAvatar(e) {
				const { avatarUrl } = e.detail
				const path = await this.getAvatar(avatarUrl);
				if (path) {
					this.avatarUrl = path
					uni.setStorageSync('avatarUrl', path)
				}
			},
			async getPhoneNumber(e) {
				const { code } = e.detail
				// 手机号本地存储
				if (code) {
					const { data: phone } = await this.$api('/auth-phone', { code })
					uni.setStorageSync('phone', phone)
					this.showAuth = true
				}
			},
			sumbit() {
				login().then((data) => {
					this.nickname = data.niackname
					this.avatarUrl = data.avatarUrl
					this.showAuth = false
					this.access_token = uni.getStorageSync('access_token')
					if (data.now_level) {
						this.identity = data.now_level - 1
					}
					this.getRoleList()
					this.getPersonInfo()
				})
			},
			changeIden(index,hasAuth, role, key){
				if (!this.access_token) {
					return uni.showToast({
						icon: 'none',
						title: '您还未登录，请先登录'
					})
					
				}
				//普通用户申请角色未审核成功的，点击切换的角色时，跳出提醒“您还不是XXX，请申请认证”
				if(hasAuth){
					if (this.identity !== index) {
						this.identity = index;
					} else {
						this.identity = 0
					}
					this.getPersonInfo()
				}else{
					uni.showModal({
						title: '提示',
						content: `您还不是${role}，请申请认证`,
						success:  (res) => {
							if (res.confirm) {
								console.log('用户点击确定', key);
								this.goToForm(key)
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				}
			},
			getPersonInfo() {
				this.$api('/person-info', {
					change_role: this.identity + 1
				}).then(({data}) => {
					this.user = data.user
					uni.setStorageSync('now_level', data.user.now_level)
					if (data.user.order_const) {
					 this.orderList = data.user.order_const.map((item, index) => {
						 item.src = `../../static/image/order${index + 1}.png`
						 return item
					 })
					}
				})
			},
			goToForm(role) {
				let url = ''
				if (role == 2) {
					url = '../business/business?type=0&title=商家入驻'
				}
				if (role == 3) {
					url = '../business/business?type=1&title=成为推广大使'
				}
				if (role == 4) {
					url = '../business/business?type=2&title=我要投广告'
				}
				uni.navigateTo({ url })
			},
			goApply(key){
				uni.navigateTo({
					url:'../apply/apply?key=' + key
				})
			},
			goBox(key){
				uni.navigateTo({
					url:'../box/box?key=' + key
				})
			},
			
		}
	}
</script>

<style>
	page{background-color:#f9f9f9;}
</style>
<style scoped lang="less">
	.percentage-bar {
		width: 300rpx;
		height: 24rpx;
		background: #E6E6E6;
		display: flex;
		align-items: center;
		position: relative;
		.percentage-num, .percentage-num-r {
			font-size: 20rpx;
			position: absolute;
			left: 10rpx;
			z-index: 2;
			color: #111;
		}
		.percentage-num-r {
			left: unset;
			right: 10rpx;
		}
		&__left {
			background: #CBA868;
			width: 20%;
			height: 100%;
			text-align: left;
			box-sizing: border-box;
			padding-left: 10rpx;
			position: relative;
		}
		&__left::after {
			content: '';
			position: absolute;
			right: 0;
			width: 4rpx;
			height: 34rpx;
			background: #CBA868;
			top: 50%;
			transform: translateY(-50%);
		}
		// &__right {
		// 	background: #E6E6E6;
		// 	text-align: right;
		// 	padding-right: 10rpx;
		// }
	}
	.percentage-value.b {
		margin-top: 0!important;
		margin-bottom: 16rpx;
	}
	.percentage-text {
		margin-top: 0!important;
	}
	.phone-number-btn {
		display: inline-block;
		background: transparent;
		color: white;
	}
	.header{padding-top: 20rpx;
		image,text{display: inline-block;vertical-align: middle;}
		image{width: 40rpx;height: 40rpx;margin-right: 10rpx;}
		text{font-weight:500;color:#ffffff;font-size:28rpx;}
	}	
	.head{display: flex;align-items: center;
		&>image{width:140rpx;height:140rpx;border-radius: 50%;margin-right: 24rpx;}
		&>view{flex-basis: 76.24%;
			.name{font-weight:700;color:#ffffff;font-size:38rpx;}
			.ul{margin-top: 20rpx;
				.li{position: relative;padding-left: 50rpx;
					image{position: absolute;left: 0;top: 0;}
					text{font-size:26rpx;}
					&:last-child{margin-top: 10rpx;}
				}
			}
		}
		
	}
	.rolename{margin: 40rpx 0 20rpx;
		image{width: 26rpx;height: 25rpx;}
	}
	.roles{
		&>view{
			width:220rpx;
			height:110rpx;
			background-color:#474848;
			border-radius:10rpx;
			padding: 34rpx 0 0 20rpx;box-sizing: border-box;
			position: relative;
			image,text{opacity:60%;}
			image{margin-right: 18rpx;}
			&.opc{background-color:rgba(112,112,112,0.6);}
			&.cur{
				image,text{opacity:1;}
				&::after{content: '';
					position: absolute;right: 0;top: 0;
					width: 38rpx;height: 38rpx;
					background-image: url(../../static/image/gou.png);
					background-size: 100% 100%;
				}
			}
		}
	}
	
	.box{background-color:#f9f9f9;margin-top: 50rpx;}
	.mh{padding: 40rpx 0 20rpx;font-weight:700;color:#111111;font-size:30rpx;}
	.mul{display: flex;justify-content: space-around;
		background-color: #fff;border-radius:14rpx;padding: 28rpx 0;
		&>view,&>navigator{position: relative;
			font-weight:500;color:#111111;
			font-size:28rpx;text-align:center;display: block;
			image{width: 84rpx;height: 84rpx;display: block;margin: 0 auto 14rpx;}
			
		}
		&.mulsma{display: block;font-size: 0;
			&>view,&>navigator{
				width: 25%;display: inline-block;vertical-align: middle;
				image{width: 60rpx;height: 60rpx;}
				.num{position: absolute;right: 28rpx;top: 0;color: #fff;font-size: 24rpx;
					min-width:32rpx;
					height:32rpx;
					border-radius: 32rpx;
					background-color:#cba868;
					display: block;
				}
			}
		}
	}
	
	.column{padding-top: 40rpx;
		.column-li{
			width:335rpx;background-color:#ffffff;border-radius:14rpx;position: relative;
			box-sizing: border-box;padding: 28rpx;
			.txt{font-weight:700;font-size:30rpx;color:#111;margin-bottom: 20rpx;
				.ri{float: right;width: 15rpx;height: 25rpx;margin-top: 10rpx}
			}
			view{color:#999999;font-size:28rpx;font-weight:500;}
			.b{color:#111;font-size:38rpx;margin-top: 19rpx;}
			.ico{position: absolute;
				&.ico1{width: 246rpx;height: 246rpx;right: 16rpx;bottom: 0;}
				&.ico2{width: 197rpx;height: 174rpx;right: 68rpx;bottom: 10rpx;}
				&.ico3{width: 241rpx;height: 172rpx;right: 26rpx;bottom: 4rpx;}
			}
		}
		.column-1{width:335rpx;}
		.column-2{width: 100%;height: 188rpx;
			&>view{
				&:first-child{margin-top: 20rpx;}
			}
		}
		.columns{
			.column-li{height:158rpx;padding: 26rpx 26rpx 0 34rpx;
				&:last-child{margin-top: 19rpx;}
			}
		}
	}
	
	.loginwarp{width: 100%;height: 100%;background-color: rgba(0,0,0,0.3);position: fixed;left: 0;top: 0;}
	.login{padding: 34rpx 30rpx;
		background-color:#ffffff;border-radius:30rpx 30rpx 0 0;
		position: absolute;left: 0;bottom: 0;z-index: 1;
		width: 100%;
		box-sizing: border-box;
		image{width: 80rpx;height: 80rpx;border-radius: 50%;}
		.head{font-size: 28rpx;font-weight: bold;
			image,text{display: inline-block;vertical-align: middle;}
			text{
				&:nth-child(2){padding: 0 32rpx 0 12rpx;}
			}
		}
		.h2{font-weight:700;color:#29292b;font-size:30rpx;margin: 40rpx 0 32rpx;}
		.loginfo{position: relative;padding-left: 148rpx;
			border-bottom: 1rpx solid #e7e6e6;
			text{position: absolute;left: 0;top: 50%;transform: translate(0,-50%);}
			button{
				background-color: transparent;
				padding: 0;
				text-align: left;border-radius: none;
			}
			input{padding: 29rpx 0 27rpx;}
		}
		.confirm{
			background-color:#cba868;
			margin-top: 60rpx;
		}
		.refuse{color: #111;
			background-color: transparent;
			margin-top: 10rpx;
		}
	}
	
</style>
