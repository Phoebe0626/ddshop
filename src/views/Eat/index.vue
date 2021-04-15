<template>
  <div class="eat-container">
    <!-- 头部 搜索栏 -->
    <header class="header">
      <van-search
        class="search"
        @click="hSearch"
        shape="round"
        placeholder="请输入搜索关键词"
        disabled
      />
      <svg-icon class="icon" iconClass="collection"></svg-icon>
    </header>
    <!-- 标题 今日菜单 -->
    <div class="title">
      <span>今日菜单</span>
    </div>
  </div>
</template>

<script>
import { Search } from 'vant'
export default {
  components: {
    [Search.name]: Search
  },
  methods: {
    hSearch () {
      this.$toast('暂未实现')
    }
  }
}
</script>

<style lang="less" scoped>
.eat-container {
  // 头部 搜索区域
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: .213rem;
    .search {
      flex: 1;
    }
    .icon {
      width: .4rem;
      height: .4rem;
    }
  }
  // 标题 今日菜单
  .title {
    padding-left: .267rem;
    span {
      padding: .08rem;
      padding-left: .133rem;
      border-left: .107rem solid #3cb963;
      font-size: .48rem;
    }
  }
}
</style>
