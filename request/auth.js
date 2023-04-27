import $api from './index.js'
export function login () {
	return new Promise((resolve, rej) => {
		const name = uni.getStorageSync('nickname')
		const avatar = uni.getStorageSync('avatarUrl')
		const phone = uni.getStorageSync('phone')
		if (!name) {
			uni.showToast({
				icon: 'none',
				title: '请先填写昵称'
			})
		}
		if (!avatar) {
			uni.showToast({
				icon: 'none',
				title: '请选择头像'
			})
		}
		wx.login({
			success: (res) => {
				if (name && avatar && phone) {
					$api('/auth-login',{
						name,
						avatar,
						phone,
						code: res.code
					}).then(({data}) => {
						resolve({
							niackname: name,
							avatarUrl: avatar,
							phone: phone
						})
						const access_token = data.access_token
						uni.setStorageSync('access_token', access_token)
					})
				}
			}
		})
	})
}