<template>
	<view>
		<BarBg :bgtype='0'></BarBg>
		<CustomBar :barConfig='barConfig'></CustomBar>
		
		<view class="outer">
			<view class="status">
				<image src="@/static/image/exa3.png"></image>
				<text>{{detail.format_status}}</text>
			</view>
			
			<view class='cellbor address'>
				<view class="h">{{detail.user.ggz_company}}<text>{{detail.user.phone}}</text></view>
				<view>
					<image src="@/static/image/address.png"></image>
					<text>{{detail.user.address}}</text>
				</view>
			</view>
			
			<view class='cellbor'>
				<van-cell-group :border="false">
					<van-cell class='h' title="套餐一信息"></van-cell>
					<view class="space">
						<van-cell title="价格：" :border="false">
							<view style="color: #ff5050;">￥{{detail.money}}</view>
						</van-cell>
						<van-cell title="盒子总数量" :value="detail.number" :border="false" />
						<van-cell title="盒子类型" :border="false" >
							<view v-for="it in detail.goods" :key="it.id">
								{{it.goods_title}}: {{it.number}}个<br/>
								
							</view>
						</van-cell>
						<van-cell title="投放周期" :value="detail.period" :border="false" />
						<van-cell title="投放开始-结束" :value="detail.format_period" :border="false" />
					</view>
				</van-cell-group>
			</view>
			<view class='cellbor'>
				<van-cell-group :border="false">
					<van-cell class='h' title="订单信息"></van-cell>
					<view class="space">
						<van-cell title="订单号" :value="detail.order_sn" :border="false" />
						<van-cell title="下单日期" :value="detail.format_publish_date" :border="false" />
					</view>
				</van-cell-group>
			</view>
			<view class='cellbor'>
				<van-cell-group :border="false">
					<van-cell class="tel" title="电话咨询" :value="detail.phone" :border="false"  @click="callPhone(phone)">
						<view slot="right-icon">
							<image src="../../static/image/tel.png" mode=""></image>
						</view>
					</van-cell>
				</van-cell-group>
			</view>
		</view>	
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				barConfig: {
					title:'投放订单详情',
					hasRetun:true,
					isCenter:true,
				},
				detail: {}
			}
		},
		onLoad(options) {
			this.$api('/order-detail/' + options.id).then(({data}) => {
				this.detail = data
			})
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

