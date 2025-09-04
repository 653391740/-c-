<template>
<div class="login">
    <div class="login-title">欢迎登陆严选商城</div>
    <img src="/src/assets/zbc.png">
    <button @click="$router.push('/formlogin')">账号密码登录</button>
    <p @click="$router.push('/smslogin')">手机号短信登录</p>
</div>
</template>

<script>
export default {

}
</script>

<style scoped
    lang="scss">
    .login {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-bottom: 50px;

        .login-title {
            margin-top: 35%;
            font-size: 24px;
            color: #666;
        }

        img {
            width: 70%;
        }

        button {
            width: 90%;
            height: 44px;
            background-color: #ff6034;
            color: #fff;
            font-size: 14px;
            margin: 10px 0;
        }

        p {
            font-size: 12px;
        }
    }
</style>