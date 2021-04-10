import { removeLocalStore, setLocalStore, getLocalStore } from '../utils/storage'
import router from '../router'
import { Toast } from 'vant'
import Vue from 'vue'
Vue.use(Toast)

export default {
  // 添加到购物车
  addToCart (state, good) {
    if (!getLocalStore('user-info')) { // 判断用户是否登录
      Toast({
        message: '请先登录',
        duration: 800
      })
      router.push('/login')
      return
    }
    const flag = state.cart.some((item, index) => {
      if (item.id === good.id) { // 如果购物车中存在该商品，则数量加1
        state.cart[index].count++
        return true
      }
    })
    if (!flag) { // 如果不存在，将该商品加入购物车
      state.cart.push(good)
    }
    // 保存到本地
    setLocalStore('cart', state.cart)
  },
  // 更新个人信息
  updateUserInfo (state, userInfo) {
    state.userInfo = userInfo // 更新 state
    setLocalStore('user-info', userInfo) // 将个人信息同步到本地
  },
  // 更新用户生日
  setUserBirth (state, birthday) {
    state.userBirth = birthday
    setLocalStore('user-birth', birthday)
  },
  // 更新用户昵称
  setUserName (state, userName) {
    state.userInfo.user_name = userName
    setLocalStore('user-info', state.userInfo)
  },
  // 更新用户用户性别
  setUserSex (state, sex) {
    state.userInfo.sex = sex
    setLocalStore('user-info', state.userInfo)
  },
  // 退出登录
  logout (state) {
    state.userInfo = {}
    state.userBirth = ''
    state.userAddress = []
    removeLocalStore('user-info')
    removeLocalStore('user-birth')
    removeLocalStore('user-address')
  },
  // 新增和编辑地址
  addUserAddress (state, obj) {
    if (obj.address.isDefault) {
      // 只能存在一个默认地址
      state.userAddress.some(function (currentVal, index) {
        if (currentVal.isDefault && currentVal.id !== obj.address.id) { // 如果是同一个对象 不需要重新设置 isDefault
          state.userAddress[index].isDefault = false
        }
      })
    }

    if (obj.type === 'add') { // 新增地址
      state.userAddress.push(obj.address)
      console.log('add', state.userAddress)
    } else { // 编辑地址
      state.userAddress.forEach((item, i) => {
        if (item.id === obj.address.id) {
          state.userAddress[i] = obj.address // 找到原地址进行替换
        }
      })
    }
    setLocalStore('user-address', state.userAddress)
  },
  // 删除地址
  removeUserAddress (state, id) {
    state.userAddress.forEach((item, i) => {
      if (item.id === id) {
        state.userAddress.splice(i, 1)
      }
    })
    setLocalStore('user-address', state.userAddress)
  }
}
