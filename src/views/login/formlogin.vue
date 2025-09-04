<template>
<div class="login">
    <Title back
        title="欢迎登陆"></Title>
    <img src="/src/assets/zbc.png">
    <Input v-model="form.phone"
        label="手机号"
        msg="请填写手机号"></Input>
    <Input v-model="form.password"
        label="密码"
        msg="请填写密码"></Input>
    <button class="loginbtn"
        @click="login">点击登录</button>
    <button class="registerbtn"
        @click="$router.push('/register')">去注册?/点击注册</button>
</div>
</template>

<script>
import Title from '@/components/title.vue'
import { login } from '@/api/login'
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
    components: {
        Title
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
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 20px;

        img {
            width: 70%;
        }

        .loginbtn {
            margin-top: 20px;
            width: 90%;
            height: 44px;
            color: #fff;
            background-color: #ff6040;
            border-radius: 22px;
            font-size: 16px;
        }

        .registerbtn {
            font-size: 10px;
            margin-top: 130px;
            color: #4682b4;
            padding: 2px 5px;
            border-radius: 15px;
            background-color: #fff;
            border: 1px solid #4682b4;
        }
    }
</style>