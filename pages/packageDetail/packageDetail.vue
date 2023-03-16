<template>
	<view class="hasbtnpad">
		<BarBg :bgtype='0'></BarBg>
		<CustomBar :barConfig='barConfig'></CustomBar>
		
		<view class="outer">
			<view class="head">
				<image src="@/static/image/pack2.png"></image>
				<text>套餐一名称</text>
			</view>
			<view class="swiper">
				<swiper :indicator-dots="true" indicator-color="rgba(255,255,255,0.7)" indicator-active-color="rgba(255,255,255,1)" :autoplay="true">
					<swiper-item>
						<image src="@/static/image/2199.png" mode="heightFix"></image>
					</swiper-item>
					<swiper-item>
						<image src="@/static/image/2199.png" mode="heightFix"></image>
					</swiper-item>
				</swiper>
			</view>
		</view>
		
		<view class="boxhui">
			<view class="outer cellouter">
				<view class="name b">套餐详情</view>
				<view class='cellbor'>
					<van-cell-group :border="false">
						<van-cell title="价格">
							<view style="color: #ff5050;">￥2000</view>
						</van-cell>
						<van-cell title="盒子总数量" value="10000"  />
						<van-cell title="投放周期" value="1年"  />
						<van-cell title="盒子类型" >
							<view>
								650方盒：5000个<br/>
								320正方盒：5000个<br/>
							</view>
						</van-cell>
					</van-cell-group>
				</view>
				<view class='cellbor'>
					<van-cell-group :border="false">
						<van-cell class="tel" title="电话咨询" value="1545662245" :border="false" >
							<view slot="right-icon">
								<image src="../../static/image/tel.png" mode=""></image>
							</view>
						</van-cell>
					</van-cell-group>
				</view>
				
			</view>
		</view>
		
		<view class="fixedbtn">
		    <view class="envpad">
				<button class="btn">联系客服</button>
		    </view>
		</view>
	</view>
</template>
 
<script>
	export default {
		data() {
			return {
				barConfig: {
					title:'套餐详情',
					hasRetun:true,
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
	.head{margin: 20rpx 0 30rpx;
		image,text{display: inline-block;vertical-align: middle;}
		image{width:66rpx;height:66rpx;
			box-shadow:0 r6px 6rpx rgba(187, 174, 148, 0.3);}
		text{font-weight:700;color:#ffffff;font-size:32rpx;margin-left: 19rpx;}
	}
	.swiper{position: relative;
		swiper{height: 240rpx;border-radius: 14rpx;overflow: hidden;
			swiper-item{
				image{height: 100%;display: block;}
			}
		}
		/deep/.wx-swiper-dots{
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

