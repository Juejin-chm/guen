<template>
	<view>
		<BarBg :bgtype='0'></BarBg>
		<CustomBar :barConfig='barConfig'></CustomBar>
		
		<view class="otabs">
			<view :class="[status==1?'cur':'']" @click="tabClick(1)">佣金消息</view>
			<view :class="[status==2?'cur':'']" @click="tabClick(2)">平台消息</view>
		</view>
		
		<view class="box boxhui">
			<view class="outer">
				<view class="ex-name flex-between">
					<view class="le">
						<template v-if="status==1">
							<view>佣金消息</view>
						</template>
						<template v-else>
							<view>平台消息</view>
						</template>
					</view>
					<view class="timer">
						<picker mode="date" fields="month" :value='date' @change="bindDateChange">
							<image src="@/static/image/date.png"></image>
							<text :class="[date?'hei':'']">{{date?date:'请选择'}}</text>
						</picker>
					</view>
				</view>
				
				<view class="msgul" v-if="status==1">
					<view v-for="item in list" class="msgli" @click="cliPop(item.id)" :key="item.id">
						<view>
							<view>{{item.title}}</view>
						</view>
						<view class="time">{{item.format_time}}</view>
					</view>
					<!-- <view class="msgli">
						<view>
							<view>您有新的佣金提取消息</view>
						</view>
						<view class="time">2023/02/12 12:26:54</view>
					</view>
					<view class="msgli">
						<view>
							<view>您有新的佣金收益消息</view>
						</view>
						<view class="time">2023/02/12 12:26:54</view>
					</view>
					<view class="msgli">
						<view>
							<view>您有新的下级成员加入</view>
						</view>
						<view class="time">2023/02/12 12:26:54</view>
					</view> -->
				</view>
				<view class="msgul" v-else>
					<view v-for="item in list" :key="item.id" class="msgli" @tap="goDetail(item.id)">
						<view>
							<view :class="{ 'dot gold': !item.isread }">{{item.title}}</view>
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
							<view>{{detail.title}}</view>
						</view>
						<view class="time">{{detail.format_date}}</view>
					</view>
				</view>
				<!-- 您有新的佣金提取消息: -->
				<view class="cellbor cellbor-le">
					<van-cell-group :border="false">
						<view class="space spaceNum">
							<template v-if="detail.avatar">
								<view class="head">
									<image :src="detail.avatar" style="width: 84rpx;height: 84rpx;"></image>
									<text>{{ detail.name }}</text>
								</view>
							</template>
							<template v-else>
								<view v-if="detail.user_tq_commission">已提取佣金<text> -￥{{detail.user_tq_commission}}</text></view>
								<view v-else>收到佣金<text> +￥{{detail.order_commission}}</text></view>
								<view>剩余可提取佣金<text>￥{{detail.user_available_money}}</text></view>
								<view>不可提取佣金<text>￥{{detail.user_frozen_money}}</text></view>
							</template>
							
						</view>
					</van-cell-group>
				</view>
				
				<!-- 您有新的佣金收益消息: -->
				<!-- <view class="cellbor cellbor-le">
					<van-cell-group :border="false">
						<view class="space spaceNum">
							<view>收到佣金<text> +￥13.25</text></view>
							<view>剩余可提取佣金<text>￥0.00</text></view>
							<view>不可提取佣金<text>￥241.12</text></view>
						</view>
					</van-cell-group>
				</view> -->
				
				<!-- 您有新的下级成员加入: -->
				<!-- <view class="cellbor cellbor-le">
					<van-cell-group :border="false">
						<view class="space spaceNum">
							<view class="head">
								<image src="@/static/image/head.png" style="width: 84rpx;height: 84rpx;"></image>
								<text>昵称</text>
							</view>
						</view>
					</van-cell-group>
				</view> -->
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
				status:1, //1-佣金消息  2-平台消息
				list: [],
				detail: {},
				date: '',
				page: 1,
				total: 0
			}
		},
		onLoad() {
			this.getList()
		},
		onReachBottom() {
			this.getMore()
		},
		methods: {
			getMore() {
				if (this.list.length >= this.total) {
					return console.warn('没有更多了');
				}
				this.page += 1
				if (this.status == 2) {
					this.$api('/platform-message-list', {search_month: this.date, page: this.page}).then(({data}) => {
						this.list.push(...data.data)
						this.total = data.total
					})
				} else {
					this.$api('/tgds-msg-list', { search_month: this.date, page: this.page }).then(({data}) => {
						this.list.push(...data.data)
						this.total = data.total
					})
				}
			},
			tabClick(val) {
				this.status = val
				this.page = 1
				this.date = ''
				if (this.status == 2) {
					this.getMsgList()
				} else {
					this.getList()
				}
			},
			close() {
				this.showPop = false
			},
			getList(month = this.date, page = this.page) {
				this.$api('/tgds-msg-list', {
					search_month: month,
					page
				}).then(({data}) => {
					this.list = data.data
					this.total = data.total
				})
			},
			getMsgList(search_month, page = this.page) {
				this.$api('/platform-message-list', {search_month, page}).then(({data}) => {
					this.list = data.data
					this.total = data.total
				})
			},
			cliPop(id){
				this.showPop = true
				this.$api('/tgds-msg-detail/' + id).then(({data})=> {
					this.detail = data
				})
			},
			goDetail(id){
				uni.navigateTo({
					url:'../messageDetail/messageDetail?id=' + id
				})
			},
			bindDateChange(e) {
				this.date = e.detail.value
				this.page = 1
				this.getList(this.date)
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
					.van-cell__title{color: #b5b5b5;flex-basis: 26%;}
					.van-cell__value{text-align: left;flex-basis: 74%;}
				}
			}
		}
	}
</style>
