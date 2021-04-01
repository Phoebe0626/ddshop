<template>
  <div id="app">
    <van-button type="primary">主要按钮</van-button>
    <router-view/>
  </div>
</template>

<script>
import { Button } from 'vant'
export default {
  components: {
    [Button.name]: Button
  }
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
