<template>
<div class="register">
    <Title title="欢迎注册会员"
        back></Title>
    <Input v-model="form.phone"
        label="手机号"
        msg="请填写手机号"></Input>
    <Input v-model="form.nickname"
        label="昵称"
        msg="请填写用户昵称"></Input>
    <Input v-model="form.password"
        msg="请填写密码"
        label="密码"></Input>
    <button @click="register">点击注册</button>
</div>
</template>
<script>
import { register } from '@/api/login'
import Title from '@/components/title.vue'
export default {
    components: {
        Title
    },
    data() {
        return {
            form: {
                phone: '18001066656',
                nickname: '金小子',
                password: '123456'
            }
        }
    },
    methods: {
        async register() {
            const res = await register(this.form)
            console.log(res);

        }
    }
}
</script>


<style scoped
    lang="scss">
    .register {
        padding-top: 110px;

        button {
            margin-top: 20px;
            display: block;
            width: 90%;
            height: 44px;
            border-radius: 22px;
            background-color: #ff6040;
            color: #fff;
            margin: 0 auto;
        }
    }
</style>