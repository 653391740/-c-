<template>
<div class="search">
    <div class="head">
        <p @click="back">‹</p>
        <input type="text"
            v-model="searchText"
            @keyup.enter="search"
            placeholder="请输入搜索内容">
        <span class="iconfont icon-sousuo"
            @click="search"></span>
    </div>
    <div class="content">
        <div class="history"
            v-if="history.length !== 0">
            <div class="title">
                <p>搜索历史</p>
                <span @click="clearSearches">清空</span>
            </div>
            <ul>
                <li v-for="(item, index) in history"
                    :key="index">
                    {{ item }}
                </li>
            </ul>
        </div>
        <div class="discovery">
            <div class="title">搜索发现</div>
            <ul>
                <li v-for="(item, index) in list"
                    @click="active(item)"
                    :key="index">
                    {{ item }}
                </li>
            </ul>
        </div>
    </div>
</div>
</template>
<script>
import { search } from '@/api/home'
export default {
    data() {
        return {
            searchText: '',
            list: ['笔记本电脑', '手机', '平板', '耳机', '洗衣机', '空调', '冰箱', '3c'],
            history: JSON.parse(localStorage.getItem('history')) || [],
            searchList: []
        }
    },
    methods: {
        back() {
            this.$router.back()
        },
        clearSearches() {
            this.history = []
        },
        async search() {
            if (this.searchText === '') return
            const text = this.searchText
            let { list } = await search({ keywords: text })
            sessionStorage.setItem('searchList', JSON.stringify(list))
            this.save()
            this.$router.push({
                path: '/goodslist',
                query: {
                    keywords: text
                }
            })
        },
        active(item) {
            this.searchText = item
            this.search()
        },
        save() {
            this.history.unshift(this.searchText)
            localStorage.setItem('history', JSON.stringify(this.history))
            this.searchText = ''
        }
    }
}
</script>

<style lang="scss"
    scoped>
    .search {
        width: 100%;
        height: 100%;
        padding-top: 44px;

        .head {
            position: fixed;
            display: flex;
            align-items: center;
            top: 0;
            left: 0;
            width: 100%;
            height: 44px;
            padding: 0 10px;
            background-color: #f2f2f2;

            p {
                text-align: center;
                width: 20px;
                font-size: 40px;
                margin-top: -10px;
            }

            input {
                flex: 1;
                height: 24px;
                padding: 0 10px;
                margin: 0 10px;
            }
        }

        .content {
            padding: 20px 16px;

            .history {
                margin-bottom: 30px;

                .title {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    p {
                        font-weight: bold;
                    }

                    span {
                        font-size: 14px;
                    }
                }

                ul {
                    display: flex;
                    flex-wrap: wrap;

                    li {
                        margin: 10px 15px 0 0;
                        background-color: #f2f2f2;
                        padding: 2px 10px;
                        border-radius: 20px;
                    }
                }
            }

            .discovery {
                .title {
                    font-weight: bold;
                    margin-bottom: 10px;
                }

                ul {
                    padding-left: 13px;
                    display: flex;
                    flex-wrap: wrap;

                    li {
                        font-weight: 200;
                        width: 50%;
                        margin-bottom: 15px;
                        color: #3c3c3c;
                        font-size: 16px;
                    }
                }
            }
        }
    }
</style>