import request from '../utils/request'

// 今日菜单的菜单分类
export const getTodayMenuCategoryList = function () {
  return request({
    url: 'recipe/allScene'
  })
}

export const getTodayMenuDetail = function (params) {
  return request({
    url: 'recipe/menulist/' + params
  })
}
