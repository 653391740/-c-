<template>
<div>
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