
const defauls = {
	method: "POST",
	loading: true
}
const baseUrl = 'http://guen_czd.juejinvr.cn:8089/api'
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
		data = JSON.parse(JSON.stringify(data))
		uni.request({
			header: {
				Authorization,
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			url: baseUrl + path,
			method: config.method,
			data,
			success(response) {
				const { code, msg } = response.data
				if (code == 401) {
					console.log('请先登录。。。')
					reject()
				}
				if (code == 400) {
					uni.showToast({
						icon:"error",
						title: msg
					})
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

