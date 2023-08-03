
const defauls = {
	method: "POST"
}
const baseUrl = 'https://guenxiamen.com/api'

function hideLoading(msg, loading) {
	loading && uni.hideLoading();
	setTimeout(() => {
		uni.showToast({
			icon:"none",
			title: msg,
			duration: 3000
		})
	}, 50)
	
}

// 全局请求封装
export default function (path, data = {}, loading = true) {
	const token = uni.getStorageSync("access_token");
	const Authorization = token || "";

	if (loading) {
		uni.showLoading({
			title: "加载中",
			mask: true
		});
	};
	return new Promise((resolve, reject) => {
		data = JSON.stringify(data)
		uni.request({
			header: {
				Authorization,
				'Content-Type': 'application/json'
			},
			url: baseUrl + path,
			method: 'post',
			data,
			success(response) {
				const { code, msg } = response.data
				if (code == 401) {
					// hideLoading()
					uni.showModal({
						title: '提示',
						content: `您还未登录，是否去登录？`,
						success: function (res) {
							if (res.confirm) {
								console.log('用户点击确定');
								uni.switchTab({
									url:'/pages/my/my'
								})
							} else if (res.cancel) {
								uni.navigateBack()
							}
						}
					})
					return reject('请先登录')
				}
				if (code == 400) {
					hideLoading(msg, loading)
					return reject('code: ' + code + ',' + msg)
				}
				if (code != 200) {
					hideLoading(msg, loading)
					return reject('code: ' + code)
				}
				resolve(response.data);
			},
			fail(err) {
				uni.showToast({
					icon: "none",
					title: '服务响应失败'
				});
				console.error(err);
				reject(err);
			},
			complete() {
				loading && uni.hideLoading();
			}
		});
	});
};

