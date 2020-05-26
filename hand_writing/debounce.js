// debounce 防抖

function debounce(func, wait) {
  let tiemout = null
  return function(...args) {
    const context = this
    tiemout && clearTimeout(tiemout)
    tiemout = setTimeout(()=> func.apply(context, args), wait)
  }
}

function debounce2(fn={}, wait=50, immediate) {
  let timer = null
  return function() {
    if(immediate) {
      fn.apply(this, arguments)
    }
    if(timer) {
      clearTimeout(timer)
      timer = null
    }
    timer = setTimeout(() => {
      fn.apply(this, arguments)
    }, wait);
  }
}