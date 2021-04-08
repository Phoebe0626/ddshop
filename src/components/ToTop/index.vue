<template>
  <div
    class="totop-container"
    v-show="isShowTop"
    @click="hToTop"
  >
    <svg-icon iconClass="totop" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      isShowTop: false // 是否显示返回顶部按钮
    }
  },
  created () {
    // 给页面绑定滚动事件 - 控制返回顶部按钮的显示
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    hToTop () {
      console.log(1)
      window.scrollTo(0, 0)
    },
    // 滚动事件
    handleScroll () {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop > 300) {
        // 显示返回顶部按钮
        this.isShowTop = true
      } else {
        // 隐藏返回顶部按钮
        this.isShowTop = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.totop-container {
  position: fixed;
  bottom: 1.867rem;
  right: .267rem;
  z-index: 99;
}
</style>
