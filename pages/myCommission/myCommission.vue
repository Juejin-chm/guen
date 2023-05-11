<template>
	<view>
		<BarBg :bgtype='1'></BarBg>
		<CustomBar :barConfig='barConfig'></CustomBar>
		
		<view class="nums">
			<view>
				<view class="b">{{data.totalCommission}}</view>
				<view>平台消息</view>
			</view>
		</view>
		<view class="flex-between nums">
			<view>
				<view>可提取金额(元)</view>
				<view class="b">{{data.availableCommission}}</view>
			</view>
			<view>
				<view>不可提取金额(元)</view>
				<view class="b">{{data.freezeCommission}}</view>
				<view class="tip">{{data.remark}}</view>
			</view>
		</view>
		
		<view class="box boxhui">
			<view class="outer">
				<view class="ex-name flex-between">
					<view class="le">佣金消息</view>
					<view class="timer">
						<picker mode="date" fields="month" :value='date' @change="bindDateChange">
							<image src="@/static/image/date.png"></image>
							<text :class="[date?'hei':'']">{{date?date:'请选择'}}</text>
						</picker>
					</view>
				</view>
				
				<view class="msgul">
					<view v-for="(item, index) in data.datas.data" :key="index" class="msgli">
						<image :src="item.avatar" mode=""></image>
						<view>
							<view>{{item.name}}</view>
						</view>
						<view class="time">{{item.format_date}}</view>
						<view class="num red">+{{item.diff_money}}</view>
					</view>
					<!-- <view class="msgli">
						<image src="../../static/image/head.png" mode=""></image>
						<view>
							<view>昵称</view>
						</view>
						<view class="time">2023/02/12 12:26:54</view>
						<view class="num red">+02.67</view>
					</view>
					<view class="msgli">
						<image src="../../static/image/head.png" mode=""></image>
						<view>
							<view>昵称</view>
						</view>
						<view class="time">2023/02/12 12:26:54</view>
						<view class="num red">+02.67</view>
					</view> -->
				</view>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				barConfig: {
					title:'我的佣金',
					hasRetun:true,
					isCenter:true,
				},
				date: '',
				data: {}
			}
		},
		onPullDownRefresh() {
			console.log('refresh...');
		},
		onLoad() {
			this.getList()
		},
		methods: {
			getList(search_month) {
				this.$api('/commission-list', { search_month }).then(({data}) => {
					this.data = data
				})
			},
			bindDateChange(e) {
				this.date = e.detail.value
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
	.nums{color:#ffffff;position: relative;
		margin: 40rpx 30rpx;
		text-align: center;
		view{font-size:28rpx;
			.b{font-weight:700;font-size:38rpx;margin-top: 8rpx;}
		}
		&.flex-between{margin-bottom: 65rpx;
			&>view{position: relative;
				width:324rpx;height:120rpx;
				background-color:rgba(17,17,17,0.7);
				border:1rpx solid #ffffff;
				border-radius:14rpx;
				padding-top: 14rpx;box-sizing: border-box;
				.tip{position: absolute;left: 0;bottom: -40rpx;
					opacity:80%;
					width:100%;
					height:30rpx;
					font-weight:500;
					color:#ffffff;
					font-size:22rpx;
					text-align:center;
				}
			}
		}
	}
	
	.msgul{
		.msgli{
			font-weight:700;font-size:32rpx;color:#111111;
			background-color:#ffffff;border-radius:14rpx;
			padding: 22rpx 180rpx 22rpx 148rpx;box-sizing: border-box;
			margin: 22rpx 0;
			position: relative;
			&>image{width:100rpx;height:100rpx;
				border-radius: 50%;
				border:1rpx solid #e4e4e4;
				position: absolute;
				left: 28rpx;top: 18rpx;
			}
			.red{color: #ff5050;}
			.time{
				font-weight:500;
				color:#b5b5b5;
				font-size:28rpx;
				margin-top: 12rpx;
			}
			.num{position: absolute;right: 26rpx;top: 50%;
				height:42rpx;margin-top: -21rpx;
				font-weight:700;
				color:#ff5050;
				font-size:32rpx;
			}
		}
	}
	
</style>
