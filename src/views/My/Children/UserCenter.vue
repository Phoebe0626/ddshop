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
      <van-cell is-link title="昵称" :value="userName" @click="$router.push('/dashboard/my/userCenter/changeName')"></van-cell>
      <van-cell is-link title="性别" :value="sex" @click="showSelectSex = true"></van-cell>
      <van-cell is-link title="生日" :value="userBirth | formatDate" @click="showSelectDate = true"></van-cell>
      <van-cell title="手机号" :value="userPhone.substr(0, 3) + '****' + userPhone.substr(7)"></van-cell>
    </van-cell-group>
    <!-- 退出登录 -->
    <van-button size="large" style="margin-top: 0.4rem" type="default" block @click="hLogout">退出登录</van-button>
    <!-- 选择性别 -->
    <van-action-sheet v-model="showSelectSex">
      <van-radio-group v-model="sexRadio">
        <van-cell-group style="margin: 1rem 0;">
          <van-cell title="美女" clickable @click="hSetUserSex(1)">
            <template #right-icon>
              <van-radio checked-color="#07c160" :name="1" />
            </template>
          </van-cell>
          <van-cell title="帅哥" clickable @click="hSetUserSex(2)">
            <template #right-icon>
              <van-radio checked-color="#07c160" :name="2" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-action-sheet>
    <!-- 生日弹框 -->
    <van-action-sheet v-model="showSelectDate">
      <van-datetime-picker
        v-model="date"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="hSetUserBirth"
        @cancel="showSelectDate = false"
      />
    </van-action-sheet>
    <transition name="slideUpDown" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { NavBar, Cell, CellGroup, Button, ActionSheet, RadioGroup, Radio, Toast, DatetimePicker } from 'vant'
import { mapGetters, mapMutations } from 'vuex'
export default {
  components: {
    [DatetimePicker.name]: DatetimePicker,
    [Toast.name]: Toast,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [ActionSheet.name]: ActionSheet,
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
  },
  data () {
    return {
      minDate: new Date('1960-01-01'), // 日期选择器范围
      maxDate: new Date('2020-01-01'),
      showSelectDate: false, // 选择生日弹框
      date: new Date('1995-01-01'), // 生日
      sexRadio: '', // 性别
      showSelectSex: false // 显示性别弹框
    }
  },
  created () {
    this.sexRadio = this.userSex // 获取用户性别
    this.date = this.userBirth ? this.userBirth : new Date('1995-01-01') // 获取用户生日
  },
  methods: {
    ...mapMutations(['setUserSex', 'setUserBirth', 'logout']),
    // 退出登录
    hLogout () {
      this.logout() // 清除用户信息
      // TODO: 完成未登录页面后 需要跳转到未登录UserCenter页面
      this.$router.push('/')
    },
    // 修改生日
    hSetUserBirth (val) {
      console.log(val)
      this.date = val
      this.setUserBirth(val)
      this.showSelectDate = false
      Toast({
        message: '保存成功',
        duration: 800
      })
    },
    // 修改性别
    hSetUserSex (sex) {
      this.sexRadio = sex
      this.setUserSex(sex)
      this.showSelectSex = false
      Toast({
        message: '保存成功',
        duration: 800
      })
    }
  },
  filters: {
    // 返回 yyyy-mm-dd 格式的日期
    formatDate (time) {
      if (!time) {
        return '未填写'
      }
      const date = new Date(time)
      const y = date.getFullYear()
      const m = addZero(date.getMonth() + 1)
      const d = addZero(date.getDate())
      function addZero (val) {
        return val < 10 ? '0' + val : val
      }
      return y + '-' + m + '-' + d
    }
  }
}
</script>

<style lang="less" scoped>
.slideUpDown-leave-active,
.slideUpDown-enter-active {
  transition: all 0.3s;
}
.slideUpDown-leave-active,
.slideUpDown-enter {
  transform: translateY(100%);
}
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
