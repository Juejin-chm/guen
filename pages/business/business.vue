<template>
	<view class="hasbtnpad">
		<BarBg :bgtype='0'></BarBg>
		<CustomBar :barConfig='barConfig'></CustomBar>
		
		<form @submit="submit">
			<van-cell-group inset class="v-group" :border='false'>
				<van-field label="姓名" placeholder="请输入"  />
				<van-field label="联系电话" placeholder="请输入" />
				<van-field label="门店名称" placeholder="请输入" v-if="type==0" />
				
				<template v-if='type===1'>
					<van-cell title="是否有上级" :border='false'>
						<van-radio-group :value="radio" @change="onChange" direction="horizontal">
							<van-radio use-icon-slot :value="radio" name="0">
								<image slot="icon" :src=" radio === '0' ? icon.active : icon.normal " />是
							</van-radio>
							<van-radio use-icon-slot :value="radio" name="1">
								<image slot="icon" :src=" radio === '1' ? icon.active : icon.normal " />否
							</van-radio>
						</van-radio-group>
					</van-cell>
					<van-field class="vfield-line" placeholder="请输入上级推广码" />
				</template>
				
				<template v-if="type!=2">
					<van-cell :title="type===1?'推广地址':'门店地址'" is-link :border='false'>
						<picker mode='region' @change="bindPickerChange">
							<view :class="pickerValue?'value':''">{{pickerValue?pickerValue:'请选择省/市/区'}}</view>
						</picker>
					</van-cell>
					<van-field class="vfield-line" :border='false' placeholder="请输入详细地址" />
				</template>
				
				<van-field label="公司名称" placeholder="请输入" v-if="type==2"/>
			</van-cell-group>
			
			<template v-if='type!=2'>
				<van-cell-group inset class="v-group" :border='false'>
					<van-field label="身份证号" placeholder="请输入" v-if="type==1"/>
					<van-cell :title="type===1?'上传身份证':'上传营业执照及卫生许可证'"></van-cell>
					<view class="upimgul">
						<view class="upimgli" @tap="upfiles(1)">
							<image slot :src="src1?src1:'../../static/image/upimg.png'" mode="aspectFit"></image>
						</view>
						<view class="upimgli" @tap="upfiles(2)">
							<image slot :src="src2?src2:'../../static/image/upimg.png'" mode="aspectFit"></image>
						</view>
					</view>
				</van-cell-group>
			</template>
			
			<van-cell-group inset class="v-group" :border='false'>
				<view class="vcell-msg-warp">
					<van-field label="留言备注" type="textarea" class="vcell-msg" placeholder="请输入..." ></van-field>
				</view>
			</van-cell-group>
			
			<van-cell-group inset class="v-group" :border='false'>
				<view class="vcell-code-warp">
					<van-field placeholder="请输入验证码" :border='false'>
						<view slot='right-icon'>
							<image src="@/static/image/code.png"></image>
						</view>
					</van-field>
				</view>
			</van-cell-group>
			
			<view class="fixedbtn">
				<view class="envpad">
					<button class="btn" form-type="submit">提交</button>
				</view>
			</view>
		</form>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				barConfig: {
					title:'商家入驻',
					hasRetun:true,
					isCenter:true,
				},
				pickerValue: null,
				src1:'',
				src2:'',
				radio: '0',
				icon: {
				    normal: '../../static/image/icon-normal.png',
				    active: '../../static/image/icon-active.png',
				},
				type:0,
				scrollTimer : null
			}
		},
		onLoad(options) {
			this.type = parseInt(options.type);
			this.barConfig.title=options.title;
		},
		methods: {
			submit(e){
				uni.navigateTo({
					url:'../tip/tip?isError=0'
				})
			},
			bindPickerChange: function(e) {
				this.pickerValue = e.detail.value.join('');
			},
			upfiles(e){
				uni.chooseMedia({
				  count: 1,
				  mediaType: ['image'],
				  sourceType: ['album', 'camera'],
				  camera: 'back',
				  success:(res)=>{
					this[`src${e}`] = res.tempFiles[0].tempFilePath;
				  }
				})
			},
			onChange(e){
				this.radio = e.detail;
			},
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
	}
</style>
