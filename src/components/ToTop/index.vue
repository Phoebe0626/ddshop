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
    scrollTo (element, to, duration) {
      if (duration <= 0) return
      var difference = to - element.scrollTop // 滚动条需要移动的总距离
      var perTick = difference / duration * 10 // 每次需要移动的距离

      setTimeout(() => {
        element.scrollTop = element.scrollTop + perTick
        if (element.scrollTop === to) return // 如果完成要求的移动 则停止调用
        this.scrollTo(element, to, duration - 10) // 递归调用 直到完成规定的移动
      }, 10)
    },
    hToTop () {
      this.scrollTo(document.documentElement, 0, 600)
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
