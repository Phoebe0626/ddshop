<template>
  <div class="good-list-container">
    <van-cell
      is-link
      @click="isShow=true"
    >
      <template slot="title">
        <div class="pic" ref="Outter">
          <div class="wrapper" ref="Inner">
            <img
              class="img-item"
              v-for="(item, index) in goodsList"
              :key="index"
              :src="item.small_image"
            >
          </div>
        </div>
      </template>
      <template slot="default">
        共{{count}}件
      </template>
    </van-cell>

    <van-action-sheet
      v-model="isShow"
      :title="title"
    >
      <div class="content" ref="OutterList">
        <ul ref="InnerList">
          <li
            class="list-item"
            v-for="(item, index) in goodsList"
            :key="index"
          >
            <div class="left">
              <img :src="item.small_image" alt="">
            </div>
            <div class="center">
              <div class="name">{{item.name}}</div>
              <div class="price">单价:￥{{item.price}}</div>
              <div class="count">数量:{{item.count}}</div>
            </div>
            <div class="right">
              ￥{{item.price * item.count}}
            </div>
          </li>
        </ul>
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Cell, ActionSheet } from 'vant'
import BScroll from 'better-scroll'
export default {
  components: {
    [ActionSheet.name]: ActionSheet,
    [Cell.name]: Cell
  },
  computed: {
    ...mapGetters(['cartList']),
    title () {
      return `共 ${this.count} 件商品`
    },
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
    // 订单商品列表
    goodsList () {
      const arr = []
      this.cartList.forEach(item => {
        if (item.checked) {
          arr.push(item)
        }
      })
      return arr
    }
  },
  data () {
    return {
      isShow: false
    }
  },
  mounted () {
    this.$nextTick(() => {
      // 初始化 better-scroll
      if (!this.imgScroll) {
        this.initImgScroll()
      }
    })
  },
  methods: {
    // 初始化纵向列表滚动条
    initListScroll () {
      this.listScroll = new BScroll(this.$refs.OutterList, {
        scrollY: true,
        bindToWrapper: true,
        disableTouch: false
      })
    },
    // 初始化横向图片滚动条
    initImgScroll () {
      const inner = this.$refs.Inner
      const imgItem = document.querySelectorAll('.img-item')
      inner.style.width = imgItem[0].clientWidth * imgItem.length + 'px'
      this.imgScroll = new BScroll(this.$refs.Outter, {
        scrollX: true,
        disableTouch: false
      })
    }
  },
  watch: {
    isShow (newVal) {
      if (newVal) {
        this.$nextTick(() => {
          if (!this.listScroll) {
            this.initListScroll()
          } else {
            this.listScroll.refresh()
            this.listScroll.scrollToElement(document.querySelectorAll('.list-item')[0])
          }
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.van-cell {
  display: flex;
  align-items: center;
}
/deep/.van-action-sheet__header {
  background-color: #f5f5f5;
}
.good-list-container {
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
  // 弹层区域
  .content {
    height: 10.667rem;
    background-color: #f5f5f5;
    padding: 0 .213rem;
    font-size: .373rem;
    overflow: hidden;
    ul {
      border-radius: .133rem;
      padding: 0 .213rem;
      background-color: #fff;
      li:not(:last-child) {
        border-bottom: .027rem solid #f3f3f3;
      }
      li {
        display: flex;
        padding: .133rem .16rem .213rem .4rem;
        .left {
          width: 1.6rem;
          height: 1.6rem;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .center {
          margin-left: .267rem;
          .price,
          .count {
            font-size: .32rem;
            color: gray;
          }
        }
        .right {
          margin-left: auto;
        }
      }
    }
  }
}

</style>
