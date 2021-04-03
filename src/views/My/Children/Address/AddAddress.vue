<template>
  <div class="add-address-container">
    <van-nav-bar
      title="新增地址"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 添加地址 -->
    <van-address-edit
      :area-list="area"
      show-postal
      show-set-default
      show-search-result
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="hSave"
    />
  </div>
</template>

<script>
import { NavBar, AddressEdit } from 'vant'
import { areaList } from '@/utils/arealist'
import { mapMutations } from 'vuex'
export default {
  components: {
    [AddressEdit.name]: AddressEdit,
    [NavBar.name]: NavBar
  },
  data () {
    return {
      area: areaList
    }
  },
  methods: {
    ...mapMutations(['addUserAddress']),
    // 保存地址
    hSave (content) {
      this.addUserAddress({ ...content, address: content.province + content.city + content.county + content.addressDetail })
      this.$router.back()
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.van-nav-bar__arrow {
  color: #dedede
}

</style>
