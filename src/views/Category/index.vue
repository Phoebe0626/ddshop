<template>
  <div class="category-container">
    <Header></Header>
    <div class="cate-wrapper" ref="leftWrapper">
      <ul>
        <li
          v-for="item in category"
          :key="item.id"
        >
          <span>{{ item.name }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Header from './components/Header'
import Bscroll from 'better-scroll'
import { getCate } from '../../api/cate'
export default {
  components: {
    Header
  },
  data () {
    return {
      category: []
    }
  },
  created () {
    this.getCate().then(res => {
      const ul = document.querySelector('.cate-wrapper ul')
      const li = document.querySelectorAll('.cate-wrapper li')
      ul.style.height = li[0].offsetHeight * li.length + 'px'
      this.$nextTick(() => {
        if (!this.leftScroll) {
          this.leftScroll = new Bscroll(this.$refs.leftWrapper, {
            scrollY: true
          })
        }
      })
    })
  },
  methods: {
    async getCate () {
      const res = await getCate()
      this.category = res.data.cate
      console.log(this.category)
    }
  }
}
</script>

<style lang="less" scoped>
.category-container {
  .cate-wrapper {
    display: flex;
    position: absolute;
    top: 1.333rem;
    bottom: 1.333rem;
    overflow: hidden;
    ul {
      width: 2.507rem;
      li {
        width: 2.507rem;
        height: 1.28rem;
        padding: .4rem 0;
        border-bottom: .027rem solid #e8e9e8;
        background-color: #f5f5f5;
        font-size: .373rem;
        box-sizing: border-box;
        span {
          padding: .217rem .4rem;
          border-left: .08rem solid transparent;
        }
      }
    }
  }
}
</style>
