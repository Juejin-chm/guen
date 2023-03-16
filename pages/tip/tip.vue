<template>
	<view>
		<view class="tip">
			<template v-if='isError==0'>
				<image src='@/static/image/tip-s.png'></image>
				<view class="h2">您已成功提交</view>
				<view class="p">人工审核中，请耐心等候<br/>可在消息通知中查看审核结果</view>
			</template>
			<template v-else>
				<image src='@/static/image/tip-e.png'></image>
				<view class="h2">提交申请失败</view>
				<view class="p">您还有正在派送中订单未确认完成<br/>确认完成可申请下一批</view>
			</template>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isError:'',
			}
		},
		onLoad(options) {
			this.isError = options.isError;
			uni.setNavigationBarTitle({
				title:options.isError==0?'提交成功':'提交失败'
			})
		},
	}
</script>

<style scoped lang="less">
	.tip {text-align: center;font-weight:500;
		&>image {margin: 130rpx auto 50rpx;width: 332rpx;height: 214rpx;}
		.h2{font-weight:500;font-size:30rpx;margin-bottom: 23rpx;}
		.p{color:#999999;font-size:26rpx;line-height:36rpx;}
	}
</style>
