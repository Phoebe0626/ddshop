<template>
  <div class="home-container">
  <skelemon v-if="isShowSkelemon" />
  <div v-else>
    <!-- 头部地址 搜索 + 轮播图 -->
    <div class="header-wrap">
      <Header />
      <Swipe :swipe-list="swipeList" />
      <!-- 广告条绿色字 -->
      <div class="green-text">
        <div class="item">
          <i class="iconfont">&#xe743;</i>
          <span class="green-txt">最快29分钟送达</span>
        </div>
        <div class="item">
          <i class="iconfont">&#xe7eb;</i>
          <span class="green-txt">0元起送 0配送费</span>
        </div>
        <div class="item">
          <i class="iconfont">&#xe9ca;</i>
          <span class="green-txt">安心退</span>
        </div>
      </div>
    </div>
    <!-- 广告图片 -->
      <van-image :src="homeAd"></van-image>
    <!-- 商品分类 Grid -->
    <Nav :itemCate="itemCate" />
    <!-- 开通会员 -->
    <Vip />
    <!-- 限时抢购 -->
    <Flash
      @add-to-cart="hAddToCart"
      :flashGoods="flashGoods"
    />
    <!-- 特色专区 -->
    <Special :specialZone="specialZone" />
    <!-- 商品 -->
    <Tabbar :allList="allList" :flashGoods="flashGoods" />
    <div class="divider">
      <van-divider>没有更多了</van-divider>
    </div>
  </div>
  <to-top />
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import { Icon, Image, Grid, GridItem, Tab, Tabs, Lazyload, Divider } from 'vant'
import { getHomeData } from '../../api/home'
import Skelemon from './components/Skeleton.vue'
import Header from './components/Header'
import Swipe from './components/Swipe'
import Nav from './components/Nav'
import Vip from './components/Vip'
import Flash from './components/Flash'
import Special from './components/Special'
import Tabbar from './components/Tabbar'
export default {
  name: 'Home',
  components: {
    Tabbar,
    Special,
    Flash,
    Vip,
    Nav,
    Swipe,
    Header,
    Skelemon,
    [Divider.name]: Divider,
    [Lazyload.name]: Lazyload,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [Image.name]: Image,
    [Icon.name]: Icon
  },
  computed: {
    ...mapGetters(['token'])
  },
  data () {
    return {
      allList: [], // tab - 全部
      specialZone: [], // 特色专区
      flashGoods: [], // 限时抢购
      isShowSkelemon: true, // 是否显示骨架屏
      itemCate: [], // 商品分类
      homeAd: '', // 广告图连接
      greenText: '', // 绿色字连接
      swipeList: [] // 轮播图数据
    }
  },
  created () {
    // // 加载首页需要的数据
    // this.loadHomeData()
    // 应用 better-scroll
    this.loadHomeData()
  },
  methods: {
    ...mapMutations(['addToCart']),
    beforeEnter (el) {
      el.style.transform = `translate(${this.elLeft}px, ${this.elTop}px)`
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
      }
      this.curProduct = {
        id: item.id,
        name: item.name,
        price: item.price,
        count: 1,
        small_image: item.small_image,
        checked: true
      }
    },
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
      this.isShowSkelemon = false // 显示内容
      // 获取限时抢购商品列表
      this.flashGoods = res.data.list.filter(item => {
        return item.type === 3
      })[0].product_list
      this.specialZone = res.data.special_zone
      this.allList = res.data.list.filter(item => {
        return item.type === 13
      })[0].product_list
      // console.log(this.allList)
    }
  }
}
</script>

<style lang="less" scoped>
// 引入 iconfont
@font-face {
  font-family: 'iconfont';  /* project id 2467864 */
  src: url('//at.alicdn.com/t/font_2467864_e941dxyy2e9.eot');
  src: url('//at.alicdn.com/t/font_2467864_e941dxyy2e9.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_2467864_e941dxyy2e9.woff2') format('woff2'),
  url('//at.alicdn.com/t/font_2467864_e941dxyy2e9.woff') format('woff'),
  url('//at.alicdn.com/t/font_2467864_e941dxyy2e9.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_2467864_e941dxyy2e9.svg#iconfont') format('svg');
}
.iconfont{
    font-family:"iconfont" !important;
    font-size:16px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;}
.home-container {
  // 头部 （位置 搜索 + 轮播图
  .header-wrap {
    padding: .267rem .267rem 0;
    background: url('../../assets/images/home/bg1.jpg') no-repeat;
    background-size: cover;
    // 绿色字
    .green-text {
      display: flex;
      justify-content: space-between;
      padding: .2rem 0;
      color: green;
      font-size: .32rem;
      .iconfont {
        margin-right: .107rem;
      }
    }
  }

  .divider {
    height: .8rem;
    margin-top: -0.533rem;
    background-color: #f5f5f5;
  }
}

</style>

<style>
.van-sticky--fixed {
  top: 1.467rem;
}
</style>
