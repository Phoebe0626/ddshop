<template>
  <div class="vip-container">
      <van-nav-bar
      title="绿卡"
      left-arrow
      @click-left="$router.back()"
      :border="false"
      fixed
      placeholder
      safe-area-inset-top
    ></van-nav-bar>
    <div class="content" ref="Vip">
      <div class="bg">
        <!-- 绿卡图片 -->
        <div class="img">
          <img src="../../../assets/images/my/vip.png" alt="">
        </div>
        <!-- 特权 -->
        <div class="privilege">
          <div class="title">绿卡特权</div>
          <van-grid :border="false">
            <van-grid-item icon="vip-card-o" text="绿卡专享券" />
            <van-grid-item icon="discount" text="绿卡专享价" />
            <van-grid-item icon="calendar-o" text="周五绿卡日" />
            <van-grid-item icon="more-o" text="更多特权" />
          </van-grid>
          <div class="button">5折开通绿卡</div>
        </div>
      </div>
      <!-- 优惠券列表 -->
      <div class="coupons">
        <div class="coupons-header wrapper">
          <div class="header">
            <div class="left">
            <div class="title">绿卡专享券</div>
            <div class="subtitle">每周可领4张，每周一零点更新</div>
          </div>
          <div class="right">
            <div class="top">
              ￥<span class="num">152</span>
            </div>
            <div class="bottom">
              平均可省
            </div>
          </div>
          </div>
        </div>
        <div class="coupons-wrapper">
          <div class="coupons-item">
            <div class="left">
              ￥<span class="num">4</span>
              <div class="info">
                <div class="firstline">满49.00元使用</div>
                <div class="secondline">全场通用</div>
              </div>
            </div>
            <div class="right" @click="$toast('开通绿卡，立享绿卡专享券')">立即领取</div>
          </div>
          <div class="coupons-item">
            <div class="left">
              ￥<span class="num">5</span>
              <div class="info">
                <div class="firstline">满69.00元使用</div>
                <div class="secondline">全场通用</div>
              </div>
            </div>
            <div class="right">立即领取</div>
          </div>
          <div class="coupons-item">
            <div class="left">
              ￥<span class="num">6</span>
              <div class="info">
                <div class="firstline">满79.00元使用</div>
                <div class="secondline">全场通用</div>
              </div>
            </div>
            <div class="right">立即领取</div>
          </div>
          <div class="coupons-item">
            <div class="left">
              ￥<span class="num">7</span>
              <div class="info">
                <div class="firstline">满99.00元使用</div>
                <div class="secondline">全场通用</div>
              </div>
            </div>
            <div class="right">立即领取</div>
          </div>
        </div>
      </div>
      <!-- 绿卡专享价 -->
      <div class="discount wrapper">
        <div class="header">
          <div class="left">
            <div class="title">绿卡专享价</div>
            <div class="subtitle">800+超值低价商品等你来拿</div>
          </div>
          <div class="right">
            <div class="top">
              ￥<span class="num">368</span>
            </div>
            <div class="bottom">
              平均可省
            </div>
          </div>
        </div>
        <div class="products">
          <!-- 商品 item -->
          <div
            class="item"
            v-for="(item, index) in productList.slice(0, 6)"
            :key="index"
          >
            <div class="cover">
              <van-image
                width="90%"
                height="93"
                :src="item.small_image"
              >
                <template v-slot:loading>
                  <img width="93" height="93" src="../../../assets/images/placeholderImg/product-img-load.png" alt="" />
                </template>
              </van-image>
            </div>
            <div class="name">
              {{ item.name }}
            </div>
            <div class="bottom">
              <div class="left">
                <div class="cur-price"> ￥<span>{{ item.price }}</span> </div>
                <div class="ori-price">
                  ￥<span>{{ item.origin_price }}</span>
                  <svg-icon class="vip-icon" iconClass="v"></svg-icon>
                </div>
              </div>
              <div class="right">
                <svg-icon @click.native="hAddToCart(item)" class="car-icon" iconClass="car"></svg-icon>
              </div>
            </div>
          </div>
        </div>
        <!-- 按钮 -->
        <div class="button" @click="$toast('暂未实现')">查看全部800+绿卡价商品></div>
      </div>
    </div>
    <!-- 绿卡日 -->
    <div class="friday wrapper">
      <div class="header">
        <div class="left">
          <div class="title">周五绿卡日</div>
          <div class="subtitle">精选商品88折，独享大额好券</div>
        </div>
        <div class="right">
          <div class="top">
            ￥<span class="num">138</span>
          </div>
          <div class="bottom">
            平均可省
          </div>
        </div>
      </div>
      <div class="svg">
        <svg
          width="100%"
          height="100%"
          preserveAspectRatio="xMinYMin meet"
        >
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style="stop-color:#156c64;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#1f8e4a;stop-opacity:1" />
            </linearGradient>
          </defs>
          <polygon
            points="0 0, 210 0, 160 100, 0 100"
            fill="url(#grad1)"
          />
          <polygon
            points="209 0, 280 0, 230 100, 159 100"
            fill="#178349"
          />

          <polygon
            points="205 23, 269 23, 241 78, 205 78"
            fill="#ffedab"
          />

          <rect x="223" y="18" width="5" height="5" fill="#ffedab"/>
          <rect x="223" y="23" width="5" height="5" fill="#0b3c41"/>
          <rect x="255" y="18" width="5" height="5" fill="#ffedab"/>
          <rect x="255" y="23" width="5" height="5" fill="#0b3c41"/>

          <text
            style="fill:#083c3a;font-size:26px; font-weight: 700;"
            x="230"
            y="60"
          >五</text>

          <polygon
            points="280 0, 290 0, 240 100, 230 100"
            fill="#f5f5f5"
          />

          <polygon
            points="290 0, 350 0, 300 100, 240 100"
            fill="#208d49"
          />
          <polygon
            points="349 0, 380 0, 335 100, 299 100"
            fill="#178151"
          />
          <polygon
            points="379 0, 380 100, 334 100"
            fill="#228f4b"
          />
          <text style="fill:#fff;font-size:12px" x="20" y="35">全场绿卡价（部分特殊商品除外）</text>
          <text style="fill:#fff;font-size:12px" x="20" y="55">更多免费菜可选</text>
          <text style="fill:#ebcd81;font-size:12px" x="20" y="75">具体权益以活动当日为准</text>
        </svg>
      </div>
    </div>
    <div class="more">绿卡会员权益细则</div>
    <!-- footer -->
    <footer class="footer">
      <div class="left">
        <span class="txt">连续包年</span>
        ￥<span class="num">88</span>
      </div>
      <div class="right" @click="$router.push('/vipPay')">立即开通</div>
    </footer>
  </div>
</template>

<script>
import { getVipDiscount } from '@/api/vip'
import { NavBar, Icon, Grid, GridItem, Image } from 'vant'
import { mapMutations } from 'vuex'
export default {
  components: {
    [Image.name]: Image,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [Icon.name]: Icon,
    [NavBar.name]: NavBar
  },
  mounted () {
    this.loadVipProduct()
    const svg = document.getElementsByTagName('svg')
    for (let index = 0; index < svg.length; index++) {
      svg[index].setAttribute('viewBox', '0,0,' + svg[index].getBBox().width + ',' + svg[index].getBBox().height + '')
    }
  },
  data () {
    return {
      productList: []
    }
  },
  methods: {
    ...mapMutations(['addToCart']),
    hAddToCart (item) {
      console.log(item)
      const product = {
        checked: true,
        count: 1,
        id: item.id,
        name: item.name,
        price: item.price,
        small_image: item.small_image
      }
      this.addToCart(product)
      this.$toast('添加成功')
    },
    // 获取绿卡专享特价商品列表
    async loadVipProduct () {
      const res = await getVipDiscount()
      this.productList = res.data.cate_detail
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.van-nav-bar__content {
  background-color: #2e3748;
}

/deep/.van-nav-bar .van-icon {
  color: #fff;
}

/deep/.van-nav-bar__title {
  color: #fff;
}
.vip-container {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #f5f5f5;
  z-index: 999;
  overflow-y: auto;
  padding-bottom: 1.6rem;
  .bg {
    padding-bottom: .267rem;
    background-color: #fff;
    .img {
      img {
        width: 100%;
      }
    }
    .privilege {
      .title {
        color: #1b1b1b;
        padding-left: .4rem;
        font-size: .48rem;
        font-weight: 700;
      }
      .button {
        width: 6rem;
        height: 1.173rem;
        margin: 0 auto;
        line-height: 1.173rem;
        text-align: center;
        border-radius: .587rem;
        font-size: .427rem;
        font-weight: 700;
        color: #5fa85f;
        background-color: #2e3748;
      }
    }
  }
  // title 公用样式
  .wrapper {
    padding: 0 .267rem;
    .header {
      display: flex;
      justify-content: space-between;
      border-bottom: .027rem solid #ebebeb;
      height: 1.333rem;
      .left {
          .title {
            font-size: .48rem;
            font-weight: 700;
            color: #1b1b1b;
          }
          .subtitle {
            margin-top: .053rem;
            font-size: .373rem;
            color: #999;
          }
        }
        .right {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 1.973rem;
          height: 1.2rem;
          padding-bottom: .053rem;
          border-radius: .267rem .267rem 0 .267rem;
          color: #fff7cb;
          background-color: #163635;
          .top {
            font-size: .32rem;
            .num {
              font-size: .64rem;
              font-weight: 700;
            }
          }
          .bottom {
            margin-top: -0.107rem;
            font-size: .32rem;
          }
        }
    }
  }
  // 优惠券
  .coupons {
    padding: .267rem;
      .coupons-wrapper {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        margin-top: .4rem;
        .coupons-item {
          display: flex;
          flex-shrink: 0;
          width: 49%;
          height: 2.4rem;
          margin-bottom: .267rem;
          border-radius: .16rem;
          overflow: hidden;
          box-sizing: border-box;
          .left {
            width: 80%;
            height: 100%;
            padding: 10px;
            border-right: .053rem dashed #eacc7f;
            background: linear-gradient(90deg, rgba(250,236,192,1) 0%, rgba(235,207,133,1) 100%);
            box-sizing: border-box;
            font-size: .373rem;
            font-weight: 700;
            color: #4f331f;
            .num {
              font-size: .8rem;
            }
            .info {
              margin-top: .133rem;
              font-size: .32rem;
              font-weight: 400;
            }
          }
          .right {
            width: 20%;
            height: 100%;
            box-sizing: border-box;
            padding: .213rem;
            background-color: #eacc7f;
            font-size: .373rem;
            font-weight: 700;
            text-align: center;
            color: #33170e;
          }
        }
      }
  }
  // 专享特价
  .discount {
    padding: 0 .267rem;
    .products {
      margin-top: .267rem;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .item {
        width: 32%;
        padding: .133rem;
        margin-bottom: .267rem;
        border-radius: .213rem;
        background-color: #fff;
        box-sizing: border-box;
        .cover {
          text-align: center;
        }
        .name {
          height: 1.013rem;
          font-size: .373rem;
          word-break: break-all;
          overflow: hidden;
          display: -webkit-box;
          text-overflow: ellipsis;
          -webkit-line-clamp: 2;
        }
        .bottom {
          margin-top: .267rem;
          display: flex;
          justify-content: space-between;
          .left {
            .cur-price {
              font-size: .32rem;
              color: #e84b46;
              font-weight: 700;
              span {
                font-size: .427rem;
              }
            }
            .ori-price {
              font-size: 12px;
              color: #1d7428;
              font-weight: 700;
              .vip-icon {
                vertical-align: bottom;
                height: .48rem;
                margin-left: -0.08rem;
              }
            }
          }
          .right {
            .car-icon {
              width: .693rem;
            }
          }
        }
      }
    }
    .button {
      width: 90%;
      height: 1.067rem;
      margin: auto;
      line-height: 1.067rem;
      font-size: .427rem;
      font-weight: 700;
      text-align: center;
      color: #2b0e01;
      border-radius: .533rem;
      background: linear-gradient(90deg, rgba(250,236,192,1) 0%, rgba(235,207,133,1) 100%);
    }
  }
  // 周五绿卡日
  .friday {
    margin-top: .133rem;
    padding: .267rem;
    .svg {
      margin-top: .267rem;
      height: 2.667rem;
      border-radius: .213rem;
      overflow: hidden;
    }
  }
  .more {
    margin-top: .533rem;
    height: .667rem;
    line-height: .667rem;
    font-size: .32rem;
    text-decoration: underline;
    text-align: center;
    color: #999;
  }
  .footer {
    display: flex;
    position: fixed;
    bottom: .267rem;
    left: 50%;
    transform: translateX(-50%);
    width: 96%;
    height: 1.173rem;
    border-radius: .587rem;
    overflow: hidden;
    box-shadow: 0 .107rem .107rem #e2e2e2;
    .left {
      width: 70%;
      height: 100%;
      padding-left: .667rem;
      line-height: 1.173rem;
      background: linear-gradient(90deg, #265654 0%, #10292a 100%);
      font-size: .427rem;
      color: #ffe8a4;
      .txt {
        color: #fff;
      }
      .num {
        font-size: .587rem;
        font-weight: 700;
      }
    }
    .right {
      width: 30%;
      height: 100%;
      background: linear-gradient(90deg, #f9e3a6 0%, #e5c573 100%);
      text-align: center;
      font-size: .427rem;
      line-height: 1.173rem;
      font-weight: 700;
      color: #381b0e;
    }
  }
}
</style>
