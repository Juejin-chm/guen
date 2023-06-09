<template>
	<view>
		<BarBg :bgtype='1'></BarBg>
		<CustomBar :barConfig='barConfig'></CustomBar>
		<view class="sides">
			<button style="width: auto;height: auto;background: transparent;padding: 0;" type="primary" open-type="contact">
				<image src="@/static/image/s-c.png"></image>
			</button>
			<image src="@/static/image/s-t.png" @click="callPhone(phone)"></image>
		</view>
		
		<view class="swiper">
			<swiper 
				:autoplay="swiperConfig.autoplay" 
				:circular="swiperConfig.circular" 
				:style="{height: swiperConfig.height}" 
				@change="curChange"
			>
			  <swiper-item v-for="(item, index) in swiperArr" :key="index">
				<image :src="item" mode="widthFix"></image>
			  </swiper-item>
			</swiper>
			<view class="s_dots">
				<view :class="current==index?'active':''" v-for="index in swiperArr.length" :key="index"></view>
			</view>
		</view>
		
		<view class="box">
			<view class="outer">
				<view class="verticals">
					<view class="verin" v-if="adArr.length>0">
					   <image src="@/static/image/verimg.png"></image>
					   <swiper :circular='true' :vertical='true' :autoplay='true'>
							<swiper-item v-for="item in adArr" :key="item">
								<view class="txthide">
									<view @click="viewDetail(item.id)">{{item.title}}</view>
								<text @click="viewMore">查看更多</text></view>
							</swiper-item>
					   </swiper>
					 </view>
				</view>
				
				<view class="tool flex-between">
					<navigator hover-class="none" url="../business/business?type=0&title=商家入驻">
						<image src="@/static/image/tl1.png"></image>
						<view>商家入驻</view>
					</navigator>
					<navigator hover-class="none" url="../business/business?type=1&title=成为推广大使">
						<image src="@/static/image/tl2.png"></image>
						<view>推广大使</view>
					</navigator>
					<navigator hover-class="none" url="../business/business?type=2&title=我要投广告">
						<image src="@/static/image/tl3.png"></image>
						<view>广告投放</view>
					</navigator>
					
					<view >
						<button style="background: transparent;padding: 0;width: auto;height: auto;" type="primary" open-type="contact">
							<image src="@/static/image/tl4.png"></image>
						</button>
						<!-- <image src="@/static/image/tl4.png"></image> -->
						<view>联系客服</view>
					</view>
				</view>
				
				<view class="itit"><span>金盒子数据</span></view>
				<view class="datas flex-between">
					<view class="dali">
						<view>平台用户</view>
						<view class="b">{{platData.users_count}}</view>
						<image src="@/static/image/datas1.png" mode="widthFix"></image>
					</view>
					<view class="dali">
						<view>曝光率</view>
						<view class="b">{{platData.bgl}}</view>
						<image src="@/static/image/datas2.png" mode="widthFix"></image>
					</view>
					<view class="dali">
						<view>广告主</view>
						<view class="b">{{platData.ggz_count}}</view>
						<image src="@/static/image/datas3.png" mode="widthFix"></image>
					</view>
					<view class="dali dalibig">
						<view>商家入驻</view>
						<view class="b">{{platData.bus_count}}</view>
						<image src="@/static/image/datas4.png" mode="widthFix"></image>
					</view>
					<view class="dali dalibig">
						<view>推广大使</view>
						<view class="b">{{platData.tgds_count}}</view>
						<image src="@/static/image/datas5.png" mode="widthFix"></image>
					</view>
				</view>
				
				<div class="ad">
					<image :src="joinBanner" mode="widthFix" style="width: 100%;" @click="joinUs"></image>
				</div>
				
				<div class="ititr">
					<view class="itit"><span>餐盒样式</span></view>
					<view class="more"><navigator hover-class="none" url="../series/series">更多<image src="@/static/image/turn-right.png" class="right-arrow"></image></navigator></view>
				</div>
			</view>
			<view style="padding-bottom: 20px;">
			<the-series
				is-swiper
				:tabArr="tabArr"
				:boxes="boxes"
				 :curId="cateId"
				@tabChange="tabChange"
			/>
			</view>
			<!-- <button open-type="getPhoneNumber">getPhoneNumber</button> -->
		</view>
		
		
	</view>
</template>

<script>
import theSeries from '@/component/Series'
	export default {
		components: { theSeries },
		data() {
			return {
				barConfig: {
					title:'金盒子',
					top:''
				},
				swiperArr:[],
				swiperConfig:{
					autoplay:true,
					circular:true,
					height:'280rpx',
				},
				current:0,
				adArr:[],
				tabArr:[],
				cateId: '',
				scrollTimer : null,
				platData: {
					bgl: 0,
					bus_count: 0,
					ggz_count: 0,
					tgds_count: 0,
					users_count: 0
				},
				joinBanner: '',
				boxes: [],
				code: '',
				phone: ''
			}
		},
		onLoad() {
			this.getPageData()
		},
		methods: {
			viewDetail(id) {
				console.log(id, '1111111');
				uni.navigateTo({
					url:'../messageDetail/messageDetail?id=' + id
				})
			},
			viewMore() {
				uni.navigateTo({
					url: '/pages/message/message?isNotRole=0'
				})
			},
			joinUs() {
				uni.switchTab({
					url: '/pages/join/join'
				})
			},
			curChange(e){
				this.current = e.detail.current;
			},
			getPageData() {
				this.$api('/index-index').then(data => {
					const res = data.data
					this.swiperArr = res.topBanners.map(item => item.url)
					this.adArr = res.platformNews.length ? res.platformNews : ['暂无新消息']
					this.tabArr = res.boxCates
					this.platData = res.platData
					this.boxes = res.boxes
					this.phone = res.phone
					this.cateId = this.tabArr[0].id
					this.joinBanner = res.joinBanner.url
				})
			},
			tabChange(id) {
				this.cateId = id
				this.$api('/get-box-by-cate', {
					cate_id: id
				}).then(({data}) => {
					this.boxes = data.data
				})
			}
		},
	}
</script>

<style scoped lang="less">
	.right-arrow {
		width: 12rpx;
		height: 21rpx;
		margin-left: 10rpx;
	}
	.swiper{position: relative;overflow: hidden;
		padding-bottom: 40rpx;
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
	
	.verticals{padding-top: 34rpx;
		.verin{position: relative;padding: 12rpx 26rpx 12rpx 134rpx;box-sizing: border-box;
			background-color:#ffffff;
			border-radius:36rpx;
			box-shadow:0 4rpx 6rpx rgba(0, 0, 0, 0.1);
			&>image{width: 80rpx;height: 46rpx;position: absolute;left: 30rpx;top: 12rpx;}
			swiper{height:48rpx;line-height: 48rpx;
				swiper-item{position: relative;padding-right: 120rpx;box-sizing: border-box;
					text{position: absolute;right: 0;top: 0;font-weight:500;color:#cba868;}
				}
			}
		}
	}
	.tool{font-weight:500;
		color:#111111;
		font-size:30rpx;
		line-height:36rpx;
		text-align:center;
		padding: 55rpx 0 63rpx;
		image{width: 106rpx;height: 108rpx;display: block;margin: 0 auto 12rpx;}
	}
	.itit{position: relative;
		font-size:34rpx;font-weight:700;color:#111111;
		padding-right: 6rpx;padding-bottom: 4rpx;
		display: inline-block;
		span{position: relative;}
		&::before{content: '';position: absolute;right: 0;bottom: 0;z-index: 0;
			width:80rpx;height:14rpx;background-color:#dfbc78;
		}
	}
	.ititr{margin-top: 58rpx;
		.more{float: right;font-weight:500;color:#999999;}
	}
	
	.datas{flex-wrap: wrap;margin: 33rpx 0 36rpx;
		.dali{
			width:216rpx;height:270rpx;background-color:#f5f6f8;margin-bottom: 18rpx;
			padding: 24rpx 30rpx 0;box-sizing: border-box;border-radius:14rpx;
			font-size:26rpx;font-weight:500;color:#444444;text-align: center;
			view{text-align: left!important;}
			.b{font-size:38rpx;margin-top: 4rpx;}
			image{width: 97rpx;margin-top: 35rpx;}
			&.dalibig{width:335rpx;height:230rpx;text-align: right;
				image{margin-top:0;margin-right:10rpx;}
			}
		}
	}
	
	

</style>
