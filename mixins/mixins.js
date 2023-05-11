export default {
	methods:{
		callPhone(no) {
			uni.makePhoneCall({
				phoneNumber: no
			})
		},
	}
}