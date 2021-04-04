<template>
  <div class="add-address-container">
    <van-nav-bar
      title="编辑地址"
      left-arrow
      @click-left="$router.back()"
    ></van-nav-bar>
    <van-address-edit
      :area-list="area"
      :address-info="$route.params.address"
      show-set-default
      show-delete
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="hSave"
      @delete="hDelete"
    />
  </div>
</template>

<script>
import { AddressEdit, NavBar } from 'vant'
import { areaList } from '@/utils/arealist.js'
import { mapMutations } from 'vuex'
export default {
  components: {
    [NavBar.name]: NavBar,
    [AddressEdit.name]: AddressEdit
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
      const obj = {
        address: content,
        type: 'edit'
      }
      this.addUserAddress(obj)
    },
    // 删除地址
    hDelete () {}
  }
}
</script>
