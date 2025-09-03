<template>
<header>
    <div class="search">
        <span class="iconfont icon-ditu"></span>
        <img src="http://43.138.15.137:4000/static/img/white.f0f9bec7.png">
        <div class="input">
            <span class="iconfont icon-sousuo"></span>
            <input type="text"
                placeholder="请输入关键字">
        </div>
        <span class="iconfont icon-store"></span>
    </div>
    <div class="cate">
        <ul ref="nav">
            <li v-for="val, index in navlist"
                :class="{ 'active': activeIndex === index }"
                @click="changeIndex(index, $event)">{{ val.catename }}</li>
            <div ref="line"
                class="line"></div>
        </ul>
    </div>
    <div class="more">
        <span class="iconfont icon-fenlei">分类</span>
    </div>
</header>
</template>

<script>
import {
    getcate
} from '@/api/home'
export default {
    data() {
        return {
            activeIndex: 0,
            navlist: []
        }
    },
    mounted() {
        this.getcate()
    },
    methods: {
        async getcate() {
            const { code, list } = await getcate()
            if (code === 200) {
                this.navlist = list
                this.$nextTick(() => {
                    this.$refs.nav.children[0].click();
                })
            }
        },
        changeIndex(index, e) {
            const line = this.$refs.line;
            const left = e.target.offsetLeft + (e.target.offsetWidth - line.offsetWidth) / 2;
            line.style.left = left + 'px';
            this.activeIndex = index;
        }
    }
}
</script>

<style scoped
    lang="scss">
    header {
        position: relative;
        height: 80px;
        background: linear-gradient(#ff6040, #ff8a80);
        color: #fff;

        .more {
            position: absolute;
            bottom: 0;
            right: 0;
            width: 65px;
            line-height: 40px;
            text-align: center;

            span {
                font-size: 14px;

                &::before {
                    margin-right: 5px;
                }
            }
        }

        .search {
            height: 40px;
            display: flex;
            justify-content: space-around;
            align-items: center;

            span {
                font-size: 20px;
            }

            img {
                height: 24px;
            }

            .input {
                width: 170px;
                height: 32px;
                border-radius: 5px;
                background-color: #fff;
                display: flex;
                align-items: center;
                color: #000;
                padding-right: 10px;

                span {
                    font-size: 14px;
                    padding: 0 10px;
                }

                input {
                    width: 100%;
                }
            }
        }

        .cate {
            width: calc(100% - 65px);
            display: flex;
            overflow: auto;
            white-space: nowrap;
            scrollbar-width: none;

            ul {
                line-height: 40px;
                display: flex;
                position: relative;

                .line {
                    transition: all 0.3s ease-in-out;
                    position: absolute;
                    bottom: 5px;
                    left: 0;
                    width: 40px;
                    height: 3px;
                    background-color: #fff;
                    border-radius: 3px;
                }

                li {
                    padding: 0 15px;
                    font-size: 14px;
                    color: #dddddd;

                    &.active {
                        color: #fff;
                    }
                }
            }
        }
    }
</style>
