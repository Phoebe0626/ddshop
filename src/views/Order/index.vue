<template>
  <div class="order-container">
    <van-nav-bar
      title="填写订单"
      left-arrow
      @click-left="$router.back()"
    ></van-nav-bar>
    <!-- 选择收货地址 -->
    <van-contact-card
      type="add"
      @click="hChooseAddress"
      add-text="选择收货地址"
    />
    <!-- 选择送达时间 -->
    <TimePicker />
    <!-- 订单预览 -->
    <GoodList />
    <!-- 支付方式 -->
    <Pay />
  </div>
</template>

<script>
import { NavBar, ContactCard } from 'vant'
import TimePicker from './components/TimePicker'
import GoodList from './components/GoodList'
import Pay from './components/Pay'
export default {
  components: {
    Pay,
    GoodList,
    TimePicker,
    [ContactCard.name]: ContactCard,
    [NavBar.name]: NavBar
  },
  data () {
    return {
    }
  },
  methods: {
    // 选择地址
    hChooseAddress () {},
    onSelect () {}
  }
}
</script>

<style lang="less" scoped>
.order-container {
  background-color: #f5f5f5;
}
</style>
