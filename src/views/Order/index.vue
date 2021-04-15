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
    <!-- 优惠 -->
    <Coupon
      :usePoint.sync="usePoint"
      @change-coupon="hChangeCoupon"
    />
    <!-- 备注 -->
    <van-field v-model="remarks" label="备注" placeholder="选填,可以告诉我们您的特殊需求" />
    <!-- 商品金额 -->
    <div class="price">
      <van-cell-group>
        <van-cell title="商品金额" :value="total_price" />
        <van-cell title="配送费" value="0.00" />
        <van-cell v-show="usePoint" title="积分" value="-￥8.00" />
      </van-cell-group>
    </div>
    <!-- 结算 -->
    <van-submit-bar
      :price="price"
      button-text="提交订单"
      tip-icon="info-o"
      @submit="hSubmit"
    />
  </div>
</template>

<script>
import { NavBar, ContactCard, Field, Cell, CellGroup, SubmitBar } from 'vant'
import TimePicker from './components/TimePicker'
import GoodList from './components/GoodList'
import Pay from './components/Pay'
import Coupon from './components/Coupon'
import { mapGetters } from 'vuex'
export default {
  components: {
    Coupon,
    Pay,
    GoodList,
    TimePicker,
    [SubmitBar.name]: SubmitBar,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Field.name]: Field,
    [ContactCard.name]: ContactCard,
    [NavBar.name]: NavBar
  },
  computed: {
    ...mapGetters(['cartList']),
    // 实付
    price () {
      console.log(this.coupon)
      let total = this.total_price.substring(1) * 100
      if (this.usePoint) { // 使用积分
        total = total - 800
      }
      if (this.coupon) { // 使用优惠券
        total = total - this.coupon
      }

      return total
    },
    // 商品总价
    total_price () {
      let total = 0
      this.cartList.forEach(item => {
        if (item.checked) {
          // 小数计算的精度问题
          total = total + item.count * (item.price * 10000)
        }
      })
      return `￥${(total / 10000).toFixed(2)}`
    }
  },
  data () {
    return {
      coupon: 0, // 优惠券
      usePoint: false, // 是否使用积分
      remarks: '' // 备注
    }
  },
  methods: {
    // 使用优惠券
    hChangeCoupon (discount) {
      this.coupon = discount // 此时的单位是"分"
    },
    // 结算
    hSubmit () {},
    // 选择地址
    hChooseAddress () {},
    onSelect () {}
  }
}
</script>

<style lang="less" scoped>
.order-container {
  padding-bottom: 1.333rem;
  background-color: #f5f5f5;
  .price {
    margin-top: .213rem;
  }
}
</style>
