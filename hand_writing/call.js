// call

Function.prototype.call = function(context, args) {
	const fn = Symbol('fn')
	context[fn] = this
	const result = eval('context.fn(...args)')
	delete context[fn]
	return result
}