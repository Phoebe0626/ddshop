<template>
  <transition name="slideLR">
    <div
      class="totop-container"
      v-show="isShowTop"
      @click="hToTop"
    >
      <svg-icon iconClass="totop" />
    </div>
  </transition>
</template>

<script>
import { throttle } from '@/utils/index'
export default {
  data () {
    return {
      isShowTop: false // 是否显示返回顶部按钮
    }
  },
  created () {
    // 给页面绑定滚动事件 - 控制返回顶部按钮的显示
    window.addEventListener('scroll', throttle(this.handleScroll, 300))
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    hToTop () {
      const t = setInterval(() => {
        const scrollT = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        const perTick = Math.floor(-scrollT / 5)
        document.documentElement.scrollTop = document.body.scrollTop = scrollT + perTick
        if (scrollT === 0) {
          clearInterval(t)
        }
      }, 10)
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
  right: 0;
  padding-right: .267rem;
  z-index: 99;
}
</style>
