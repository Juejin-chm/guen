<template>
	<view>
		<BarBg :bgtype='1'></BarBg>
		<CustomBar :barConfig='barConfig'></CustomBar>
		<view class="tip">
			<view class="b">JOIN US</view>
			<view>填表提交后，请耐心等待客服审核</view>
		</view>
		<view class="box">
			<view class="outer">
				<view class="busall">
					<navigator class="busli" hover-class="none" url="../business/business?type=0&title=商家入驻">
						<image class="busbg" src="@/static/image/business.png" mode="widthFix"></image>
						<view class="buslin">
							<view class="img">
								<image src="@/static/image/join-1.png" mode="widthFix"></image>
							</view>
							<view class="txt">
								<view class="h5">商家入驻</view>
								<view class="txtmorehide">无门槛，只需要营业执照，门店正规经营即可</view>
								<image src="@/static/image/arrow.png" mode="widthFix"></image>
							</view>
						</view>
					</navigator>
					<navigator class="busli" hover-class="none" url="../business/business?type=1&title=成为推广大使">
						<image class="busbg" src="@/static/image/business1.png" mode="widthFix"></image>
						<view class="buslin">
							<view class="img">
								<image src="@/static/image/join-2.png" mode="widthFix"></image>
							</view>
							<view class="txt">
								<view class="h5">成为推广大使</view>
								<view class="txtmorehide">低门槛推广宣传，获得固定抽佣提供专业培训，了解平台用处</view>
								<image src="@/static/image/arrow.png" mode="widthFix"></image>
							</view>
						</view>
					</navigator>
					<navigator class="busli" hover-class="none" url="../business/business?type=2&title=成为城市合伙人&isParnet=1">
						<image class="busbg" src="@/static/image/business2.png" mode="widthFix"></image>
						<view class="buslin">
							<view class="img">
								<image src="@/static/image/join-3.png" mode="widthFix"></image>
							</view>
							<view class="txt">
								<view class="h5">成为城市合伙人</view>
								<view class="txtmorehide">集团招募全国城市合伙人、各级加盟商</view>
								<image src="@/static/image/arrow.png" mode="widthFix"></image>
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
					title:'加入我们'
				},
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped lang="less">
	.tip{text-align: center;padding: 40rpx 0 56rpx;position: relative;
		font-size:28rpx;color:#ffffff;font-weight:500;
		.b{color:#ffffff;font-size:40rpx;margin-bottom: 14rpx;}
	}
	
	.busall{padding: 46rpx 0;min-height: 400rpx;
		.busli{margin-bottom: 28rpx;position: relative;border-radius: 14rpx;overflow: hidden;
			padding: 40rpx 50rpx 0 32rpx;box-sizing: border-box;
			width: 690rpx;height: 220rpx;
			.busbg{position: absolute;left: 0;top: 0;width: 100%;height: 100%;}
			.buslin{position: relative;padding-left: 161rpx;
				.img{width: 125rpx;height: 125rpx;border-radius: 50%;position: absolute;left: 0;top: 0;
					image{width: 100%;height: 100%;display: block;}
				}
				.txt{
					.h5{font-size: 34rpx;font-weight:700;line-height: 40rpx;color: #ffffff;margin-bottom: 30rpx;}
					.txtmorehide{font-size:26rpx;color:#ffffff;font-weight:500;opacity:80%;margin-top: 21rpx;}
					image{width: 34rpx;height: 22rpx;position: absolute;right: 0;top: 6rpx;}
				}
				
			}
		}
	}


</style>
