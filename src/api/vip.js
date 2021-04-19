import request from '../utils/request'

export const getVipDiscount = function () {
  return request({
    url: 'vip'
  })
}
