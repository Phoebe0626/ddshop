<template>
  <div class="vip">
      <div class="left">
        <svg-icon class="vip-icon" iconClass="vip"></svg-icon>
        <span>加入会员·每年预计节省806元</span>
      </div>
      <div class="right">5折开卡></div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
  // 开通会员
  .vip {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: .267rem;
    padding: 0 .3rem;
    height: .907rem;
    border-radius: .133rem;
    color: #fff;
    background-color: #4fc173;
    font-size: .32rem;
    .vip-icon {
      width: 1em;
      height: 1em;
      margin-right: .133rem;
    }
  }
</style>
