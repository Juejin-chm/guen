<template>
	<view>
		<BarBg :bgtype='0'></BarBg>
		<CustomBar :barConfig='barConfig'></CustomBar>
		
		<view class="otabs">
			<view v-for="item in tabs" :key="item.key" :class="{cur: item.key == curTab}" @click="tabChange(item.key)">{{ item.value }}</view>
	<!-- 		<view>未派送</view>
			<view>已派送</view>
			<view>已完成</view> -->
		</view>
		<view class="box boxhui">
			<view class="outer">
				<view class="ex-name flex-between">
					<view class="le">全部订单</view>
					<view class="timer">
						<picker mode="date" fields="month" :value='date' @change="bindDateChange">
							<image src="@/static/image/date.png"></image>
							<text :class="[date?'hei':'']">{{date?date:'请选择'}}</text>
						</picker>
					</view>
				</view>
				
				<view v-for="item in list" :key="item.id" class='cellbor'>
				    <van-cell-group :border="false">
						<van-cell is-link :url='`/pages/boxDetail/boxDetail?id=${item.id}`' class='h'>
							<view slot="title" class="title">
								<text>订单号：</text>{{item.order_sn}}
							</view>
							<view :class="{red: item.transport_status == 1, theme: item.transport_status == 2, done: item.transport_status == 3}">{{item.transport_status_txt}}</view>
						</van-cell>
						<view class="space">
							<van-cell title="盒子类型：" :border="false" >
								<view v-for="it in item.goods" :key="item.id">
									{{it.title}}&nbsp;&nbsp; （{{it.number}}个) <br>
								</view>
							</van-cell>
							<van-cell title="审核通过日期：" :value="item.examine_push_date" :border="false" />
							<van-cell v-if="item.transport_status == 2" title="快递单号：" :border="false" >
								<image src="@/static/image/copy.png" style="width: 24rpx;height: 24rpx;margin-right: 20rpx;" @click="copy(item.transport_danhao)"></image>
								<text>{{item.transport_danhao}}</text>
							</van-cell>
						</view>
						<view v-if="item.transport_status != 1" class="ft">
							<view class="btn" :class="item.transport_status == 2 ? 'confirm' : 'cancel'" @click="delOrder(item.transport_status, item.id)">{{item.transport_status == 2 ? '确认完成' : '删除订单'}}</view>
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
				curTab: 'all',
				list: [],
				curPage: 1,
				
			}
		},
		async onReachBottom() {
			console.log('reach bottom');
			this.getMore()
		},
		onLoad(option) {
			this.curTab = option.key
			this.$api('/box-order-transport-status').then(({data}) => {
				this.tabs = data
			})
			this.getList(this.curTab, this.date)
		},
		methods: {
			getMore() {
				if (this.list.length >= this.total) {
					return
				}
				this.curPage += 1
				if (this.status == 2) {
					this.$api('/platform-message-list', {search_month: this.date, page: this.curPage}).then(({data}) => {
						data.data.forEach(item => {
							this.list.push(item)
							this.total = data.total
						})
					})
				}
				if (this.status == 1) {
					this.$api('/box-order-list', {search_month: this.date, search_status: this.tabIndex , page: this.curPage}).then(({data}) => {
						this.list = data.data
						this.total = data.total
					})
				}
				
			},
			copy(text) {
				uni.setClipboardData({
				  data: text,
				  success: function (res) {
				    uni.getClipboardData({
				      success: function (res) {
				        uni.showToast({
				          title: "复制成功",
				        });
				      },
				    });
				  },
				});
			},
		
			async delOrder(status, id) {
				if (status == 2) {
					await this.$api('/confirm-finish-order/' + id)
				} else {
					await this.$api('/del-bus-order/' + id)
				}
				this.getList(this.curTab, this.date)
			},
			async getList() {
				this.curPage = 1
				await this.$api('/box-order-list', {
					search_status: this.curTab,
					search_month: this.date,
					page: this.curPage
				}).then(({data}) => {
					this.list = data.data
				})
				return this.list
			},
			bindDateChange(e){
				this.date = e.detail.value;
				this.getList(this.status, this.date)
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
	.theme {
		color: #CBA868;
	}
	.done {
		color: #189B73;
	}
</style>

