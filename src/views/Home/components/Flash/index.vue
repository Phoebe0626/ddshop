<template>
  <div class="flash-sale">
      <!-- 标题区域 -->
      <div class="title">
       <div class="left">
         <span>限时抢购</span>
         <div class="time">
           <div class="time-item">{{ (time.h &lt; 10) ? ('0' + time.h) : time.h }}</div>
           <div class="time-item">{{ (time.m &lt; 10) ? ('0' + time.m) : time.m }}</div>
           <div class="time-item">{{ (time.s &lt; 10) ? ('0' + time.s) : time.s }}</div>
         </div>
        </div>
        <div class="right">更多</div>
      </div>
      <!-- 商品区域 -->
      <div ref="wrapper" class="wrapper">
        <ul class="goods">
          <li class="goods-item" v-for="(item, index) in flashGoods" :key="index" @click="$router.push(`/GoodsDetail?name=${item.name}&spec=${item.spec}&small_image=${item.small_image}&total_sales=${item.total_sales}&price=${item.price}&origin_price=${item.origin_price}&isFlash=true`)">
            <img :src="item.small_image" alt="" style="width: 100%;"/>
            <span class="name">{{ item.name }}</span>
            <div class="buy">
              <div class="price">
                <div class="cur-price">￥{{ item.price }}</div>
                <div class="ori-price">￥{{ item.origin_price }}</div>
              </div>
              <cart-icon :product="item"></cart-icon>
            </div>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
import { Icon, Image } from 'vant'
import CartIcon from '@/components/CartIcon'
import BScroll from 'better-scroll'
export default {
  components: {
    CartIcon,
    [Image.name]: Image,
    [Icon.name]: Icon
  },
  props: {
    flashGoods: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      time: { // 限时抢购倒计时
        h: 2,
        m: 0,
        s: 0
      }
    }
  },
  created () {
    // 开始抢购模块的倒计时
    this.startTimer()
  },
  mounted () {
    this.$nextTick(() => {
      const li = document.querySelectorAll('.goods-item')
      const ul = document.querySelector('.goods')
      ul.style.width = li[0].clientWidth * li.length + 'px' // 给 ul 设置宽度
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.wrapper, {
          scrollX: true,
          eventPassthrough: 'vertical',
          disableTouch: false
        })
      }
    })
  },
  methods: {
    // 开始抢购模块的倒计时
    startTimer () {
      const t = setInterval(() => {
        if (this.time.s === 0 && this.time.m !== 0) {
          this.time.s = 59
          this.time.m--
        } else if (this.time.s === 0 && this.time.m === 0 && this.time.h !== 0) {
          this.time.h--
          this.time.m = 59
          this.time.s = 59
        } else if (this.time.s === 0 && this.time.m === 0 && this.time.h === 0) {
          clearInterval(t)
        } else {
          this.time.s--
        }
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
  // 限时抢购
  .flash-sale {
    padding: 0 .267rem;
    margin-top: .533rem;
    .title {
      border-left: .133rem solid #3cb963;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        margin-left: .133rem;
        font-size: .48rem;
        .time {
          display: flex;
          .time-item {
            width: .533rem;
            height: .533rem;
            line-height: .533rem;
            background-color: #222;
            color: #fff;
            margin-left: .133rem;
            font-size: .373rem;
            text-align: center;
          }
        }
      }
      .right {
        font-size: .32rem;
        color: #3cb963;
      }
    }
    .wrapper {
      position: relative;
      margin-top: .533rem;
      overflow: hidden;
      .goods {
        display: flex;
        .goods-item {
          position: relative;
          flex-grow: 0;
          flex-shrink: 0;
          flex-basis: 2.8rem;
          padding-right: 0.5rem;
          img {
            width: 2.8rem;
            height: 2.8rem;
            background: url('../../../../assets/images/placeholderImg/product-img-load.png');
            background-size: cover;
          }
          .name {
            display: inline-block;
            font-size: 0.3129rem;
            height: 0.9rem;
            line-height: 0.533rem;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .buy {
            display: flex;
            justify-content: space-between;
            .price {
              .cur-price {
                color: #f37078;
                font-size: .427rem;
                font-weight: 600;
              }
              .ori-price {
                margin-top: -0.133rem;
                color: #999999;
                font-size: .32rem;
                text-decoration: line-through;
              }
            }
          }
        }
      }
    }
  }
</style>
