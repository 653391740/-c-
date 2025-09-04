<template>
<div class="gooddesc">
    <Title title="商品详情"
        back></Title>
    <div class="banner">
        <img :src="'http://43.138.15.137:4000' + goodsinfo.img">
    </div>
    <div class="info">
        <div class="title">
            商品的名称 :{{ goodsinfo.goodsname }}
        </div>
        <div class="price">
            商品的价格 :¥{{ goodsinfo.price }}
        </div>
    </div>
    <GoodsAction></GoodsAction>
</div>
</template>

<script>
import { getgoodsinfo } from '@/api/home'
import Title from '@/components/title.vue'
import GoodsAction from '@/views/gooddesc/goods-action.vue'
export default {
    components: {
        Title,
        GoodsAction
    },
    data() {
        return {
            goodsinfo: {}
        }
    },
    mounted() {
        this.getgoodsinfo()
    },
    methods: {
        async getgoodsinfo() {
            let { list } = await getgoodsinfo({ id: this.$route.query.id })
            this.goodsinfo = list[0]
            sessionStorage.setItem('img', JSON.stringify('http://43.138.15.137:4000' + this.goodsinfo.img))
        }
    }
}
</script>

<style scoped
    lang="scss">
    .gooddesc {
        height: 100%;
        padding-top: 44px;
        padding-bottom: 50px;

        .banner {
            width: 100%;
            height: 0;
            padding-bottom: 75%;
            overflow: hidden;
            position: relative;
            border-bottom: 1px solid #ccc;

            img {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                object-fit: contain;
            }
        }

        .info {
            font-size: 14px;
        }
    }
</style>