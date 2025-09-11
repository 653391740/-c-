<template>
<div class="dialog"
    :class="{ 'active': show }">
    <div class="box">
        <div class="title">{{ title }}</div>
        <p v-if="msg">{{ msg }}</p>
        <div class="btn">
            <span @click="$emit('close')">取消</span>
            <span @click="$emit('confirm')"
                style="color: #ee0a24;">确定</span>
        </div>
    </div>
</div>
</template>
<script>
export default {
    props: {
        show: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: '温馨提示'
        },
        msg: {
            type: String,
            default: ''
        }
    },
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
        z-index: -1;
        opacity: 0;
        transition: all 0.3s ease;

        &.active {
            opacity: 1;
            z-index: 999;

            .box {
                transform: translateX(-50%) scale(1);
            }
        }

        .box {
            position: absolute;
            top: 35%;
            left: 50%;
            transform: translateX(-50%) scale(0.3);
            transition: all 0.3s ease;
            background-color: #fff;
            width: 320px;
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
                margin-top: 10px;
                font-size: 14px;
                color: #646566;
            }

            .btn {
                margin-top: 25px;
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
    }
</style>