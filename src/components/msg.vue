<template>
<transition name="fade">
  <div class="msg"
    v-if="isShow">
    {{ message }}
  </div>
</transition>
</template>

<script>
export default {
  data() {
    return {
      message: '',
      isShow: false,
      timer: null
    }
  },
  methods: {
    show(msg, duration = 2000) {
      this.message = msg
      this.isShow = true

      // 清除之前的定时器
      if (this.timer) {
        clearTimeout(this.timer)
      }

      // 设置新的定时器
      this.timer = setTimeout(() => {
        this.isShow = false
      }, duration)
    }
  }
}
</script>

<style scoped
  lang="scss">
  .msg {
    padding: 10px 15px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, 0.7);
    color: #fff;
    border-radius: 5px;
    font-size: 14px;
    z-index: 9999;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
</style>