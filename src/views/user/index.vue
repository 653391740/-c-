<template>
<div class="user">
    <HeadUser></HeadUser>
    <ResDetail></ResDetail>
</div>
</template>

<script>
import HeadUser from './head-user.vue'
import ResDetail from './resDetail.vue'
export default {
    name: 'User',
    components: {
        HeadUser,
        ResDetail
    },
    data() {
        return {

        }
    }
}
</script>

<style scoped
    lang="scss">
    .user {
        width: 100%;
        height: calc(100% + 44px) !important;
        margin-top: -44px;
    }
</style>