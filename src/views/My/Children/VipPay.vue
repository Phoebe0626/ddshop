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
    <!-- 支付按钮 -->
    <footer class="footer">
      立即支付
    </footer>
  </div>
</template>

<script>
import { NavBar, Image, Grid, GridItem, Icon } from 'vant'
import { mapGetters } from 'vuex'
import BScroll from 'better-scroll'
export default {
  components: {
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
      height: 3.867rem;
      margin-right: .267rem;
      padding: .667rem .267rem 0;
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
  .footer {
    position: fixed;
    left: 50%;
    bottom: .267rem;
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
</style>
