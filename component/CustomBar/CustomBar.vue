<template>
	<view>
		<view class="custombar" :style="{height:(statusBarHeight+navHeight)+'px'}">
			<view class="status_bar" :style="{height:statusBarHeight+'px'}"></view>
			<view class="nav_bar" :style="{height:navHeight+'px'}">
				<image class="return" v-if="barConfig.hasRetun" src="@/static/image/return.png" @tap="goBack"></image>
				<view :class="[barConfig.isCenter?'center':'','title']">
					<text>{{barConfig.title}}</text>
				</view>
			</view>
		</view>
		<view :style="{paddingTop:(statusBarHeight+navHeight)+'px',position:'relative'}" v-if="!barConfig.hasPadding"></view>
	</view>
</template>

<script>
	export default {
		props:{
			barConfig:{
				type:Object,
			}
		},
		data() {
			const app = getApp();
			return {
				statusBarHeight:app.globalData.statusBarHeight,
				navHeight:app.globalData.navHeight,
			}
		},
		
		methods:{
			goBack(){
				uni.navigateBack({
					delta:1
				})
			},
		}
	}
</script>

<style scoped lang="less">
	.custombar{position: fixed;top: 0rpx;left: 0;width: 100%;z-index: 99;text-align: center;height: 45px;
		// background-color: #cba868;
		.nav_bar{position: relative;padding:0 30rpx;
			.return{position: absolute;transform: translateY(-50%);width: 40rpx;height: 40rpx;top: 50%;left: 30rpx;z-index: 99;}
			.title{position: relative;transform: translate(-50%, -50%);left: 50%;top: 50%;font-size: 0;
				text-align: left;
				text{font-size: 34rpx;color: #fff;font-weight: bold;letter-spacing: 6rpx;}
				&.center{text-align: center;}
			}
		}
	}
</style>
