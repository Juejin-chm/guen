<template>
	<view>
		<BarBg :bgtype='0'></BarBg>
		<CustomBar :barConfig='barConfig'></CustomBar>
		
		<view class="outer">
			<view class="status">
				<image src="@/static/image/exa3.png"></image>
				<text>订单已投放</text>
			</view>
			
			<view class='cellbor address'>
				<view class="h">广告主公司名称xxxxxxx<text>15786542369</text></view>
				<view>
					<image src="@/static/image/address.png"></image>
					<text>福建省厦门市湖里区高新技术园1108号</text>
				</view>
			</view>
			
			<view class='cellbor'>
				<van-cell-group :border="false">
					<van-cell class='h' title="套餐一信息"></van-cell>
					<view class="space">
						<van-cell title="价格：" :border="false">
							<view style="color: #ff5050;">￥2000</view>
						</van-cell>
						<van-cell title="盒子总数量" value="10000" :border="false" />
						<van-cell title="盒子类型" :border="false" >
							<view>
								650方盒：5000个<br/>
								320正方盒：5000个<br/>
							</view>
						</van-cell>
						<van-cell title="投放周期" value="1年" :border="false" />
						<van-cell title="投放开始-结束" value="2023/01/01-2023/12/31" :border="false" />
					</view>
				</van-cell-group>
			</view>
			<view class='cellbor'>
				<van-cell-group :border="false">
					<van-cell class='h' title="订单信息"></van-cell>
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
			}
		},
		onLoad(options) {
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

