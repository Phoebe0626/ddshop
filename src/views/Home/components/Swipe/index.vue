<template>
  <!-- 轮播图 -->
  <div class="swipe-container">
    <van-swipe
      id="my-swipe"
      class="my-swipe"
      :autoplay="3000"
      indicator-color="white"
    >
      <van-swipe-item v-for="(image, index) in swipeList" :key="index">
        <van-image class="image-item" :src="image.icon_url" fit="fill"></van-image>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import { Swipe, SwipeItem, Image } from 'vant'
export default {
  props: {
    swipeList: {
      type: Array
    }
  },
  components: {
    [Image.name]: Image,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem
  }
}
</script>

<style>
  .swipe-container {
    padding-top: 1rem;
  }
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
