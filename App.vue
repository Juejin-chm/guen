<script>
	export default {
		globalData: {
			statusBarHeight: '',
			navHeight: '',
		},
		onLaunch: function() {
			let that = this;
			let menuButtonInfo = uni.getMenuButtonBoundingClientRect();
			uni.getSystemInfo({
				success(res) {
					let statusBarHeight = res.statusBarHeight;
					let navHeight = menuButtonInfo.height + (menuButtonInfo.top - statusBarHeight) * 2;
					that.globalData.statusBarHeight = statusBarHeight;
					that.globalData.navHeight = navHeight;
				}
			})
		},
		methods: {
			
		
		},
	}
</script>

<style lang="less">
	@import "@/wxcomponents/dist/common/index.wxss";

	page {
		font-size: 28rpx;
		color: #111111;
	}

	.outer {
		margin: 0 30rpx;
		position: relative;
	}

	.inner {
		padding: 0 30rpx;
	}

	.txthide {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		width: 100%;
	}

	.txtmorehide {
		display: -webkit-box;
		overflow: hidden;
		text-overflow: ellipsis;
		word-wrap: break-word;
		white-space: normal;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.jdjz {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}

	button:not([size='mini']) {
		margin: 0;
	}

	button::after {
		display: none;
	}

	.box {
		border-radius: 30rpx 30rpx 0 0;
		background-color: #fff;
		position: relative;
	}

	.boxhui {
		background-color: #f9f9f9;
		padding-bottom: 124rpx!important;
	}

	.flex-between {
		display: flex;
		justify-content: space-between;
	}

	.b {
		font-weight: 700;
	}

	.sides {
		position: fixed;
		right: 30rpx;
		bottom: 20rpx;
		z-index: 10;

		image {
			width: 90rpx;
			height: 91rpx;
			display: block;
			margin: 4rpx 0;
		}
	}

	.hasbtnpad {
		padding-bottom: 140rpx;
	}

	.btn {
		width: 690rpx;
		height: 80rpx;
		line-height: 80rpx;
		padding: 0;
		margin: 0 auto;
		background-color: #cba868;
		border-radius: 14rpx;
		font-size: 30rpx;
		font-weight: 700;
		color: #ffffff;
	}

	.fixedbtn {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 99;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
		box-shadow: 0px -2px 15px 0px rgba(146, 149, 155, 0.14);
		text-align: center;
		width: 100%;

		.envpad {
			padding: 30rpx;
			background-color: #fff;
		}
	}

	.setabs {
		white-space: nowrap;
		overflow-x: auto;
		margin: 0 0 40rpx 30rpx;
		padding-top: 40rpx;

		&>view {
			position: relative;
			font-size: 30rpx;
			font-weight: 700;
			color: #b5b5b5;
			padding-bottom: 20rpx;
			display: inline-block;
			vertical-align: middle;
			margin-right: 62rpx;

			&:last-child {
				margin-right: 30rpx;
			}

			&::after {
				content: '';
				position: absolute;
				bottom: 0;
				left: 50%;
				margin-left: -16rpx;
				width: 32rpx;
				height: 8rpx;
				border-radius: 10rpx;
			}

			&.cur {
				color: #111111;

				&::after {
					background-color: #dfbc78;
				}
			}
		}
	}

	.setul {
		.setli {
			margin-bottom: 32rpx;

			image {
				width: 220rpx;
				height: 220rpx;
				display: block;
				border-radius: 10rpx;
			}

			.name {
				font-weight: 500;
				font-size: 30rpx;
				margin: 12rpx 0;
			}
		}

		&.setuls {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			min-height: 400rpx;

			.setli {
				image {
					width: 335rpx;
				}
			}
		}
	}

	.upimgul {
		display: flex;
		justify-content: space-between;
		padding: 12px 16px;
		background-color: #fff;

		.upimgli {
			position: relative;
			border-radius: 10rpx;
			overflow: hidden;
			width: 300rpx;
			height: 200rpx;

			image {
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
		}
	}
</style>