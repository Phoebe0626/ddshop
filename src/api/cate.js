import request from '../utils/request'

export const getCate = function () {
  return request({
    url: 'homeApi/categories'
  })
}

export const getCateDetail = function (params) {
  return request({
    url: 'homeApi/categoriesdetail/' + params
  })
}
