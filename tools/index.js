/**
 * @param {String} name 要获取的参数属性
 * @param {String} fullPath 完整链接 
 */
export function getParameter(name, fullPath) {
    var reg = new RegExp("" + name + "=([^&]*)(&|$)","i");
		fullPath = fullPath.replace('scene=', '')
		fullPath = decodeURIComponent(fullPath)
	console.log(fullPath, 'path');	
		const str = fullPath?.split('?')[1]
		if (!str) {
			return console.error('fullPath 的查询参数为空！')
		}
    var r = str.match(reg);
		// return console.log(r, 1234);
    if (r != null) {
			return (r[1]);
		}
		return null;
		// const arr = str.split('=')
		// const order_id = arr[arr.length - 1]
		// return console.log(order_id);
		// return order_id
}