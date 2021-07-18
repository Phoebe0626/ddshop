<template>
  <div class="cart-icon-container">
    <van-icon class="cart-icon" name="cart-o" @click.stop="hAddToCart($event, product)"
    />
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
import { mapGetters, mapMutations } from 'vuex'
import { Icon } from 'vant'
export default {
  components: {
    [Icon.name]: Icon
  },
  props: {
    product: {
      type: Object
    }
  },
  data () {
    return {
      elLeft: '',
      elTop: '',
      balls: [],
      curImage: '',
      curProduct: {}
    }
  },
  computed: {
    ...mapGetters(['token'])
  },
  methods: {
    ...mapMutations(['addToCart']),
    beforeEnter (el) {
      el.style.transform = `translate(${this.elLeft - 20}px, ${this.elTop}px)`
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
.cart-icon {
  width: .667rem;
  height: .667rem;
  line-height: .667rem;
  text-align: center;
  color: #fff;
  font-size: .427rem;
  border-radius: 50%;
  background-color: #45c16c;
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
</style>
