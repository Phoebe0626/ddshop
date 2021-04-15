<template>
  <div class="time-pick-container">
    <!-- 送达时间 -->
    <van-cell
      is-link
      title="送达时间"
      label="超过十分钟可获得积分补偿"
      :value="tip"
      @click="hClickSelectTime"
    />
    <van-action-sheet v-model="isShowChooseTime" title="请选择送达时间">
      <div class="content">
        <div class="top">
          <!-- 左侧 选择日期-->
          <div class="left">
            <ul>
              <li :class="{selected: currentIndex === 0}" @click="hClickToday">今天</li>
              <li :class="{selected: currentIndex === 1}" @click="hClickTmr">明天</li>
            </ul>
          </div>
          <!-- 右侧 选择时间 -->
          <div class="right" ref="TimeWrapper">
            <ul class="UlWrapper">
              <li
                class="time-item"
                :class="{selected : currentTimeIndex === index}"
                v-for="(item, index) in timeArr"
                :key="index"
                @click="hSelectTime(index)"
              >
                {{timeArr[index][0].hour >= 10 ? timeArr[index][0].hour : '0' + timeArr[index][0].hour}}:{{timeArr[index][0].min >= 10 ? timeArr[index][0].min : '0' + timeArr[index][0].min}}
                -
                {{timeArr[index][1].hour >= 10 ? timeArr[index][1].hour : '0' + timeArr[index][1].hour}}:{{timeArr[index][1].min >= 10 ? timeArr[index][1].min : '0' + timeArr[index][1].min}}
                <van-icon class="selected-icon" v-show="currentTimeIndex === index" name="success" />
              </li>
            </ul>
          </div>
        </div>
        <div class="bottom">
          <van-button block type="primary" round @click="hOk">确定</van-button>
        </div>
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import { ActionSheet, Cell, Button, Icon } from 'vant'
import { formatStartTime, createTimeArr } from '@/utils'
export default {
  components: {
    [Icon.name]: Icon,
    [Button.name]: Button,
    [Cell.name]: Cell,
    [ActionSheet.name]: ActionSheet
  },
  data () {
    return {
      tip: '请选择送达时间',
      currentTimeIndex: '', // 当前选择的送达时间
      timeArr: [], // 送达时间 arr
      currentIndex: 0, // 当前选择的日期 0-今天 1-明天
      isShowChooseTime: false // 显示选择送达时间
    }
  },
  methods: {
    // 点击确定按钮
    hOk () {
      let date
      if (this.currentIndex) {
        date = '明天'
      } else {
        date = '今天'
      }
      // cell 右边提示文字变为选择的时间
      this.tip = date + this.deliveryTime
      // 关闭弹层
      this.isShowChooseTime = false
      this.$emit('change-time', this.deliveryTime)
    },
    // 点击时间 li
    hSelectTime (index) {
      this.currentTimeIndex = index
      // 当前选中的时间
      this.deliveryTime = document.querySelectorAll('.time-item')[index].innerHTML.substring(0, 14)
    },
    // 送达时间 - 今天
    hClickToday () {
      this.currentIndex = 0
      let startTime = formatStartTime(new Date())
      if (startTime.hour < 8) { // 8点前
        startTime = { hour: 8, min: 0 }
        this.timeArr = createTimeArr(startTime)
      } else if (startTime.hour >= 23) { // 23点后
        this.timeArr = []
      } else {
        this.timeArr = createTimeArr(startTime)
      }
    },
    // 送达时间 - 明天
    hClickTmr () {
      this.currentIndex = 1
      const startTime = { hour: 8, min: 0 }
      this.timeArr = createTimeArr(startTime)
    },
    // 点击选择送达时间
    hClickSelectTime () {
      this.isShowChooseTime = true
      this.hClickToday() // 默认选择今天
    }
  },
  watch: {
    timeArr (newVal, oldVal) {
      if (this.currentTimeIndex) {
        this.currentTimeIndex = 0
      }
      this.$nextTick(() => {
        // better-scroll
        if (!this.timeScroll) {
          this.timeScroll = new BScroll(this.$refs.TimeWrapper, {
            click: true,
            scrollY: true,
            disableTouch: false,
            bindToWrapper: true
          })
        } else {
          this.timeScroll.refresh()
          this.timeScroll.scrollToElement(document.querySelectorAll('.time-item')[0])
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.van-popup {
  height: 70%;
}
.time-pick-container {
  .content {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-top: 1px solid #f3f3f3;
    .top {
      height: 100%;
      display: flex;
      font-size: .373rem;
      .left {
        flex: 3;
        background-color: #f5f5f5;
        li {
          height: 1.067rem;
          line-height: 1.067rem;
          padding-left: .133rem;
        }
        .selected {
          font-weight: 700;
          background-color: #fff;
        }
      }
      .right {
        flex: 7;
        padding-left: .213rem;
        overflow: hidden;
        ul {
          li {
            height: 1.067rem;
            line-height: 1.067rem;
            padding-right: .533rem;
            border-bottom: 1px solid #f3f3f3;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .selected {
            color: #48be6e;
          }
          .selected-icon {
            font-size: .533rem;
          }
        }
      }
    }
    .bottom {
      height: 1.173rem;
      padding: .107rem .533rem;
    }
  }
}
</style>
