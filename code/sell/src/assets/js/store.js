/** 新增&&修改本地缓存
 *  @param string id 唯一id
 *  @param string key 标示
 *  @param string val 新增&修改的值
 */
export function saveToLocal(id,key,val){
	let seller = window.localStorage.__seller__;
	if(!seller){
		seller = {};
		seller[id] = {};
	}else{
		seller = JSON.parse(seller);
		if(!seller[id]){
			seller[id] = {};
		}
	}
	seller[id][key] = val;
	window.localStorage.__seller__ = JSON.stringify(seller);
}

/** 查询本地缓存
 *  @param string id 唯一id
 *  @param string key 标示
 *  @param string def 如果查询不到显示的值  例如：false
 */
export function loadFromLocal (id,key,def){
	let seller = window.localStorage.__seller__;
	
	if(!seller){
		return def;
	}
	seller = JSON.parse(seller)[id];
	if(!seller){
		return def;
	}
	let ret = seller[key];
	return ret || def;
} 