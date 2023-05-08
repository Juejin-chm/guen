
const defauls = {
	method: "POST",
	loading: true
}
const baseUrl = 'http://guen_czd.juejinvr.cn:8089/api'

function hideLoading(msg) {
	uni.hideLoading();
	uni.showToast({
		icon:"error",
		title: msg
	})
}

// 全局请求封装
export default function (path, data = {}, config = defauls) {

	const token = uni.getStorageSync("access_token");
	const Authorization = token || "";

	if (config.loading) {
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
			method: config.method,
			data,
			success(response) {
				const { code, msg } = response.data
				if (code == 401) {
					hideLoading('请先登录')
					reject('请先登录')
				}
				if (code == 400) {
					hideLoading(msg)
					reject()
				}
				if (code != 200) {
					hideLoading(msg)
					reject()
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
				uni.hideLoading();
			}
		});
	});
};

