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
            <img :src="item.small_image" alt="" style="width: 100%;">
            <span class="name">{{ item.name }}</span>
            <div class="buy">
              <div class="price">
                <div class="cur-price">￥{{ item.price }}</div>
                <div class="ori-price">￥{{ item.origin_price }}</div>
              </div>
              <van-icon class="icon-cart" name="cart-o" @click.stop="hAddToCart($event, item)" />
            </div>
          </li>
        </ul>
        <transition
          v-for="(item, index) in balls"
          :key="index"
          appear
          @before-appear="beforeEnter"
          @after-appear="afterEnter"
        >
          <div class="ball" v-if="item">
            <img :src="curImage" alt="">
          </div>
        </transition>
      </div>
    </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import { Icon } from 'vant'
import BScroll from 'better-scroll'
export default {
  components: {
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
  computed: {
    ...mapGetters(['token'])
  },
  data () {
    return {
      curProduct: {},
      curImage: '', // 当前执行动画的图片
      elLeft: '', // 小球初始位置 left
      elTop: '', // 小球初始位置 top
      balls: [], // 在动画中的小球集合
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
    ...mapMutations(['addToCart']),
    beforeEnter (el) {
      el.style.transform = `translate(${this.elLeft}px, ${this.elTop}px)`
    },
    afterEnter (el) {
      el.style.transform = 'translate(7.013rem, 16.373rem)'
      el.style.transition = '.8s all cubic-bezier(.44,-0.48,.93,.67)'
      this.balls = this.balls.map(item => false)
      el.addEventListener('transitionend', () => {
        el.style.display = 'none'
        this.doAdd()
      })
      /** 兼容 */
      el.addEventListener('animationend', () => {
        el.style.display = 'none'
        this.doAdd()
      })
    },
    doAdd () {
      document.getElementById('cartTab').classList.add('shake')
      setTimeout(() => {
        document.getElementById('cartTab').classList.remove('shake')
      }, 500)
      this.addToCart(this.curProduct)
    },
    // 添加到购物车
    hAddToCart ($event, item) {
      if (this.token) {
        this.curImage = item.small_image
        this.elLeft = $event.target.getBoundingClientRect().left
        this.elTop = $event.target.getBoundingClientRect().top
        this.balls = [...this.balls, true]
      }
      this.curProduct = {
        id: item.id,
        name: item.name,
        price: item.price,
        count: 1,
        small_image: item.small_image,
        checked: true
      }
    },
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
            .icon-cart {
              width: .6rem;
              height: .6rem;
              line-height: .66rem;
              font-size: .36rem;
              text-align: center;
              color: #fff;
              background-color: #43bf6a;
              border-radius: 50%;
            }
          }
        }
      }
      .ball {
        width: 1.333rem;
        height: 1.333rem;
        border-radius: 50%;
        background-color: #43bf6a;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 999;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
</style>
