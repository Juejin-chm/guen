<template>
	<view>
		<BarBg :bgtype='0'></BarBg>
		<CustomBar :barConfig='barConfig'></CustomBar>
		
		<view class="box boxhui">
			<view class="outer">
				
				<!-- 平台消息 -->
				<view class="msgul">
					
					<view v-for="item in list" :key="item.id" class="msgli" @tap="goDetail(item.id)">
						<view class="item">
							<view class="item-top">
								<view class="item-top-left">
									<image src="@/static/image/item-img.png" class="item-img"></image>
									<view style="font-size: 32rpx;">{{item.title}}</view>
								</view>
								<view class="item-price">￥{{item.money}}</view>
							</view>
							<view style="height: 1px;background: #D4D4D4;margin: 30rpx 0 40rpx"></view>
							<view class="item-bottom">
								<view class="box-total">
									<view class="t1">盒子总数量</view>
									<view class="t2">{{item.number}}</view>
								</view>
								<view class="box-type">
									<view class="t1">盒子类型</view>
									<view class="t2">{{item.box_info.join(';')}}</view>
								</view>
								<view class="box-date">
									<view class="t1">投放周期</view>
									<view class="t2">{{item.period}}</view>
								</view>
							</view>
						</view>
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
					title:'投放套餐',
					hasRetun:true,
					isCenter:true,
				},
				list: []
			}
		},
		onLoad() {
			this.$api('/discount-package-list').then(({data}) => {
				this.list = data
			})
		},
		methods: {
			goDetail(id) {
				console.log(id, 'id');
				uni.navigateTo({
					url: '/pages/discountDetail/discountDetail?id=' + id
				})
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
			padding-bottom: 0;
		}
	}
	.item {
		height: 280rpx;
		.item-img {
			width: 66rpx;
			height: 66rpx;
			margin-right: 20rpx;
		}
		.item-price {
			color: #CBA868;
			font-size: 36rpx;
			font-weight: bold;
		}
		.item-top {
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
		.item-top-left {
			display: flex;
			align-items: center;
		}
		.box-type {
			position: relative;
			&::before {
				content: '';
				height: 62rpx;
				width: 1px;
				background: #BEBEBE;
				position: absolute;
				left: -17rpx;
				top:8rpx;
			}
			&::after {
				content: '';
				height: 62rpx;
				width: 1px;
				background: #BEBEBE;
				position: absolute;
				right: -17rpx;
				top:8rpx;
			}
		}
		.item-bottom {
			display: flex;
			justify-content: space-between;
			text-align: center;
			.item-type {
				width: 346rpx;
			}
			.t1 {
				font-size: 24rpx;
				font-weight: 500;
				color: #999999;
				margin-bottom: 5rpx;
			}
			.t2 {
				font-size: 28rpx;
				color: #111111;
				max-width: 292rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}
	}
	
	
</style>
