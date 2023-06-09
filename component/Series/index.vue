<template>
	<view>
		<view class="setabs">
			<view  v-for="(item, index) in tabArr" :key="item.id" :class="curId == item.id ? 'cur' : ''" @tap="clitabs(item.id)">{{ item.name }}</view>
		</view>
		<view class="outer">
			<view v-if="isSwiper" class="setul">
				<swiper :display-multiple-items="3">
					<swiper-item v-for="item in boxes" :key="item.id">
						<navigator class="setli" :url="`../seriesDetail/seriesDetail?id=${item.id}`" hover-class="none">
							<image :src="item.cover" mode="widthFix"></image>
							<view class="name txthide">{{item.title}}</view>
						</navigator>
					</swiper-item>
					<!-- 当 boxes 小于 3 的时候，渲染几个 item 占位 -->
					<template v-if="boxes.length < 3">
						<swiper-item v-for="item in 3 - boxes.length" :key="item" />
					</template>
				</swiper>
			</view>
			<view v-else class="setul setuls">
				<navigator v-for="item in boxes" :key="item.id" class="setli" :url="`../seriesDetail/seriesDetail?id=${item.id}`" hover-class="none">
					<image :src="item.cover" mode="widthFix"></image>
					<view class="name txthide">{{ item.title }}</view>
				</navigator>
			</view>
		</view>
	</view>
</template>
<script>
export default {
  props: {
    isSwiper: Boolean,
		tabArr: {
			type: Array,
			default: () => []
		},
		boxes: {
			atype: Array,
			default: () => []
		},
		curId: String
  },
	data() {
		return {
		}
	},
	
	methods: {
			curChange(e){
				this.current = e.detail.current;
			},
			clitabs(id){
				this.$emit('tabChange', id)
			},
		}
}
</script>