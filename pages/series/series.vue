<template>
	<view>
		<BarBg :bgtype='0'></BarBg>
		<CustomBar :barConfig='barConfig'></CustomBar>
		
		<view class="box">
			<view class="setabs">
				<view :class="setindex==index?'cur':''" v-for="(item,index) in tabArr" @tap="clitabs(index)">{{item}}</view>
			</view>
			<view class="outer">
				<view class="setul setuls">
					<navigator class="setli" url="../seriesDetail/seriesDetail" hover-class="none">
						<image src="@/static/image/2038.png" mode="widthFix"></image>
						<view class="name txthide">500方盒</view>
					</navigator>
					<navigator class="setli" url="../seriesDetail/seriesDetail" hover-class="none">
						<image src="@/static/image/2038.png" mode="widthFix"></image>
						<view class="name txthide">500方盒</view>
					</navigator>
					<navigator class="setli" url="../seriesDetail/seriesDetail" hover-class="none">
						<image src="@/static/image/2038.png" mode="widthFix"></image>
						<view class="name txthide">500方盒</view>
					</navigator>
					<navigator class="setli" url="../seriesDetail/seriesDetail" hover-class="none">
						<image src="@/static/image/2038.png" mode="widthFix"></image>
						<view class="name txthide">500方盒</view>
					</navigator>
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
					title:'餐盒样式',
					hasRetun:true,
					isCenter:true,
				},
				tabArr:['方盒系列','正方盒系列','圆形系列','美式圆形系列','方盒系列','方盒系列','方盒系列'],
				setindex:0,
			}
		},
		methods: {
			clitabs(index){
				this.setindex = index;
			},
		}
	}
</script>

<style>

</style>
