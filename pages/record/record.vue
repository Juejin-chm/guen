<template>
	<view>
		<BarBg :bgtype='0'></BarBg>
		<CustomBar :barConfig='barConfig'></CustomBar>
		
		<view class="flex-between nums">
			<view>
				<view>总盒子数量</view>
				<view class="b">26541</view>
			</view>
			<view>
				<view>本月盒子剩余数量</view>
				<view class="b">541</view>
			</view>
		</view>
		
		<view class="box boxhui">
			<view class="outer">
				<view class="ex-name flex-between ex-nameul">
					<view class="le">发放记录</view>
					<view class="timer">
						<picker mode="date" :value='date' @change="bindDateChange">
							<image src="@/static/image/date.png"></image>
							<text :class="[date?'hei':'']">{{date?date:'请选择'}}</text>
						</picker>
					</view>
				</view>
				
				<view class='cellbor cellbor-le'>
					<view class="sign">
						<image src="../../static/image/sign.png"></image>
						<text>已派送</text>
					</view>
					<van-cell-group :border="false">
						<van-cell class='h' title="申请领取盒子" :border="false"></van-cell>
						<view class="space">
							<van-cell title="盒子类型：" :border="false" >
								<view>
									500方盒  (500个)<br/>
									320正方盒 (500个)<br/>
								</view>
							</van-cell>
							<van-cell title="申请日期：" value="2023/02/24" :border="false" />
						</view>
					</van-cell-group>
				</view>
				<view class='cellbor cellbor-le'>
					<view class="sign">
						<image src="../../static/image/sign.png"></image>
						<text>已派送</text>
					</view>
					<van-cell-group :border="false">
						<van-cell class='h' title="申请领取盒子" :border="false"></van-cell>
						<view class="space">
							<van-cell title="盒子类型：" :border="false" >
								<view>
									500方盒  (500个)<br/>
									320正方盒 (500个)<br/>
								</view>
							</van-cell>
							<van-cell title="申请日期：" value="2023/02/24" :border="false" />
						</view>
					</van-cell-group>
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
					title:'发放记录',
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
	.nums{color:#ffffff;position: relative;
		margin: 40rpx 30rpx;
		view{font-size:28rpx;
			.b{font-weight:700;font-size:38rpx;margin-top: 8rpx;}
		}
	}
	.cellbor{margin-top: 0;position: relative;
		.sign{width: 141rpx;height: 51rpx;position: absolute;right: 0rpx;top: 24rpx;z-index: 1;
		text-align: center;color: #fff;
			image{width: 100%;height: 100%;position: absolute;left: 0;top: 0;z-index: 1;}
			text{position: relative;z-index: 2;line-height: 44rpx;padding-left: 10rpx;}
		}
		&.cellbor-le{
			/deep/.van-cell{
				.van-cell__title{color: #b5b5b5;flex-basis: 12%;}
			}
			.h{
				/deep/.van-cell{
					.van-cell__title{color:#111111;}
				}
			}
		}
	}
</style>
