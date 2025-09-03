<template>
<div class="goods">
    <nav>
        <ul>
            <li v-for="item, index in tabs"
                :key="item"
                :class="{ 'active': index == currentIndex }"
                @click="changeTab(index)">{{ item }}</li>
        </ul>
    </nav>
    <div class="goods_list">
        <ul>
            <li v-for="value in goodslist"
                :key="value.id">
                <div class="left">
                    <img :src="'http://43.138.15.137:4000' + value.img">
                    <p>{{ tabs[currentIndex] }}</p>
                </div>
                <div class="right">
                    <p>{{ value.goodsname }}</p>
                    <div>
                        <div class="price">
                            <div>¥<span>{{ value.price }}</span></div>
                            <p>¥{{ value.market_price }}</p>
                        </div>
                        <button>立即抢购</button>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</div>
</template>

<script>
import {
    gethortgoods
} from '@/api/home'
export default {
    data() {
        return {
            currentIndex: 0,
            tabs: ['热门推荐', '上新推荐', '所有商品'],
            goods_list: []
        }
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

        .goods_list {
            background-color: #f5f5f5;

            ul {
                li {
                    padding: 8px 16px;
                    font-size: 12px;
                    background-color: #fff;
                    display: flex;
                    gap: 8px;

                    .left {
                        position: relative;
                        width: 88px;
                        height: 88px;

                        img {
                            width: 100%;
                            height: 100%;
                            border-radius: 10px;
                        }

                        p {
                            position: absolute;
                            top: 3px;
                            left: 0;
                            border-top-right-radius: 10px;
                            border-bottom-right-radius: 10px;
                            background-color: #ff6e50;
                            color: #fff;
                            padding: 0 8px 0;
                        }
                    }

                    .right {
                        flex: 1;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;

                        &>div {
                            display: flex;
                            justify-content: space-between;

                            .price {
                                display: flex;

                                span {
                                    font-size: 16px;
                                }

                                p {
                                    margin-top: 4px;
                                    margin-left: 5px;

                                    color: #ccc;
                                    text-decoration: line-through;
                                }
                            }

                            button {
                                background-color: #ff6040;
                                color: #fff;
                            }
                        }
                    }
                }
            }
        }
    }
</style>