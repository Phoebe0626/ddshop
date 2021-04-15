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
      @select="hSelect"
    />
    <transition name="slideUpDown" mode="out-in">
      <router-view class="router-view"/>
    </transition>
  </div>
</template>
<script>
import { NavBar, AddressList } from 'vant'
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'MyAddress',
  components: {
    [AddressList.name]: AddressList,
    [NavBar.name]: NavBar
  },
  computed: {
    ...mapGetters(['userAddress'])
  },
  data () {
    return {
      chosenAddressId: 0
    }
  },
  mounted () {
    this.userAddress.forEach((item, index) => {
      if (item.selected) this.chosenAddressId = index
    })
  },
  methods: {
    ...mapMutations(['selectAddress']),
    // 切换选中的地址
    hSelect (item, index) {
      this.$route.params.address = item
      this.$router.back()
      this.selectAddress(index)
    },
    // 新增地址
    hAdd () {
      this.$router.push('/dashboard/my/myAddress/addAddress')
    },
    // 编辑地址
    hEdit (item, index) {
      this.$router.push({ name: 'editAddress', params: { address: item } })
    }
  },
  watch: {
    // 监听路由地址变化
    $route () {
      // 修改当前选中地址为默认地址
      this.userAddress.forEach(item => {
        if (item.isDefault) {
          this.chosenAddressId = item.id
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.van-address-item .van-radio__icon--checked .van-icon {
  background-color: #45c763;
  border-color: #45c763;
}
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
