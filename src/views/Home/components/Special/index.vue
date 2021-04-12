<template>
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
          <img class="image" src="@/assets/images/home/peanut.jpeg" alt="">
        </div>
        <!-- 平价菜场 -->
        <div class="lowPrice">
          <div class="title">{{ specialZone.lowPriceItemList[0].title }}</div>
          <div class="subtitle">{{ specialZone.lowPriceItemList[0].subtitle }}</div>
          <img class="image" :src="specialZone.lowPriceItemList[0].image" alt="">
        </div>
      </div>

    </div>
</template>

<script>
export default {
  props: {
    specialZone: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>

<style lang="less" scoped>
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
</style>
