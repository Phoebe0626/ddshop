<template>
  <div class="coupon-container">
    <van-nav-bar
      title="优惠券"
      left-arrow
      @click-left="$router.back()"
    >
    </van-nav-bar>
    <!-- 优惠券 -->
      <van-coupon-list
        v-model="code"
        :exchange-button-disabled="!code"
        :coupons="coupons"
        show-count
        @exchange="hExchange"
      />
  </div>
</template>

<script>
import { NavBar, Field, Button, Tabs, Tab, CouponCell, CouponList, Toast } from 'vant'
// 优惠券详情
const coupon = [{
  available: 1,
  condition: '无使用门槛\n最多优惠12元',
  reason: '',
  value: 250,
  name: '优惠券',
  startAt: 1617408000,
  endAt: 1621468800,
  valueDesc: '2.5',
  unitDesc: '元'
}, {
  available: 1,
  condition: '无使用门槛\n最多优惠12元',
  reason: '',
  value: 150,
  name: '优惠券',
  startAt: 1617408000,
  endAt: 1621468800,
  valueDesc: '1.5',
  unitDesc: '元'
}]
export default {
  components: {
    [Toast.name]: Toast,
    [CouponCell.name]: CouponCell,
    [CouponList.name]: CouponList,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Button.name]: Button,
    [Field.name]: Field,
    [NavBar.name]: NavBar
  },
  data () {
    return {
      coupons: coupon,
      code: ''
    }
  },
  methods: {
    hExchange () {
      if (this.code === '123') {
        this.coupons.push(coupon[0])
        this.$toast({
          message: '兑换成功',
          duration: 800
        })
      } else {
        this.$toast({
          message: '兑换失败',
          duration: 800
        })
      }
      this.code = ''
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.van-coupon {
  height: 3.5rem;
  padding: 0;
  .van-checkbox {
    display: none;
  }
}
/deep/.van-coupon__content {
  padding: 0;
}
/deep/.van-icon-arrow-left {
  color: #dedede;
}
</style>
