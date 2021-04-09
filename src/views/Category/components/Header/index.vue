<template>
  <div class="header-container">
    <div class="wrapper">
      <van-icon name="search" />
      <span>输入商品名称</span>
    </div>
  </div>
</template>

<script>
import { Icon } from 'vant'
export default {
  components: {
    [Icon.name]: Icon
  }
}
</script>

<style lang="less" scoped>
.header-container {
  height: .907rem;
  padding: .213rem .4rem;
  border-bottom: .027rem solid #f5f5f5;
  background-color: #fff;
  .wrapper {
    height: 100%;
    padding-left: .213rem;
    background-color: #f5f5f5;
    border-radius: .453rem;
    line-height: .907rem;
    font-size: .373rem;
    color: #b5b5b5;
    span {
      margin-left: .133rem;
    }
  }
}
</style>
