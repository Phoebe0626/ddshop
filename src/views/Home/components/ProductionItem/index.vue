<template>
  <div class="production-item-container">
    <div class="item" v-for="(item, index) in list" :key="index" @click="$router.push(`/GoodsDetail?name=${item.name}&spec=${item.spec}&small_image=${item.small_image}&total_sales=${item.total_sales}&price=${item.price}&origin_price=${item.origin_price}`)">
      <div class="image">
        <van-image lazy-load :src="item.small_image"></van-image>
      </div>
      <div class="name">{{ item.name }}</div>
      <div class="intro">{{ item.spec }}</div>
      <div class="buy">
        <div class="price">
          <span class="cur-price">￥{{ item.price }}</span>
          <span class="ori-price">￥{{ item.origin_price }}</span>
        </div>
        <van-icon class="icon-cart" name="cart-o" />
      </div>
    </div>
  </div>
</template>

<script>
import { Icon, Image } from 'vant'
export default {
  components: {
    [Image.name]: Image,
    [Icon.name]: Icon
  },
  props: {
    list: {
      type: Array
    }
  }
}
</script>

<style lang="less" scoped>
.production-item-container {
  padding: .133rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  background-color: #f5f5f5;

  .item {
    width: 49%;
    margin-bottom: .133rem;
    padding-bottom: .267rem;
    background-color: #fff;
    .name {
      font-size: .32rem;
      padding-left: .133rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .intro {
      font-size: .32rem;
      color: #999;
      padding-left: .133rem;
      margin-bottom: .533rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .buy {
      display: flex;
      justify-content: space-between;
      padding: 0 .133rem;
      .price {
        .cur-price {
          margin-right: .133rem;
          font-size: .427rem;
          font-weight: 600;
          color: #f37078;
        }
        .ori-price {
          font-size: .32rem;
          text-decoration: line-through;
          color: #999;
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

</style>
