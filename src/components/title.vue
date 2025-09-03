<template>
<div class="title">
    {{ title }}
</div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: '标题'
        }
    }
}
</script>


<style scoped
    lang="scss">
    .title {
        z-index: 999;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 44px;
        line-height: 44px;
        text-align: center;
        font-weight: bold;
        color: #fff;
        background-color: #ff6040;
    }
</style>