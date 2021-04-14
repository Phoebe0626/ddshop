<template>
  <div class="coupon-container">
    <van-cell-group>
      <!-- 优惠券单元格 -->
      <van-coupon-cell
        :coupons="coupons"
        :chosen-coupon="chosenCoupon"
        @click="isShow = true"
      />
      <!-- 优惠券列表 -->
      <van-popup
        v-model="isShow"
        round
        position="bottom"
        style="height: 90%; padding-top: 4px;"
      >
        <van-coupon-list
          v-model="code"
          :coupons="coupons"
          :chosen-coupon="chosenCoupon"
          :disabled-coupons="disabledCoupons"
          @change="hChange"
          @exchange="hExchange"
        />
      </van-popup>
      <van-cell title="使用800支付宝支付" label="￥8.00">
        <template slot="default">
          <van-switch v-model="useExtra" active-color="#07c160"></van-switch>
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { Cell, CellGroup, Switch, CouponCell, Popup, CouponList } from 'vant'

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
    [CouponList.name]: CouponList,
    [Popup.name]: Popup,
    [CouponCell.name]: CouponCell,
    [Switch.name]: Switch,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup
  },
  data () {
    return {
      code: '', // 兑换码
      disabledCoupons: [], // 不可用优惠券列表
      chosenCoupon: -1,
      coupons: coupon, // 优惠券列表
      useExtra: false, // 使用支付宝优惠
      isShow: true // 显示优惠券弹层
    }
  },
  methods: {
    hChange (index) {
      this.isShow = false
      this.chosenCoupon = index
    },
    hExchange (code) {
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

/deep/.van-coupon-list__bottom.van-button {
  background-color: #fff;
  border-color: #fff;
  color: #333;
}
.coupon-container {
  margin-top: .213rem;
  margin-bottom: .213rem;
}
</style>
