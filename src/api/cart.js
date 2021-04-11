import request from '../utils/request'

export const getGuessYouLike = function () {
  return request({
    url: 'cart/youlike'
  })
}
