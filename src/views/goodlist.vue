<template>
<div class="good">
    <Title title="商品列表"
        back></Title>
    <div class="head">
        <div class="search">
            <span class="iconfont icon-sousuo"></span>
            <input type="text"
                placeholder="搜索">
        </div>
        <ul>
            <li @click="sortstatus = 0">综合排序</li>
            <li>销量</li>
            <li @click="toggleSort">价格11
                <div>
                    <span :style="{ 'border-bottom-color': sortstatus === 1 ? '#FF0000' : '#fff' }"></span>
                    <span :style="{ 'border-top-color': sortstatus === 2 ? '#FF0000' : '#fff' }"></span>
                </div>
            </li>
            <li>好评度</li>
            <li>店铺</li>
            <li class="iconfont">筛选
            </li>
        </ul>
    </div>
    <!-- isloading 显示加载-->
    <goodslist :goodslist="sort"
        showloading
        :loading="loading"
        @loading="getgoodlist"
        :params="params"></goodslist>
</div>
</template>
<script>
import {
    getgoodlist
} from '@/api/home'
import Title from '@/components/title.vue';
import goodslist from '@/components/goodslist.vue';
export default {
    components: {
        Title,
        goodslist,
    },
    data() {
        return {
            goodlist: [],
            params: {
                page: 1,
                size: 6,
            },
            loading: false,
            sortstatus: 0,
        }
    },
    computed: {
        sort() {
            if (this.sortstatus === 0) {
                return this.goodlist
            } else if (this.sortstatus === 1) {
                return [...this.goodlist].sort((a, b) => a.price - b.price)
            } else {
                return [...this.goodlist].sort((a, b) => b.price - a.price)
            }
        }
    },
    mounted() {
        this.params = { ...this.params, ...this.$route.query };
    },
    methods: {
        toggleSort() {
            this.sortstatus === 0 ? this.sortstatus = 1
                : this.sortstatus === 1 ? this.sortstatus = 2
                    : this.sortstatus = 1
        },
        async getgoodlist() {
            this.loading = true;
            const { code, list: { goodData } } = await getgoodlist(this.params)
            if (goodData !== null) {
                this.goodlist.push(...goodData);
                this.params.page++
            }
            this.loading = false
        }
    }
}
</script>
<style scoped
    lang="scss">
    .good {
        padding-top: 134px;
        height: 100%;
        background-color: #fff;

        .head {
            width: 100%;
            height: 90px;
            position: fixed;
            z-index: 99;
            top: 44px;
            left: 0;
            background: linear-gradient(#FF6040, #FF8A80);

            .search {
                width: calc(100% - 24px);
                margin: 10px 12px;
                height: 34px;
                border-radius: 17px;
                background-color: #fff;
                display: flex;
                align-items: center;
                padding: 0 10px;

                input {
                    padding-left: 10px;
                    font-size: 16px;

                    &::placeholder {
                        color: #ccc;
                    }
                }
            }

            ul {
                display: flex;
                white-space: nowrap;
                color: #fff;
                font-size: 14px;
                padding: 0 10px;
                line-height: 36px;

                li {
                    flex: 1;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 2px;

                    div {
                        height: 20px;
                        gap: 2px;
                        display: flex;
                        flex-direction: column;

                        span {
                            display: block;
                            padding: 0;
                            border: 5px solid transparent;
                            border-width: 5px 4px;
                            transition: all 0.3s;
                        }
                    }
                }
            }
        }
    }
</style>