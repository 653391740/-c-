<template>
<div class="orderconfirm">
    <Title title="订单确认"
        back></Title>
    <div class="address"
        @click="$router.push({
            path: '/addresslist',
            query: {
                type: 1,
                id: address.id
            }
        })">
        <span class="iconfont icon-denglu-copy"></span>
        <div class="info">
            <label for="username">姓名:&nbsp;&nbsp;&nbsp;</label>
            <span id="username">{{ address.username }}</span>
            <br>
            <label for="userphone">电话:&nbsp;&nbsp;&nbsp;</label>
            <span id="userphone">{{ address.userphone }}</span>
        </div>
        <span>›</span>
    </div>
    <Goodslist :goodslist="orderData.orderData"></Goodslist>
    <Dingdan class="dingdan"
        :total="orderData.countmoney"
        @submit="submit"></Dingdan>
</div>
</template>
<script>
import Title from '@/components/title.vue'
import Dingdan from '@/components/dingdan.vue'
import Goodslist from '@/components/goodlist.vue'
import { addresslist, orderadd } from '@/api/cart'
export default {
    components: {
        Dingdan,
        Title,
        Goodslist
    },
    data() {
        return {
            orderData: JSON.parse(localStorage.getItem('orderData')) || [],
            address: {}
        }
    },
    mounted() {
        this.addresslist()
    },
    methods: {
        async submit() {
            const { countmoney, countnumber } = this.orderData // 金额 数量
            const data = {
                uid: JSON.parse(localStorage.getItem('userinfo')).uid,
                addressid: this.address.id, // 地址id
                countmoney,
                countnumber,
                // 商品id
                idstr: this.orderData.orderData.map(item => item.id).join(','),
            }
            const { list: { outTradeNo } } = await orderadd(data)
            this.$router.push({
                path: '/pay',
                query: {
                    outTradeNo,
                    totalAmount: countmoney
                }
            })
        },
        async addresslist() {
            if (this.$route.query.id) return this.address = this.$route.query
            const { list } = await addresslist()
            this.address = list[0]
        }
    }
}
</script>

<style scoped
    lang="scss">
    .orderconfirm {
        width: 100%;
        height: 100%;
        padding: 44px 0 50px;

        .address {
            display: flex;
            align-items: center;
            font-size: 14px;
            padding: 16px;
            background-size: 2.13333rem;
            position: relative;

            &::after {
                content: '';
                position: absolute;
                left: 0;
                bottom: 0;
                width: 100%;
                height: 2px;
                background: repeating-linear-gradient(-45deg, #ff6c6c 0, #ff6c6c 20%, transparent 0, transparent 25%, #1989fa 0, #1989fa 45%, transparent 0, transparent 50%);
                background-size: 80px;
            }

            .info {
                flex: 1;
            }

            .iconfont {
                margin-right: 10px;
            }

            &>span:last-child {
                font-size: 26px;
                color: #8f8888;
            }
        }

        .dingdan {
            position: fixed;
            bottom: 0;
            left: 0;
        }
    }
</style>