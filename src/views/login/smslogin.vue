<template>
<div class="smslogin">
    <img src="/src/assets/zbc.png">
    <Input v-model="form.phone"
        label="手机号"
        msg="请填写手机号"></Input>
    <div class="sms">
        <Input v-model="form.code"
            label="短信验证码">
        </Input>
        <button @click="sms">
            {{ count <= 0
                ? '重新获取'
                : count
                + '秒后重新获取'
            }}
                </button>
    </div>
    <button @click="login">点击登录</button>
</div>
</template>
<script>
import { sms, smslogin } from '@/api/login'
export default {
    data() {
        return {
            form: {
                phone: '18001066656',
                code: '',
                servercode: '',
            },
            count: 0
        }
    },
    methods: {
        async sms() {
            if (this.form.phone && this.form.phone.length == 11 && this.count <= 0) {
                this.count = 10
                setInterval(() => {
                    if (this.count > 0) {
                        this.count--
                    }
                }, 1000)
                const { list: { code }, msg } = await sms({
                    phone: this.form.phone
                })
                this.$msg(msg)
                this.form.servercode = String(code)
                this.form.code = String(code)
            } else {
                this.$popupMsg.error('手机号格式有误！')
            }
        },
        async login() {
            if (this.form.servercode === this.form.code) {
                const { code, msg, list } = await smslogin(this.form)
                if (code === 200) {
                    this.$popupMsg.success(msg)
                    localStorage.setItem('userinfo', JSON.stringify(list))
                    this.$popupMsg.success('登录成功')
                    setTimeout(() => this.$router.push('/'), 700)
                }
            } else {
                this.$popupMsg.error('验证码输入有误！')
            }
        }
    }
}
</script>
<style scoped
    lang="scss">
    .smslogin {
        display: flex;
        flex-direction: column;
        align-items: center;

        .sms {
            position: relative;
            width: 100%;

            button {
                position: absolute;
                right: 18px;
                top: 12px;
                background-color: #ff6040;
                color: #fff;
            }
        }

        &>button {
            margin-top: 20px;
            background-color: #ff6040;
            width: 90%;
            height: 44px;
            border-radius: 22px;
            color: #fff;
            font-size: 14px;
        }
    }
</style>