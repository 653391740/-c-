<template>
<div class="home">
    <Title title="小U商城"></Title>
    <Head></Head>
    <Banner></Banner>
    <Nav></Nav>
    <Tuijian></Tuijian> 
    <Goodslist></Goodslist>
</div>
</template>

<script>
import Title from '@/components/title.vue'
import Head from '@/views/home/head.vue'
import Banner from '@/views/home/banner.vue'
import Nav from '@/views/home/nav.vue'
import Tuijian from '@/views/home/tuijian.vue'
import Goodslist from '@/views/home/goodslist.vue'

export default {
    name: 'Home',
    data() {
        return {
        }
    },
    components: {
        Title,
        Head,
        Banner,
        Nav,
        Tuijian,
        Goodslist,
    }
}
</script>

<style scoped
    lang="scss">
    .home {}
</style>
