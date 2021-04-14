<template>
  <div class="pay-container">
    <div class="title">支付方式</div>
    <van-radio-group v-model="payForm">
      <van-cell-group>
        <!-- 微信支付 -->
        <van-cell clickable @click="payForm = '1'">
          <template slot="title">
            <img src="../../../../assets/images/order/wx.png" alt="">
            <span>微信支付</span>
          </template>
          <template #right-icon>
            <van-radio name="1" />
          </template>
        </van-cell>
        <!-- 支付宝支付 -->
        <van-cell clickable @click="payForm = '2'">
          <template slot="title">
            <img src="../../../../assets/images/order/zfb.png" alt="">
            <span>支付宝支付</span>
          </template>
          <template #right-icon>
            <van-radio name="2" />
          </template>
        </van-cell>
        <!-- 花呗支付 -->
        <van-cell clickable @click="payForm = '3'">
          <template slot="title">
            <img src="../../../../assets/images/order/hb.png" alt="">
            <span>花呗支付</span>
          </template>
          <template #right-icon>
            <van-radio name="3" />
          </template>
        </van-cell>

      </van-cell-group>
    </van-radio-group>
  </div>
</template>

<script>
import { Cell, CellGroup, Radio, RadioGroup } from 'vant'
export default {
  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio
  },
  data () {
    return {
      payForm: '1'
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.van-radio__icon--checked .van-icon {
  background-color: #07c160;
  border-color: #07c160;
}
.pay-container {
  margin-top: .133rem;
  .title {
    height: 1.067rem;
    line-height: 1.067rem;
    padding-left: .4rem;
    font-size: .373rem;
    color: #969799;
  }
  img {
    width: .667rem;
    height: .667rem;
    vertical-align: middle;
    margin-right: .133rem;
  }
}
</style>
