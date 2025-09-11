<template>
<div class="cart">
    <Title title="购物车"></Title>
    <div class="empty"
        v-if="!list.length">
        <img src="/src/assets/default.png">
        <p>暂无商品!</p>
    </div>
    <Cart v-else
        :list="list"></Cart>
</div>
</template>

<script>
import { cartlist } from '@/api/cart'
import Title from '@/components/title.vue'
import Cart from './cart.vue'
export default {
    data() {
        return {
            list: []
        }
    },
    components: {
        Title,
        Cart
    },
    async created() {
        const { list } = await cartlist()
        if (list === null) return
        this.list = list.map(e => ({
            ...e,
            isdel: false
        }))
    },
    methods: {

    }
}   
</script>

<style scoped
    lang="scss">
    .cart {
        background-color: #e2e2e2;

        .empty {
            color: #969799;
            padding: 32px 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            font-size: 14px;

            img {
                width: 160px;
                height: 160px;
                margin: 0 auto;
                margin-bottom: 16px;
            }
        }
    }
</style>