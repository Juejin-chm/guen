<template>
	<view class="hasbtnpad">
		<CustomBar :barConfig='barConfig'></CustomBar>
		
		<view class="swiper">
			<swiper :indicator-dots="true" indicator-color="rgba(255,255,255,0.7)" indicator-active-color="rgba(255,255,255,1)" :autoplay="true" style="height: 750rpx;">
				<swiper-item>
					<image src="@/static/image/2038.png" mode="widthFix"></image>
				</swiper-item>
				<swiper-item>
					<image src="@/static/image/2038.png" mode="widthFix"></image>
				</swiper-item>
			</swiper>
		</view>
		
		<view class="boxhui">
			<view class="outer cellouter">
				<view class="name b">餐盒参数</view>
				<view class="cellbor cellbor-le">
					<van-cell-group :border="false">
						<view class="space">
							<van-cell title="名称：" :border='false' value="500方盒"/>
							<van-cell title="类型：" :border='false' value="方盒系列"/>
							<van-cell title="盒子尺寸(mm)：" :border='false'>
								<view>
									底  90.7*143.7<br/>
									盖  169*116<br/>
									高  33<br/>
								</view>
							</van-cell>
						</view>
					</van-cell-group>
				</view>
			</view>
		</view>
		
		<view class="fixedbtn">
		    <view class="envpad">
				<navigator hover-class="none" url="../business/business?type=2&title=我要投广告">
					<button class="btn">我要投广告</button>
				</navigator>
		    </view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				barConfig: {
					title:'500方盒',
					hasRetun:true,
					hasPadding:true,
					isCenter:true,
				},
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="less">
	page{background-color:#f9f9f9;}
</style>
<style scoped lang="less">
	@import "@/static/style/cell.less";
	.swiper{position: relative;overflow: hidden;
		swiper{min-height: 240rpx;
			swiper-item{
				image{width: 100%;display: block;}
			}
		}
		/deep/.wx-swiper-dots{bottom: 52rpx;
			.wx-swiper-dot{
				width: 10rpx;height: 10rpx;border-radius: 15rpx;
				&.wx-swiper-dot-active{
					width: 32rpx;height: 8rpx;
				}
			}
		}
	}
	.boxhui{position: relative;margin-top: -25rpx;background-color:#f9f9f9;
		border-radius:30rpx 30rpx 0 0;
		margin-bottom: 30rpx;
	}
</style>

