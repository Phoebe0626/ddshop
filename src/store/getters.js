export default {
  userInfo: state => { return state.userInfo },
  userName: state => { return state.userInfo.user_name },
  userSex: state => { return state.userInfo.sex },
  userBirth: state => { return state.userBirth },
  userPhone: state => { return state.userInfo.phone },
  token: state => { return state.userInfo.token },
  userAddress: state => { return state.userAddress }
}
