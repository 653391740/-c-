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
            <li>综合排序</li>
            <li>销量</li>
            <li>价格
                <div>
                    <span style="border-bottom-color: #fff !important;"></span>
                    <span style="border-top-color: #fff !important;"></span>
                </div>
            </li>
            <li>好评度</li>
            <li>店铺</li>
            <li class="iconfont">筛选</li>
        </ul>
    </div>
    <!-- isloading 显示加载-->
    <goodslist :goodslist="goodlist"
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
        }
    },
    mounted() {
        this.params = { ...this.params, ...this.$route.query };
    },
    methods: {
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
                        }
                    }
                }
            }
        }
    }
</style>