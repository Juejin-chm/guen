<template>
	<view>
		<BarBg :bgtype='0'></BarBg>
		<CustomBar :barConfig='barConfig'></CustomBar>
		
		<view class="outer">
			<view class="status">
				<template v-if="detail.status==0">
					<image src="@/static/image/exa1.png"></image>
					<text>{{detail.title}}</text>
				</template>
				<template v-else>
					<image src="@/static/image/exa2.png"></image>
					<text>{{detail.title}}</text>
				</template>
			</view>
			<view class='cellbor' v-if="detail.status==2">
				<van-cell-group :border="false">
					<van-cell class='msg' :border="false" :value='detail.refund_reason || "（空）"'></van-cell>
				</van-cell-group>
			</view>
			
			<view class='cellbor'>
				<van-cell-group :border="false">
					<van-cell class='h' title="审核信息"></van-cell>
					<view class="space">
						<van-cell title="姓名" :value="detail.name" :border="false" />
						<van-cell title="联系电话" :value="detail.mobile" :border="false" />
						<template v-if="status==1">
							<van-cell title="门店名称" :value="detail.bus_store_name" :border="false" />
						</template>
						<template v-else>
							<van-cell title="上级推广码" :value="detail.ds_top_code" :border="false" />
						</template>
						<van-cell title="门店地址" :value="address" :border="false" />
						<van-cell title="申请日期" :value="detail.format_date" :border="false" />
					</view>
				</van-cell-group>
			</view>
			
			<view class='cellbor'>
				<van-cell-group :border="false">
					<van-cell class='h' :title="status==1?'营业执照及卫生许可证':'身份证信息'"></van-cell>
					<template v-if="detail.status==2">
						<van-cell title="身份证号" :value="detail.ds_identity_code" :border="false" />
					</template>
					<view class="upimgul">
						<view class="upimgli">
							<image slot :src="detail.bus_hygiene_license || detail.ds_identity_pic_positive" mode="aspectFit"></image>
						</view>
						<view class="upimgli">
							<image slot :src="detail.bus_license || detail.ds_identity_pic_negative" mode="aspectFit"></image>
						</view>
					</view>
				</van-cell-group>
			</view>
			
			<view class='cellbor'>
				<van-cell-group :border="false">
					<van-cell class='h' title="留言备注"></van-cell>
					<van-cell class='msg' :border="false" :value='detail.remark'></van-cell>
				</van-cell-group>
			</view>
			<view class='cellbor'>
				<van-cell-group :border="false">
					<van-cell class="tel" title="电话咨询" :value="phone" :border="false" @click="callPhone(phone)">
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
					title:'待审核',
					hasRetun:true,
					isCenter:true
				},
				status:1, //1-待审核  2-审核驳回
				detail: {},
				phone: ''
			}
		},
		computed: {
			address() {
				const d = this.detail
				return d.province + d.city + d.county
			},
			
		},
		onLoad(query) {
			this.$api('/user-examine-detail/' + query.id).then(({data}) => {
				console.log(data, 'user-examine-detail');
				this.detail = data.detail
				this.phone = data.phone
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

