<template>
<div class="goods_list">
    <ul>
        <li v-for="value in goodslist"
            :style="{ 'background-color': color }"
            @click="$router.push({
                path: '/gooddesc',
                query: { id: value.id }
            })"
            :key="value.id">
            <div class="left">
                <img :src="'http://43.138.15.137:4000' + value.img">
                <p v-if="type">{{ type }}</p>
            </div>
            <div class="right">
                <div>
                    <p>{{ value.goodsname }}</p>
                    <span v-if="!type"
                        style="color: #646566;">描述信息</span>
                </div>
                <div class="bottom">
                    <div class="price">
                        <div>¥<span>{{ value.price }}</span></div>
                        <p v-if="isshow">¥{{ value.market_price }}</p>
                    </div>
                    <button v-if="button">{{ button }}</button>
                    <p v-if="value.num"><span>x</span>{{ value.num }}</p>
                </div>
            </div>
        </li>
    </ul>
    <div class="loading"
        ref="loading"
        v-if="showloading">
        <div v-if="loading">
            加载中...
        </div>
        <div v-else>
            没有更多了
        </div>
    </div>
</div>
</template>

<script>
export default {
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
        },
        color: {
            type: String,
            default: '#fafafa'
        },
        params: {
            type: Object,
            default: () => { }
        },
        showloading: {
            type: Boolean,
            default: false
        },
        loading: {
            type: Boolean,
            default: false
        },
    },
    mounted() {
        this.$nextTick(() => {
            this.loadmore()
        })
        window.addEventListener('scroll', () => {
            this.loadmore()
        })
    },
    methods: {
        loadmore() {
            if (this.params && !this.loading) {
                const isloading = window.scrollY + window.innerHeight >= this.$refs.loading.offsetTop
                if (isloading) this.$emit('loading')
            }
        }
    }
}
</script>

<style scoped
    lang="scss">
    .goods_list {
        ul {
            display: flex;
            flex-direction: column;
            gap: 5px;

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

                    .bottom {
                        display: flex;
                        justify-content: space-between;

                        &>p {
                            color: #969799;
                            color: 10px;
                        }

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

        .loading {
            text-align: center;
            padding: 15px 0;
            background-color: #fff;
            font-size: 14px;
            color: #969799;
        }
    }
</style>