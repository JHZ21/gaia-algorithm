// bind

Function.prototype.bind = function(context, ...args) {
	if(typeof this !== 'function') {
		throw new Error('Function.prototype.bind - what is trying to be bound is not callable')
	}
	const func = this
	let fBound = function () {
		func.apply(this instanceof func? this: context, args.concat(Array.prototype.slice(arguments)))
	}
	let fNOP = function() {}
	fNOP.prototype = this.prototype
	fBound.prototype =  new fNOP()
	return fBound
}
Function.prototype.call = function(context, ...args) {
	const fn = Symbol('fn')
	context[fn] = this
	const result = eval('context.fn(...args)')
	delete context[fn]
	return result
}

Function.prototype.bind2 = function(context, ...args) {
  let func = this
  let bindFn = function(...args2) {
    return func.apply(this instanceof func? this : context, ...args, ...args2)
  }
  bindFn.prototype = Object.create(func.prototype)
  return bindFn
}