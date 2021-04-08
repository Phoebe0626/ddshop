<template>
  <div class="footer">
      <van-tabbar v-model="active" active-color="#3bba63">
        <van-tabbar-item name="home" icon="home-o" to='/dashboard/home'>首页</van-tabbar-item>
        <van-tabbar-item name="category" icon="apps-o" to="/dashboard/category">分类</van-tabbar-item>
        <van-tabbar-item name="eat" to="/dashboard/eat">
          <template #icon="props">
            <img :src="props.active ? eatIcon.active : eatIcon.default" />
          </template>
          吃什么
          </van-tabbar-item>
        <van-tabbar-item name="cart" icon="setting-o" to="/dashboard/cart">购物车</van-tabbar-item>
        <van-tabbar-item name="my" icon="setting-o" to="/dashboard/my">我的</van-tabbar-item>
      </van-tabbar>
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"/>
        <!-- <div style="height: 1.33rem;"></div> -->
      </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"/>
        <!-- <div style="height: 1.33rem;"></div> -->
    </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant'
export default {
  name: 'Dasboard',
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  },
  data () {
    return {
      eatIcon: {
        default: require('@/assets/images/tabbar/eat_default.png'),
        active: require('@/assets/images/tabbar/eat_selected.png')
      },
      active: this.$route.name
    }
  }
}
</script>
