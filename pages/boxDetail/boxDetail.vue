<template>
	<view :class="[detail.transport_status==2?'hasbtnpad':'']">
		<BarBg :bgtype='0'></BarBg>
		<CustomBar :barConfig='barConfig'></CustomBar>
		
		<view class="outer">
			<view class="status">
				<template v-if="detail.transport_status==1">
					<image src="@/static/image/exa3.png"></image>
					<text>订单未派送</text>
				</template>
				<template v-else-if="detail.transport_status==2">
					<image src="@/static/image/exa4.png"></image>
					<text>订单已派送</text>
				</template>
				<template v-else>
					<image src="@/static/image/exa5.png"></image>
					<text>订单已完成</text>
					<view class="time">确认完成时间：{{detail.user_confirm_finish_date}}</view>
				</template>
			</view>
			
			<view class='cellbor address'>
				<view class="h">某某某<text>{{detail.phone}}</text></view>
				<view>
					<image src="@/static/image/address.png"></image>
					<text>{{detail.format_addr}}</text>
				</view>
			</view>
			
			<view class='cellbor' v-if="detail.transport_status==2 ||detail.transport_status==3">
				<van-cell-group :border="false">
					<van-cell class='h' title="物流信息"></van-cell>
					<view class="space">
						<van-cell title="快递" :value="detail.transport_kd" :border="false" />
						<van-cell title="快递单号" :border="false" >
							<image src="@/static/image/copy.png" style="width: 24rpx;height: 24rpx;margin-right: 20rpx;" @click="copyMessage(detail.transport_danhao)"></image>
							<text>{{detail.transport_danhao}}</text>
						</van-cell>
					</view>
				</van-cell-group>
			</view>
			
			<view class='cellbor'>
				<van-cell-group :border="false">
					<van-cell class='h' title="订单信息"></van-cell>
					<view class="space">
						<van-cell title="门店" :value="detail.store_name" :border="false" />
						<van-cell title="盒子类型" :border="false" >
							<view v-for="item in detail.goods" :key="item.id">
								{{item.title}}&nbsp;&nbsp; ({{item.number}}个)<br/>
							</view>
						</van-cell>
						<van-cell title="审核通过日期" :value="detail.format_examine_push_date" :border="false" />
					</view>
				</van-cell-group>
			</view>
			<view class='cellbor'>
				<van-cell-group :border="false">
					<view class="space">
						<van-cell title="订单号" :value="detail.order_sn" :border="false" />
						<van-cell title="下单日期" :value="detail.format_examine_push_date" :border="false" />
					</view>
				</van-cell-group>
			</view>
			<view class='cellbor'>
				<van-cell-group :border="false">
					<van-cell class="tel" title="电话咨询" :value="phone" :border="false" >
						<view slot="right-icon">
							<image src="../../static/image/tel.png" mode=""></image>
						</view>
					</van-cell>
				</van-cell-group>
			</view>
		</view>	
		
		<view class="fixedbtn" v-if="detail.transport_status==2">
			<view class="envpad">
				<button class="btn" @click="done">确认完成</button>
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
				detail: {},
				phone: '',
			}
		},
		onLoad(options) {
			this.status = options.status;
			// switch(options.status){
			// 	case 1:
			// 	this.barConfig.title = '未派送订单';
			// 	break;
			// 	case 2:
			// 	this.barConfig.title = '订单已派送';
			// 	break;
			// 	case 3:
			// 	this.barConfig.title = '订单已完成';
			// 	break;
			// }
			this.$api('/box-order-info/' + options.id).then(({data, code})=> {
				
				this.detail = data.order
				this.phone = data.phone
				this.barConfig.title = '订单' + this.detail.transport_status_txt
			})
		},
		methods: {
			copyMessage(text) {
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
			done() {
				this.$api('/confirm-finish-order/' + this.detail.id).then(({data}) => {
					this.detail = data.order
				})
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

