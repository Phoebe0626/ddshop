<template>
  <div class="footer">
      <van-tabbar
        fixed
        v-model="active"
        active-color="#3bba63"
        safe-area-inset-bottom
      >
        <van-tabbar-item name="home" icon="home-o" to='/dashboard/home'>首页</van-tabbar-item>
        <van-tabbar-item name="category" icon="apps-o" to="/dashboard/category">分类</van-tabbar-item>
        <van-tabbar-item name="eat" to="/dashboard/eat">
          <template #icon="props">
            <img :src="props.active ? eatIcon.active : eatIcon.default" />
          </template>
          吃什么
          </van-tabbar-item>
        <van-tabbar-item id="cartTab" name="cart" :badge="count" icon="cart-o" to="/dashboard/cart">购物车</van-tabbar-item>
        <van-tabbar-item name="my" icon="setting-o" to="/dashboard/my">我的</van-tabbar-item>
      </van-tabbar>
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"/>
        <div style="height: 1.33rem;"></div>
      </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"/>
        <div style="height: 1.33rem;"></div>
    </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant'
import { mapGetters } from 'vuex'
export default {
  name: 'Dasboard',
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  },
  computed: {
    ...mapGetters(['cartList']),
    count () {
      let sum = 0
      this.cartList.forEach(item => {
        sum += item.count
      })
      return sum
    }
  },
  data () {
    return {
      eatIcon: {
        default: require('@/assets/images/tabbar/eat_default.png'),
        active: require('@/assets/images/tabbar/eat_selected.png')
      },
      active: this.$route.name
    }
  },
  watch: {
    $route () {
      // 路由变化时，tabbar 高亮变化
      this.active = this.$route.name
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.van-tabbar { // 防止被遮挡
  z-index: 999;
}
</style>
