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
import { AddressEdit, NavBar, Toast } from 'vant'
import { areaList } from '@/utils/arealist.js'
import { mapMutations } from 'vuex'
export default {
  name: 'EditAddress',
  components: {
    [Toast.name]: Toast,
    [NavBar.name]: NavBar,
    [AddressEdit.name]: AddressEdit
  },
  data () {
    return {
      area: areaList
    }
  },
  methods: {
    ...mapMutations(['addUserAddress', 'removeUserAddress']),
    // 保存地址
    hSave (content) {
      const obj = {
        address: content,
        type: 'edit'
      }
      this.addUserAddress(obj)
      this.$toast({
        message: '保存成功',
        duration: 800
      })
      this.$router.back()
    },
    // 删除地址
    hDelete () {
      this.removeUserAddress(this.$route.params.address.id)
      this.$toast({
        message: '删除成功',
        duration: 800
      })
      this.$router.back()
    }
  }
}
</script>

<style>
.van-dialog {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  height: 3.2rem;
  transform: translate3d(0, 0, 0);
}

.van-dialog__confirm {
  color: #1989fa;
}
</style>
