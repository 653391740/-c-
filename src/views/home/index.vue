<template>
<div class="home">
    <Title title="首页"></Title>

    <Head></Head>
    <Banner></Banner>
    <Nav></Nav>
    <Tuijian></Tuijian>
    <div class="goods">
        <nav>
            <ul>
                <li v-for="item, index in tabs"
                    :key="item"
                    :class="{ 'active': index == currentIndex }"
                    @click="changeTab(index)">{{ item }}</li>
            </ul>
        </nav>
        <Goodslist :goodslist="goodslist"
            :type="tabs[currentIndex]"
            :isshow="true"
            button="立即抢购"></Goodslist>
    </div>
</div>
</template>

<script>
import {
    gethortgoods
} from '@/api/home'
import Title from '@/components/title.vue'
import Head from '@/views/home/head.vue'
import Banner from '@/views/home/banner.vue'
import Nav from '@/views/home/nav.vue'
import Tuijian from '@/views/home/tuijian.vue'
import Goodslist from '@/components/goodslist.vue'

export default {
    name: 'Home',
    data() {
        return {
            currentIndex: 0,
            tabs: ['热门推荐', '上新推荐', '所有商品'],
            goods_list: [],
        }
    },
    components: {
        Title,
        Head,
        Banner,
        Nav,
        Tuijian,
        Goodslist,
    },
    mounted() {
        this.gethortgoods()
    },
    computed: {
        goodslist() {
            if (this.goods_list.length > 0) return this.goods_list[this.currentIndex].content
        }
    },
    methods: {
        async gethortgoods() {
            const { code, list } = await gethortgoods()
            if (code === 200) {
                this.goods_list = list
            }
        },
        changeTab(index) {
            this.currentIndex = index
        }
    }
}
</script>

<style scoped
    lang="scss">
    .goods {
        nav {
            background-color: #fff;

            ul {
                display: flex;

                li {
                    flex: 1;
                    text-align: center;
                    line-height: 30px;
                    color: #ff6e50;

                    &.active {
                        color: #fff;
                        background-color: #ffa500;
                    }
                }
            }
        }
    }
</style>
