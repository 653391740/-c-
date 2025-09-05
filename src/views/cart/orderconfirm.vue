<template>
<div class="orderconfirm">
    <Title title="订单确认"
        back></Title>
    <Goodslist :goodslist="orderData.orderData"></Goodslist>
    <Dingdan class="dingdan"
        :total="orderData.countMoney"
        @submit="$router.push('/')"></Dingdan>
</div>
</template>
<script>
import Title from '@/components/title.vue'
import Dingdan from '@/components/dingdan.vue'
import Goodslist from '@/components/goodslist.vue'
export default {
    components: {
        Dingdan,
        Title,
        Goodslist
    },
    data() {
        return {
            orderData: JSON.parse(localStorage.getItem('orderData'))
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

        .dingdan {
            position: fixed;
            bottom: 0;
            left: 0;
        }
    }
</style>