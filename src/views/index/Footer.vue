<script>
export default {
    data() {
        return {
            token: localStorage.getItem('yanxuan_token') || '',
            activeIndex: 0,
            navItems: [
                {
                    path: '/home', text: '商场',
                    icon: 'iconfont icon-zhuye'
                },
                {
                    path: '/cate', text: '分类',
                    icon: 'iconfont icon-fenlei1'
                },
                {
                    path: '/cart', text: '购物车',
                    icon: 'iconfont icon-gouwu'
                },
                {
                    path: '/user', text: '用户',
                    icon:
                        'iconfont icon-denglu-copy',
                    dynamicText: true
                }
            ]
        }
    }
}
</script>
<template>
<footer>
    <nav>
        <ul>
            <li v-for="item, index in navItems"
                :key="item.path"
                :class="{ 'active': activeIndex === index }"
                @click="activeIndex = index">
                <router-link :to="item.path">
                    <i :class="item.icon"></i>
                    {{ item.dynamicText
                        ? (token ? item.text : '未登录') : item.text }}
                </router-link>
            </li>
        </ul>
    </nav>
</footer>
</template>

<style lang="scss"
    scoped>
    footer {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        background-color: #fff;
        border-top: 1px solid #ccc;

        ul {
            display: flex;
            height: 50px;

            li {
                flex: 1;
                display: flex;
                font-size: 12px;

                a {
                    flex: 1;
                    display: flex;
                    align-items: center;
                    flex-direction: column;
                    justify-content: center;

                    i {
                        height: 24px;
                        font-size: 24px;
                        margin-bottom: 5px;
                    }
                }

                &.active {
                    color: #ff750b;
                }
            }
        }
    }
</style>