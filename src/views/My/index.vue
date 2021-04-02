<template>
  <div class="my-container">
    <van-nav-bar
      title="我的"
      :border="false"
      placeholder
    />
    <div class="mine-wrap">
      <!-- 顶部个人信息 -->
      <van-cell id="user-wrap" title="单元格">
        <template slot="title">
          <div class="user-wrap">
            <div class="avatar">
              <img src="../../assets/images/my/default_avatar.jpg" style="width: 2rem; height: 2rem; border-radius: 50%;" alt="">
            </div>
            <div class="info">
              <span>{{userInfo.user_name}}</span>
              <span>手机号: {{phone}}</span>
            </div>
          </div>
        </template>
        <template slot="right-icon">
          <van-icon name="arrow" class="arrow-icon" />
        </template>
      </van-cell>
      <!-- 我的订单 -->
      <van-cell title="我的订单" icon="label"  is-link value="查看全部订单">
      </van-cell>
      <!-- 订单宫格 -->
      <van-grid :border="false">
        <van-grid-item icon="cart-circle-o" text="待支付" />
        <van-grid-item icon="gift-o" text="待收货" />
        <van-grid-item icon="smile-comment-o" text="待评价" />
        <van-grid-item icon="cash-back-record" text="售后/退款" />
      </van-grid>
      <!-- 优惠券 + 收货地址 -->
      <van-cell-group style="margin-top: 0.2rem;">
        <van-cell is-link title="我的优惠券" icon="gold-coin"></van-cell>
        <van-cell is-link title="我的收货地址" icon="todo-list"></van-cell>
      </van-cell-group>
      <!-- 我的绿卡 -->
      <van-cell-group style="margin-top: 0.2rem;">
        <van-cell icon="vip-card" is-link>
          <template slot="title">
            <span class="custom-title">我的绿卡</span>
            <van-tag type="danger" round style="margin-left: .2rem;">New</van-tag>
          </template>
        </van-cell>
      </van-cell-group>
      <!-- 联系客服 + 意见反馈 -->
      <van-cell-group style="margin-top: 0.2rem;">
        <van-cell is-link title="联系客服" icon="phone" value="客服时间 07:00-22:00"></van-cell>
        <van-cell is-link title="意见反馈" icon="comment-circle"></van-cell>
      </van-cell-group>
      <div class="version">当前版本 2.1.1</div>
    </div>
  </div>
</template>

<script>
import { NavBar, Cell, CellGroup, Icon, Grid, GridItem, Tag } from 'vant'
import { mapGetters } from 'vuex'
export default {
  components: {
    [Tag.name]: Tag,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [NavBar.name]: NavBar
  },
  computed: {
    ...mapGetters(['userInfo']),
    phone () {
      const val = this.userInfo.phone
      return val.substr(0, 3) + '****' + val.substr(7)
    }
  }
}
</script>

<style lang="less" scoped>
.version {
  padding-top: .4rem;
  color: grey;
  font-size: .32rem;
  background-color: #fff;
  text-align: center;
}
.van-nav-bar {
  background-color: #3bba63;
  /deep/.van-nav-bar__title {
    color: #fff;
    font-size: .373rem;
    line-height: .373rem;
  }
}
#user-wrap {
  background-color: #3bba63;

  .user-wrap {
    display: flex;
    color: #fff;
    .info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-left: .48rem;
    }
  }
}

.arrow-icon {
  font-size: 16px;
  line-height: 2.187rem;
  color: #fff;
}

.van-cell__left-icon {
  color: #3bba63;
  font-size: .48rem;
}

.mine-wrap {
  background-color: #f5f5f5;
}
</style>
