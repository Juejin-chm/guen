<template>
	<view class="hasbtnpad">
		<BarBg :bgtype='0'></BarBg>
		<CustomBar :barConfig='barConfig'></CustomBar>
		
		<form @submit="submit">
			<van-cell-group inset class="v-group" :border='false'>
				<van-field label="姓名" placeholder="请输入" @change="(e) => formData.name = e.detail" />
				<van-field label="联系电话" placeholder="请输入" maxlength="11" @change="(e) => formData.mobile = e.detail" />
				<van-field label="门店名称" placeholder="请输入" v-if="type==0" @change="(e) => formData.bus_store_name = e.detail" />
				
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
					<van-field v-show="radio == '0'" class="vfield-line" placeholder="请输入上级推广码" @change="(e) => formData.ds_top_code = e.detail" :disabled="radio === '1'" />
				</template>
				
				<template v-if="type!=2">
					<van-cell :title="type===1?'推广地址':'门店地址'" is-link :border='false'>
						<picker mode='region' @change="bindPickerChange">
							<view :class="pickerValue?'value':''">{{pickerValue?pickerValue:'请选择省/市/区'}}</view>
						</picker>
					</van-cell>
					<van-field class="vfield-line" :border='false' placeholder="请输入详细地址" @change="(e) => formData.detail_addr = e.detail" />
				</template>
				
				<van-field label="公司名称" placeholder="请输入" v-if="type==2" @change="(e) => formData.ggz_company = e.detail"/>
			</van-cell-group>
			
			<template v-if="type!=2">
				<van-cell-group inset class="v-group" :border='false'>
					<van-field label="身份证号" placeholder="请输入" v-if="type==1" @change="(e) => formData.ds_identity_code = e.detail"/>
					<van-cell :title="type===1?'上传身份证':'上传营业执照及卫生许可证'"></van-cell>
					<view class="upimgul">
						<view class="upimgli" @tap="upfiles(1)">
							<image slot :src="src1 || '../../static/image/upimg.png'" mode="aspectFit"></image>
						</view>
						<view class="upimgli" @tap="upfiles(2)">
							<image slot :src="src2 || '../../static/image/upimg.png'" mode="aspectFit"></image>
						</view>
					</view>
				</van-cell-group>
			</template>
			
			<van-cell-group inset class="v-group" :border='false'>
				<view class="vcell-msg-warp">
					<van-field label="留言备注" type="textarea" class="vcell-msg" placeholder="请输入..." @change="(e) => formData.remark = e.detail" ></van-field>
				</view>
			</van-cell-group>
			
			<van-cell-group inset class="v-group" :border='false'>
				<view class="vcell-code-warp">
					<van-field placeholder="请输入验证码" :border='false' @change="(e) => formData.code = e.detail">
						<view slot='right-icon'>
							<image :src="codeImg" @click="getCode()"></image>
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
				codeImg: '', // 验证码
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
				isParnet: 0,
				scrollTimer : null,
				formData: {
					role_type: '',
					
					name: '',
					mobile: '',
					code: '',
					bus_store_name: '',
					bus_license: '',
					bus_hygiene_license: '',
					province: '',
					city: '',
					county:'',
					detail_addr: '',
					remark: '',
					
					ds_is_topds_is_top: '', // 推广大使_是否有上级
					ds_top_code: '',  // 推广大使_推广码 需判断有上级时必填
					ds_identity_code: '', // 推广大使_身份证号
					ds_identity_pic_positive: '', // 推广大使_身份证正面照片
					ds_identity_pic_negative: '', // 推广大使_身份证反面照片
					
					ggz_company: '', // 广告主_公司名称
				}
			}
		},
		
		onLoad(options) {
			this.type = parseInt(options.type);
			this.isParnet = parseInt(options.isParnet)
			console.log(this.isParnet, '888', options);
			this.barConfig.title=options.title;
			
			this.getCode()
		},
		methods: {
			getCode() {
				this.$api('/get-code').then(({data}) => {
					this.codeImg = data
				})
			},
			onChange(e, key) {
				this.formData[key] = e.detail
			},
			submit(e){
				if (this.type === 0) {
					this.formData.bus_license = this.src1
					this.formData.bus_hygiene_license = this.src2
				}
				if (this.type === 1) {
					this.formData.ds_is_topds_is_top = this.radio === '0'
					if (this.formData.ds_is_topds_is_top) {
						if (!this.formData.ds_top_code) {
							return uni.showToast({
								icon: 'none',
								title: '上级推广码不能为空'
							})
						}
					}
					this.formData.ds_identity_pic_positive = this.src1
					this.formData.ds_identity_pic_negative = this.src2
				}
				this.formData.role_type = this.type + 1
				if (this.isParnet == 1) {
					const { code, name, mobile, ggz_company, remark } = this.formData
					this.$api('/city-partner', {
						code,
						name,
						mobile,
						ggz_company,
						remark
					}, false).then(() => {
						uni.showToast({
							icon: 'none',
							title: '提交成功',
							duration: 2000,
							mask: true,
							success() {
								setTimeout(() => {
									uni.navigateBack()
								}, 2000)
							}
						})
					})
					return
				}
				this.$api('/join-us-form-submit', this.formData, false).then((data) => {
					uni.navigateTo({
						url:'../tip/tip?isError=0'
					})
				})
				return console.log(this.formData, this.radio, '1234')
				
			},
			bindPickerChange: function(e) {
				const [province, city, county] = e.detail.value
				
				this.formData.province = province
				this.formData.city = city
				this.formData.county = county
				
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
						uni.uploadFile({
							url: 'http://guen_czd.juejinvr.cn:8089/api/upload-img',
							filePath: res.tempFiles[0].tempFilePath,
							name: 'file',
							header: {
								Authorization: uni.getStorageSync('access_token')
							},
							formData: {
								file: res.tempFiles[0].tempFilePath
							},
							success: (res) => {
								this[`src${e}`] = JSON.parse(res.data).data.path
							}
						})
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
