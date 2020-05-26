// deepClone 深拷贝

function shallowClone(target) {
	if(typeof target === 'object' && target !== null) {
		const cloneTarget = Array.isArray(target)? [] : {}
		for(let prop in target) {
			if(target.hasOwnProperty(prop)) {
				cloneTarget[prop] = target[prop]
			}
		}
		return cloneTarget
	} else {
		return target
	}
}

// deepClone 2

const isObject = (target) => (typeof target === 'object' || typeof target === 'function') && target !== null

const deepClone = (target, map = new WeakMap()) => {
	if(map.get(target)) 
		return target

	if (isObject(target)) {
		map.set(target, true)
		const cloneTarget = Array.isArray(target) ? []: {}
		for (let prop in target) {
			if (target.hasOwnProperty(prop)) {
				cloneTarget[prop] = deepClone(target[prop], map)
			}
		}
		return cloneTarget
	} else {
		return target
	}
}
const a = {val:2}
a.target = a
let newA = deepClone(a, new WeakMap())
console.log(newA)

// deepClone 3

const getType = (data) => { // 获取数据类型
	const baseType = Object.prototype.toString.call(data).replace(/^\[object\s(.+)\]$/g, '$1').toLowerCase();
    const type = data instanceof Element ? 'element' : baseType;
    return type;
};
const isPrimitive = (data) => { // 判断是否是基本数据类型
    const primitiveType = 'undefined,null,boolean,string,symbol,number,bigint,map,set,weakmap,weakset'.split(','); // 其实还有很多类型
    return primitiveType.includes(getType(data));
};
const isObject = data => (getType(data) === 'object');
const isArray = data => (getType(data) === 'array');
const deepClone = data => {
    let cache = {}; // 缓存值，防止循环引用
    const baseClone = _data => {
        let res;
        if (isPrimitive(_data)) {
            return data;
        } else if (isObject(_data)) {
            res = { ..._data }
        } else if (isArray(_data)) {
            res = [..._data]
        };
        // 判断是否有复杂类型的数据，有就递归
        Reflect.ownKeys(res).forEach(key => {
            if (res[key] && getType(res[key]) === 'object') {
                // 用cache来记录已经被复制过的引用地址。用来解决循环引用的问题
                if (cache[res[key]]) {
                    res[key] = cache[res[key]];
                } else {
                    cache[res[key]] = res[key];
                    res[key] = baseClone(res[key]);
                };
            };
        });
        return res;
    };
	return baseClone(data);
};
