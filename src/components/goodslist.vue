<template>
<div class="goods_list">
    <ul>
        <li v-for="value in goodslist"
            :key="value.id">
            <div class="left">
                <img :src="'http://43.138.15.137:4000' + value.img">
                <p v-if="type">{{ type }}</p>
            </div>
            <div class="right">
                <p>{{ value.goodsname }}</p>
                <div>
                    <div class="price">
                        <div>¥<span>{{ value.price }}</span></div>
                        <p v-if="isshow">¥{{ value.market_price }}</p>
                    </div>
                    <button v-if="button">{{ button }}</button>
                </div>
            </div>
        </li>
    </ul>
</div>
</template>

<script>
export default {
    data() {
        return {
        }
    },
    props: {
        goodslist: {
            type: Array,
            default: () => []
        },
        type: {
            type: String,
            default: ''
        },
        button: {
            type: String,
            default: ''
        },
        isshow: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style scoped
    lang="scss">
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
</style>