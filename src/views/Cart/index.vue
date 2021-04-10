<template>
  <div class="cart-container">
    <van-nav-bar
      title="购物车"
      right-text="删除"
    ></van-nav-bar>
  </div>
</template>

<script>
import { NavBar } from 'vant'
export default {
  components: {
    [NavBar.name]: NavBar
  }
}
</script>

<style lang="less" scoped>
/deep/.van-nav-bar__text {
  color: #45c763;
}
</style>
