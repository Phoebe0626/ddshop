<template>
  <div class="content-container">
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
  </div>
</template>

<script>
import BScroll from 'better-scroll'
// import Bscroll from 'better-scroll'
export default {
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
    })
  },
  methods: {
    // 点击右侧标题
    hSelectTitle (index) {
      this.currentIndex = index
      this.titleScroll.scrollToElement(this.$refs.subTitle[index], 300)
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
      })
    }
  }
}
</script>

<style lang="less" scoped>
.content-container {
  margin-left: 2.507rem;
  font-size: .373rem;
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
}
</style>
