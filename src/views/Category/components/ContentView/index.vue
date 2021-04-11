<template>
  <div class="content-container">
    <!-- 标题区域 -->
    <div class="subTitile-wrapper" ref="TitleWrapper">
      <ul class="title-wrapper-ul" ref="ulWrapper">
        <li
          class="title-item"
          :class="{ selected: currentIndex === index }"
          v-for="(item, index) in rightContent"
          :key="index"
          ref="subTitle"
          @click="hSelectTitle(index)"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
    <!-- 内容区域 -->
    <section class="section-wrapper" ref="SectionWrapper">
      <div class="content-wrapper">
        <div
          ref="DivWrapper"
          v-for="(item, index) in rightContent"
          :key="index"
        >
        <div class="category-title">{{ item.name }}</div>
        <ul>
          <li
            class="product-item"
            v-for="(product, i) in item.products"
            :key="i"
          >
          <div class="product-image">
            <van-image
              class="product-image"
              :src="product.small_image"
              lazy-load
            ></van-image>
          </div>
          <div class="info">
            <div class="name">
              {{ product.name }}
            </div>
            <div class="spec">{{ product.spec }}</div>
            <div class="price">
              <span class="cur-price">￥{{ product.price }}</span>
              <span class="ori-price">￥{{ product.origin_price }}</span>
            </div>
            <van-icon class="cart-icon" name="cart-o" @click.stop="hAddToCart(product)"
            />
          </div>
          </li>
        </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import { Image, Icon } from 'vant'
import { mapMutations } from 'vuex'
export default {
  components: {
    [Icon.name]: Icon,
    [Image.name]: Image
  },
  props: {
    rightContent: {
      type: Array
    }
  },
  data () {
    return {
      currentIndex: 0
    }
  },
  mounted () {
    this.$nextTick(() => {
      // this.initTitleScroll()
      this.initProductScroll()
    })
  },
  methods: {
    ...mapMutations(['addToCart']),
    // 添加到购物车
    hAddToCart (item) {
      console.log(item)
      const good = {
        id: item.id,
        name: item.name,
        price: item.price,
        count: 1,
        small_image: item.small_image,
        checked: true
      }
      this.addToCart(good)
    },
    // 点击右侧标题
    hSelectTitle (index) {
      this.currentIndex = index
      this.titleScroll.scrollToElement(this.$refs.subTitle[index], 200)
      this.productScroll.scrollToElement(document.querySelectorAll('.category-title')[index], 100)
    },
    // 初始化右侧标题滚动条
    initTitleScroll () {
      const li = this.$refs.subTitle
      let width = 0
      for (let i = 0; i < li.length; i++) {
        width += li[i].offsetWidth
      }
      this.$refs.ulWrapper.style.width = width + 'px'
      if (!this.titleScroll) {
        this.titleScroll = new BScroll(this.$refs.TitleWrapper, {
          scrollX: true,
          click: true
        })
      } else {
        this.titleScroll.refresh()
      }
    },
    // 初始化右侧产品列表滚动条
    initProductScroll () {
      if (!this.productScroll) {
        this.productScroll = new BScroll(this.$refs.SectionWrapper, {
          scrollY: true,
          click: true,
          disableTouch: false
        })
      }
    }
  },
  watch: {
    // 当前选中的 title
    currentIndex (newVal, oldVal) {
      this.titleScroll.scrollToElement(this.$refs.subTitle[newVal], 0)
    },
    // 从父组件接收的数据
    rightContent (newVal, oldVal) {
      this.currentIndex = 0
      this.$nextTick(() => {
        this.initTitleScroll()
        if (this.productScroll) {
          this.productScroll.refresh()
          const el = document.querySelectorAll('.category-title')[0]
          this.productScroll.scrollToElement(el, 0)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.content-container {
  margin-left: 2.507rem;
  font-size: .373rem;
  // 右侧标题
  .subTitile-wrapper {
    overflow: hidden;
    border-bottom: .027rem solid #e8e9e8;
    .title-wrapper-ul {
      display: flex;
      .title-item {
        flex-shrink: 0;
        text-align: center;
        padding: .387rem .267rem;
        box-sizing: border-box;
      }
      .title-item.selected {
        color: #3cb963;
      }
    }
  }
  // 右侧内容
  .section-wrapper {
    position: absolute;
    top: 2.667rem;
    left: 2.507rem;
    bottom: 1.333rem;
    overflow: hidden;
    .content-wrapper {
      .category-title {
        height: 1.067rem;
        line-height: 1.067rem;
        padding-left: .133rem;
        background-color: #f3f5f7;
        border-left: .08rem solid #eee;
      }
      .product-item {
        position: relative;
        padding-left: .133rem;
        display: flex;
        border-bottom: .027rem solid #eee;
        .product-image {
          width: 1.867rem;
          height: 1.867rem;
        }
        .info {
          padding: .133rem .267rem .533rem .133rem;
          .name {
            font-size: .373rem;
          }
          .spec {
            margin-top: .08rem;
            margin-bottom: .08rem;
            font-size: .32rem;
            color: #999;
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .cur-price {
            color: #ff0000;
            margin-right: .213rem;
          }
          .ori-price {
            color: #b2b2b2;
            text-decoration: line-through;
            font-size: .8em;
          }
          .cart-icon {
            position: absolute;
            right: .533rem;
            bottom: .213rem;
            width: .667rem;
            height: .667rem;
            line-height: .667rem;
            text-align: center;
            color: #fff;
            font-size: .427rem;
            border-radius: 50%;
            background-color: #45c16c;
          }
        }
      }
    }
  }
}
</style>
