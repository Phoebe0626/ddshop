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
import { mapMutations, mapGetters } from 'vuex'
export default {
  components: {
    [AddressEdit.name]: AddressEdit,
    [NavBar.name]: NavBar
  },
  computed: {
    ...mapGetters(['userAddress'])
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
      const address = content.province + content.city + content.county + content.addressDetail
      const id = this.userAddress.length
      const obj = {
        address: { ...content, address, id },
        type: 'add'
      }
      this.addUserAddress(obj)
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
