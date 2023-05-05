<template>
	<view>
		<BarBg :bgtype='0'></BarBg>
		<CustomBar :barConfig='barConfig'></CustomBar>
		
		<view class="otabs">
			<view v-for="item in tabs" :key="item.key" :class="{cur: item.key == curTab}" @click="tabChange(item.key)">{{item.value}}</view>
			
			<!-- <view>待投放</view>
			<view>已投放</view>
			<view>已结束</view> -->
		</view>
		<view class="box boxhui">
			<view class="outer">
				<view class="ex-name flex-between">
					<view class="le">全部订单</view>
					<view class="timer">
						<picker mode="date" :value='date' fields="month" @change="bindDateChange">
							<image src="@/static/image/date.png"></image>
							<text :class="[date?'hei':'']">{{date?date:'请选择'}}</text>
						</picker>
					</view>
				</view>
				
				<view class='cellbor'>
				    <van-cell-group :border="false">
						<van-cell is-link url='/pages/orderDetail/orderDetail' class='h'>
							<view slot="title">
								<text>订单号：</text>4455336
							</view>
							<view class="red">待投放</view>
						</van-cell>
						<view class="space">
							<van-cell title="盒子总数量：" value="10000" :border="false" />
							<van-cell title="投放套餐：" value="套餐一" :border="false" />
							<van-cell title="投放开始-结束：" value="2023/01/01-2023/12/31" :border="false" />
							<van-cell title="价格：" :border="false">
								<view style="color: #ff5050;">￥2000</view>
							</van-cell>
						</view>
				    </van-cell-group>
				</view>
				<view class='cellbor'>
				    <van-cell-group :border="false">
						<van-cell is-link url='/pages/orderDetail/orderDetail' class='h'>
							<view slot="title">
								<text>订单号：</text>4455336
							</view>
							<view>已投放</view>
						</van-cell>
						<view class="space">
							<van-cell title="盒子总数量：" value="10000" :border="false" />
							<van-cell title="投放套餐：" value="套餐一" :border="false" />
							<van-cell title="投放开始-结束：" value="2023/01/01-2023/12/31" :border="false" />
							<van-cell title="价格：" :border="false">
								<view style="color: #ff5050;">￥2000</view>
							</van-cell>
						</view>
				    </van-cell-group>
				</view>
				<view class='cellbor cellborhui'>
				    <van-cell-group :border="false">
						<van-cell is-link url='/pages/orderDetail/orderDetail' class='h'>
							<view slot="title">
								<text>订单号：</text>4455336
							</view>
							<view>已结束</view>
						</van-cell>
						<view class="space">
							<van-cell title="盒子总数量：" value="10000" :border="false" />
							<van-cell title="投放套餐：" value="套餐一" :border="false" />
							<van-cell title="投放开始-结束：" value="2023/01/01-2023/12/31" :border="false" />
							<van-cell title="价格：" value="￥2000" :border="false"/>
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
					title:'投放订单',
					hasRetun:true,
					isCenter:true,
				},
				tabs: [],
				curTab: 'all',
				date: undefined
			}
		},
		onLoad(option) {
			this.curTab = option.key
			console.log(option, 'option');
			this.$api('/order-const').then(({data}) => {
				console.log(data, 'data');
				this.tabs = data
			})
			this.getList(option.key)
		},
		methods: {
			getList(status, month) {
				this.$api('/order-list', {
					search_status: status,
					search_month: month
				}).then(({data}) => {
					console.log(data, '123data');
				})
			},
			tabChange(key) {
				this.curTab = key
				this.getList(key, this.date)
			},
			bindDateChange(e){
				this.date = e.detail.value;
				this.getList(this.curTab, this.date)
			},
		}
	}
</script>

<style>
	page{background-color:#f9f9f9;}
</style>
<style scoped lang="less">
	@import "@/static/style/cell.less";
</style>

