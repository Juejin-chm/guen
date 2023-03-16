<template>
	<view>
		<BarBg :bgtype='0'></BarBg>
		<CustomBar :barConfig='barConfig'></CustomBar>
		
		<view class="otabs">
			<view class="cur">全部</view>
			<view>待审核</view>
			<view>驳回</view>
		</view>
		<view class="box boxhui">
			<view class="outer">
				
				<view class="ex-name flex-between">
					<view class="le">全部审核</view>
					<view class="timer">
						<picker mode="date" :value='date' @change="bindDateChange">
							<image src="@/static/image/date.png"></image>
							<text :class="[date?'hei':'']">{{date?date:'请选择'}}</text>
						</picker>
					</view>
				</view>
				
				<view class='cellbor'>
				    <van-cell-group :border="false">
						<van-cell title="商家入驻审核" is-link url='/pages/applyDetail/applyDetail' class='h'>
							<view>待审核</view>
						</van-cell>
						<view class="space">
							<van-cell title="姓名：" value="某某某" :border="false" />
							<van-cell title="门店：" value="门店名称XXXXXXX" :border="false" />
							<van-cell title="提交日期：" value="2023/02/24" :border="false" />
						</view>
				    </van-cell-group>
				</view>
				<view class='cellbor'>
				    <van-cell-group :border="false">
						<van-cell title="成为推广大使审核" is-link url='/pages/applyDetail/applyDetail' class='h'>
							<view class="red">审核驳回</view>
						</van-cell>
						<view class="space">
							<van-cell title="姓名：" value="某某某" :border="false" />
							<van-cell title="联系电话：" value="1578965462" :border="false" />
							<van-cell title="提交日期：" value="2023/02/24" :border="false" />
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
					title:'我的申请',
					hasRetun:true,
					isCenter:true,
					date:null,
				},
			}
		},
		methods: {
			bindDateChange(e){
				console.log(e.detail.value)
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

