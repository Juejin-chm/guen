<template>
	<view class="hasbtnpad">
		<BarBg :bgtype='0'></BarBg>
		<CustomBar :barConfig='barConfig'></CustomBar>
		
		<van-cell-group inset class="v-group" :border='false'>
			<van-cell class='h' title="门店" value="XXXXXX门店名称"/>
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
						<template v-for="item in list">
							<view class="list" v-for="(subit,subin) in item.child" :key='item.value' >
								<view>
									<text :style="{'opacity':subin==0?'1':'0'}">{{item.label}}：</text>
									<text>{{subit.label}}</text>
								</view>
								<input type="number" placeholder="填写数量">
								<view class="close">
									<image src="../../static/image/close.png" mode=""></image>
								</view>
							</view>
						</template>
					</view>
				</view>
			</view>
			
			<van-field label="收货人" placeholder="请输入"  />
			<van-field label="联系电话" placeholder="请输入" />
			<van-cell title="收货地址" is-link :border='false'>
				<picker mode='region' @change="bindPickerChange">
					<view :class="pickerValue?'value':''">{{pickerValue?pickerValue:'请选择省/市/区'}}</view>
				</picker>
			</van-cell>
			<van-field class="vfield-line" :border='false' placeholder="请输入详细地址" />
		</van-cell-group>
		
		<van-cell-group inset class="v-group" :border='false'>
			<view class="vcell-msg-warp">
				<van-field label="申请原因" type="textarea" class="vcell-msg" placeholder="请输入..." ></van-field>
			</view>
		</van-cell-group>
		
		<view class="fixedbtn">
			<view class="envpad">
				<button class="btn" form-type="submit">提交</button>
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
					<view class="sign">已选：<text>500方盒；650方盒；320正方盒</text></view>
					<view class="h5">选择系列</view>
					<view class="picker">
						<picker @change="bindPickerChange" :value="index" :range="list" range-key="label">
							<input type="text" disabled placeholder="请选择" :value="list[index].label">
							<image src="../../static/image/turn-right.png"></image>
						</picker>
					</view>
					
					<view class="h5">选择系列</view>
					<select-lay 
						:value="tval" 
						name="name" 
						:options="datalist" 
						@selectitem="selectitem"
						>
					</select-lay>
					<button class="btn" form-type="submit" style="margin-top: 30rpx;">确认</button>
				</form>
			</view>
		</van-popup>
		
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				barConfig: {
					title:'申请领取盒子',
					hasRetun:true,
					isCenter:true,
				},
				show: false,
				//模拟数据列表
				index:null,
				list: [{
					id:1,
					label: '方盒系列',
					child:[{
							label: '500方盒',
							value: '500方盒'
						},{
							label: '650方盒',
							value: '650方盒'
						}
					]},
				{	
					id:2,
					label: '正方盒系列',
					child:[
						{
							label: '320正方盒',
							value: '320正方盒'
						},{
							label: '650正方盒',
							value: '650正方盒'
						}
					]
				}],
				datalist:[],
				//模拟初始数据
				tval: []
			}
		},
		methods: {
			bindPickerChange(e){
				let index = e.detail.value
				this.index = index;
				this.datalist = this.list[index].child;
			},
			formSubmit(e) {
				console.log(e)
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
