// 公用方法

/**
 * 函数节流
 * @param {*} fn 延迟执行的函数
 * @param {*} delay 延迟的时间
 * @returns
 */
export const throttle = function (fn, delay) {
  let run = true
  return function () {
    const context = this
    const args = arguments

    if (!run) {
      return
    }
    run = false
    setTimeout(() => {
      fn.apply(context, args)
      run = true
    }, delay)
  }
}
