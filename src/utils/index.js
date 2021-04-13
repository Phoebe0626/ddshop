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

export const formatTime = function (date) {
  const hour = date.getHours() >= 10 ? date.getHours() : '0' + date.getHours()
  const min = date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes()
  return `${hour}:${min}`
}

/**
 * 将传入的日期转换为送达时间的开始值
 * @param {*} date 传入的日期
 * @returns 开始的hour和minutes
 */
export const formatStartTime = function (date) {
  let hour = date.getHours()
  let min = date.getMinutes()
  if (min + 15 >= 30 && min + 5 <= 60) {
    // 如果现在的时间在15分以后35分以前，那么最快送达时间应在30分后
    min = 30
  } else if (min + 5 >= 60) {
    // 如果现在的时间在35分以后，那么最快送达时间应该在下一个小时0分后
    hour++
    min = 0
  } else {
    // 如果现在的时间在15分以前，那么最快送达时间应该在当前0分-30分
    min = 0
  }
  return { hour, min }
}

export const formatMin = function (hour, min) {
  if (min >= 60) {
    hour += parseInt(min / 60)
    min = min - parseInt(min / 60) * 60
    return { hour, min }
  } else {
    return { hour, min }
  }
}

export const createTimeArr = function (startTime) {
  const arr = []
  if (startTime.min === 0) {
    arr.length = (23 - startTime.hour) * 2
  } else {
    arr.length = (23 - startTime.hour) * 2 - 1
  }
  for (let i = 0; i < arr.length; i++) {
    if (i === 0) {
      arr[i] = []
      arr[i][0] = startTime
      arr[i][1] = formatMin(startTime.hour, startTime.min + 30)
    } else {
      arr[i] = []
      arr[i][0] = arr[i - 1][1]
      arr[i][1] = formatMin(startTime.hour, startTime.min + 30 * (i + 1))
    }
  }
  return arr
}
