<template>
	<view class="hasbtnpad">
		<BarBg :bgtype='0'></BarBg>
		<CustomBar :barConfig='barConfig'></CustomBar>
		<view class="dis-title">
			<image src="@/static/image/discount-ico.png" class="dis-img"></image>
			<view>{{detail.title}}</view>
		</view>
		<view class="swiper">
			<swiper 
				:autoplay="swiperConfig.autoplay" 
				:circular="swiperConfig.circular" 
				:style="{height: swiperConfig.height}" 
				@change="curChange"
			>
			  <swiper-item v-for="(item, index) in swiperArr" :key="index">
				<image :src="item.img" mode="widthFix"></image>
			  </swiper-item>
			</swiper>
			<view class="s_dots">
				<view :class="current==index?'active':''" v-for="index in swiperArr.length" :key="index"></view>
			</view>
		</view>
		<view style="margin: 0 0 22rpx 32rpx;font-size: 30rpx;font-weight: bold;">套餐详情</view>
		<van-cell-group inset class="v-group" :border='false'>
			<van-cell class='h price' title="价格">
				<view style="color: #FF5050">￥{{detail.money}}</view>
			</van-cell>
			<van-cell class='h' title="盒子总数量" :value="detail.number" />
			<van-cell class='h' title="投放周期" :value="detail.period" />
			<van-cell class='h' title="盒子类型">
				<view v-for="it in detail.goods" :key="it.id">
					{{it.goods_title}}: {{it.number}}个<br/>
					
				</view>
			</van-cell>
			<view style="height: 10px;"></view>
			<van-cell class='h' title="电话咨询" :value="phone"  @click="callPhone(phone)">
				<view slot="right-icon">
					<image src="../../static/image/tel.png" mode="" style="width: 32rpx;height: 32rpx;margin-left: 10rpx;"></image>
				</view>
			</van-cell>
			<!-- <van-field label="收货人" placeholder="请输入" /> -->
			
		</van-cell-group>
		
		<view class="fixedbtn">
			<view class="envpad">
				<button class="btn" form-type="submit" @click="submit">联系客服</button>
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
				show: false,
				//模拟数据列表
				index:null,
				
				swiperConfig:{
					autoplay:true,
					circular:true,
					height:'280rpx',
				},
				current: 0,
				swiperArr: [],
				detail: {},
				phone: ''
			}
		},
		
		onLoad(options) {
			this.$api('/discount-package-info/'+options.id).then(({data}) => {
				this.detail = data.object
				this.phone = data.phone
				this.swiperArr = this.detail.imgs
			})
		},
		methods: {
			curChange(e) {
				
			}
		}
	}
</script>

<style>
	page{background-color:#f9f9f9;}
</style>
<style scoped lang="less">
	.dis-title {
		position: relative;
		z-index: 1;
		color: white;
		display: flex;
		align-items: center;
		font-size: 32rpx;
		font-weight: bold;
		margin-left: 32rpx;
		margin-top: 50rpx;
	}
	.dis-img {
		width: 66rpx;
		height: 66rpx;
		margin-right: 20rpx;
	}
	/deep/ .v-group{
		
		padding: 11rpx 0;
		display: block;
		.van-field__label{color: #111;}
		.van-field__control{text-align: right;}
		.value{color: #323233;}
		.vfield-line{
			.van-cell{padding-right: 22px;padding-top: 0;}
		}
		.vcell-msg{
			.van-cell{display: block;
				.van-field__control{text-align: left;height: 34px;margin-top: 8rpx;}
			}
		}
		.vcell-msg-warp{padding-bottom: 40rpx;background-color: #fff;}
		.vcell-code-warp{
			.van-field__control{text-align: left;}
			.van-field__icon-container{
				image{width: 154rpx;height: 64rpx;display: block;}
			}
		}
		.van-cell__value{
			image{width: 30rpx;height: 30rpx;}
		}
		.van-radio-group--horizontal{
			justify-content: flex-end;
		}
		.h{
			.van-cell__value{color:#111111;}
		}
		.boxChoose{
			text,image{display: inline-block;vertical-align: middle;}
			.right-icon{
				image{width: 15rpx;height: 25rpx;margin-left: 14rpx;}
			} 
		}
	}

	
	.swiper{position: relative;overflow: hidden;
		// padding-bottom: 40rpx;
		margin: 30rpx;
		swiper{min-height: 240rpx;
			swiper-item{
				image{width: 100%;display: block;}
			}
		}
		.s_dots{position: absolute;left: 0;bottom: 0;right: 0;text-align: center;
			&>view{width: 10rpx;height: 10rpx;border-radius: 15rpx;
				background-color: #fff;opacity: 0.7;
				margin: 0 6rpx;display: inline-block;vertical-align: middle;
				&.active{opacity: 1;width: 32rpx;height: 10rpx;}
			}
		}
	}
</style>
