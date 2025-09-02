<template>
<div class="login">
    <h1>登录</h1>
</div>
</template>

<script>
export default {
    name: 'Login',
    data() {
        return {
            username: '',
            password: '',
        }
    }
}
</script>

<style scoped
    lang="scss">
    .login {
        width: 375px;
    }
</style>