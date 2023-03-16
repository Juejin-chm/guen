<template>
	<view>
		<BarBg :bgtype='1'></BarBg>
		<CustomBar :barConfig='barConfig'></CustomBar>
		
		<view class="outer">
			<view class="header">
				<view class="head">
					<image src="@/static/image/head.png"></image>
					<view>
						<view class="b name">点击授权登录</view>
						<view class="ul" v-if="identity>0">
							<view class="li" v-if="identity==1">
								<image src="@/static/image/n1.png"></image>
								<text>XXXXXX门店名称</text>
							</view>
							<template v-if="identity==2">
								<view class="li">
									<image src="@/static/image/n1.png"></image>
									<text>真实姓名</text>
								</view>
								<view class="li">
									<image src="@/static/image/n2.png"></image>
									<text>厦门公司xxxxxxx</text>
								</view>
							</template>
							<view class="li" v-if="identity==3">
								<image src="@/static/image/n3.png"></image>
								<text>广告主公司名称xxxxxxx</text>
							</view>
						</view>
					</view>
				</view>
				<view class="rolename"><image src="@/static/image/switch.png"></image><text>切换角色</text></view>
				<view class="roles flex-between">
					<view v-for="(item,index) in idenArr" :class="{'cur':identity==(index+1),'opc':identity==0}" @tap="changeIden(index+1,item.hasAuth)">
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
						<view @tap="goApply">
							<image src="../../static/image/m1.png"></image>
							<view>全部审核</view>
						</view>
						<view @tap="goApply">
							<image src="../../static/image/m1.png"></image>
							<view>待审核</view>
						</view>
						<view @tap="goApply">
							<image src="../../static/image/m1.png"></image>
							<view>审核驳回</view>
						</view>
					</view>
				</template>
				
				<template v-if="identity==1">
					<view class="column flex-between">
						<navigator class="column-li column-1" url="../applyBox/applyBox">
							<view class="txt">申请领取盒子
								<image class="ri" src="@/static/image/turn-right.png"></image>
							</view>
							<image class="ico ico1" src="@/static/image/column1.png"></image>
						</navigator>
						<view class="columns">
							<view class="column-li">
								<view>总盒子数量</view>
								<view class="b">26541</view>
							</view>
							<view class="column-li">
								<view>本月盒子剩余数量</view>
								<view class="b">541</view>
							</view>
						</view>
					</view>
					
					<view class="mh">盒子订单</view>
					<view class="mul">
						<view @tap="goBox">
							<image src="../../static/image/order1.png"></image>
							<view>全部订单</view>
						</view>
						<view @tap="goBox">
							<image src="../../static/image/order2.png"></image>
							<view>未派送</view>
						</view>
						<view @tap="goBox">
							<image src="../../static/image/order3.png"></image>
							<view>已派送</view>
						</view>
						<view @tap="goBox">
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
								<view class="b">541.25</view>
							</view>
							<view>
								<view>不可提取</view>
								<view class="b">241.12</view>
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
							<view>曝光度</view>
							<view class="b">23642</view>
							<image class="ico ico3" src="@/static/image/column3.png"></image>
						</view>
					</view>
					
					<view class="mh">投放订单状态</view>
					<view class="mul">
						<navigator hover-class="none" url="../order/order">
							<image src="../../static/image/order1.png"></image>
							<view>全部订单</view>
						</navigator>
						<navigator hover-class="none" url="../order/order">
							<image src="../../static/image/order2.png"></image>
							<view>未派送</view>
						</navigator>
						<navigator hover-class="none" url="../order/order">
							<image src="../../static/image/order3.png"></image>
							<view>已派送</view>
						</navigator>
						<navigator hover-class="none" url="../order/order">
							<image src="../../static/image/order4.png"></image>
							<view>已结束</view>
						</navigator>
					</view>
				</template>
				
				<view class="mh">其他</view>
				<view class="mul mulsma">
					<view v-if="identity!=3">
						<image src="../../static/image/mo1.png"></image>
						<view>我要推广</view>
					</view>
					<navigator v-if="identity==1" url="../record/record" hover-class="none">
						<image src="../../static/image/mo3.png"></image>
						<view>发放记录</view>
					</navigator>
					<view v-if="identity==2">
						<image src="../../static/image/mo4.png"></image>
						<view>推广海报</view>
					</view>
					<view v-if="identity==3">
						<image src="../../static/image/mo5.png"></image>
						<view>投放套餐</view>
					</view>
					<navigator url="../message/message" hover-class="none" v-if="identity==0||identity==1">
						<image src="../../static/image/mo2.png"></image>
						<view>消息通知</view>
						<text class="num">3</text>
					</navigator>
					<navigator url="../commission/commission" hover-class="none" v-if="identity==2">
						<image src="../../static/image/mo2.png"></image>
						<view>消息通知</view>
						<text class="num">3</text>
					</navigator>
					<navigator url="../orderNotic/orderNotic" hover-class="none" v-if="identity==3">
						<image src="../../static/image/mo2.png"></image>
						<view>消息通知</view>
						<text class="num">3</text>
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
					<button class="avatar-wrapper" open-type="chooseAvatar" bind:chooseavatar="onChooseAvatar">
					  <image class="avatar" :src="avatarUrl"></image>
					</button> 
				</view>
				<view class="loginfo">
					<text>昵称:</text>
					<input type="nickname" class="weui-input" placeholder="点击填写"/>
				</view>
				<button class="btn confirm">允许</button>
				<button class="btn refuse">拒绝</button>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				barConfig: {
					title:'我的',
					isCenter:true,
				},
				identity:0, //0-无角色 1-商家 2-推广大师 3-广告主
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
				avatarUrl:'../../static/image/avatar.png',
				showAuth:false,
			}
		},
		methods: {
			changeIden(index,hasAuth){
				//普通用户申请角色未审核成功的，点击切换的角色时，跳出提醒“您还不是XXX，请申请认证”
				// if(hasAuth){
					this.identity = index;
				// }else{
				// 	uni.showModal({
				// 		title: '提示',
				// 		content: '您还不是XXX，请申请认证',
				// 		success: function (res) {
				// 			if (res.confirm) {
				// 				console.log('用户点击确定');
				// 			} else if (res.cancel) {
				// 				console.log('用户点击取消');
				// 			}
				// 		}
				// 	});
				// }
			},
			goApply(){
				uni.navigateTo({
					url:'../apply/apply'
				})
			},
			goBox(){
				uni.navigateTo({
					url:'../box/box'
				})
			},
			
		}
	}
</script>

<style>
	page{background-color:#f9f9f9;}
</style>
<style scoped lang="less">
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
