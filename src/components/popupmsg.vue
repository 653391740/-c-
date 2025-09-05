<template>
<transition name="fade">
    <div class="msg"
        :class="type"
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
            timer: null,
            type: 'info'
        }
    },
    methods: {
        show(msg, duration = 2000, type) {
            this.message = msg
            this.isShow = true
            this.type = type
            // 清除之前的定时器
            if (this.timer) {
                clearTimeout(this.timer)
            }
            // 设置新的定时器
            this.timer = setTimeout(() => {
                this.isShow = false
            }, duration)
        },
        error(msg, duration = 2000) {
            this.show(msg, duration, 'err')
        },
        success(msg, duration = 2000) {
            this.show(msg, duration, 'success')
        },
        info(msg, duration = 2000) {
            this.show(msg, duration, 'info')
        },
        warn(msg, duration = 2000) {
            this.show(msg, duration, 'warn')
        }
    }
}
</script>

<style scoped
    lang="scss">
    .msg {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 36px;
        line-height: 36px;
        color: #fff;
        z-index: 9999;
        text-align: center;

        &.err {
            background-color: #F44336; // 错误红色
        }

        &.success {
            background-color: #4CAF50; // 成功绿色
        }

        &.info {
            background-color: #2196F3; // 信息提示蓝色
        }

        &.warn {
            background-color: #ff976a; // 警告黄色
        }
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: all 0.5s;
    }

    .fade-enter,
    .fade-leave-to {
        transform: translateY(-100%);
    }
</style>