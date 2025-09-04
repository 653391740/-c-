<template>
<div class="container">
    <router-view></router-view>
    <Footer></Footer>
</div>
</template>

<script>
import Footer from '@/views/index/Footer.vue'
export default {
    components: {
        Footer
    }
}
</script>

<style lang="scss"
    scoped>
    .container {
        width: 100%;
        height: 100vh;
        padding-bottom: 50px;
        padding-top: 44px;
        background-color: #f2f2f2;

        &>div {
            height: 100%;
            overflow: auto;
        }
    }
</style>