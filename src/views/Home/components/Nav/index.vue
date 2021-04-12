<template>
  <van-grid column-num="5" :border="false">
      <van-grid-item
        v-for="(item, index) in itemCate"
        :key="index"
        :icon="item.icon_url"
        :text="item.name"
      />
    </van-grid>
</template>

<script>
import { Grid, GridItem } from 'vant'
export default {
  components: {
    [Grid.name]: Grid,
    [GridItem.name]: GridItem
  },
  props: {
    itemCate: {
      type: Array
    }
  }
}
</script>
