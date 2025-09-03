<template>
<div class="goods">
    <nav>
        <ul>
            <li v-for="item in tabs"
                :key="item"
                :class="{ 'active': item === currentTab }"
                @click="changeTab(item)">{{ item }}</li>
        </ul>
    </nav>
    <div class="goods_list">
        <ul>
            <li>
                <div class="left">
                    <img src="/src/assets/1.png">
                    <p>{{ currentTab }}</p>
                </div>
                <div class="right">
                    <p>商品名称</p>
                    <div>
                        <div class="price">
                            <div>¥<span>100</span></div>
                            <p>¥199</p>
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
export default {
    data() {
        return {
            currentTab: '热门推荐',
            tabs: ['热门推荐', '上新推荐', '所有商品'],
        }
    },
    methods: {
        changeTab(item) {
            this.currentTab = item
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