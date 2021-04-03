<template>
  <div class="user-center">
    <!-- 导航栏 -->
    <van-nav-bar
      title="个人资料"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 个人资料 -->
    <van-cell-group style="margin-top: 0.2rem">
      <van-cell is-link title="昵称" :value="userName" to="/dashboard/my/userCenter/changeName"></van-cell>
      <van-cell is-link title="性别" :value="sex"></van-cell>
      <van-cell is-link title="生日" :value="userBirth ? userBirth : '未填写'"></van-cell>
      <van-cell title="手机号" :value="userPhone.substr(0, 3) + '****' + userPhone.substr(7)"></van-cell>
    </van-cell-group>
    <!-- 退出登录 -->
    <van-button size="large" style="margin-top: 0.4rem" type="default" block>退出登录</van-button>
    <router-view></router-view>
  </div>
</template>

<script>
import { NavBar, Cell, CellGroup, Button } from 'vant'
import { mapGetters } from 'vuex'
export default {
  components: {
    [Button.name]: Button,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [NavBar.name]: NavBar
  },
  computed: {
    ...mapGetters(['userName', 'userSex', 'userBirth', 'userPhone']),
    sex () {
      const sex = this.userSex
      if (sex === 1) {
        return '美女'
      } else if (sex === 2) {
        return '帅哥'
      } else {
        return '未填写'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.user-center {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  background-color: #f5f5f5;
}
</style>
