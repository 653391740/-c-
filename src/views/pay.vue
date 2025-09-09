<template>
<div class="pay">
    <div class="payNumber"> 订单号：{{ query.outTradeNo }}</div>
    <div class="payPrice"><span>¥</span>{{ query.totalAmount }}</div>
    <div class="payType">
        <div class="payTypeTitle">请选择支付方式</div>
        <div class="payTypeItem">
            <div><img src="@/assets/zfb.png"
                    alt="">支付宝支付</div>
            <input type="radio"
                name="payType"
                v-model="type"
                value="1">
        </div>
        <div class="payTypeItem">
            <div><img src="@/assets/wx.png"
                    alt="">微信支付</div>
            <input type="radio"
                name="payType"
                v-model="type"
                value="2">
        </div>
    </div>
    <button class="ConfirmPayment"
        @click="pay">确认支付</button>
</div>
</template>
<script>
import { alipay } from '@/api/cart'
export default {
    data() {
        return {
            query: this.$route.query,
            type: 0
        }
    },
    methods: {
        async pay() {
            if (this.type === 0) return this.$msg('请选择支付方式')
            const { list } = await alipay({
                ...this.query,
                type: 1
            })
            document.body.innerHTML = list
            document.forms[0].submit()
        }
    }
}
</script>

<style scoped
    lang="scss">
    input:checked {
        background-color: #1989fa;
    }

    .pay {
        height: 100%;
        position: relative;
        text-align: center;

        .payNumber {
            padding-top: 27px;
            font-size: 12px;
            color: #999;
        }

        .payPrice {
            font-size: 35px;
            line-height: 60px;

            span {
                font-size: 14px;
            }
        }

        .payType {
            margin: 29px auto 0;
            width: 325px;
            text-align: left;
            font-size: 14px;

            .payTypeItem {
                display: flex;
                align-items: center;
                justify-content: space-between;
                height: 38px;

                img {
                    width: 15px;
                    height: 15px;
                    margin-right: 10px;
                    display: inline-block;
                    vertical-align: middle;
                }
            }
        }

        .ConfirmPayment {
            position: absolute;
            top: 85%;
            left: 50%;
            transform: translateX(-50%);
            width: 312px;
            height: 40px;
            border-radius: 20px;
            background-color: #0bbaef;
            color: #fff;
        }
    }
</style>