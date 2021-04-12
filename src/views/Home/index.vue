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
    <div class="vip">
      <div class="left">
        <svg-icon class="vip-icon" iconClass="vip"></svg-icon>
        <span>加入会员·每年预计节省806元</span>
      </div>
      <div class="right">5折开卡></div>
    </div>
    <!-- 限时抢购 -->
    <div class="flash-sale">
      <!-- 标题区域 -->
      <div class="title">
       <div class="left">
         <span>限时抢购</span>
         <div class="time">
           <div class="time-item">{{ (time.h &lt; 10) ? ('0' + time.h) : time.h }}</div>
           <div class="time-item">{{ (time.m &lt; 10) ? ('0' + time.m) : time.m }}</div>
           <div class="time-item">{{ (time.s &lt; 10) ? ('0' + time.s) : time.s }}</div>
         </div>
        </div>
        <div class="right">更多</div>
      </div>
      <!-- 商品区域 -->
      <div ref="wrapper" class="wrapper">
        <ul class="goods">
          <li class="goods-item" v-for="(item, index) in flashGoods" :key="index" @click="$router.push(`/GoodsDetail?name=${item.name}&spec=${item.spec}&small_image=${item.small_image}&total_sales=${item.total_sales}&price=${item.price}&origin_price=${item.origin_price}&isFlash=true`)">
            <img :src="item.small_image" alt="" style="width: 100%;">
            <span class="name">{{ item.name }}</span>
            <div class="buy">
              <div class="price">
                <div class="cur-price">￥{{ item.price }}</div>
                <div class="ori-price">￥{{ item.origin_price }}</div>
              </div>
              <van-icon class="icon-cart" name="cart-o" @click.stop="hAddToCart($event, item)" />
            </div>
          </li>
        </ul>
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
    </div>
    <!-- 特色专区 -->
    <div class="special">
      <div class="header">特色专区</div>
      <div class="goods">
        <!-- 新品尝鲜 -->
        <div class="newItem">
          <div class="title">{{ specialZone.newItemList[0].title }}</div>
          <div class="subtitle">{{ specialZone.newItemList[0].subtitle }}</div>
          <img class="image" :src="specialZone.newItemList[0].imageOne" alt="">
          <img class="image" :src="specialZone.newItemList[0].imageTwo" alt="">
        </div>
        <!-- 十二月爆款 -->
        <div class="hotItem">
          <div class="title">{{ specialZone.hotItemList[0].title }}</div>
          <div class="subtitle">{{ specialZone.hotItemList[0].subtitle }}</div>
          <img class="image" :src="specialZone.hotItemList[0].imageOne" alt="">
          <img class="image" :src="specialZone.hotItemList[0].imageTwo" alt="">
        </div>
          <!-- VIP 专享 -->
        <div class="vipItem">
          <div class="title">{{ specialZone.vipItemList[0].title }}</div>
          <div class="subtitle">{{ specialZone.vipItemList[0].subtitle }}</div>
          <img class="image" :src="specialZone.vipItemList[0].imageOne" alt="">
          <img class="image" :src="specialZone.vipItemList[0].imageTwo" alt="">
        </div>
        <!-- 吃什么 -->
        <div class="otherItem">
          <div class="title">{{ specialZone.otherItemList[0].title }}</div>
          <div class="subtitle">{{ specialZone.otherItemList[0].subtitle }}</div>
          <img class="image" src="../../assets/images/home/peanut.jpeg" alt="">
        </div>
        <!-- 平价菜场 -->
        <div class="lowPrice">
          <div class="title">{{ specialZone.lowPriceItemList[0].title }}</div>
          <div class="subtitle">{{ specialZone.lowPriceItemList[0].subtitle }}</div>
          <img class="image" :src="specialZone.lowPriceItemList[0].image" alt="">
        </div>
      </div>

    </div>
    <!-- 商品 -->
    <div class="tab">
      <van-tabs swipeable sticky>
        <van-tab title="全部">
          <production-item :list="allList"/>
        </van-tab>
        <van-tab title="晚餐">
          <production-item :list="flashGoods"/>
        </van-tab>
        <van-tab title="人气">
          <production-item :list="allList"/>
        </van-tab>
        <van-tab title="心选">
          <production-item :list="flashGoods"/>
        </van-tab>
      </van-tabs>
    </div>
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
import ProductionItem from './components/ProductionItem'
import Skelemon from './components/Skeleton.vue'
import Header from './components/Header'
import Swipe from './components/Swipe'
import Nav from './components/Nav'
import Bscroll from 'better-scroll'
export default {
  name: 'Home',
  components: {
    Nav,
    ProductionItem,
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
      curImage: '', // 当前执行动画的图片
      elLeft: '', // 小球初始位置 left
      elTop: '', // 小球初始位置 top
      balls: [], // 在动画中的小球集合
      allList: [], // tab - 全部
      specialZone: [], // 特色专区
      flashGoods: [], // 限时抢购
      time: { // 限时抢购倒计时
        h: 2,
        m: 0,
        s: 0
      },
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
    // 开始抢购模块的倒计时
    this.startTimer()
    // 应用 better-scroll
    this.loadHomeData().then(res => {
      this.$nextTick(() => {
        const li = document.querySelectorAll('.goods-item')
        const ul = document.querySelector('.goods')
        ul.style.width = li[0].clientWidth * li.length + 'px' // 给 ul 设置宽度
        if (!this.scroll) {
          this.scroll = new Bscroll(this.$refs.wrapper, {
            scrollX: true,
            eventPassthrough: 'vertical',
            disableTouch: false
          })
        }
      })
    })
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
    // 开始抢购模块的倒计时
    startTimer () {
      const t = setInterval(() => {
        if (this.time.s === 0 && this.time.m !== 0) {
          this.time.s = 59
          this.time.m--
        } else if (this.time.s === 0 && this.time.m === 0 && this.time.h !== 0) {
          this.time.h--
          this.time.m = 59
          this.time.s = 59
        } else if (this.time.s === 0 && this.time.m === 0 && this.time.h === 0) {
          clearInterval(t)
        } else {
          this.time.s--
        }
      }, 1000)
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
  // 开通会员
  .vip {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: .267rem;
    padding: 0 .3rem;
    height: .907rem;
    border-radius: .133rem;
    color: #fff;
    background-color: #4fc173;
    font-size: .32rem;
    .vip-icon {
      width: 1em;
      height: 1em;
      margin-right: .133rem;
    }
  }

  // 限时抢购
  .flash-sale {
    padding: 0 .267rem;
    margin-top: .533rem;
    .title {
      border-left: .133rem solid #3cb963;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        margin-left: .133rem;
        font-size: .48rem;
        .time {
          display: flex;
          .time-item {
            width: .533rem;
            height: .533rem;
            line-height: .533rem;
            background-color: #222;
            color: #fff;
            margin-left: .133rem;
            font-size: .373rem;
            text-align: center;
          }
        }
      }
      .right {
        font-size: .32rem;
        color: #3cb963;
      }
    }
    .wrapper {
      position: relative;
      margin-top: .533rem;
      overflow: hidden;
      .goods {
        display: flex;
        .goods-item {
          position: relative;
          flex-grow: 0;
          flex-shrink: 0;
          flex-basis: 2.8rem;
          padding-right: 0.5rem;
          .name {
            display: inline-block;
            font-size: 0.3129rem;
            height: 0.9rem;
            line-height: 0.533rem;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .buy {
            display: flex;
            justify-content: space-between;
            .price {
              .cur-price {
                color: #f37078;
                font-size: .427rem;
                font-weight: 600;
              }
              .ori-price {
                margin-top: -0.133rem;
                color: #999999;
                font-size: .32rem;
                text-decoration: line-through;
              }
            }
            .icon-cart {
              width: .6rem;
              height: .6rem;
              line-height: .66rem;
              font-size: .36rem;
              text-align: center;
              color: #fff;
              background-color: #43bf6a;
              border-radius: 50%;
            }
          }
        }
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
    }
  }

  // 特色专区
  .special {
    padding: 0 .267rem;
    margin-top: .533rem;
    .header {
      border-left: .133rem solid #3cb963;
      padding-left: .133rem;
      font-size: .48rem;
    }
    .goods {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      margin-top: .4rem;
      border: .027rem solid #dddbc0;
      font-size: .32rem;
      .subtitle {
        color: #808080;
      }
      .image {
        width: 1.467rem;
        padding: 0 .267rem;
      }

      .newItem {
        box-sizing: border-box;
        width: 50%;
        height: 2.347rem;
        padding: .08rem .133rem;
        border-right: .027rem solid #dddbc0;
        border-bottom: .027rem solid #dddbc0;
        overflow: hidden;
        .title {
          color: #ff7400;
        }
      }
      .hotItem {
        box-sizing: border-box;
        width: 50%;
        height: 2.347rem;
        padding: .08rem .133rem;
        border-bottom: .027rem solid #dddbc0;
        overflow: hidden;
        .title {
          color: #cc1a3d;
        }
      }

      .vipItem {
        box-sizing: border-box;
        width: 50%;
        height: 2.347rem;
        border-right: .027rem solid #dddbc0;
        padding: .08rem .133rem;
        overflow: hidden;
        .title {
          color: #3cab38;
        }
      }
      .otherItem {
        box-sizing: border-box;
        width: 25%;
        height: 2.347rem;
        padding: .08rem .133rem;
        border-right: .027rem solid #dddbc0;
        overflow: hidden;
      }
      .lowPrice {
        box-sizing: border-box;
        width: 25%;
        height: 2.347rem;
        padding: .08rem .133rem;
        overflow: hidden;
      }
    }
  }
  // tab 栏
  .tab {
    margin-top: .4rem;
    /deep/.van-tabs__line {
      width: 1.2rem;
      background-color: #4fc173;
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
