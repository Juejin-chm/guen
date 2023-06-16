/**
 * @param {String} name 要获取的参数属性
 * @param {String} fullPath 完整链接 
 */
export function getParameter(name, fullPath) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
		const str = fullPath.split('?')[1]
		if (!str) {
			return console.error('fullPath 的查询参数为空！')
		}
    var r = str.match(reg);
    if (r != null) {
			return (r[2]);
		}
		return null;
}