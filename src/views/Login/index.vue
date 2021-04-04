<template>
  <div class="login-container">
    <div class="form-wrap">
      <van-icon class="cancel-btn" name="close" @click="$router.back()"/>
      <van-tabs background="rgba(255, 255, 255m .8)" animated v-model="active">
        <van-tab title="登录" name="login">
          <!-- 登录表单 -->
          <van-form ref="form">
            <van-field
              v-model="mobile"
              maxlength="11"
              clearable
              name="手机号"
              label="手机号"
              placeholder="请输入手机号"
            />
            <van-field
              v-model="code"
              name="验证码"
              label="验证码"
              clearable
              placeholder="验证码"
            >
              <!-- 按钮 - 发送验证码 -->
              <van-button
                v-if="showSendBtn"
                slot="button"
                type="primary"
                size="mini"
                :disabled="codeDisabled"
                @click="hSendCode"
              >发送验证码</van-button>
              <!-- 按钮 - 已发送 -->
              <van-button
                v-else
                slot="button"
                type="primary"
                size="small"
                disabled
              >已发送{{countdown}}s</van-button>
            </van-field>
            <div style="margin: 16px;">
              <van-button round block type="info" @click="hLogin">登录</van-button>
            </div>
          </van-form>
        </van-tab>
        <!-- 注册 -->
        <van-tab title="注册" name="register">
          <van-form ref="form">
            <van-field
              v-model="register_mobile"
              maxlength="11"
              clearable
              name="手机号"
              label="手机号"
              placeholder="请输入手机号"
            />
            <van-field
              v-model="register_pwd"
              name="密码"
              label="密码"
              clearable
              placeholder="请输入密码"
            />
            <div style="margin: 19px 16px 18px;">
              <van-button round block type="info" @click="hRegister">注册</van-button>
            </div>
          </van-form>
        </van-tab>
    </van-tabs>
    <!-- 分割线 -->
      <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">其他登录方式</van-divider>
      <!-- 微信 QQ 登录 -->
      <div class="svg-wrap">
        <div class="svg-item" @click="hOtherLogin('wechat')">
          <svg-icon iconClass="wechat"></svg-icon>
          <span class="svg-txt">微信登录</span>
        </div>
        <div class="svg-item" @click="hOtherLogin('QQ')">
          <svg-icon iconClass="QQ"></svg-icon>
          <span class="svg-txt">QQ登录</span>
        </div>
      </div>
      <!-- 提示 -->
      <p class="agreement">
        温馨提示：
        <br>
        未注册的手机号，登录时将自动注册，且代表同意<a href="#">用户协议</a>、<a href="#">隐私策略</a>
      </p>
    </div>
  </div>
</template>

<script>
import { Tab, Tabs, Form, Button, Field, Dialog, Toast, Divider, Icon } from 'vant'
import { getCode, login } from '@/api/login.js'
import { mapMutations } from 'vuex'
export default {
  components: {
    [Icon.name]: Icon,
    [Divider.name]: Divider,
    [Toast.name]: Toast,
    [Dialog.name]: Dialog,
    [Field.name]: Field,
    [Button.name]: Button,
    [Form.name]: Form,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs
  },
  computed: {
    // 验证手机号格式
    mobileValid () {
      const value = this.active === 'login' ? this.mobile : this.register_mobile
      if (value.length > 10) {
        return /^1[3-8]\d{9}$/.test(value)
      } else {
        return false
      }
    },
    // 发送验证码按钮是否可用
    codeDisabled () {
      if (this.mobile.length > 10 && this.mobileValid) {
        return false
      } else {
        return true
      }
    }
  },
  data () {
    return {
      register_mobile: '', // 注册手机号
      register_pwd: '', // 注册密码
      active: 'login', // 登陆页 / 注册页
      pattern: /^1[3-8]\d{9}$/, // 手机号校验规则
      countdown: 60, // 发送验证码倒计时
      showSendBtn: true, // 控制 发送验证码(true) / 已发送(false) 的显示
      mobile: '', // 手机号
      code: '' // 验证码
    }
  },
  methods: {
    ...mapMutations(['updateUserInfo']),
    // 注册
    async hRegister () {
      if (this.register_mobile.length < 1) {
        Toast({
          message: '手机号不能为空',
          duration: 800
        })
        return
      } else if (!this.mobileValid) {
        Toast({
          message: '请输入正确的手机号',
          duration: 800
        })
        return
      } else if (this.register_pwd.length < 6 || this.register_pwd.length > 12) {
        Toast({
          message: '密码长度为6-12位',
          duration: 800
        })
        return
      }

      const res = await login(this.register_mobile, this.register_pwd)
      if (res.success_code === 200) {
        this.updateUserInfo(res.data)
        this.$router.back()
      } else {
        Toast({
          message: '登录失败',
          duration: 1000
        })
      }
    },
    // 第三方登陆
    hOtherLogin (type) {
      if (type === 'wechat') {
        Toast({
          message: '暂不支持微信登录',
          duration: 800
        })
      } else if (type === 'QQ') {
        Toast({
          message: '暂不支持QQ登录',
          duration: 800
        })
      }
    },
    // 登录
    async hLogin () {
      if (this.mobile.length < 11 || !this.mobileValid) {
        Toast({
          message: '请输入正确的手机号',
          duration: 800
        })
        return
      } else if (this.code.length !== 6) {
        Toast({
          message: '请输入正确的验证码',
          duration: 800
        })
        return
      }
      const res = await login(this.mobile, this.code)
      this.updateUserInfo(res.data)
      console.log(this.$route)
      this.$route.query.redirect ? this.$router.push(this.$route.query.redirect) : this.$router.back()
    },
    async hSendCode () {
      // 切换 发送验证码 / 已发送 的显示
      this.showSendBtn = !this.showSendBtn

      // 发送验证码倒计时
      const t = setInterval(() => {
        if (this.countdown === 1) {
          clearInterval(t)
          this.showSendBtn = true
          this.countdown = 60
        }
        this.countdown--
      }, 1000)

      // 发送验证码
      const res = await getCode(this.mobile)
      // 提示验证码
      if (res.success_code === 200) {
        Dialog.alert({
          title: '验证码',
          message: res.data.code
        }).then(() => {
          // on close
          // 将验证码自动填入输入框
          this.code = res.data.code
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('~@/assets/images/login/login-bg.jpg') no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;

  /deep/.van-tabs__nav {
    background-color: rgba(255, 255, 255, 0);
  }

  .form-wrap {
    position: relative;
    width: 9.013rem;
    max-width: 90%;
    // height: 13.333rem;
    // max-height: 80%;
    padding: .933rem;
    background-color: rgba(255, 255, 255, .8);
    box-sizing: border-box;
    border-radius: .25rem;
    .cancel-btn {
      position: absolute;
      right: .4rem;
      top: .4rem;
    }
  }

  .svg-wrap {
    margin-top: .8rem;
    display: flex;
    justify-content: space-around;
    .svg-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .svg-txt {
        font-size: .32rem;
        margin-top: .267rem;
      }
    }
  }

  .agreement {
    margin-top: .533rem;
    font-size: 12px;
  }

}

</style>

<style lang="less">
.van-toast {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  height: .8rem;
  transform: translate3d(0, 0, 0);
}

.van-dialog {
  width: 8.347rem;
  height: 4rem;
  position: fixed;
  left:0;
  right:0;
  top:0;
  bottom:0;
  margin:auto;
  transform: translate3d(0,0,0);

  .van-button__text {
    color: #1989fa;
  }
}
</style>
