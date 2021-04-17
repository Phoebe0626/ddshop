<template>
  <div class="eat-container">
    <!-- 头部 搜索栏 -->
    <header class="header">
      <van-search
        class="search"
        @click="hSearch"
        shape="round"
        placeholder="请输入搜索关键词"
        disabled
      />
      <svg-icon class="icon" iconClass="collection"></svg-icon>
    </header>
    <!-- 标题 今日菜单 -->
    <div class="title">
      <span>今日菜单</span>
    </div>
    <!-- 分类 -->
    <div class="cate">
      <div class="left" ref="CateWrapper">
        <ul class="ulWrapper">
          <li
            class="cate-item"
            :class="{selected: currentIndex === index}"
            v-for="(item, index) in categoryList"
            :key="item.id"
            @click="currentIndex=index"
          >{{ item.name }}</li>
        </ul>
      </div>
      <div class="right" @click="isShowAllCate=!isShowAllCate">
        <span v-if="!isShowAllCate">全部</span>
        <span v-else>收起</span>
        <van-icon v-if="!isShowAllCate" class="dropdown-icon" name="arrow-down" />
        <van-icon v-else class="dropdown-icon" name="arrow-up" />
      </div>
    </div>
    <!-- 所有菜单分类 -->
    <transition
      name="dropdown"
    >
      <div v-if="isShowAllCate" class="all-cate">
        <div class="title">菜单分类</div>
        <div class="cate">
          <div
            class="item"
            v-for="(item, index) in categoryList"
            :key="item.id"
            @click="currentIndex = index; isShowAllCate=false"
          >
            <span>{{ item.name }}</span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { Search, Icon } from 'vant'
import { getTodayMenuCategoryList } from '../../api/eat'
import BScroll from 'better-scroll'
export default {
  components: {
    [Icon.name]: Icon,
    [Search.name]: Search
  },
  data () {
    return {
      currentIndex: 0, // 当前选中的分类
      isShowAllCate: true, // 显示菜单分类 下拉菜单
      categoryList: [] // 菜单分类
    }
  },
  created () {
    this.loadTodayMenuCategoryList().then(() => {
      this.$nextTick(() => {
        if (!this.cateScroll) {
          this.initCateScroll()
        } else {
          this.cateScroll.refresh()
        }
      })
    })
  },
  methods: {
    // 初始化 better-scroll
    initCateScroll () {
      const ul = document.querySelector('.ulWrapper')
      const li = document.querySelectorAll('.cate-item')
      let width = 0
      for (let i = 0; i < li.length; i++) {
        width = width + li[0].offsetWidth + 4
      }
      ul.style.width = width + 'px'
      this.cateScroll = new BScroll(this.$refs.CateWrapper, {
        scrollX: true,
        click: true,
        disableTouch: false
      })
    },
    // 获取今日菜单的菜单分类
    async loadTodayMenuCategoryList () {
      const res = await getTodayMenuCategoryList()
      this.categoryList = res.data.list
    },
    // 头部搜索栏
    hSearch () {
      this.$toast('暂未实现')
    }
  },
  watch: {
    currentIndex (newVal, oldVal) {
      this.cateScroll.scrollToElement(document.querySelectorAll('.cate-item')[newVal], 300)
    }
  }
}
</script>

<style lang="less" scoped>
.eat-container {
  // 头部 搜索区域
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: .213rem;
    .search {
      flex: 1;
    }
    .icon {
      width: .4rem;
      height: .4rem;
    }
  }
  // 标题 今日菜单
  .title {
    padding-left: .267rem;
    span {
      padding: .08rem;
      padding-left: .133rem;
      border-left: .107rem solid #3cb963;
      font-size: .48rem;
    }
  }
  // 菜单分类
  .cate {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: .693rem;
    padding-left: .213rem;
    margin-top: .16rem;
    .left {
      width: 80%;
      padding-left: .053rem;
      overflow: hidden;
        ul {
        display: flex;
        .cate-item {
          flex-shrink: 0;
          margin-right: .213rem;
          padding: .08rem .133rem;
          font-size: .373rem;
          border: .027rem solid #eee;
          border-radius: .32rem;
          &.selected {
            border-color: #3cb963;
            color: #3cb963;
          }
        }
      }
    }
    .right {
      padding-right: .267rem;
      font-size: .347rem;
      color: gray;
      .dropdown-icon {
        margin-left: .133rem;
        vertical-align: middle;
      }
    }
  }
  // 下拉菜单
  .all-cate {
    // height: 10.933rem;
    font-size: .32rem;
    color: #4c4c4c;
    .title {
      margin-top: .32rem;
      margin-bottom: .267rem;
    }
    .cate {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      .item {
        width: 25%;
        height: .86rem;
        margin-bottom: .133rem;
        span {
          display: inline-block;
          width: 1.6rem;
          height: .747rem;
          line-height: .747rem;
          border: .027rem solid #e4e4e4;
          border-radius: .373rem;
          text-align: center;
        }
      }
    }
  }
}

.dropdown-enter-active{
  transition: all .3s ease-in;
}
.dropdown-leave-active {
  transition: all .3s ease-out
}

.dropdown-enter,
.dropdown-leave-to {
  opacity: 0;
}

// .dropdown-enter-to,
// .dropdown-leave {
//   height: 10.933rem;
// }
</style>
