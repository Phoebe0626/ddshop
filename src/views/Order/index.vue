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
    <GoodList />
  </div>
</template>

<script>
import { NavBar, ContactCard } from 'vant'
import TimePicker from './components/TimePicker'
import GoodList from './components/GoodList'
export default {
  components: {
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

}
</style>
