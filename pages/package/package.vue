<template>
	<view>
		<BarBg :bgtype='1'></BarBg>
		<CustomBar :barConfig='barConfig'></CustomBar>
		
		<view class="box boxhui">
			<view class="outer">
				<view class="packul">
					<navigator hover-class="none" url="../packageDetail/packageDetail" class="packli">
						<view class="flex-between head">
							<view>
								<image src="../../static/image/pack1.png" mode=""></image>
								<text>套餐一名称</text>
							</view>
							<view class="price"><text>￥</text>2000.0</view>
						</view>
						<view class="flex-between nums">
							<view>
								<view>盒子总数量</view>
								<view class="b">10000</view>
							</view>
							<view>
								<view>盒子类型</view>
								<view class="b txthide">650方盒；320正方盒</view>
							</view>
							<view>
								<view>投放周期</view>
								<view class="b">1年</view>
							</view>
						</view>
					</navigator>
					<navigator hover-class="none" url="../packageDetail/packageDetail" class="packli">
						<view class="flex-between head">
							<view>
								<image src="../../static/image/pack1.png" mode=""></image>
								<text>套餐一名称</text>
							</view>
							<view class="price"><text>￥</text>2000.0</view>
						</view>
						<view class="flex-between nums">
							<view>
								<view>盒子总数量</view>
								<view class="b">10000</view>
							</view>
							<view>
								<view>盒子类型</view>
								<view class="b txthide">650方盒；320正方盒650方盒；320正方盒</view>
							</view>
							<view>
								<view>投放周期</view>
								<view class="b">1年</view>
							</view>
						</view>
					</navigator>
					 
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
			}
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
	.packul{min-height: 450rpx;
		.packli{
			background-color:#ffffff;border-radius:14rpx;
			padding: 26rpx 35rpx;box-sizing: border-box;
			margin: 22rpx 0;
			position: relative;text-align: center;
			.head{align-items: center;font-weight:700;
				border-bottom: 1rpx solid #d4d4d4;padding-bottom: 30rpx;
				margin-bottom: 38rpx;
				image,text{display: inline-block;vertical-align: middle;}
				image{width:66rpx;height:66rpx;background-color:#393939;border-radius: 50%;box-shadow:0 6rpx 6rpx rgba(187, 174, 148, 0.3);margin-right: 18rpx;}
				text{color:#111111;font-size:32rpx;}
				.price{color:#cba868;font-size:36rpx;
					text{font-size: 24rpx;color:#cba868;}
				}
			}
			.nums{font-weight:500;color:#999999;font-size:24rpx;
				&>view{position: relative;flex-basis: 24%;
					&:nth-child(2){flex-basis: 52%;
						.b{margin: 0 auto;width: 300rpx;min-width: 0;}
					}
					&:last-child{
						&::after{display: none;}
					}
					&::after{content: '';position: absolute;right: 0;top: 10%;
					width: 1rpx ;height: 80%;background-color:#bebebe;
					}
				}
				.b{color:#111111;font-size:28rpx;margin-top: 7rpx;}
			}
			
		}
	}
	
</style>
