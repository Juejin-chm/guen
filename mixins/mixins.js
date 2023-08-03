import share from '@/tools/share.js'
export default {
	...share,
	methods:{
		callPhone(no) {
			uni.makePhoneCall({
				phoneNumber: no
			})
		},
	}
}