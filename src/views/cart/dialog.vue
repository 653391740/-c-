<template>
<transition name="fade">
    <div class="dialog"
        v-if="show">
        <div class="box">
            <div class="title">温馨提示</div>
            <p>是否要删除？</p>
            <div class="btn">
                <span @click="$emit('close')">取消</span>
                <span @click="$emit('confirm')"
                    style="color: #ee0a24;">确定</span>
            </div>
        </div>
    </div>
</transition>
</template>
<script>
export default {
    props: {
        show: {
            type: Boolean,
            default: false
        }
    }
}
</script>
<style scoped
    lang="scss">
    .dialog {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 999;

        .box {
            position: absolute;
            top: 35%;
            left: 50%;
            transform: translateX(-50%);
            background-color: #fff;
            width: 320px;
            height: 151px;
            border-radius: 16px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            overflow: hidden;

            .title {
                margin-top: 25px;
            }

            p {
                margin-top: -10px;
                font-size: 14px;
                color: #646566;
            }

            .btn {
                bottom: 0;
                left: 0;
                display: flex;
                width: 100%;

                span {
                    flex: 1;
                    text-align: center;
                    line-height: 48px;
                    border: 1px solid #f0eeee;
                    margin: 0 -.5px;
                }
            }
        }

        .fade-enter-active,
        .fade-leave-active {
            transition: all 0.3s ease;
        }

        .fade-enter,
        .fade-leave-to {
            opacity: 0;
            transform: scale(0.5);
        }
    }
</style>