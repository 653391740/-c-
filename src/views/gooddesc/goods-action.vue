<template>
<div class="goods-action"
    :style="{ zIndex: showPopup ? 101 : 99 }">
    <ul>
        <li class=""
            :class="['iconfont icon-xiaoxi',
                messageCount > 0 ? 'info' : 'info-dot']"
            :data-count="messageCount">客服</li>
        <li :class="['iconfont icon-gouwuche',
            cartCount > 0 ? 'info' : '']"
            @click="$router.push('/cart')"
            :data-count="cartCount">购物车</li>
        <li :class="['iconfont icon-store',
            storeCount > 0 ? 'info' : '']"
            :data-count="storeCount">店铺</li>
    </ul>
    <button class="button-first"
        @click="showPopup = true">加入购物车</button>
    <button class="button-last">立即购买</button>
    <Popup :show.sync="showPopup">
        <Popups @addCart="handleAddCart"></Popups>
    </Popup>
</div>
</template>
<script>
import { cartlist, cartadd } from '@/api/cart'
import Popup from '@/components/Popup.vue'
import Popups from './Popup.vue'

export default {
    data() {
        return {
            showPopup: false,
            messageCount: 0,
            cartCount: 0,
            storeCount: 12
        }
    },
    async mounted() {
        if (localStorage.getItem('userinfo')) {
            const { list } = await cartlist()
            this.cartCount = list.length
        }
    },
    methods: {
        async handleAddCart(obj) {
            const uid = JSON.parse(localStorage.getItem('userinfo'))
            if ([obj.color, obj.gMemory].every(e => e)) {
                if (!uid) return this.$popupMsg.warn('请先登录')
                try {
                    const { code, msg, list } = await cartadd({
                        num: obj.num,
                        goodsid: this.$route.query.id
                    })
                    if (code === 200) {
                        const { cartCount } = list
                        this.$msg(msg)
                        this.cartCount = cartCount
                        this.showPopup = false
                    } else if (code === 500) {
                        this.$msg('请先登录')
                    }
                } catch (err) {
                    this.$msg(err.message)
                }
            } else {
                this.$msg('请先选择商品规格')
            }
        }
    },
    components: {
        Popups,
        Popup
    }
}
</script>

<style scoped
    lang="scss">
    .goods-action {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        display: flex;
        align-items: center;
        z-index: 99;

        ul {
            display: flex;
            align-items: center;

            li {
                width: 48px;
                height: 50px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                font-size: 10px;
                position: relative;

                &.info {
                    &::after {
                        content: attr(data-count);
                        color: #fff;
                        position: absolute;
                        font-size: 12px;
                        line-height: 1;
                        left: 28px;
                        bottom: 34px;
                        padding: 1px 4px;
                        background-color: red;
                        border-radius: 7px;
                    }
                }

                &.info-dot {
                    &::after {
                        content: '';
                        position: absolute;
                        left: 33px;
                        bottom: 40px;
                        padding: 3px;
                        background-color: red;
                        border-radius: 50%;
                    }
                }

                &::before {
                    font-size: 18px;
                }
            }
        }

        button {
            flex: 1;
            height: 40px;
            font-size: 14px;
            color: #fff;
            border-radius: 0;

            &.button-first {
                background: linear-gradient(to right, #ffd01e, #ff8917);
                border-top-left-radius: 25px;
                border-bottom-left-radius: 25px;
                margin-left: 5px;
            }

            &.button-last {
                background: linear-gradient(to right, #ff6034, #ee0a24);
                border-top-right-radius: 25px;
                border-bottom-right-radius: 25px;
                margin-right: 5px;
            }
        }
    }
</style>