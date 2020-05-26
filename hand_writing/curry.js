function curry(fn) {
  if (typeof fn  !== 'function') {
    throw Error('No function provided')
  }
  return function curriedFn(...args) {
 
    if(args.length < fn.length) {
      return function(...args2) {
        return curriedFn(...args, ...args2)
      }
    } else {
      return fn(...args)
    }
  }
}

// test code
function add(a,b,c,d) {
  console.log('res: ', a+b+c+d)
}
let f1 = curry(add)
let f2 = f1(1,2)
let f3 = f2(3,4)