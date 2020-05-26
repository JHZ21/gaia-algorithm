// new
function newFactory(ctor, ...args) {
	if(typeof newFactory !== 'function'){
		throw Error('newOperator function the first param must be a function')
	}
	const newObj = Object.create(ctor.prototype)
	const res = ctor.apply(newObj, args)
	const isObject = typeof res === 'object' && res !== null
	const isFunction = typeof res === 'function'
	return isObject || isFunction? res : newObj
}

function myNew(ctor, ...args) {
  if(typeof ctor !== 'function') {
    throw 'ctor need to be a function'
  }
  
  const obj = Object.create(ctor.prototype)
  const res = ctor.apply(obj, args)
  const isObject = typeof res === 'object' && res !== null
  const isFunction = typeof res
  return isObject || isObject ? res : obj
}

function new2(Fn) {
  var obj = {}
  var arg = Array.prototype.slice.call(arguments, 1)
  obj.__proto__ = Fn.prototype
  obj.__proto__.constructor = Fn
  Fn.apply(obj, arg)
  return obj
}