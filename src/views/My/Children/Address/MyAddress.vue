<template>
  <div id="address-container">
    <van-nav-bar
      title="我的地址"
      left-arrow
      @click-left="$router.back()"
    ></van-nav-bar>
    <!-- 没有地址列表时展示图片 -->
    <div v-if="!userAddress.length" class="no-address-img">
      <img class="img" src="@/assets/images/my/noAddress.png" alt="">
      <span class="text">还没有添加过地址呢，添加一个吧~</span>
    </div>
    <!-- 地址列表 -->
    <van-address-list
      v-model="chosenAddressId"
      :list="userAddress"
      default-tag-text="默认"
      @add="hAdd"
      @edit="hEdit"
    />
    <transition name="slideUpDown" mode="out-in">
      <router-view class="router-view"/>
    </transition>
  </div>
</template>
<script>
import { NavBar, AddressList } from 'vant'
import { mapGetters } from 'vuex'
export default {
  components: {
    [AddressList.name]: AddressList,
    [NavBar.name]: NavBar
  },
  computed: {
    ...mapGetters(['userAddress'])
  },
  data () {
    return {
      chosenAddressId: 1
    }
  },
  methods: {
    // 新增地址
    hAdd () {
      this.$router.push('/dashboard/my/myAddress/addAddress')
    },
    // 编辑地址
    hEdit (item, index) {
      this.$router.push({ name: 'editAddress', params: { address: item } })
    }
  }
}
</script>

<style lang="less" scoped>
#address-container {
  background-color: #fff;
  // 没有地址列表时显示的图片
  .no-address-img {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: -1.2rem; // 减掉导航栏的高度
    .img {
      width: 4rem;
      height: 2.667rem;
    }
    .text {
      font-size: .32rem;
      color: grey;
    }
  }
}

.router-view {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 999;
  background-color: #f5f5f5;
}

/deep/.van-address-list__add {
  background-color: #45c763;
  border: none;
}

/deep/.van-nav-bar__arrow {
  color: #dedede
}
</style>
