<template>
	<view>
		<BarBg :bgtype='0'></BarBg>
		<CustomBar :barConfig='barConfig'></CustomBar>
		
		<view class="otabs">
			<view :class="[status==1?'cur':'']" @click="clickTab(1)">审核通知</view>
			<view :class="[status==2?'cur':'']" @click="clickTab(2)">平台消息</view>
		</view>
		
		<view class="box boxhui">
			<view class="outer">
				<view class="ex-name flex-between ex-nameul">
					<view class="le">
						<template v-if="status==1">
							<view v-for="(item, index) in ['全部', '已通过', '驳回']" :key="item" :class="{ act: tabIndex === index }" @click="tabIndex = index">{{item}}</view>
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
				
				<view class="msgul" v-if="status==1">
					<view v-for="item in msgList" class="msgli" :key="item.id" @tap="cliPop(item.id)">
						<view>
							<view class="dot">申领盒子审核<text class="green">（通过）</text></view>
						</view>
						<view class="time">2023/02/12 12:26:54</view>
					</view>
					<!-- <view class="msgli" @tap="cliPop">
						<view>
							<view class="dot">申领盒子审核<text class="red">（驳回）</text></view>
						</view>
						<view class="time">2023/02/12 12:26:54</view>
					</view>
					<view class="msgli" @tap="cliPop">
						<view>
							<view>申领盒子审核<text class="red">（通过）</text></view>
						</view>
						<view class="time">2023/02/12 12:26:54</view>
					</view> -->
				</view>
				<view class="msgul" v-else>
					<!-- <view class="msgli" @tap="goDetail">
						<view>
							<view class="dot">平台消息通知标题</view>
						</view>
						<view class="time">2023/02/12 12:26:54</view>
					</view> -->
					<view v-for="item in msgList" :key="item.id" class="msgli" @tap="goDetail(item.id)">
						<view>
							<view :class="[item.isread ? 'gold' : 'red']">{{item.title}}</view>
						</view>
						<view class="time">{{item.format_time}}</view>
					</view>
					<!-- <view class="msgli" @tap="goDetail">
						<view>
							<view class="gold">成为广告主审核驳回消息</view>
						</view>
						<view class="time">2023/02/12 12:26:54</view>
					</view> -->
				</view>
			</view>
		</view>
		
		<van-popup :show="showPop" round overlay-style="background-color:rgba(0,0,0,0.5)" @close="onClose">
			<view class="msgpop">
				<view class="msgul">
					<view class="msgli">
						<view>
							<view>{{detailData.title}}<text class="red">（驳回）</text></view>
						</view>
						<view class="time">{{detailData.format_time}}</view>
					</view>
				</view>
				<view class="cellbor cellbor-le">
					<van-cell-group :border="false">
						<view class="space">
							<van-cell title="盒子类型：" :border='false'>
								<view>
									500方盒 &nbsp&nbsp&nbsp&nbsp 500个<br/>
									320正方盒 &nbsp&nbsp&nbsp&nbsp 500个<br/>
								</view>
							</van-cell>
							<van-cell title="申请日期：" :border='false' value="2023/01/25"/>
							<van-cell title="申请原因：" :border='false' value="申请原因描述申请原因描述申请原因描述申请原因描述申请原因描述"/>
							<van-cell title="驳回原因：" :border='false'>
								<view class="red">驳回原因描述</view>
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
				date: '',
				tabIndex: 0,
				showPop:false,
				status:2, //1-审核通知  2-平台消息
				msgList: [],
				detailData: {}
			}
		},
		onLoad() {
			this.getList()
		},
		methods: {
			onClose() {
				this.showPop = false
			},
			getList(month) {
				this.$api('/platform-message-list').then(({data}) => {
					console.log(data.data, 'data');
					this.msgList = data.data
				})
			},
			cliPop(id){
				this.showPop = true
				this.$api('/platform-message-info/' + id).then(({data}) => {
					this.detailData = data
				})
			},
			goDetail(id){
				uni.navigateTo({
					url:'../messageDetail/messageDetail?id=' + id
				})
			},
			bindDateChange(e) {
				this.date = e.detail.value
				this.getList(this.date)
			},
			clickTab(v) {
				this.status = v
				if (v === 2) {
					this.getList()
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
