<template>
	<view class="hasbtnpad">
		<BarBg :bgtype='0'></BarBg>
		<CustomBar :barConfig='barConfig'></CustomBar>
		
		<van-cell-group inset class="v-group" :border='false'>
			<van-cell class='h' title="门店" :value="boxInfo.company"/>
			<view class="boxChoose">
				<van-cell :border='false' @click="showChoose">
					<view slot="title" class="title">选择盒子类型<text>（可多选）</text></view>
					<view slot="right-icon" class="right-icon">
						<text style="color: #b5b5b5;">请选择</text>
						<image src="../../static/image/turn-right.png"></image>
					</view>
				</van-cell>
				
				<view class="lists">
					<view class="listcon">
						<template v-for="(value, key) in checkedBox">
							<view class="list" v-for="(subit,subin) in value" :key='key' >
								<view>
									<text :style="{'opacity':subin==0?'1':'0'}">{{cateNameList[key]}}：</text>
									<text>{{delId(subit)}}</text>
								</view>
								<input type="number" placeholder="填写数量" :value="boxNumber[key][subin]" @input="(e) => inputChange(e, key, subin)">
								<view class="close" @click="delBox(key, subin)">
									<image src="../../static/image/close.png" mode=""></image>
								</view>
							</view>
						</template>
					</view>
				</view>
			</view>
			
			<van-field label="收货人" placeholder="请输入" @input="(e) => onInput(e, 'consignee')"  />
			<van-field label="联系电话" placeholder="请输入" :maxlength="11" type="digit" @input="(e) => onInput(e, 'phone')" />
			<van-cell title="收货地址" is-link :border='false'>
				<picker mode='region' @change="pickerCityChange">
					<view :class="pickerValue?'value':''">{{pickerValue?pickerValue:'请选择省/市/区'}}</view>
				</picker>
			</van-cell>
			<van-field class="vfield-line" :border='false' placeholder="请输入详细地址" @input="addrInput" />
		</van-cell-group>
		
		<van-cell-group inset class="v-group" :border='false'>
			<view class="vcell-msg-warp">
				<van-field label="申请原因" type="textarea" class="vcell-msg" placeholder="请输入..." @input="remarkInput"></van-field>
			</view>
		</van-cell-group>
		
		<view class="fixedbtn">
			<view class="envpad">
				<button class="btn" form-type="submit" @click="submit">提交</button>
			</view>
		</view>
		
		<van-popup 
			:show="show" @close="onClose"
			round
			position="bottom"
			custom-style="height:80%;"
		>
			<view class="choosepop">
				<form @submit="formSubmit">
					<view class="h">选择盒子</view>
					<view class="sign">已选：<text>{{compCheckedBox.join('; ')}}</text></view>
					<view class="h5">选择系列</view>
					<view class="picker">
						<picker @change="bindPickerChange" :value="index" :range="boxInfo.orderGoodsCate" range-key="cate_name">
							<input type="text" disabled placeholder="请选择" :value="boxInfo.orderGoodsCate[index].cate_name">
							<image src="../../static/image/turn-right.png"></image>
						</picker>
					</view>
					
					<view class="h5">选择盒子</view>
					<!-- <select-lay 
						:value="tval" 
						name="name" 
						:options="datalist" 
						@selectitem="selectitem"
					/> -->
					<template>
						<!-- 下拉 input 框 -->
						<view class="selector-input" @click="SVShow = !SVShow">{{ compCheckedBox.length ? compCheckedBox.join() : '请选择' }}</view>
						<scroll-view v-show="SVShow" :scroll-y="true" class="scroll-view">
						  <template>
						    <!-- <view
									class="sv-item"
						      v-for="(item, index) in cateBoxes"
						      :key="index"
						    >
						      {{ item.goods_name }}
						    </view> -->
											<checkbox-group @change="checkboxChange">
												<label class="uni-list-cell uni-list-cell-pd" v-for="item in cateBoxes" :key="item.goods_id">
													<view>
														<checkbox color="#cba868" :value="`${item.goods_name}-${item.order_goods_id}`" :checked="item.checked" style="transform: scale(0.7);" />
													</view>
													<view>{{item.goods_name}}</view>
												</label>
											</checkbox-group>
						  </template>
						</scroll-view>
					</template>
					<button class="btn" form-type="submit" style="margin-top: 30rpx;" @click="confirm">确认</button>
				</form>
			</view>
		</van-popup>
		
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				SVShow: false,
				barConfig: {
					title:'申请领取盒子',
					hasRetun:true,
					isCenter:true,
				},
				show: false,
				//模拟数据列表
				index:null,
				
				datalist:[],
				//模拟初始数据
				tval: [],
				
				boxInfo: {},
				cateBoxes: [], // 传了分类id之后的盒子列表
				checkedBox: {}, // 选中的分类盒子
				cateNameList: {}, //维护一个分类名字列表, key 和checkedBox 的 key 对应
				boxNumber: {}, // 每个分类 不同盒子的数量  { key: [] }
				
				pickerValue: '',
				phone: '',
				consignee: '',
				detail_addr: '',
				remark: '',
			}
		},
		computed: {
			compCheckedBox() {
				return Object.values(this.checkedBox).flat(2).map(item => this.delId(item)) || []
			}
		},
		onLoad() {
			this.$api('/bus-order-show').then(({data}) => {
				this.boxInfo = data
			})
		},
		methods: {
			delBox(key, index) {
				
			},
			onInput(e, key) {
				this[key] = e.detail
			},
			addrInput(e) {
				this.detail_addr = e.detail
			},
			remarkInput(e) {
				this.remark = e.detail
			},
			submit() {
				let order_goods = []
				console.log(this.boxInfo, this.boxNumber, this.cateNameList, this.checkedBox, '--0');
				for (let key in this.checkedBox) {
					this.checkedBox[key].forEach((item, index) => {
						order_goods.push({ id: this.delId(item, true), number: this.boxNumber[key][index] })
					})
				}
				console.log(order_goods, 'order_goods---------');
				return
				const formData = {
					store_name: this.boxInfo.company,
					order_goods: order_goods,
					consignee: this.consignee,
					phone: this.phone,
					province: this.pickerValue[0],
					city: this.pickerValue[1],
					county: this.pickerValue[2],
					detail_addr: this.detail_addr,
					remark: this.remark
				}
				
				this.$api('/bus-create-order', formData).then((data) => {
					if (data.code == 405) {
						return uni.redirectTo({ url: '/pages/tip/tip?isError=1' })
					}
					uni.redirectTo({ url: '/pages/tip/tip?isError=0' })
				})
			},
			inputChange(e, key, index) {
				if (this.boxNumber[key] === undefined) {
					this.$set(this.boxNumber, key, [])
				}
				this.boxNumber[key][index] = e.detail.value
			},
			delId(str, isKey) {
				const res = str.split('-')
				return isKey ? res[1] : res[0]
			},
			confirm() {
				this.show = false
			},
			checkboxChange(e) {
				const checkeds = e.detail.value
				this.$set(this.checkedBox, this.index, checkeds)
			},
			getCateboxes(cate_id) {
				this.$api('/search-goods-by-cate', { cate_id }).then(({data}) => {
					this.cateBoxes = data.map(item => {
						// 如果之前已经有选中，则保持选中
						this.checkedBox[this.index]?.includes(item.goods_name+ `-${item.order_goods_id}`) && (item.checked = true)
						return item
					})
				})
			},
			bindPickerChange(e){
				let index = e.detail.value
				this.index = index;
				
				this.cateNameList[index] = this.boxInfo.orderGoodsCate[index].cate_name
				
				this.getCateboxes(this.boxInfo.orderGoodsCate[index].cate_id)
				this.datalist = this.cateBoxes
			},
			pickerCityChange(e) {
				console.log(e, 'aaaaaaaaaaa');
				this.pickerValue = e.detail.value
			},
			formSubmit(e) {
				console.log(e, '1111111111')
			},
			showChoose(){
				this.show = true;
			},
			onClose(){
				this.show = false;
			},
			// change(item,value) {
			// 	console.log(item,value);
			// 	this.tval = value;
			// }
		}
	}
</script>

<style>
	page{background-color:#f9f9f9;}
</style>
<style scoped lang="less">
	.uni-list-cell {
		justify-content: flex-start;
		display: flex;
		align-items: center;
	}
	.sv-item {
		margin: 10rpx 0;
	}
	.selector-input {
		min-height: 68rpx;
		border: 1px solid #e2e2e2;
		display: flex;
		align-items: center;
		padding: 0 30px 0 10px;
	}
	.scroll-view {
		border: 1px solid #e2e2e2;
		margin: 14rpx 0;
		height: 200rpx;
		padding: 10rpx;
		box-sizing: border-box;
	}
	/deep/ .v-group{padding: 11rpx 0;
		display: block;
		.van-field__label{color: #111;}
		.van-field__control{text-align: right;}
		.value{color: #323233;}
		.vfield-line{
			.van-cell{padding-right: 22px;padding-top: 0;}
		}
		.vcell-msg{
			.van-cell{display: block;
				.van-field__control{text-align: left;height: 34px;margin-top: 8rpx;}
			}
		}
		.vcell-msg-warp{padding-bottom: 40rpx;background-color: #fff;}
		.vcell-code-warp{
			.van-field__control{text-align: left;}
			.van-field__icon-container{
				image{width: 154rpx;height: 64rpx;display: block;}
			}
		}
		.van-cell__value{
			image{width: 30rpx;height: 30rpx;}
		}
		.van-radio-group--horizontal{
			justify-content: flex-end;
		}
		.h{
			.van-cell__value{color:#111111;}
		}
		.boxChoose{
			text,image{display: inline-block;vertical-align: middle;}
			.right-icon{
				image{width: 15rpx;height: 25rpx;margin-left: 14rpx;}
			} 
		}
	}
	
	.lists{background-color: #fff;position: relative;padding: 0 16px;
		.listcon{
			border-bottom: 1rpx solid #ebedf0;padding-bottom: 10rpx;
		}
		.list{font-size: 28rpx;padding: 15rpx 0;
			display: flex;align-items: center;
			&>view{flex-basis: 60%;color: #111111;}
			input{width:162rpx;
				height:54rpx;
				background-color:#ffffff;
				border:1rpx solid #b5b5b5;
				border-radius:10rpx;
				text-align: center;
				flex-basis: 25%;display: inline-block;
			}
			.close{flex-basis: 15%;text-align: right;
				image{width: 30rpx;height: 30rpx;}
			}
		}
	}
	
	.choosepop{padding: 40rpx 30rpx;box-sizing: border-box;
		.h{font-weight:700;color:#111111;font-size:34rpx;line-height:36rpx;
		margin-bottom: 30rpx;
		}
		.sign{font-size:26rpx;color:#999999;min-height: 100rpx;
			text{color:#111;}
		}
		.picker{position: relative;
			height:68rpx;line-height: 68rpx;
			background-color:#ffffff;
			border:1rpx solid #e2e2e2;
			picker{height: 100%;}
			input{width: 100%;height:68rpx;line-height: 68rpx;padding: 0 30px 0 10px;box-sizing: border-box;}
			image{width: 15rpx;height: 25rpx;position: absolute;right: 16rpx;top: 22rpx;}
		}
		.h5{color:#111111;font-size:30rpx;margin: 40rpx 0 20rpx;}
	}

	
</style>
