<template>
	<view>
		<BarBg :bgtype='0'></BarBg>
		<CustomBar :barConfig='barConfig'></CustomBar>
		
		<view class="outer">
			<view class="status">
				<template v-if="status==1">
					<image src="@/static/image/exa1.png"></image>
					<text>商家入驻申请待审核</text>
				</template>
				<template v-else>
					<image src="@/static/image/exa2.png"></image>
					<text>推广大使申请驳回</text>
				</template>
			</view>
			
			<view class='cellbor' v-if="status==2">
				<van-cell-group :border="false">
					<van-cell class='msg' :border="false" value='驳回原因.................'></van-cell>
				</van-cell-group>
			</view>
			
			<view class='cellbor'>
				<van-cell-group :border="false">
					<van-cell class='h' title="审核信息"></van-cell>
					<view class="space">
						<van-cell title="姓名" value="某某某" :border="false" />
						<van-cell title="联系电话" value="15456325972" :border="false" />
						<template v-if="status==1">
							<van-cell title="门店名称" value="XXXXXX门店名称" :border="false" />
						</template>
						<template v-else>
							<van-cell title="上级推广码" value="XXXXXX25444555" :border="false" />
						</template>
						<van-cell title="门店地址" value="福建省厦门市湖里区高新技术园" :border="false" />
						<van-cell title="申请日期" value="2023/02/15" :border="false" />
					</view>
				</van-cell-group>
			</view>
			
			<view class='cellbor'>
				<van-cell-group :border="false">
					<van-cell class='h' :title="status==1?'营业执照及卫生许可证':'身份证信息'"></van-cell>
					<template v-if="status==2">
						<van-cell title="身份证号" value="3541269445211225" :border="false" />
					</template>
					<view class="upimgul">
						<view class="upimgli">
							<image slot src="../../static/image/upimg.png" mode="aspectFit"></image>
						</view>
						<view class="upimgli">
							<image slot src="../../static/image/upimg.png" mode="aspectFit"></image>
						</view>
					</view>
				</van-cell-group>
			</view>
			
			<view class='cellbor'>
				<van-cell-group :border="false">
					<van-cell class='h' title="留言备注"></van-cell>
					<van-cell class='msg' :border="false" value='留言备注内容...........'></van-cell>
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
					title:'待审核',
					hasRetun:true,
					isCenter:true,
				},
				status:1, //1-待审核  2-审核驳回
			}
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

