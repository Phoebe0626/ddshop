<template>
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
</template>

<script>
import { Tab, Tabs } from 'vant'
import ProductionItem from '../ProductionItem'
export default {
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    ProductionItem
  },
  props: {
    allList: {
      type: Array,
      default () {
        return []
      }
    },
    flashGoods: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>

<style lang="less" scoped>
  // tab 栏
  .tab {
    margin-top: .4rem;
    /deep/.van-tabs__line {
      width: 1.2rem;
      background-color: #4fc173;
    }
  }
</style>
