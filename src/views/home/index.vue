<template>
<div class="home">
    <Title title="小U商城"></Title>
    <Head></Head>
    <Banner></Banner>
</div>
</template>

<script>
import Title from '@/components/title.vue'
import Head from '@/views/home/head.vue'
import Banner from '@/views/home/banner.vue'

export default {
    name: 'Home',
    data() {
        return {
        }
    },
    components: {
        Title,
        Head,
        Banner
    }
}
</script>

<style scoped
    lang="scss">
    .home {}
</style>
