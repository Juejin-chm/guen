<template>
	<view>
		<BarBg :bgtype='0'></BarBg>
		<CustomBar :barConfig='barConfig'></CustomBar>
		
		<view class="poster">
			<image class="imgs" src="../../static/image/poster.png" mode=""></image>
			<view class="number">
				<view class="b">169752366</view>
				<view>我的推广码</view>
			</view>
			<view class="code">
				<image src="../../static/image/2038.png" mode=""></image>
				<view>长按识别二维码</view>
			</view>
			<button class="btn" @tap="saveShareImg">保存图片</button>
		</view>
		<view class='cont' id='canvas-container'>
		  <canvas canvas-id="myCanvas" style="width: 345px; height: 545px;" ></canvas>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				barConfig: {
					title:'推广海报',
					hasRetun:true,
					isCenter:true,
				},
			}
		},
		onLoad() {
			this.getCanvas()
		},
		methods: {
			getCanvas(){
				const ctx = wx.createCanvasContext('myCanvas')
				const number = '169752366';
				const title = '我的推广码';
				const codetxt = '长按识别二维码';
				const bg = '../../static/image/poster.png';
				const codeimg = '../../static/image/2038.png';
				ctx.drawImage(bg, 0, 0, 345, 545);
				ctx.drawImage(codeimg, 125, 316, 106, 106);
				ctx.setFontSize(15)
				ctx.setTextAlign('center')
				ctx.fillText(title, 176, 130)
				
				ctx.setFontSize(14);
				ctx.setFillStyle('#fff');
				ctx.fillText(codetxt, 178, 440)
				
				ctx.setFillStyle('#000');
				ctx.setFontSize(25)
				ctx.font = 'normal bold 25px sans-serif'; 
				ctx.fillText(number, 174, 100)
				
				ctx.draw()
			},
			saveShareImg(){
				setTimeout(function () {
				  uni.canvasToTempFilePath({
					canvasId: 'myCanvas',
					success: function (res) {
					  console.info("res", res);
					  let tempFilePath = res.tempFilePath;
					  uni.saveImageToPhotosAlbum({
						filePath: res.tempFilePath,
						success(res) {
						  console.info(res);
						  uni.showModal({
							content: '图片已保存到相册',
							showCancel: false,
							confirmText: '我知道了',
							confirmColor: '#333',
							success: function (res) {
							  if (res.confirm) {
							  }
							},
							fail: function (res) {}
						  })
						},
						fail: function (res) {
						  console.log(res)
						  if (res.errMsg === "saveImageToPhotosAlbum:fail:auth denied") {
							console.log("打开设置窗口");
							uni.openSetting({
							  success(settingdata) {
								console.log(settingdata)
								if (settingdata.authSetting["scope.writePhotosAlbum"]) {
								  console.log("获取权限成功，再次点击图片保存到相册")
								} else {
								  console.log("获取权限失败")
								}
							  }
							})
						  }
						}
					  })
					}
				  });
				}, 1000);
			},
		}
	}
</script>

<style lang="less" scoped>
	.poster{position: relative;margin: 40rpx auto 20rpx;
		width: 690rpx;height: 1090rpx;text-align:center;
		image{display: block;}
		.imgs{position: absolute;left: 0;top: 0;width: 100%;height: 100%;}
		.number{font-weight:500;color:#444444;font-size:30rpx;
			position: relative;top: 150rpx;
			.b{font-weight:700;color:#111111;font-size:50rpx;margin-bottom: 6rpx;}
		}
		.code{
			font-weight:500;
			color:#ffffff;
			font-size:28rpx;
			text-align:center;
			position: relative;top: 518rpx;
			image{width:211rpx;height:211rpx;margin: 0 auto 14rpx;}
		}
		.btn{position: relative;top: 600rpx;width:480rpx;margin: 0 auto;}
	}
	.cont {width: 345px; height: 545px;margin: 0 auto;
	z-index: -99999999;position: fixed;top: -10000px;
	}
</style>
