// throttle 节流

function throttle(func, wait) {
  let timeout = null
  return function (...args) {
    const context = this
    if (!timeout) {
      timeout = setTimeout(() => {
        timeout = null
        func.apply(context, args)
      }, wait)
    }
  }
}

// 首次可以立即执行

function throttle2(func, wait) {
  let pre = 0
  return function (...args) {
    const now = Date().now()
    if (now - pre >= wait) {
      pre = now
      func.apply(this, args)
    }
  }
}

// 首次立即执行，末次间隔内调用两次，会有效执行两次

// me 创作 
function throttle3(func, delay) {
  let context = this;
  let args = arguments;
  let nowTime = +new Date();

  if (!lastTime || nowTime > lastTime + delay) {
    //判断为第一次触发，立即函数立即生效
    lastTime = nowTime;
    func.apply(context, args);
  } else if (lastTime &&
    lastTime < nowTime &&
    nowTime < lastTime + delay) {
    //间隔取触发，使用相应时间的定时器，让函数在下个间隔时刻触发生效。并只触发一次定时器，
    // 无需清除定时器
    let time = lastTime + delay - nowTime; // 让定时器在下个间隔时刻生效
    lastTime = nowTime + time;  // 预判下次时间
    setTimeout(() => {
      func.apply(context, args);
    }, time);
  }
}

