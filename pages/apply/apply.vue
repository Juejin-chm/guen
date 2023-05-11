<template>
	<view>
		<BarBg :bgtype='0'></BarBg>
		<CustomBar :barConfig='barConfig'></CustomBar>
		
		<view class="otabs">
			<view v-for="item in tabs" :key="item.key" :class="{cur: curTab == item.key}" @click="tabClick(item.key)">{{ item.value }}</view>
			<!-- <view>待审核</view>
			<view>驳回</view> -->
		</view>
		<view class="box boxhui">
			<view class="outer">
				
				<view class="ex-name flex-between">
					<view class="le">全部审核</view>
					<view class="timer">
						<picker mode="date" fields="month" :value='date' @change="bindDateChange">
							<image src="@/static/image/date.png"></image>
							<text :class="[date?'hei':'']">{{date?date:'请选择'}}</text>
						</picker>
					</view>
				</view>
				<template v-for="item in reviewList">
					<view v-if="item.status === 0" class='cellbor' :key="item.id">
							<van-cell-group :border="false">
							<van-cell :title="item.title" is-link :url="`/pages/applyDetail/applyDetail?id=${item.id}`" class='h'>
								<view>{{item.status_txt}}</view>
							</van-cell>
							<view class="space">
								<van-cell title="姓名：" :value="item.name" :border="false" />
								<van-cell title="门店：" :value="item.bus_store_name" :border="false" />
								<van-cell title="提交日期：" :value="item.format_date" :border="false" />
							</view>
							</van-cell-group>
					</view>
					<view v-if="item.status === 2" class='cellbor' :key="item.id">
							<van-cell-group :border="false">
							<van-cell :title="item.title" is-link :url="`/pages/applyDetail/applyDetail?id=${item.id}`" class='h'>
								<view class="red">{{ item.status_txt }}</view>
							</van-cell>
							<view class="space">
								<van-cell title="姓名：" :value="item.name" :border="false" />
								<van-cell title="联系电话：" :value="item.mobile" :border="false" />
								<van-cell title="提交日期：" :value="item.format_date" :border="false" />
							</view>
							</van-cell-group>
					</view>
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
					title:'我的申请',
					hasRetun:true,
					isCenter:true,
					
				},
				date:null,
				tabs: [],
				curTab: 'all',
				reviewList: []
			}
		},
		onLoad(option) {
			this.curTab = option.key
			this.$api('/examine-status-title').then(({data}) =>{
				this.tabs = data
				this.getList(option.key)
			})
			
		},
		methods: {
			async getList(status, month) {
				
				this.$api('/user-examine-list', {
					status,
					search_month: month
				}).then(({data}) => {
					this.reviewList = data
				})
			},
			bindDateChange(e){
				console.log(e.detail.value)
				this.date = e.detail.value;
				this.getList(this.curTab, this.date)
			},
			tabClick(key) {
				this.curTab = key
				this.getList(key, this.date)
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

