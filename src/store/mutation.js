import { setLocalStore } from '../utils/storage'

export default {
  // 更新个人信息
  updateUserInfo (state, userInfo) {
    state.userInfo = userInfo // 更新 state
    setLocalStore('user-info', userInfo) // 将个人信息同步到本地
  },
  // 更新用户生日
  updateUserBirth (state, birthday) {
    state.userBirth = birthday
    setLocalStore('user-birth', birthday)
  }
}
