// 防抖和节流的区别：防抖是将多次执行变为最后一次执行，节流是将多次执行变为每隔一段时间执行

// 函数防抖：解决频繁刷新
export function refreshDebounce(func, delay) {
  let timer = null;
  return (...args) => {
    if (timer) clearInterval(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

/**
 * 函数防抖：防止重复提交
 * @param func 执行函数
 * @param wait 间隔时间
 * @param immediate 立即执行
 */
export const submitDebounce = (fn, wait, immediate) => {
  let timer;
  return function () {
    if (timer) clearTimeout(timer);
    if (immediate) {
      // 如果已经执行过，不再执行
      var callNow = !timer;
      timer = setTimeout(() => {
        timer = null;
      }, wait);
      if (callNow) {
        fn.apply(this, arguments);
      }
    } else {
      timer = setTimeout(() => {
        fn.apply(this, arguments);
      }, wait);
    }
  };
};

/**
 * 函数节流
 * @param func 执行函数
 * @param wait 间隔时间
 * @param options 立即执行
 * @param options.leading false 禁用第一次执行
 * @param options.trailing false 禁用停止触发的回调
 */
export const setThrottle = (fn, wait, options = {}) => {
  let timer;
  let previous = 0;
  let throttled = function () {
    let now = +new Date();
    // remaining 不触发下一次函数的剩余时间
    if (!previous && options.leading === false) previous = now;
    let remaining = wait - (now - previous);
    if (remaining < 0) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      previous = now;
      fn.apply(this, arguments);
    } else if (!timer && options.trailing !== false) {
      timer = setTimeout(() => {
        previous = options.leading === false ? 0 : new Date().getTime();
        timer = null;
        fn.apply(this, arguments);
      }, remaining);
    }
  };
  return throttled;
};
