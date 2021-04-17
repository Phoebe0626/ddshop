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
      <div class="all-cate" v-show="isShowAllCate">
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
    <!-- 菜谱 -->
    <div class="recipe" v-show="!isShowAllCate">
      <ul>
        <li
        class="item"
        v-for="(item, index) in recipeList"
        :key="index"
        >
          <!-- 封面图片 -->
          <van-image
            fit="cover"
            class="cover"
            :src="item.image"
            radius="8px"
          ></van-image>
          <!-- 标题 -->
          <div class="title">
            {{ item.name }}
          </div>
          <!-- 作者 -->
          <div class="author">
            <van-image
              round
              :src="item.author_avatar"
              width="35"
              height="35"
            ></van-image>
            <div class="name">{{item.author_name}}</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { Search, Icon, Image } from 'vant'
import { getTodayMenuCategoryList, getTodayMenuDetail } from '../../api/eat'
import BScroll from 'better-scroll'
export default {
  components: {
    [Image.name]: Image,
    [Icon.name]: Icon,
    [Search.name]: Search
  },
  data () {
    return {
      recipeList: [], // 菜谱列表
      params: 'lk01', // 参数 - 获取菜谱
      currentIndex: 0, // 当前选中的分类
      isShowAllCate: false, // 显示菜单分类 下拉菜单
      categoryList: [] // 菜单分类
    }
  },
  created () {
    this.loadRecipeList()
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
    async loadRecipeList () {
      const res = await getTodayMenuDetail(this.params)
      console.log(res)
      this.recipeList = res.data.big_recommend.list
    },
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
    margin-top: .32rem;
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
    height: 12.8rem;
    font-size: .32rem;
    color: #4c4c4c;
    transform-origin: top;
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
  // 菜谱
  .recipe {
    margin-top: .4rem;
    ul {
      .item {
        display: inline-block;
        width: 50%;
        box-sizing: border-box;
        padding: 0 .267rem;
        margin-bottom: .267rem;
        overflow: hidden;
        .cover {
          height: 3.333rem;
        }
        .title {
          margin-top: .213rem;
          margin-bottom: .32rem;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          font-size: .427rem;
          font-weight: 700;
        }
        .author {
          display: flex;
          align-items: center;
          .name {
            margin-left: .267rem;
            font-size: .373rem;
            color: #999999;
          }
        }
      }
      li:nth-child(even) {
        padding-left: .133rem;
      }
      li:nth-child(odd) {
        padding-right: .133rem;
      }
    }
  }
}

.dropdown-leave-active,
.dropdown-enter-active {
  transition: all 0.2s ease-in-out;
}
.dropdown-leave-to,
.dropdown-enter{
  transform: scaleY(0);
  opacity: 0;
}

</style>
