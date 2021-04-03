<template>
  <div class="change-name-container">
    <van-nav-bar
      title="设置名字"
      left-text="取消"
      @click-left="$router.back()"
    >
      <template slot="right">
        <!-- name 为空或与之前相同时 按钮不可用 -->
        <van-button
          :disabled="this.name === '' || this.name === userName"
          size="mini" type="primary"
          style="width: 1.13rem"
          @click="hSetUserName"
        >完成</van-button>
      </template>
    </van-nav-bar>

    <!-- 输入框 -->
    <van-field v-model="name"></van-field>
  </div>
</template>

<script>
import { NavBar, Button, Field } from 'vant'
import { mapGetters, mapMutations } from 'vuex'
export default {
  components: {
    [Field.name]: Field,
    [Button.name]: Button,
    [NavBar.name]: NavBar
  },
  computed: {
    ...mapGetters(['userName'])
  },
  data () {
    return {
      name: ''
    }
  },
  created () {
    this.name = this.userName
  },
  methods: {
    ...mapMutations(['setUserName']),
    hSetUserName () {
      this.setUserName(this.name)
      this.$router.back()
    }
  }
}
</script>

<style lang="less" scoped>
.change-name-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  background-color: #f5f5f5;
}

/deep/.van-nav-bar__text {
  color: #222;
}

.van-nav-bar {
  background-color: #f5f5f5;
}
</style>
