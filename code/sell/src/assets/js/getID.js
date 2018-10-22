/*
	获取ID
	@eg ?id=123456&a=b
	output {id="12345",a="b"}
*/
export function getID(){
	let obj = {};
	let param = window.location.search;
	//正则：匹配?或&一个字符，匹配非?或&的字符，+代表重复前一个表达式，=就是=，g代表全局匹配
	let reg = /[?&][^?&]+=[^?&]+/g;
	//match() 方法可在字符串内检索指定的值，或找到一个或多个正则表达式的匹配。
	let arr = param.match(reg);
	if(arr){
		arr.forEach(item => {
			//sbustring(1) 删除第一个字符
			let tem = item.substring(1).split('=');
			/*
				url可能不单单是数字或者单个字母，可能通过 encodeURIComponent() 进行加密
				所以要用 decodeURIComponent() 进行解密
				
			*/
			let key = decodeURIComponent(tem[0]);
			let value = decodeURIComponent(tem[1]);
			obj[key] = value;
		})
	}
	return obj;
}