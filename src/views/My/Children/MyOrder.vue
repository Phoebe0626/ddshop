<template>
  <div class="my-order-container">
    <van-nav-bar
      title="我的订单"
      left-arrow
      @click-left="$router.back()"
    ></van-nav-bar>
    <van-tabs v-model="active" title-active-color="#28be57">
      <van-tab title="全部" name="0">
        <img class="no-data-img" src="@/assets/images/my/noData.jpeg" alt="">
      </van-tab>
      <van-tab title="待支付" name="1">
        <img class="no-data-img" src="@/assets/images/my/noData.jpeg" alt="">
      </van-tab>
      <van-tab title="待收货" name="2">
        <img class="no-data-img" src="@/assets/images/my/noData.jpeg" alt="">
      </van-tab>
      <van-tab title="待评价" name="3">
        <img class="no-data-img" src="@/assets/images/my/noData.jpeg" alt="">
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { NavBar, Tab, Tabs } from 'vant'
export default {
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [NavBar.name]: NavBar
  },
  data () {
    return {
      active: this.$route.params.type ? this.$route.params.type : 0
    }
  },
  created () {
    console.log(this.$route)
  }
}
</script>

<style lang="less" scoped>
 /deep/.van-icon-arrow-left {
  color: #ddd;
}

/deep/.van-tabs__line {
  width: 1.4rem;
  background-color: #28be57;
}

.no-data-img {
  width: 6rem;
  height: 5.6rem;
  margin-top: 50%;
  margin-left: 50%;
  transform: translate(-50%, -50%);
}
</style>
