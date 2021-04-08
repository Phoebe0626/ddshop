<template>
  <!-- 头部搜索框 -->
  <div class="header" :style="showBg ? 'background-color: #fff;' : ''">
    <!-- 选择位置 -->
    <div class="location">
      <van-icon name="location" />
      <span class="text">请选择位置&nbsp;</span>
      <van-icon name="arrow-down" />
    </div>
    <div class="search">
      <van-icon class="icon" name="search" />
      <span>请输入商品名称</span>
    </div>
  </div>
</template>

<script>
import { Icon } from 'vant'
export default {
  components: {
    [Icon.name]: Icon
  },
  data () {
    return {
      showBg: false
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll () {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop > 200) {
        this.showBg = true
      } else {
        this.showBg = false
      }
    }
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<style lang="less" scoped>
.header {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 1.467rem;
  line-height: 1.467rem;
  display: flex;
  justify-content: space-around;
  font-size: .373rem;
  z-index: 2;
  // 选择位置
  .location {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 33%;
    height: .853rem;
    line-height: .853rem;
    margin-top: .4rem;
    color: #fff;
    background-color: rgba(0, 0, 0, .5);
    border-radius: .43rem;
    .text {
      margin: 0 .1rem;
    }
  }
  // 搜索框
  .search {
    display: flex;
    justify-content: center;
    align-items: center;
    height: .853rem;
    width: 64%;
    margin-top: .4rem;
    background-color: #f5f5f5;
    border-radius: .43rem;
    color: grey;
    .icon {
      margin-right: .1rem;
      font-size: .427rem;
    }
  }
}
</style>
