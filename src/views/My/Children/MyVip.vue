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
      <div>
        <div class="header">
        <!-- 绿卡图片 -->
        <div class="img">
          <img src="../../../assets/images/my/vip.png" alt="">
        </div>
        <!-- 特权 -->
        <div class="privilege">
          <div class="title">绿卡特权</div>
          <van-grid :border="false">
            <van-grid-item icon="vip-card-o" text="专享券" />
            <van-grid-item icon="discount" text="专享特价" />
            <van-grid-item icon="gem-o" text="2倍积分" />
            <van-grid-item icon="more-o" text="更多特权" />
          </van-grid>
          <div class="button">5折开通绿卡</div>
        </div>
      </div>
      <!-- 优惠券列表 -->
      <div class="coupons">
        <div class="coupons-header">
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
        <div class="coupons-wrapper">
          <div class="coupons-item">
            <div class="left">
              ￥<span class="num">4</span>
              <div class="info">
                <div class="firstline">满49.00元使用</div>
                <div class="secondline">全场通用</div>
              </div>
            </div>
            <div class="right">立即领取</div>
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
      <!-- 底部占位 -->
      <div style="width: 100%; height: 50px;"></div>
    </div>
    </div>
    <!-- footer -->
    <footer class="footer">
      <div class="left">
        <span class="txt">连续包年</span>
        ￥<span class="num">88</span>
      </div>
      <div class="right">立即开通</div>
    </footer>
  </div>
</template>

<script>
import { NavBar, Icon, Grid, GridItem } from 'vant'
import BScroll from 'better-scroll'
export default {
  components: {
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [Icon.name]: Icon,
    [NavBar.name]: NavBar
  },
  mounted () {
    setTimeout(() => {
      if (!this.vipScroll) {
        this.vipScroll = new BScroll(this.$refs.Vip, {
          scrollY: true,
          click: true,
          disableTouch: false
        })
      } else {
        this.vipScroll.refresh()
      }
    }, 30)
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
  padding-bottom: 1.333rem;
  .content {
    overflow: hidden;
    height: 100%;
  }
  .header {
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
  .coupons {
    padding: .267rem;
      .coupons-header {
        display: flex;
        justify-content: space-between;
        padding-bottom: .133rem;
        border-bottom: .027rem solid #ebebeb;
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
          height: 1.28rem;
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
            font-size: .32rem;
          }
        }
      }
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
  .footer {
    display: flex;
    position: fixed;
    bottom: .133rem;
    left: 50%;
    transform: translateX(-50%);
    width: 96%;
    height: 1.28rem;
    border-radius: 0.64rem;
    overflow: hidden;
    box-shadow: 0 .107rem .107rem #e2e2e2;
    .left {
      width: 70%;
      height: 100%;
      padding-left: .667rem;
      line-height: 1.28rem;
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
      line-height: 1.28rem;
      font-weight: 700;
      color: #381b0e;
    }
  }
}
</style>
