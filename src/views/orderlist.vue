<template>
<div class="orderlist"
    @scroll="loadmore">
    <Title title="订单列表"
        back></Title>
    <div class="orderlist_title">
        <span @click="active = 0">待付款</span>
        <span @click="active = 1">待发货</span>
        <span @click="active = 2">待收货</span>
        <span @click="active = 3">全部订单</span>
        <div class="line"
            :style="{ left: active * 25 + ((25 - (40 / 375 * 100)) / 2) + '%' }"></div>
    </div>
    <div class="orderlist_item"
        v-for="value in list">
        <div class="cell">
            <p>{{ value.ordernumber }}</p>
            <div class="value">{{ value.status === 0 ? '待支付' : '' }}</div>
        </div>
        <div class="card"
            v-if="value.child.length > 0"
            v-for="e in value.child">
            <img :src="'http://43.138.15.137:4000' + e.img">
            <div class="content">
                <div class="info">
                    <div class="name">{{ e.goodsname }}</div>
                    <div class="desc">
                        描述信息
                    </div>
                </div>
                <div class="price">
                    <span>¥</span>{{ e.price }}
                </div>
            </div>
        </div>
        <div class="np">共计{{ value.countnumber }}件商品 合计¥{{ value.countmoney }}</div>
        <div class="submit">
            <button>继续付款</button>
            <button>取消交易</button>
            <button>查看物流</button>
        </div>
    </div>
    <div class="loading"
        ref="loading">
        <div v-if="show">
            加载中...
        </div>
        <div v-else>
            没有更多了
        </div>
    </div>
</div>
</template>

<script>
import { orderlist } from '@/api/cart'
import Title from '@/components/title.vue'
export default {
    components: {
        Title
    },
    data() {
        return {
            active: 0,
            list: [],
            loading: false,
            show: true,
            data: {
                page: 1,
                size: 5
            }
        }
    },
    mounted() {
        this.change()
    },
    watch: {
        active() {
            this.data = {
                page: 1,
                size: 5
            }
            this.list = []
            this.show = true
            this.change()
        }
    },
    methods: {
        loadmore(e) {
            if (!this.loading && e && e.target) {
                const isloading = e.target.scrollTop + e.target.clientHeight
                    >= this.$refs.loading.offsetTop;
                if (isloading) {
                    this.change()
                    this.data.page++
                }
            }
        },
        async change() {
            this.loading = true
            const { list } = await orderlist({
                status: this.active,
                ...this.data
            })
            this.loading = false
            if (list === null) return this.show = false
            this.list.push(...list.data)
        }
    }
}
</script>

<style scoped
    lang="scss">
    .loading {
        text-align: center;
        padding: 15px 0;
        font-size: 14px;
        color: #969799;
    }

    .orderlist {
        padding-top: 44px;
        height: 100%;
        background-color: #eeeeee;

        overflow: auto;

        .orderlist_title {
            display: flex;
            position: relative;

            background-color: #fff;

            .line {
                position: absolute;
                transition: all 0.3s;
                bottom: 0;
                left: 27px;
                width: 40px;
                height: 3px;
                border-radius: 1.5px;
                background-color: #ee0a24;
            }

            span {
                flex: 1;
                line-height: 44px;
                text-align: center;
                font-size: 14px;
                color: #646566;

                &.active {
                    color: #000;
                }
            }
        }

        .orderlist_item {
            margin: 7.5px;
            padding: 5px;
            background-color: #fff;
            border-radius: 5px;

            .card {
                padding: 8px 16px;
                display: flex;
                background-color: #fafafa;

                img {
                    width: 80px;
                    height: 80px;
                    margin-right: 8px;
                }

                .content {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;

                    .info {
                        font-size: 12px;

                        .desc {
                            color: #646566;
                        }
                    }

                    .price {
                        span {
                            font-size: 12px;
                        }
                    }
                }
            }

            .cell {
                font-size: 14px;
                line-height: 24px;
                padding: 10px 16px;
                display: flex;
                border-bottom: 1px solid #e7e7e7;

                &>* {
                    flex: 1;
                }

                .value {
                    text-align: right;
                    color: #969799;
                }
            }

            .np {
                line-height: 28px;
                font-size: 10px;
                text-align: right;
            }

            .submit {
                display: flex;
                justify-content: space-around;

                button {
                    height: 24px;
                    border-radius: 12px;
                    font-size: 10px;
                    padding: 0 4px;
                    background-color: transparent;
                    border: 1px solid #ccc;
                }
            }
        }
    }
</style>