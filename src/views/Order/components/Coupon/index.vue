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
      <van-cell title="使用800积分支付" label="￥8.00">
        <template slot="default">
          <van-switch v-model="use" active-color="#07c160"></van-switch>
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
  props: {
    usePoint: {
      type: Boolean,
      default () {
        return false
      }
    }
  },
  data () {
    return {
      use: this.usePoint,
      code: '', // 兑换码
      disabledCoupons: [], // 不可用优惠券列表
      chosenCoupon: -1,
      coupons: coupon, // 优惠券列表
      // usePoint: false, // 使用支付宝优惠
      isShow: false // 显示优惠券弹层
    }
  },
  methods: {
    // 切换优惠券
    hChange (index) {
      this.isShow = false
      this.chosenCoupon = index
    },
    // 兑换优惠券
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
  },
  watch: {
    // 选择优惠券的时候 将优惠的金额传递给父组件
    chosenCoupon (newVal, oldVal) {
      let discount = 0
      if (newVal === -1) {
        this.$emit('change-coupon', discount)
      } else {
        discount = coupon[newVal].value
        this.$emit('change-coupon', discount)
      }
    },
    // 是否使用积分 同步到父组件
    use (newVal, oldVal) {
      // 同步更新父组件的值
      this.$emit('update:use-point', newVal)
    }
  }
}

</script>

<style lang="less" scoped>

/deep/.van-coupon-list__bottom .van-button {
  background-color: #fff;
  border-color: #fff;
  color: #333;
}
.coupon-container {
  margin-top: .213rem;
  margin-bottom: .213rem;
}
</style>
