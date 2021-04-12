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
    <!-- 送达时间 -->
    <van-cell
      is-link
      title="送达时间"
      label="超过十分钟可获得积分补偿"
      value="请选择送达时间"
      @click="isShowChooseTime = true"
    />
    <van-action-sheet v-model="isShowChooseTime" title="请选择送达时间">
      <div class="content">
        <div class="top">
          <!-- 左侧 选择日期-->
          <div class="left">
            <ul>
              <li class="selected">今天</li>
              <li>明天</li>
            </ul>
          </div>
          <!-- 右侧 选择时间 -->
          <div class="right" ref="TimeWrapper">
            <ul class="UlWrapper">
              <li>13:00 - 13:30</li>
              <li>13:30 - 14:30</li>
              <li>15:00 - 16:30</li>
              <li>17:00 - 18:30</li>
              <li>17:00 - 18:30</li>
              <li>17:00 - 18:30</li>
              <li>17:00 - 18:30</li>
              <li>17:00 - 18:30</li>
              <li>17:00 - 18:30</li>
              <li>17:00 - 18:30</li>
              <li>17:00 - 18:30</li>
              <li>17:00 - 18:30</li>
              <li>17:00 - 18:30</li>
              <li>17:00 - 18:30</li>
              <li>17:00 - 18:30</li>
              <li>1</li>
            </ul>
          </div>
        </div>
        <div class="bottom">
          <van-button block type="primary" round>确定</van-button>
        </div>
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import { NavBar, ContactCard, ActionSheet, Cell, Button } from 'vant'
export default {
  components: {
    [Button.name]: Button,
    [Cell.name]: Cell,
    [ActionSheet.name]: ActionSheet,
    [ContactCard.name]: ContactCard,
    [NavBar.name]: NavBar
  },
  data () {
    return {
      isShowChooseTime: true // 显示选择送达时间
    }
  },
  mounted () {
    this.$nextTick(() => {
      if (!this.timeScroll) {
        this.timeScroll = new BScroll(this.$refs.TimeWrapper, {
          click: true,
          scrollY: true,
          disableTouch: false,
          bindToWrapper: true
        })
      }
    })
  },
  methods: {
    // 选择地址
    hChooseAddress () {},
    onSelect () {}
  }
}
</script>

<style lang="less" scoped>
/deep/.van-popup {
  height: 70%;
}
.order-container {
  .content {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-top: 1px solid #f3f3f3;
    .top {
      height: 100%;
      display: flex;
      font-size: .373rem;
      .left {
        flex: 3;
        background-color: #f5f5f5;
        li {
          height: 1.067rem;
          line-height: 1.067rem;
          padding-left: .133rem;
        }
        .selected {
          font-weight: 700;
          background-color: #fff;
        }
      }
      .right {
        flex: 7;
        padding-left: .213rem;
        overflow: hidden;
        ul {
          li {
            height: 1.067rem;
            line-height: 1.067rem;
            border-bottom: 1px solid #f3f3f3;
          }
        }
      }
    }
    .bottom {
      height: 1.173rem;
      padding: .107rem .533rem;
    }
  }
}
</style>
