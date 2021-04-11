<template>
  <div class="cart-container">
    <van-nav-bar
      title="购物车"
      fixed
      placeholder
    >
      <template v-if="isShowDel" slot="right">
        <span class="right-btn" :class="{disabled: isDisabledDel}" @click="hDel">删除</span>
      </template>
    </van-nav-bar>
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
              <a href="javascript:;"
                class="reduce-btn"
                :class="{disabled: item.count === 1}"
                @click="hReduce(index)"
              >-</a>
              <span class="number">{{ item.count }}</span>
              <a href="javascropt:;" class="add-btn" @click="hAdd(index)">+</a>
            </div>
          </div>
       </div>
      </div>
    </div>
    <!-- 结算 -->
    <van-submit-bar v-if="isShowDel" :price="totalPrice" button-text="提交订单" @submit="hSubmitOrder">
      <van-checkbox v-model="checkedAllData" @click="hToggleAllChecked">全选</van-checkbox>
    </van-submit-bar>

    <div class="empty" v-else>
      <img src="../../assets/images/cart/empty.png" alt="">
      <div class="text">购物车空空如也~</div>
      <van-button class="btn" type="primary" round @click="$router.push('/dashboard')">去逛逛</van-button>
    </div>

    <div class="guess-wrapper">
      <van-divider>猜你喜欢</van-divider>
      <production-item :list="guessList"></production-item>
    </div>
  </div>
</template>

<script>
import { getGuessYouLike } from '../../api/cart'
import { mapGetters, mapMutations } from 'vuex'
import { NavBar, Checkbox, CheckboxGroup, Card, SubmitBar, Dialog, Button, Divider } from 'vant'
import ProductionItem from '../Home/components/ProductionItem'
export default {
  components: {
    ProductionItem,
    [Divider.name]: Divider,
    [Button.name]: Button,
    [Dialog.name]: Dialog,
    [SubmitBar.name]: SubmitBar,
    [Card.name]: Card,
    [CheckboxGroup.name]: CheckboxGroup,
    [Checkbox.name]: Checkbox,
    [NavBar.name]: NavBar
  },
  computed: {
    ...mapGetters(['cartList']),
    // 是否显示删除按钮
    isShowDel () {
      return this.cartList.length
    },
    // 删除按钮是否可用
    isDisabledDel () {
      return !this.cartList.some(item => item.checked === true)
    },
    // 商品总价
    totalPrice () {
      let sum = 0
      this.cartList.forEach((item, index) => {
        if (item.checked) { // 选中商品的总价格
          sum = sum + item.price * item.count
        }
      })
      return sum * 100
    },
    // 全选按钮状态
    checkedAll () {
      return this.cartList.every(item => item.checked === true)
    }
  },
  data () {
    return {
      guessList: [], // 猜你喜欢列表
      checkedAllData: false // 全选状态
    }
  },
  created () {
    this.checkedAllData = this.checkedAll
    this.loadGuess()
  },
  methods: {
    ...mapMutations([
      'delGood', // 删除商品
      'reduceCount', // 减少数量
      'addCount', // 增加数量
      'toggleChecked', // 切换商品的选中状态
      'toggleAllChecked' // 切换全选状态
    ]),
    async loadGuess () {
      const res = await getGuessYouLike()
      this.guessList = res.data.product_list
    },
    // 删除商品
    hDel () {
      if (!this.isDisabledDel) {
        Dialog.confirm({
        // title: '标题',
          message: '确定要删除选中商品吗？'
        }).then(() => {
        // on confirm
          this.delGood()
        }).catch(() => {
        // on cancel
        })
      }
    },
    // 增加数量
    hAdd (index) {
      this.addCount(index)
    },
    // 减少数量
    hReduce (index) {
      if (this.cartList[index].count === 1) {
        return
      }
      this.reduceCount(index)
    },
    // 切换全选状态
    hToggleAllChecked () {
      this.toggleAllChecked(this.checkedAllData)
    },
    // 提交订单
    hSubmitOrder () {},
    // 切换商品的选中状态
    hToggleChecked (index) {
      this.toggleChecked(index)
      if (this.cartList.every(item => item.checked)) {
        this.checkedAllData = true
      } else {
        this.checkedAllData = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.van-nav-bar__text {
  color: #45c763;
}
/deep/.van-submit-bar {
  bottom: 1.333rem;
}
/deep/.van-checkbox__icon--checked .van-icon{
  background-color: #629357;
  border-color: #629357;
}
.cart-container {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  .right-btn {
    color: #45c763;
  }
  .right-btn.disabled {
    color: gray;
  }
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
            .reduce-btn.disabled {
              color: #e9e8e9;
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
  .empty {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      display: block;
      padding-top: .8rem;
      width: 5.013rem;
      margin: 0 auto;
    }
    .text {
      margin-top: .213rem;
      margin-bottom: .267rem;
      font-size: .427rem;
    }
    .btn {
      width: 2.667rem;
      font-size: .427rem;
    }
  }
}
</style>

<style>
  .van-dialog {
    position: absolute;
    top: -.533rem;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    height: 4.107rem;
    transform: translate3d(0, 0, 0);
  }
</style>
