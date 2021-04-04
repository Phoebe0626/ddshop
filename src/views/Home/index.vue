<template>
  <div class="home-container">
    <!-- 头部地址 搜索 + 轮播图 -->
    <div class="header-wrap">
      <!-- 头部搜索框 -->
      <div class="header">
        <!-- 选择位置 -->
        <div class="location">
          <van-icon name="location" />
          <span class="text">请选择位置&nbsp;</span>
          <van-icon name="arrow-down" />
        </div>
        <div class="search">
          <van-icon class="icon" name="search" />
          <span>请输入商品名称</span>
        </div>
      </div>
      <!-- 轮播图 -->
      <van-swipe
        class="my-swipe"
        :autoplay="3000"
        indicator-color="white"
      >
        <van-swipe-item v-for="(image, index) in swipeList" :key="index">
          <van-image class="image-item" :src="image.icon_url" fit="fill"></van-image>
        </van-swipe-item>
      </van-swipe>
      <!-- 广告条绿色字 -->
      <van-image :src="greenText"></van-image>
    </div>
    <!-- 广告 -->
    <!-- 广告图片 -->
      <van-image :src="homeAd"></van-image>
    <!-- 商品分类 Grid -->
    <van-grid column-num="5" :border="false">
      <van-grid-item
        v-for="(item, index) in itemCate"
        :key="index"
        :icon="item.icon_url"
        :text="item.name"
      />
    </van-grid>
  </div>
</template>

<script>
import { Icon, Swipe, SwipeItem, Image, Grid, GridItem } from 'vant'
import { getHomeData } from '../../api/home'
export default {
  name: 'Home',
  components: {
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [Image.name]: Image,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Icon.name]: Icon
  },
  data () {
    return {
      itemCate: [], // 商品分类
      homeAd: '', // 广告图连接
      greenText: '', // 绿色字连接
      swipeList: [] // 轮播图数据
    }
  },
  created () {
    // 加载首页需要的数据
    this.loadHomeData()
  },
  methods: {
    // 获取首页需要的数据
    async loadHomeData () {
      const res = await getHomeData()
      // 获取轮播图数据
      this.swipeList = res.data.list.filter(item => {
        return item.type === 8
      })[0].icon_list
      // 获取绿色字图片地址
      this.greenText = res.data.list.filter(item => {
        return item.type === 9
      })[0].image_url
      this.homeAd = res.data.home_ad.image_url
      // 获取分类
      this.itemCate = res.data.list.filter(item => {
        return item.type === 0
      })[0].icon_list
      console.log(this.itemCate)
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  // 头部 （位置 搜索 + 轮播图
  .header-wrap {
    padding: .267rem .267rem 0;
    .header {
      display: flex;
      justify-content: space-between;
      font-size: .373rem;
      // 选择位置
      .location {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 33%;
        height: .853rem;
        line-height: .853rem;
        color: #fff;
        background-color: rgba(0, 0, 0, .5);
        border-radius: .43rem;
        .text {
          margin: 0 .1rem;
        }
      }
      // 搜索框
      .search {
        display: flex;
        justify-content: center;
        align-items: center;
        height: .853rem;
        width: 65%;
        background-color: #f5f5f5;
        border-radius: .43rem;
        color: grey;
        .icon {
          margin-right: .1rem;
          font-size: .427rem;
        }
      }
    }
  }
}
</style>

<style>
  /* 轮播图样式 */
  .my-swipe {
    margin-top: .4rem;
  }
  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    text-align: center;
    height: 4.7rem;
  }
  .image-item {
    height: 4.7rem;
  }
</style>
