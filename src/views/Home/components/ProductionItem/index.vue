<template>
  <div class="production-item-container">
    <div class="item" v-for="(item, index) in list" :key="index" @click="$router.push(`/GoodsDetail?id=${item.id}&name=${item.name}&spec=${item.spec}&small_image=${item.small_image}&total_sales=${item.total_sales}&price=${item.price}&origin_price=${item.origin_price}`)">
      <div class="image">
        <van-image lazy-load :src="item.small_image">
          <template v-slot:loading>
            <img width="178" height="178" src="../../../../assets/images/placeholderImg/product-img-load.png" alt="">
          </template>
        </van-image>
      </div>
      <div class="name">{{ item.name }}</div>
      <div class="intro">{{ item.spec }}</div>
      <div class="buy">
        <div class="price">
          <span class="cur-price">￥{{ item.price }}</span>
          <span class="ori-price">￥{{ item.origin_price }}</span>
        </div>
       <cart-icon :product="item"></cart-icon>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon, Image } from 'vant'
import CartIcon from '@/components/CartIcon'
export default {
  components: {
    CartIcon,
    [Icon.name]: Icon,
    [Image.name]: Image
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
    .image {
      .van-image {
        width: 4.747rem;
        height: 4.747rem;
      }
    }
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
    }
  }
}

</style>
