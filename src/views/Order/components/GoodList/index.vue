<template>
  <div class="good-list-container">
    <van-cell
      is-link
    >
      <template slot="title">
        <div class="pic" ref="Outter">
          <div class="wrapper" ref="Inner">
            <img
              class="img-item"
              v-for="(item, index) in imgList"
              :key="index"
              :src="item"
            >
          </div>
        </div>
      </template>
      <template slot="default">
        共{{count}}件
      </template>
    </van-cell>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Cell } from 'vant'
import BScroll from 'better-scroll'
export default {
  components: {
    [Cell.name]: Cell
  },
  computed: {
    ...mapGetters(['cartList']),
    // 订单总数
    count () {
      let sum = 0
      this.cartList.forEach(item => {
        if (item.checked) {
          sum += item.count
        }
      })
      return sum
    },
    // 订单商品的图片
    imgList () {
      const arr = []
      this.cartList.forEach(item => {
        if (item.checked) {
          arr.push(item.small_image)
        }
      })
      return arr
    }
  },
  data () {
    return {
    }
  },
  mounted () {
    this.$nextTick(() => {
      if (!this.imgScroll) {
        const inner = this.$refs.Inner
        const imgItem = document.querySelectorAll('.img-item')
        inner.style.width = imgItem[0].clientWidth * imgItem.length + 'px'
        this.imgScroll = new BScroll(this.$refs.Outter, {
          scrollX: true,
          disableTouch: false
        })
      }
    })
  }
}
</script>

<style lang="less" scoped>
/deep/.van-cell {
  display: flex;
  align-items: center;
}
.pic {
  width: 7.2rem;
  overflow: hidden;
  .wrapper {
  display: flex;
  flex-wrap: nowrap;
  height: 1.333rem;
  img {
    flex-shrink: 0;
    width: 1.333rem;
    height: 1.333rem;
  }
}
}
</style>
