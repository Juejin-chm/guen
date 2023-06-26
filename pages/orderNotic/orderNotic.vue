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
						<picker mode="date" fields="month" :value='query.search_month' @change="bindDateChange">
							<image src="@/static/image/date.png"></image>
							<text :class="[query.search_month?'hei':'']">{{query.search_month?query.search_month:'请选择'}}</text>
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
					
				</view>
				<view class="msgul" v-else>
					<view v-for="item in msgList" :key="item.id" class="msgli" @tap="goDetail(item.id)">
						<view>
							<!-- <view :class="{dot: !item.isread}">{{item.title}}</view> -->
							<view :class="{dot: !item.isread, gold: item.cont}">{{item.title}}</view>
						</view>
						<view class="time">{{item.format_time}}</view>
					</view>
					
				</view>
			</view>
		</view>
		
		<van-popup :show="showPop" round overlay-style="background-color:rgba(0,0,0,0.5)" @close="close">
			<view class="msgpop">
				<view class="msgul">
					<view class="msgli">
						<view>
							<view>{{ ggzDetail.title }}</text></view>
						</view>
						<view class="time">{{ ggzDetail.start_date }}</view>
					</view>
				</view>
				<view class="cellbor cellbor-le">
					<van-cell-group :border="false">
						<view class="space">
							<van-cell title="订单号：" :border='false' :value="ggzDetail.order_sn"/>
							<van-cell title="盒子总数量：" :border='false' :value="ggzDetail.number"/>
							<!-- <van-cell title="投放套餐：" :border='false' :value="套餐一"/> -->
							<van-cell title="投放日期：" :border='false' :value="ggzDetail.format_period"/>
							<van-cell title="价格：" :border='false'>
								<view style="color: #ff5050;">￥{{ ggzDetail.money }}</view>
							</van-cell>
							<van-cell title="状态：" :border='false' :value='ggzDetail.format_status'/>
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
				ggzDetail: {},
				showPop:false,
				status:1, //1-订单通知  2-平台消息
				list: [],
				msgList: [],
				query: {
					page: 1,
					search_month: ''
				}
			}
		},
		onLoad() {
			this.getList()
		},
		onReachBottom() {
			// this.getMore(this.curPage)
		},
		methods: {
			// getMore() {
			// 	if (this.list.length >= this.total) {
			// 		return
			// 	}
			// 	this.curPage += 1
			// 	if (this.status == 2) {
			// 		this.$api('/platform-message-list', {search_month: this.date, page: this.curPage}).then(({data}) => {
			// 			data.data.forEach(item => {
			// 				this.list.push(item)
			// 				this.total = data.total
			// 			})
			// 		})
			// 	}
			// 	if (this.status == 1) {
			// 		this.$api('/box-order-msg-list', {search_month: this.date, search_status: this.tabIndex , page: this.curPage}).then(({data}) => {
			// 			this.list = data.data
			// 			this.total = data.total
			// 		})
			// 	}
				
			// },
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
				this.query.search_month = e.detail.value
				this.query.page = 1
				if (this.status == 1) {
					this.getList()
				} else {
					this.getMsgList()
				}
			},
			getList(query = this.query) {
				this.$api('/ggz-order-msg-list', query).then(({data}) => {
					this.list = data.data
				})
			},
			cliPop(id){
				this.showPop = true
				this.$api('/ggz-order-msg-detail/' + id).then(({data}) => {
					this.ggzDetail = data
				})
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
