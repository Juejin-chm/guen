<template>
	<view>
		<BarBg :bgtype='1'></BarBg>
		<CustomBar :barConfig='barConfig'></CustomBar>
		
		<view class="box boxhui">
			<view class="outer">
				<view class="ex-name flex-between">
					<view class="le">团队列表</view>
					<view class="timer">
						<picker mode="date" :value='date' @change="bindDateChange">
							<image src="@/static/image/date.png"></image>
							<text :class="[date?'hei':'']">{{date?date:'请选择'}}</text>
						</picker>
					</view>
				</view>
				
				<view class="msgul">
					<view class="msgli">
						<image src="../../static/image/head.png" mode=""></image>
						<view>
							<view>昵称</view>
						</view>
						<view class="time">2023/02/12 12:26:54</view>
						<view class="num red">+134.25</view>
					</view>
					<view class="msgli">
						<image src="../../static/image/head.png" mode=""></image>
						<view>
							<view>昵称</view>
						</view>
						<view class="time">2023/02/12 12:26:54</view>
						<view class="num red">+134.25</view>
					</view>
					<view class="msgli">
						<image src="../../static/image/head.png" mode=""></image>
						<view>
							<view>昵称</view>
						</view>
						<view class="time">2023/02/12 12:26:54</view>
						<view class="num red">+134.25</view>
					</view>
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
					title:'我的团队',
					hasRetun:true,
					isCenter:true,
				},
			}
		},
		onLoad() {
			this.$api('/my-team').then(({data}) => {
				
			})
		},
		methods: {
			
		}
	}
</script>

<style>
	page{background-color:#f9f9f9;}
</style>
<style scoped lang="less">
	@import "@/static/style/cell.less";
	.msgul{min-height: 400rpx;
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
