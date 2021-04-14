<template>
  <div class="detail-container">
    <van-nav-bar
      fixed
      safe-area-inset-top
      title="商品详情"
      left-arrow
      @click-left="$router.back()"
    ></van-nav-bar>
    <div class="wrapper">
      <!-- 商品图片 -->
      <div class="goods-img">
        <img :src="detail.small_image" alt="">
      </div>
      <!-- 限时抢购 -->
      <div class="flash" v-if="detail.isFlash">
        <div class="left">
          <span>限时抢购</span>
          <i>抢购中</i>
        </div>
        <div class="right">
          <span class="text">距结束</span>
          <van-count-down class="count-down" :time="time">
            <template #default="timeData">
              <span class="block">{{ timeData.hours }}</span>
              <span class="colon">:</span>
              <span class="block">{{ timeData.minutes }}</span>
              <span class="colon">:</span>
              <span class="block">{{ timeData.seconds }}</span>
            </template>
          </van-count-down>
        </div>
      </div>
      <!-- 商品信息 -->
      <div class="info">
        <div class="name">{{ detail.name }}</div>
        <div class="spec">{{ detail.spec }}</div>
        <span class="cur-price">￥{{ detail.price }}</span>
        <span class="ori-price">￥{{ detail.origin_price }}</span>
        <span class="total-sales">已售{{ detail.total_sales }}</span>
        <van-divider></van-divider>
        <div class="shipping-info">
          <van-icon name="cluster-o" />
          此商品按500g/份计价,如实收少于500g将退还差价
        </div>
        <van-divider></van-divider>
        <div class="shipping-info" style="padding-bottom: 8px;">
          <van-icon name="clock-o" />
          最快29分钟内送达
        </div>
      </div>
      <!-- 规格 -->
      <div class="specification">
        <div class="title">规格</div>
        <van-divider dashed></van-divider>
        <div class="conditions">
          <span>保存条件</span>
          <i>冷藏</i>
        </div>
        <van-divider dashed></van-divider>
        <div class="conditions">
          <span>保质期</span>
          <i>15天</i>
        </div>
        <van-divider dashed></van-divider>
      </div>
      <!-- 商品展示 -->
      <div class="goods-show">
        <img :src="detail.small_image" alt="">
        <img :src="ddImage" alt="">
      </div>
    </div>
    <!-- 底部导航 -->
    <van-goods-action>
      <van-goods-action-icon icon="cart-o" @click="hGotoCart" />
      <van-goods-action-button
        color="linear-gradient(to right,#ffd01e,#ff8917)"
        text="加入购物车"
        @click="hAddtoCart"
      />
    </van-goods-action>
  </div>
</template>

<script>
import { NavBar, CountDown, Divider, Icon, GoodsAction, GoodsActionButton, GoodsActionIcon } from 'vant'
import { mapGetters, mapMutations } from 'vuex'
export default {
  components: {
    [GoodsAction.name]: GoodsAction,
    [GoodsActionButton.name]: GoodsActionButton,
    [GoodsActionIcon.name]: GoodsActionIcon,
    [Icon.name]: Icon,
    [Divider.name]: Divider,
    [CountDown.name]: CountDown,
    [NavBar.name]: NavBar
  },
  computed: {
    ...mapGetters(['token'])
  },
  data () {
    return {
      time: 2 * 60 * 60 * 1000,
      detail: this.$route.query,
      ddImage: 'https://img.ddimg.mobi/3f280ff77ab3d1571213379189.jpg?width=750&height=1869'
    }
  },
  methods: {
    ...mapMutations(['addToCart']),
    // 添加到购物车
    hAddtoCart () {
      const item = this.$route.query
      const curProduct = {
        id: item.id,
        name: item.name,
        price: item.price,
        count: 1,
        small_image: item.small_image,
        checked: true
      }
      if (this.token) {
        this.addToCart(curProduct)
        this.$toast('添加成功')
      } else {
        this.$router.push('/login')
      }
    },
    // 跳转到购物车页面
    hGotoCart () {
      this.$router.push('/dashboard/cart')
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.van-goods-action {
  z-index: 1000;
}
.detail-container {
  background-color: #f5f5f5;
  .wrapper {
    margin-top: 1.227rem;
    // 商品图片
    .goods-img {
      width: 100%;
      img {
        width: 100%;
        vertical-align: middle; // 去掉 img 下方空白
      }
    }
    // 限时抢购
    .flash {
      display: flex;
      height: .933rem;
      .left {
        flex: 55;
        background-color: #e25450;
        color: #fff;
        span {
          margin-left: .4rem;
          margin-right: .267rem;
          font-size: .373rem;
        }
        i {
          font-size: .32rem;
          font-style: normal;
        }
      }
      .right {
        flex: 45;
        display: flex;
        align-items: center;
        background-color: #fcefe9;
        .text {
          margin-left: .4rem;
          margin-right: .267rem;
          color: #e25450;
          font-size: .32rem;
        }
        .count-down {
          .colon {
            display: inline-block;
            margin: 0 4px;
            color: #ee0a24;
          }
          .block {
            display: inline-block;
            width: 22px;
            color: #fff;
            font-size: 12px;
            text-align: center;
            background-color: #e25450;
          }
        }
      }
    }
    // 商品信息
    .info {
      background-color: #fff;
      padding: .213rem;
      .name {
        font-size: .373rem;
      }
      .spec {
        padding: .133rem 0;
        color: gray;
        font-size: .32rem;
      }
      .cur-price {
        margin-right: .213rem;
        color: #e25450;
        font-size: .373rem;
      }
      .ori-price {
        color: gray;
        font-size: .32rem;
        text-decoration: line-through;
      }
      .total-sales {
        float: right;
        font-size: .373rem;
        color: #e25450;
      }
      .shipping-info {
        font-size: .32rem;
        color: gray;
      }
    }
    // 规格
    .specification {
      margin-top: .533rem;
      padding: .213rem;
      background-color: #fff;
      .title {
        padding-top: .3rem;
        font-size: .427rem;
      }
      .conditions {
        font-size: .32rem;
        color: gray;
        i {
          font-style: normal;
          margin-right: .533rem;
        }
      }
    }
    // 商品展示
    .goods-show {
      width: 100%;
      img {
        width: 100%;
      }
    }
  }
}
</style>
