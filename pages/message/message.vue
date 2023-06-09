<template>
	<view>
		<BarBg :bgtype='0'></BarBg>
		<CustomBar :barConfig='barConfig'></CustomBar>
		<view class="otabs">
			<view v-if="!isOnlyPlatformMsg" :class="[status==1?'cur':'']" @click="clickTab(1)">审核通知</view>
			<view :class="[status==2?'cur':'']" @click="clickTab(2)">平台消息</view>
		</view>
	
		<view class="box boxhui">
			<view class="outer">
				<view class="ex-name flex-between ex-nameul">
					<view class="le">
						<template v-if="status==1">
							<view v-for="(item, index) in applyTab" :key="item.key" :class="{ act: tabIndex == item.key }" @click="applyTabClick(item.key)">{{item.value}}</view>
							<!-- <view>已通过</view>
							<view>驳回</view> -->
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
				<!-- 审核通知 -->
				<view class="msgul" v-if="status==1">
					<view v-for="item in list" class="msgli" :key="item.id" @tap="cliPop(item.id)">
						<view>
							<view :class="{dot: !item.isread}">{{item.title}}<text :class="[item.order_status == 2 ? 'green' : 'red']">（{{ item.order_status_txt }}）</text></view>
						</view>
						<view class="time">{{item.format_time}}</view>
					</view>
					
				</view>
				<!-- 平台消息 -->
				<view class="msgul" v-else>
					<view v-for="(item, idx) in list" :key="item.id" class="msgli" @tap="goDetail(item.id, idx)">
						<view>
							<view :class="{'dot gold': !item.isread }">{{item.title}}</view>
						</view>
						<view class="time">{{item.format_time}}</view>
					</view>
					
				</view>
			</view>
		</view>
		<van-popup :show="showPop" round overlay-style="background-color:rgba(0,0,0,0.5)" @close="onClose">
			<view class="msgpop">
				<view class="msgul">
					<view class="msgli">
						<view>
							<view>{{detailData.title}}<text :class="[detailData.status === 2 ? 'green' : 'red']">（{{detailData.status_txt}})</text></view>
						</view>
						<view class="time">{{detailData.format_time}}</view>
					</view>
				</view>
				<view class="cellbor cellbor-le">
					<van-cell-group :border="false">
						<view class="space">
							<van-cell title="盒子类型：" :border='false'>
								<view v-for="item in detailData.box_info" :key="item.id">
									{{item.title}}&nbsp;&nbsp;{{item.number}}个
								</view>
							</van-cell>
							<van-cell title="申请日期：" :border='false' :value="detailData.date"/>
							<van-cell title="申请原因：" :border='false' :value="detailData.remark"/>
							<van-cell title="驳回原因：" v-if="detailData.status != 2" :border='false'>
								<view class="red">{{ detailData.refund_reason }}</view>
							</van-cell>
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
				date: null,
				tabIndex: 'all',
				showPop:false,
				status:1, //1-审核通知  2-平台消息
				msgList: [],
				detailData: {},
				applyList: [],
				applyTab: [],
				list: [],
				curPage: 1,
				total: 0,
				isOnlyPlatformMsg: false
			}
		},
		onLoad(options) {
			console.log(options, 'options......')
			if (options.isNotRole == 0) {
				this.isOnlyPlatformMsg = true
				this.status = 2
			} else {
				// this.$api('/box-order-msg-status').then(({data}) => {
				// 	this.applyTab = data
				// })
			}
			this.$api('/box-order-msg-status').then(({data}) => {
				this.applyTab = data
			})
			this.init()
		},
		onReachBottom() {
			this.getMore(this.curPage)
		},
		methods: {
			getMore() {
				if (this.list.length >= this.total) {
					return
				}
				this.curPage += 1
				if (this.status == 2) {
					this.$api('/platform-message-list', {search_month: this.date, page: this.curPage}).then(({data}) => {
						data.data.forEach(item => {
							this.list.push(item)
							this.total = data.total
						})
					})
				}
				if (this.status == 1) {
					this.$api('/box-order-msg-list', {search_month: this.date, search_status: this.tabIndex , page: this.curPage}).then(({data}) => {
						this.list = data.data
						this.total = data.total
					})
				}
				
			},
			init() {
				if (this.status == 1) {
					this.getApplyList()
				} else {
					this.getList()
				}
			},
			applyTabClick(key) {
				console.log(key, 'key')
				this.tabIndex = key
				this.getApplyList()
			},
			onClose() {
				this.showPop = false
			},
			// 审核通知
			getApplyList(search_month = this.date, search_status = this.tabIndex, page = this.curPage) {
				// TODO
				if (this.isOnlyPlatformMsg) {
					this.list = []
					return
				}
				this.$api('/box-order-msg-list', {search_month, search_status, page}).then(({data}) => {
					this.list = data.data
					this.total = data.total
				})
			},
			// 平台消息
			getList(search_month = this.date, page = this.curPage) {
				this.curPage = 1
				this.$api('/platform-message-list', {search_month, page}).then(({data}) => {
					this.list = data.data
					this.total = data.total
				})
			},
			cliPop(id){
				if (this.status == 1) {
					this.showPop = true
					this.$api('/box-order-msg-info/' + id).then(({data}) => {
						this.detailData = data
					})
				} else {
					this.$api('/platform-message-info/' + id).then(({data}) => {
						this.detailData = data
					})
				}
			},
			goDetail(id, idx){
				this.list[idx].isread = true
				uni.navigateTo({
					url:'../messageDetail/messageDetail?id=' + id
				})
			},
			bindDateChange(e) {
				this.date = e.detail.value
				if (this.status == 1) {
					this.getApplyList()
				} else {
					this.getList()
				}
			},
			clickTab(v) {
				this.curPage = 1
				this.status = v
				if (v === 2) {
					this.getList()
				}
				if (v === 1) {
					this.getApplyList()
				}
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
