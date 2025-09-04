<template>
<div class="title">
    {{ title }}
    <div v-if="back"
        @click="$router.back()"><span>‹</span>返回</div>
</div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: '标题'
        },
        back: {
            type: Boolean,
            default: false
        }
    }
}
</script>


<style scoped
    lang="scss">
    .title {
        z-index: 100;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 44px;
        line-height: 44px;
        text-align: center;
        font-weight: 400;
        color: #fff;
        background-color: #ff6040;

        div {
            position: absolute;
            height: 44px;
            top: 50%;
            left: 10px;
            transform: translateY(-55%);
            font-size: 14px;

            span {
                font-size: 20px;
                margin-right: 5px;
            }
        }
    }
</style>