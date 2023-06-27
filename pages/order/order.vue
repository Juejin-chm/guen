<template>
	<view>
		<BarBg :bgtype='0'></BarBg>
		<CustomBar :barConfig='barConfig'></CustomBar>
		
		<view class="otabs">
			<view v-for="item in tabs" :key="item.key" :class="{cur: item.key == query.search_status}" @click="tabChange(item.key)">{{item.value}}</view>
			
			<!-- <view>待投放</view>
			<view>已投放</view>
			<view>已结束</view> -->
		</view>
		<view class="box boxhui">
			<view class="outer">
				<view class="ex-name flex-between">
					<view class="le">全部订单</view>
					<view class="timer">
						<picker mode="date" :value="query.search_month" fields="month" @change="bindDateChange">
							<image src="@/static/image/date.png"></image>
							<text :class="[query.search_month ? 'hei' : '']">{{query.search_month ? query.search_month : '请选择'}}</text>
						</picker>
					</view>
				</view>
				<template v-if="list.length > 0">
				<view v-for="item in list" :key="item.id" :class="['cellbor', {cellborhui: item.order_status == 3}]" @click="goDetail(item.id)">
				    <van-cell-group :border="false">
						<van-cell is-link  class='h'>
							<view slot="title">
								<text>订单号：</text>{{item.order_sn}}
							</view>
							<view :class="{red: item.order_status == 1, theme: item.order_status == 2}">{{item.format_order_status}}</view>
						</van-cell>
						<view class="space">
							<van-cell title="盒子总数量：" :value="item.number" :border="false" />
							<!-- <van-cell title="投放套餐：" value="" :border="false" /> -->
							<van-cell title="投放开始-结束：" :value="item.format_period" :border="false" />
							<van-cell title="价格：" :border="false">
								<view style="color: #ff5050;">￥{{item.money}}</view>
							</van-cell>
						</view>
				    </van-cell-group>
				</view>
				</template>
				<template v-else>
					<view style="height: 300rpx ;"></view>
				</template>
				
				
				
				
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
				// curTab: 'all',
				// date: undefined,
				list: [],
				query: {
					search_month: '',
					search_status: 'all',
					page: 1
				},
				total: 0
			}
		},
		onLoad(option) {
			// this.curTab = option.key =='all' ? option.key : +option.key + 1
			this.query.search_status = option.key =='all' ? option.key : +option.key + 1
			console.log(option, 'option');
			this.$api('/order-const').then(({data}) => {
				console.log(data, 'data');
				this.tabs = data
			})
			this.getList()
		},
		onReachBottom() {
			this.getMore()
		},
		methods: {
			getMore() {
				if (this.list.length >= this.total) {
					return console.warn('没有更多了')
				}
				this.query.page += 1
				this.$api('/order-list', query).then(({data}) => {
					console.log(data, '/order-list 接口response');
					this.list.push(...data.data)
					this.total = data.total
				})
			},
			goDetail(id) {
				uni.navigateTo({
					url: '/pages/orderDetail/orderDetail?id=' + id
				})
			},
			getList(query = this.query) {
				this.$api('/order-list', query).then(({data}) => {
					console.log(data, '/order-list 接口response');
					this.list = data.data
					this.total = data.total
				})
			},
			tabChange(key) {
				this.query.search_status = key
				this.query.page = 1
				this.query.search_month = ''
				this.getList()
			},
			bindDateChange(e){
				this.query.search_month = e.detail.value
				this.query.page = 1
				this.getList()
			}
		}
	}
</script>

<style>
	page{background-color:#f9f9f9;}
</style>
<style scoped lang="less">
	@import "@/static/style/cell.less";
	.theme {
		color: #CBA868;
	}
</style>

