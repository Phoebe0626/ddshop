<template>
  <div class="category-container">
    <Header></Header>
    <Skeleton v-if="!rightContent.length"/>
    <div v-else>
      <!-- 左侧分类 -->
      <div class="cate-wrapper" ref="leftWrapper">
        <ul>
          <li
            class="cate-item"
            v-for="(item, index) in category"
            :class="{ selected: currentIndex === index }"
            :key="item.id"
            @click="hSelectCate(index)"
            ref="MenuList"
          >
            <span>{{ item.name }}</span>
          </li>
        </ul>
      </div>
      <!-- 右侧数据 -->
      <content-view :rightContent=rightContent></content-view>
    </div>
  </div>
</template>

<script>
import Header from './components/Header'
import ContentView from './components/ContentView'
import Skeleton from './components/Skeleton'
import Bscroll from 'better-scroll'
import { getCate, getCateDetail } from '../../api/cate'
export default {
  components: {
    Skeleton,
    ContentView,
    Header
  },
  data () {
    return {
      rightContent: [], // 右侧的数据
      currentIndex: 0, // 当前选中的分类
      category: [] // 分类列表
    }
  },
  mounted () {
    this.initData().then(res => {
      const ul = document.querySelector('.cate-wrapper ul')
      const li = document.querySelectorAll('.cate-wrapper li')
      ul.style.height = li[0].offsetHeight * li.length + 'px'
      this.$nextTick(() => {
        if (!this.leftScroll) {
          this.leftScroll = new Bscroll(this.$refs.leftWrapper, {
            scrollY: true,
            click: true,
            disableTouch: false
          })
        }
      })
    })
  },
  methods: {
    // 左侧选择分类
    async hSelectCate (index) {
      // 改变当前索引
      this.currentIndex = index
      // 滚动到选中位置
      setTimeout(() => {
        const MenuList = this.$refs.MenuList
        const el = MenuList[index]
        this.leftScroll.scrollToElement(el, 300)
      }, 600)
      // 获取右边数据
      let params
      if (index >= 9) {
        params = `lk0${index + 1}`
      } else {
        params = `lk00${index + 1}`
      }
      const res = await getCateDetail(params)
      this.rightContent = res.data.cate
    },
    // 初始化信息
    async initData () {
      const leftRes = await getCate()
      this.category = leftRes.data.cate
      const rightRes = await getCateDetail('lk001')
      this.rightContent = rightRes.data.cate
    }
  }
}
</script>

<style lang="less" scoped>
.category-container {
  .cate-wrapper {
    display: flex;
    position: absolute;
    top: 1.36rem;
    bottom: 1.333rem;
    overflow: hidden;
    ul {
      width: 2.507rem;
      .cate-item {
        width: 2.507rem;
        height: 1.28rem;
        padding: .4rem 0;
        border-bottom: .027rem solid #e8e9e8;
        background-color: #f5f5f5;
        font-size: .373rem;
        box-sizing: border-box;
        span {
          padding: .217rem .4rem;
          border-left: .08rem solid transparent;
        }
      }
      .cate-item.selected {
        background-color: #fff;
        span {
          border-left-color: #3cb963;
          font-weight: 700;
        }
      }
    }
  }
}
</style>
