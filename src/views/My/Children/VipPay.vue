<template>
  <div class="vip-pay-container">
    <van-nav-bar
      title="开通绿卡会员"
      fixed
      placeholder
      safe-area-inset-top
      :border="false"
      left-arrow
      @click-left="$router.back()"
    ></van-nav-bar>
    <!-- 头部 个人信息 -->
    <header class="header">
      <div class="left">
        <div class="name">{{ userInfo.user_name }}</div>
        <div class="info">绿卡会员未开通</div>
      </div>
      <div class="right">
        <div class="avatar">
          <img
            width="40"
            height="40"
            style="border-radius: 50%; border: 1px solid #fff;"
            src="../../../assets/images/my/default_avatar.jpg"
          />
        </div>
      </div>
    </header>
    <!-- 图标 -->
    <div class="icons">
      <div class="title">开通享3大权益，预计每单省6.96元</div>
      <van-grid :border="false" :column-num="3">
        <van-grid-item icon="vip-card-o" text="绿卡专享券" />
        <van-grid-item icon="discount" text="绿卡专享价" />
        <van-grid-item icon="calendar-o" text="周五绿卡日" />
      </van-grid>
    </div>
    <!-- 价格 -->
    <div  ref="Outter">
      <div class="price">
        <div
          class="item"
          :class="{selected: currentIndex === index}"
          v-for="(item, index) in priceList"
          :key="index"
          @click="currentIndex = index"
        >
          <div class="first-line">{{ item.title }}</div>
          <div class="second-line">
            ￥<span>{{ item.price }}</span>
          </div>
          <div class="third-line">{{ item.info }}</div>
        </div>
      </div>
    </div>
    <!-- 自动续费提示 -->
    <div class="tag" v-if="currentIndex === 0 || currentIndex === 2">
      <span class="text">自动续费，可随时关闭</span>
      <van-icon class="icon" name="question-o" @click="hOpenDialog" />
    </div>
    <!-- 支付方式 -->
    <div class="pay-type">
      <div class="title">支付方式</div>
      <van-radio-group v-model="payType">
        <van-cell-group>
          <!-- 支付宝支付 -->
          <van-cell clickable @click="payType = '1'">
            <template slot="title">
              <img src="../../../assets/images/order/zfb.png" alt="">
              <span>支付宝支付</span>
              <span style="font-size: 12px; color: red; margin-left: 5px">安全保障</span>
            </template>
            <template #right-icon>
              <van-radio name="1" />
            </template>
          </van-cell>
          <!-- 微信支付 -->
          <van-cell clickable @click="payType = '2'">
            <template slot="title">
              <img src="../../../assets/images/order/wx.png" alt="">
              <span>微信支付</span>
            </template>
            <template #right-icon>
              <van-radio name="2" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </div>
    <!-- 支付按钮 -->
    <footer class="footer">
      <!-- 同意服务协议 -->
      <div class="agree">
        <van-checkbox v-model="checked" label-disabled>
          已阅读并同意
          <span @click="$toast('绿卡会员服务协议')">《绿卡会员服务协议》</span>和
          <span @click="$toast('自动续费协议')">《自动续费协议》</span>
        </van-checkbox>
      </div>
      <div class="btn" @click="hPay">
        立即支付
      </div>
    </footer>
  </div>
</template>

<script>
import { NavBar, Image, Grid, GridItem, Icon, Dialog, Cell, CellGroup, RadioGroup, Radio, Checkbox } from 'vant'
import { mapGetters } from 'vuex'
import BScroll from 'better-scroll'
export default {
  components: {
    [Checkbox.name]: Checkbox,
    [Radio.name]: Radio,
    [RadioGroup.name]: RadioGroup,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Dialog.name]: Dialog,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [Icon.name]: Icon,
    [Image.name]: Image,
    [NavBar.name]: NavBar
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  mounted () {
    this.$nextTick(() => {
      if (!this.priceScroll) {
        const wrapper = document.querySelector('.price')
        const item = document.querySelectorAll('.price .item')
        wrapper.style.width = (item[0].offsetWidth + 10) * item.length + 'px'
        console.log(item[0].offsetWidth, item[0].clientWidth)
        this.priceScroll = new BScroll(this.$refs.Outter, {
          scrollX: true,
          click: true,
          disableTouch: false
        })
      } else {
        this.priceScroll.refresh()
      }
    })
  },
  data () {
    return {
      checked: false, // 是否同意协议
      payType: '1', // 支付方式
      currentIndex: 0,
      priceList: [
        {
          title: '连续包年',
          price: 88,
          info: '限时加享喜马拉雅半年VIP'
        },
        {
          title: '年卡会员',
          price: 108,
          info: '折合27元/季'
        },
        {
          title: '连续包季',
          price: 30,
          info: ''
        },
        {
          title: '季卡会员',
          price: 45,
          info: ''
        }
      ]
    }
  },
  methods: {
    // 支付
    hPay () {
      if (!this.checked) return this.$toast('请先阅读并勾选服务协议哦')
      this.$toast('未实现支付功能哦')
    },
    // 自动续费声明
    hOpenDialog () {
      Dialog({
        title: '自动续费声明',
        message: '1. 会员到期前一天自动续费\n2. 扣费前短信通知，扣费过程公开透明\n3. 开通后可随时关闭，关闭后不影响当期权益使用',
        messageAlign: 'left'
      })
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.van-nav-bar {
  background-color: #152b2c;
  .van-nav-bar__title {
    color: #eacf99;
  }
  .van-nav-bar__arrow {
    color: #eacf99;
  }
}

/deep/.van-radio__icon--checked .van-icon {
  background-color: #468d4e;
  border-color: #468d4e;
}

/deep/.van-checkbox__icon--checked .van-icon {
  background-color: #468d4e;
  border-color: #468d4e;
}

.vip-pay-container {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  z-index: 999;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 2.667rem;
    padding: 0 .267rem;
    background-color: #152b2c;
    color: #fff;
    .left {
      .name {
        font-size: .427rem;
        font-weight: 700;
      }
      .info {
        color: #999;
        font-size: .32rem;
      }
    }
  }
  .icons {
    .title {
      margin-top: .4rem;
      font-size: .427rem;
      font-weight: 700;
      text-align: center;
    }
  }
  .price {
    padding: 0 .267rem;
    display: flex;
    .item {
      flex-shrink: 0;
      width: 3.867rem;
      height: 4rem;
      margin-right: .267rem;
      padding: .533rem .267rem;
      border: 1px solid #fcefba;
      border-radius: .213rem;
      box-sizing: border-box;
      color: #422200;
      .first-line {
        font-size: .427rem;
        font-weight: 700;
      }
      .second-line {
        margin-top: .4rem;
        margin-bottom: .133rem;
        font-size: .32rem;
        span {
          font-size: .8rem;
          font-weight: 700;
        }
      }
      .third-line {
        color: #c5ae71;
        font-size: .32rem;
      }
      &.selected {
        background: linear-gradient(90deg, #fceec9 0%, #f9dc90 100%);
      }
    }
  }
  .tag {
    margin-top: .213rem;
    color: #999;
    font-size: .32rem;
    .text {
      padding: 0 .08rem 0 .267rem;
    }
    .icon {
      vertical-align: -15%;
    }
  }
  .pay-type {
    .title {
      height: 1.067rem;
      line-height: 1.067rem;
      padding-left: .4rem;
      font-size: .373rem;
      color: #222;
    }
    img {
      width: .667rem;
      height: .667rem;
      vertical-align: middle;
      margin-right: .133rem;
    }
  }
  .footer {
    width: 100%;
    position: fixed;
    left: 50%;
    bottom: .267rem;
    .agree {
      width: 90%;
      margin-bottom: .267rem;
      transform: translateX(-50%);
      /deep/.van-checkbox__label {
        font-size: .32rem;
        color: #666;
      }
      span {
        color: #479051;
      }
    }
    .btn {
      transform: translateX(-50%);
      width: 90%;
      height: 1.067rem;
      line-height: 1.067rem;
      text-align: center;
      border-radius: .533rem;
      font-size: .427rem;
      font-weight: 700;
      color: #fff;
      background: linear-gradient(90deg, #306766 0%, #48924c 100%);
    }
  }
}
</style>

<style lang="less">
.van-toast {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  height: .8rem;
  transform: translate3d(0, 0, 0);
}

.van-dialog {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  height: 5.467rem;
  transform: translate3d(0, 0, 0);
  border-radius: .267rem;
  .van-dialog__header {
    font-weight: 700;
  }
  .van-button__text {
    color: #55ac5d;
    font-weight: 700;
  }
}
</style>
