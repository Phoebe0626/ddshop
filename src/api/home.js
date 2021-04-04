import request from '../utils/request'

export const getHomeData = function () {
  return request({
    url: 'homeApi'
  })
}
