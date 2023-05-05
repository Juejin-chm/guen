<template>
	<view>
		<BarBg :bgtype='0'></BarBg>
		<CustomBar :barConfig='barConfig'></CustomBar>
		
		<view class="otabs">
			<view v-for="item in tabs" :key="item.key" :class="{cur: item.key === curTab}" @click="tabChange(item.key)">{{ item.value }}</view>
	<!-- 		<view>未派送</view>
			<view>已派送</view>
			<view>已完成</view> -->
		</view>
		<view class="box boxhui">
			<view class="outer">
				<view class="ex-name flex-between">
					<view class="le">全部订单</view>
					<view class="timer">
						<picker mode="date" :value='date' @change="bindDateChange">
							<image src="@/static/image/date.png"></image>
							<text :class="[date?'hei':'']">{{date?date:'请选择'}}</text>
						</picker>
					</view>
				</view>
				
				<view class='cellbor'>
				    <van-cell-group :border="false">
						<van-cell is-link url='/pages/boxDetail/boxDetail' class='h'>
							<view slot="title" class="title">
								<text>订单号：</text>4455336
							</view>
							<view class="red">未派送</view>
						</van-cell>
						<view class="space">
							<van-cell title="盒子类型：" :border="false" >
								<view>
									500方盒  (500个)<br/>
									320正方盒 (500个)<br/>
								</view>
							</van-cell>
							<van-cell title="审核通过日期：" value="2023/02/24" :border="false" />
						</view>
				    </van-cell-group>
				</view>
				<view class='cellbor'>
				    <van-cell-group :border="false">
						<van-cell is-link url='/pages/boxDetail/boxDetail' class='h'>
							<view slot="title" class="title">
								<text>订单号：</text>4455336
							</view>
							<view>已派送</view>
						</van-cell>
						<view class="space">
							<van-cell title="盒子类型：" :border="false" >
								<view>
									500方盒  (500个)<br/>
									320正方盒 (500个)<br/>
								</view>
							</van-cell>
							<van-cell title="审核通过日期：" value="2023/02/24" :border="false" />
							<van-cell title="快递单号：" :border="false" >
								<image src="@/static/image/copy.png" style="width: 24rpx;height: 24rpx;margin-right: 20rpx;"></image>
								<text>4565541122255</text>
							</van-cell>
						</view>
						<view class="ft">
							<view class="btn confirm">确认完成</view>
						</view>
				    </van-cell-group>
				</view>
				<view class='cellbor'>
				    <van-cell-group :border="false">
						<van-cell is-link url='/pages/boxDetail/boxDetail' class='h'>
							<view slot="title" class="title">
								<text>订单号：</text>4455336
							</view>
							<view class="green">已完成</view>
						</van-cell>
						<view class="space">
							<van-cell title="盒子类型：" :border="false" >
								<view>
									500方盒  (500个)<br/>
									320正方盒 (500个)<br/>
								</view>
							</van-cell>
							<van-cell title="审核通过日期：" value="2023/02/24" :border="false" />
						</view>
						<view class="ft">
							<view class="btn cancel">删除订单</view>
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
					title:'盒子订单',
					hasRetun:true,
					isCenter:true,
					date:null,
				},
				tabs: [],
				curTab: 'all'
			}
		},
		onLoad(option) {
			this.$api('/box-order-transport-status').then(({data}) => {
				this.tabs = data
			})
		},
		methods: {
			getList(status, month) {
				this.$api('/box-order-list', {
					search_status: status,
					search_month: month
				})
			},
			bindDateChange(e){
				console.log(e.detail.value)
				this.date = e.detail.value;
			},
			tabChange(key) {
				this.curTab = key
				this.getList(key)
			}
		}
	}
</script>

<style>
	page{background-color:#f9f9f9;}
</style>
<style scoped lang="less">
	@import "@/static/style/cell.less";
	
</style>

