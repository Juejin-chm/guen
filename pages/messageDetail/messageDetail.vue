<template>
	<view class="outer">
		<view class="h">{{detail.title}}</view>
		<view class="time">{{detail.format_time}}</view>
		<view class="intro" v-html="detail.cont"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				detail: {}
			}
		},
		onLoad(option) {
			this.$api('/platform-message-info/' + option.id).then(({data}) => {
				this.detail = data
			})
		},
		methods: {
			
		}
	}
</script>

<style scoped lang="less">
	.outer{margin: 30rpx;}
	.h{font-weight:700;font-size:36rpx;}
	.time{
		font-weight:500;
		color:#b5b5b5;
		font-size:30rpx;
		margin: 12rpx 0 46rpx;
	}
	.intro{font-weight:500;font-size:28rpx;}
</style>

