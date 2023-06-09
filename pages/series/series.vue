<template>
	<view>
		<BarBg :bgtype='0'></BarBg>
		<CustomBar :barConfig='barConfig'></CustomBar>
		
		<view class="box">
			<the-series :tabArr="tabArr" :boxes="boxes" :curId="cate_id" @tabChange="tabChange"/>
		</view>	
		
	</view>
</template>

<script>
import theSeries from '@/component/Series'
	export default {
		components: { theSeries },
		data() {
			return {
				barConfig: {
					title:'餐盒样式',
					hasRetun:true,
					isCenter:true,
				},
				tabArr:['方盒系列','正方盒系列','圆形系列','美式圆形系列','方盒系列','方盒系列','方盒系列'],
				boxes: [],
				curPage: 1,
				cate_id: ''
			}
		},
		onLoad() {
			this.$api('/index-index').then(({data}) => {
				this.tabArr = data.boxCates
				this.cate_id = this.tabArr[0].id
				// this.boxes = data.boxes
				this.boxes = data.boxes.concat(data.boxes, data.boxes, data.boxes)
			})
		},
		onReachBottom() {
			this.getMore()
		},
		methods: {
			tabChange(id) {
				this.cate_id = id
				this.curPage = 1
				this.$api('/get-box-by-cate', {
					cate_id: id,
					page: 1
				}).then(({data}) => {
					this.boxes = data.data
				})
			},
			getMore() {
				this.curPage += 1
				this.$api('/get-box-by-cate', {
					cate_id: this.cate_id,
					page: this.curPage
				}).then(({data}) => {
					data.data.forEach(item => {
						this.boxes.push(item)
					})
				})
			}
		}
	}
</script>

<style>

</style>
