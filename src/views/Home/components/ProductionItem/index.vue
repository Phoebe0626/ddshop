<template>
  <div class="production-item-container">
    <div class="item" v-for="(item, index) in list" :key="index" @click="$router.push(`/GoodsDetail?id=${item.id}&name=${item.name}&spec=${item.spec}&small_image=${item.small_image}&total_sales=${item.total_sales}&price=${item.price}&origin_price=${item.origin_price}`)">
      <div class="image">
        <van-image lazy-load :src="item.small_image">
          <template v-slot:loading>
            <img width="178" height="178" src="../../../../assets/images/placeholderImg/product-img-load.png" alt="">
          </template>
        </van-image>
      </div>
      <div class="name">{{ item.name }}</div>
      <div class="intro">{{ item.spec }}</div>
      <div class="buy">
        <div class="price">
          <span class="cur-price">￥{{ item.price }}</span>
          <span class="ori-price">￥{{ item.origin_price }}</span>
        </div>
        <van-icon class="icon-cart" name="cart-o" @click.stop="hAddToCart($event, item)" />
      </div>
    </div>
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
</template>

<script>
import { Icon, Image } from 'vant'
import { mapMutations, mapGetters } from 'vuex'
export default {
  components: {
    [Image.name]: Image,
    [Icon.name]: Icon
  },
  props: {
    list: {
      type: Array
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
      balls: [] // 在动画中的小球集合
    }
  },
  methods: {
    ...mapMutations(['addToCart']),
    beforeEnter (el) {
      el.style.transform = `translate(${this.elLeft}px, ${this.elTop}px)`
    },
    afterEnter (el) {
      el.style.transform = 'translate(7.013rem, 16.373rem)'
      el.style.transition = '.8s all cubic-bezier(1,.1,.9,.8)'
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
      console.log(1)
      if (this.token) {
        this.curImage = item.small_image
        this.elLeft = $event.target.getBoundingClientRect().left
        this.elTop = $event.target.getBoundingClientRect().top
        this.balls = [...this.balls, true]
      } else {
        this.$router.push('/login')
      }
      this.curProduct = {
        id: item.id,
        name: item.name,
        price: item.price,
        count: 1,
        small_image: item.small_image,
        checked: true
      }
    }
  }
}
</script>

<style lang="less" scoped>
.production-item-container {
  padding: .133rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  background-color: #f5f5f5;

  .item {
    width: 49%;
    margin-bottom: .133rem;
    padding-bottom: .267rem;
    background-color: #fff;
    .image {
      .van-image {
        width: 4.747rem;
        height: 4.747rem;
      }
    }
    .name {
      font-size: .32rem;
      padding-left: .133rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .intro {
      font-size: .32rem;
      color: #999;
      padding-left: .133rem;
      margin-bottom: .533rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .buy {
      display: flex;
      justify-content: space-between;
      padding: 0 .133rem;
      .price {
        .cur-price {
          margin-right: .133rem;
          font-size: .427rem;
          font-weight: 600;
          color: #f37078;
        }
        .ori-price {
          font-size: .32rem;
          text-decoration: line-through;
          color: #999;
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

</style>
