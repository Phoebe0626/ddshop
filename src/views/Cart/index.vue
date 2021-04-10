<template>
  <div class="cart-container">
    <van-nav-bar
      title="购物车"
      right-text="删除"
    ></van-nav-bar>
    <!-- 商品列表 -->
    <div class="goodsList-wrapper">
      <div class="goods-item"
        v-for="(item, index) in cartList"
        :key="index"
      >
       <div class="left">
         <i
          class="checkbox"
          :class="{checked : item.checked}"
          @click="hToggleChecked(index)"
        ></i>
       </div>
       <div class="center">
           <img :src="item.small_image" alt="">
       </div>
       <div class="right">
          <div class="top">
            {{ item.name }}
          </div>
          <div class="bottom">
            <div class="price">￥{{ item.price }}</div>
            <div class="count">
              <a href="javascript:;" class="reduce-btn">-</a>
              <span class="number">{{ item.count }}</span>
              <a href="javascropt:;" class="add-btn">+</a>
            </div>
          </div>
       </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { NavBar, Checkbox, CheckboxGroup, Card } from 'vant'
export default {
  components: {
    [Card.name]: Card,
    [CheckboxGroup.name]: CheckboxGroup,
    [Checkbox.name]: Checkbox,
    [NavBar.name]: NavBar
  },
  computed: {
    ...mapGetters(['cartList'])
  },
  data () {
    return {
      cartListData: []
    }
  },
  methods: {
    ...mapMutations(['toggleChecked']),
    // 切换商品的选中状态
    hToggleChecked (index) {
      this.toggleChecked(index)
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.van-nav-bar__text {
  color: #45c763;
}
.cart-container {
  background-color: #f5f5f5;
  .goodsList-wrapper {
    margin-top: .16rem;
    .goods-item {
      display: flex;
      padding: .267rem;
      background-color: #fff;
      margin-bottom: .267rem;
      .left{
        flex: 1;
        display: flex;
        align-items: center;
        margin-right: .267rem;
        .checkbox {
          width: .533rem;
          height: .533rem;
          background: url('../../assets/images/cart/shop-icon.png') no-repeat;
          background-size: 50px 100px;
        }
        .checkbox.checked {
          background:  url('../../assets/images/cart/shop-icon.png') no-repeat -25px 0;
          background-size: 50px 100px;
        }
      }
      .center {
        flex: 3;
        width: 2.667rem;
        height: 2.667rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .right {
        flex: 6;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        padding: .267rem .213rem;
        font-size: .373rem;
        .bottom {
          display: flex;
          justify-content: space-between;
          .count {
            width: 1.867rem;
            height: .5rem;
            line-height: .5rem;
            display: flex;
            border: .027rem solid #999;
            border-radius: .133rem;
            text-align: center;
            a {
              color: #000;
              font-size: .5rem;
            }
            .reduce-btn {
              flex: 3;
              border-right: .027rem solid #999;
            }
            .number {
              flex: 4;
            }
            .add-btn {
              flex: 3;
              border-left: .027rem solid #999;
            }
          }
        }
      }
    }
  }
}
</style>
