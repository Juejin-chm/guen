<template>
	<view>
		<BarBg :bgtype='0'></BarBg>
		<CustomBar :barConfig='barConfig'></CustomBar>
		
		<view class="otabs">
			<view class="cur">全部</view>
			<view>待投放</view>
			<view>已投放</view>
			<view>已结束</view>
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
					date:null,
				},
			}
		},
		methods: {
			bindDateChange(e){
				this.date = e.detail.value;
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

