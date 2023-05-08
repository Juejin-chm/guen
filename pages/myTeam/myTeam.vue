<template>
	<view>
		<BarBg :bgtype='1'></BarBg>
		<CustomBar :barConfig='barConfig'></CustomBar>
		
		<view class="box boxhui">
			<view class="outer">
				<view class="ex-name flex-between">
					<view class="le">团队列表</view>
					<view class="timer">
						<picker mode="date" :value='date' fields="month" @change="bindDateChange">
							<image src="@/static/image/date.png"></image>
							<text :class="[date?'hei':'']">{{date?date:'请选择'}}</text>
						</picker>
					</view>
				</view>
				
				<view class="msgul">
					<view v-for="item in data.data" :key="item.id" class="msgli">
						<image :src="item.avatar" mode=""></image>
						<view>
							<view>{{item.name}}</view>
						</view>
						<view class="time">{{item.format_time}}</view>
						<view class="num red">+{{item.total_commsion}}</view>
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
				data: {},
				date: ''
			}
		},
		onLoad() {
			this.getList()
		},
		methods: {
			getList(search_month) {
				this.$api('/my-team', {search_month}).then(({data}) => {
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
