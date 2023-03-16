<template>
	<view :class="[status==2?'hasbtnpad':'']">
		<BarBg :bgtype='0'></BarBg>
		<CustomBar :barConfig='barConfig'></CustomBar>
		
		<view class="outer">
			<view class="status">
				<template v-if="status==1">
					<image src="@/static/image/exa3.png"></image>
					<text>订单未派送</text>
				</template>
				<template v-else-if="status==2">
					<image src="@/static/image/exa4.png"></image>
					<text>订单已派送</text>
				</template>
				<template v-else>
					<image src="@/static/image/exa5.png"></image>
					<text>订单已完成</text>
					<view class="time">确认完成时间：2023/03/15 12:24:25</view>
				</template>
			</view>
			
			<view class='cellbor address'>
				<view class="h">某某某<text>15786542369</text></view>
				<view>
					<image src="@/static/image/address.png"></image>
					<text>福建省厦门市湖里区高新技术园1108号</text>
				</view>
			</view>
			
			<view class='cellbor' v-if="status==2 ||status==3">
				<van-cell-group :border="false">
					<van-cell class='h' title="物流信息"></van-cell>
					<view class="space">
						<van-cell title="快递" value="顺丰快递" :border="false" />
						<van-cell title="快递单号" :border="false" >
							<image src="@/static/image/copy.png" style="width: 24rpx;height: 24rpx;margin-right: 20rpx;"></image>
							<text>4565541122255</text>
						</van-cell>
					</view>
				</van-cell-group>
			</view>
			
			<view class='cellbor'>
				<van-cell-group :border="false">
					<van-cell class='h' title="订单信息"></van-cell>
					<view class="space">
						<van-cell title="门店" value="XXXXXX门店名称" :border="false" />
						<van-cell title="盒子类型" :border="false" >
							<view>
								500方盒  (500个)<br/>
								320正方盒 (500个)<br/>
							</view>
						</van-cell>
						<van-cell title="审核通过日期" value="2023/02/24" :border="false" />
					</view>
				</van-cell-group>
			</view>
			<view class='cellbor'>
				<van-cell-group :border="false">
					<view class="space">
						<van-cell title="订单号" value="4455336" :border="false" />
						<van-cell title="下单日期" value="2023/02/24" :border="false" />
					</view>
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
		
		<view class="fixedbtn" v-if="status==2">
			<view class="envpad">
				<button class="btn">确认完成</button>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				barConfig: {
					title:'未派送订单',
					hasRetun:true,
					isCenter:true,
				},
				status:2, //1-未派送订单  2-订单已派送  3-订单已完成
			}
		},
		onLoad(options) {
			this.status = options.status;
			switch(options.status){
				case 1:
				this.barConfig.title = '未派送订单';
				break;
				case 2:
				this.barConfig.title = '订单已派送';
				break;
				case 3:
				this.barConfig.title = '订单已完成';
				break;
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
</style>

