<template>
<div class="login">
    <input type="text"
        placeholder="请输入手机号"
        v-model="form.phone">
    <input type="password"
        placeholder="请输入密码"
        v-model="form.password">
    <button @click="login">登录</button>
</div>
</template>

<script>
import {
    login
} from '@/api/home'
export default {
    name: 'Login',
    data() {
        return {
            form: {
                phone: '18001066656',
                password: '123456',
            }
        }
    },
    methods: {
        async login() {
            if (this.username === '' || this.password === '') return alert('请输入用户名和密码')
            const { code, list } = await login(this.form)
            if (code === 200) {
                localStorage.setItem('userinfo', JSON.stringify(list))
                this.$router.push('/')
            }
        }
    }
}
</script>

<style scoped
    lang="scss">
    .login {
        width: 375px;

        input {
            padding: 5px 10px;
            display: block;
            margin-bottom: 10px;
        }
    }
</style>