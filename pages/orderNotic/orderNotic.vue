<template>
	<view>
		<BarBg :bgtype='0'></BarBg>
		<CustomBar :barConfig='barConfig'></CustomBar>
		
		<view class="otabs">
			<view :class="[status==1?'cur':'']" @click="tabClick(1)">订单通知</view>
			<view :class="[status==2?'cur':'']" @click="tabClick(2)">平台消息</view>
		</view>
		
		<view class="box boxhui">
			<view class="outer">
				<view class="ex-name flex-between">
					<view class="le">订单通知</view>
					<view class="timer">
						<picker mode="date" fields="month" :value='date' @change="bindDateChange">
							<image src="@/static/image/date.png"></image>
							<text :class="[date?'hei':'']">{{date?date:'请选择'}}</text>
						</picker>
					</view>
				</view>
				
				<view class="msgul" v-if="status==1">
					<view v-for="item in list" :key="item.id" class="msgli" @tap="cliPop(item.id)">
						<view>
							<view :class="{dot: !item.isread}">{{item.title}}</view>
						</view>
						<view class="time">{{item.format_time}}</view>
					</view>
					<!-- <view class="msgli" @tap="cliPop">
						<view>
							<view>您有新的订单通知</view>
						</view>
						<view class="time">2023/02/12 12:26:54</view>
					</view> -->
				</view>
				<view class="msgul" v-else>
					<view v-for="item in msgList" :key="item.id" class="msgli" @tap="goDetail(item.id)">
						<view>
							<!-- <view :class="{dot: !item.isread}">{{item.title}}</view> -->
							<view :class="{dot: !item.isread, gold: item.cont}">{{item.title}}</view>
						</view>
						<view class="time">{{item.format_time}}</view>
					</view>
					<!-- <view class="msgli" @tap="goDetail">
						<view>
							<view class="gold">成为推广大使审核通过消息</view>
						</view>
						<view class="time">2023/02/12 12:26:54</view>
					</view>
					<view class="msgli" @tap="goDetail">
						<view>
							<view class="gold">成为广告主审核驳回消息</view>
						</view>
						<view class="time">2023/02/12 12:26:54</view>
					</view> -->
				</view>
			</view>
		</view>
		
		<van-popup :show="showPop" round overlay-style="background-color:rgba(0,0,0,0.5)" @close="close">
			<view class="msgpop">
				<view class="msgul">
					<view class="msgli">
						<view>
							<view>您有新的订单通知</text></view>
						</view>
						<view class="time">2023/02/12 12:26:54</view>
					</view>
				</view>
				<view class="cellbor cellbor-le">
					<van-cell-group :border="false">
						<view class="space">
							<van-cell title="订单号：" :border='false' value="4455336"/>
							<van-cell title="盒子总数量：" :border='false' value="10000"/>
							<van-cell title="投放套餐：" :border='false' value="套餐一"/>
							<van-cell title="投放日期：" :border='false' value="2023/01/01-2023/12/31"/>
							<van-cell title="价格：" :border='false'>
								<view style="color: #ff5050;">￥2000</view>
							</van-cell>
							<van-cell title="状态：" :border='false' value='待投放'/>
						</view>
					</van-cell-group>
				</view>
			</view>
		</van-popup>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				barConfig: {
					title:'消息通知',
					hasRetun:true,
					isCenter:true,
				},
				showPop:false,
				status:1, //1-订单通知  2-平台消息
				list: [],
				msgList: []
			}
		},
		onLoad() {
			this.getList()
		},
		methods: {
			tabClick(v) {
				this.status = v
				if (v == 1) {
					this.getList()
				} else {
					this.getMsgList()
				}
			},
			getMsgList(search_month) {
				this.$api('/platform-message-list', {search_month}).then(({data}) => {
					this.msgList = data.data
				})
			},
			
			bindDateChange(e) {
				this.date = e.detail.value
				if (this.status == 1) {
					this.getList()
				} else {
					this.getMsgList()
				}
			},
			getList(search_month) {
				this.$api('/ggz-order-msg-list', {
					search_month
				}).then(({data}) => {
					this.list = data.data
				})
			},
			cliPop(){
				this.showPop = true
			},
			goDetail(id){
				uni.navigateTo({
					url:'../messageDetail/messageDetail?id=' + id
				})
			},
			close() {
				this.showPop = false
			}
		}
	}
</script>

<style>
	page{background-color:#f9f9f9;}
</style>
<style scoped lang="less">
	@import "@/static/style/cell.less";
	.msgul{
		.msgli{
			font-weight:700;font-size:32rpx;color:#111111;
			background-color:#ffffff;border-radius:14rpx;
			padding: 22rpx 36rpx;box-sizing: border-box;
			margin: 22rpx 0;
			.dot{
				position: relative;display: inline-block;
				&::after{content: '';
					position: absolute;right: -20rpx;top: 6rpx;
					width:10rpx;height:10rpx;background-color:#cba868;
					border-radius: 50%;
				}
			}
			.gold{color:#cba868;}
			.green{color: #189b73;}
			.red{color: #ff5050;}
			.time{
				font-weight:500;
				color:#b5b5b5;
				font-size:28rpx;
				margin-top: 12rpx;
			}
		}
	}
	
	.msgpop{width:690rpx;
		.msgul{margin: 0 32rpx;border-bottom:1rpx solid #d2d2d2;
			.msgli{padding-left: 0;padding-right: 0;margin-bottom: 0;}
		}
		.cellbor{margin-top: 0;
			&.cellbor-le{
				/deep/.van-cell{
					.van-cell__title{color: #b5b5b5;flex-basis: 28%;}
					.van-cell__value{text-align: left;flex-basis: 72%;}
				}
			}
		}
	}
</style>
