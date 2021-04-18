<template>
  <div class="loading-container">
    <div
      class="loading-img"
      :style="{backgroundPositionY: -this.positionY + 'px'}"
      ></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      positionY: 0
    }
  },
  mounted () {
    this.timer = setInterval(() => {
      this.positionY += 50
      if (this.positionY === 350) {
        this.positionY = 0
      }
    }, 600)
  }
}
</script>

<style lang="less" scoped>
.loading-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .loading-img {
    width: 1.333rem;
    height: 1.333rem;
    background: url('../../assets/images/loading/icon_loading.png') no-repeat;
    background-size: 1.333rem;
    animation: load .6s infinite ease-in-out;
  }
}

@keyframes load {
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-50px);
  }

  100% {
    transform: translateY(0);
  }
}

@-webkit-keyframes load {
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-50px);
  }

  100% {
    transform: translateY(0);
  }
}

@-moz-keyframes load {
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-50px);
  }

  100% {
    transform: translateY(0);
  }
}

@-o-keyframes load {
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-50px);
  }

  100% {
    transform: translateY(0);
  }
}

@-ms-keyframes load {
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-50px);
  }

  100% {
    transform: translateY(0);
  }
}
</style>
