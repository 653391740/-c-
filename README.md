# 严选商城 C 端项目

## 项目概述

-   **项目名称**: 严选商城 C 端
-   **技术栈**: Vue 2.7.16 + Vite 4.5.0 + SCSS

## 项目创建与修改过程

### 1. 项目初始化

**初始命令**:

```bash
npm create vue 严选商城C端
```

**初始状态**:

-   使用 `npm create vue` 命令创建了一个基本的 Vue 项目框架
-   初始项目结构包含基础的 Vue 文件和配置

### 2. 技术栈选择与修改

**修改内容**:

-   **Vue 版本选择**: 将默认的 Vue 3 修改为 Vue 2.7.16

    -   原因: 对 Vue 2 的熟悉度较高，同时 Vue 2.7.16 版本支持兼容性的组合式 API。
    -   修改: 在 `package.json` 中将 `vue` 的版本改为 `"^2.7.16"`

-   **构建工具选择**: 使用 Vite 4.5.0 作为构建工具

    -   原因: Vite 4.5.0 版本对 Vue2 的兼容性更好，同时支持组合式 API。
    -   修改: 在 `package.json` 中将 `vite` 的版本改为 `"^4.5.0"`

-   **路由管理**: 添加了 Vue Router
-   修改: 在 `package.json` 中添加了 `"vue-router": "^3.6.5"`

### 3. 依赖安装

**安装命令**:

```bash
npm install
```

**安装的依赖**:

-   **移动端适配**: 用于将 px 单位转换为 viewport 单位

    -   安装命令: `npm install postcss-px-to-viewport@^1.1.1`
    -   用途: 实现移动端适配，自动将 px 转换为 vw/vh

-   **Axios**: 用于 HTTP 请求

    -   安装命令: `npm install axios`
    -   用途: 处理 API 请求和响应

### 4. 项目结构调整

**初始结构**:

```
严选商城C端/
├── index.html
├── package.json
├── public/
├── src/
│   ├── App.vue
│   ├── main.js
│   └── assets/
```

**修改后的结构**:

```
严选商城C端/
├── src/
│   ├── App.vue          #  主应用组件
│   ├── main.js          # 入口文件
│   ├── router/          # 路由配置
│   │   └── index.js
│   ├── api/             # API接口
│   │   ├── cart.js
│   │   ├── home.js
│   │   └── login.js
│   ├── utils/           # 工具函数
│   │   └── request.js
│   ├── components/      # 通用组件
│   │   ├── Popup.vue
│   │   ├── address.vue
│   │   ├── dialog.vue
│   │   ├── dingdan.vue
│   │   ├── goodlist.vue
│   │   ├── index.js
│   │   ├── input.vue
│   │   ├── msg.vue
│   │   ├── popupmsg.vue
│   │   ├── region.vue
│   │   └── title.vue
│   ├── views/           # 页面组件
│   │   ├── index/       # 主页面
│   │   │   ├── index.vue
│   │   │   ├── Footer.vue
│   │   │   ├── cart/        # 购物车相关页面
│   │   │   │   ├── cart.vue
│   │   │   │   ├── index.vue
│   │   │   │   └── orderconfirm.vue
│   │   │   ├── cate/        # 分类页
│   │   │   │   ├── aside.vue
│   │   │   │   ├── index.vue
│   │   │   │   └── select__content.vue
│   │   │   ├── home/        # 首页
│   │   │   │   ├── banner.vue
│   │   │   │   ├── head.vue
│   │   │   │   ├── index.vue
│   │   │   │   ├── nav.vue
│   │   │   │   └── tuijian.vue
│   │   │   └── user/        # 用户中心
│   │   │       ├── calendar.vue
│   │   │       ├── head-user.vue
│   │   │       ├── index.vue
│   │   │       ├── resDetail.vue
│   │   │       └── useredit.vue
│   │   ├── address/     # 地址相关页面
│   │   │   ├── addressadd.vue
│   │   │   ├── addressedit.vue
│   │   │   └── addresslist.vue
│   │   ├── gooddesc/    # 商品详情
│   │   │   ├── Popup.vue
│   │   │   ├── goods-action.vue
│   │   │   └── index.vue
│   │   ├── login/       # 登录相关页面
│   │   │   ├── formlogin.vue
│   │   │   ├── login.vue
│   │   │   ├── register.vue
│   │   │   └── smslogin.vue
│   │   ├── goodslist.vue # 商品列表页
│   │   ├── orderlist.vue # 订单列表
│   │   ├── pay.vue      # 支付页面
│   │   └── search.vue   # 搜索页面
│   └── assets/          # 静态资源
│       ├── font_5013562_fto4iomcxbi/  # 字体图标
│       ├── index.css    # 全局样式
│       └── ...一系列图片.png
├── public/
│   ├── city.json        # 城市数据
│   └── favicon.ico
├── vite.config.js       # Vite配置
├── jsconfig.json        # JS配置
├── index.html           # HTML入口文件
├── package.json         # 项目依赖配置
└── .gitignore           # Git忽略文件
```

### 5. 关键文件修改

#### 5.1 main.js 修改

**修改为**:

```javascript
import Vue from "vue";
import App from "./App.vue";
import "./assets/index.css";
import router from "./router";
import "@/assets/font_5013562_fto4iomcxbi/iconfont.css";
import "./components/index";
import Input from "./components/input.vue";
Vue.component("Input", Input);

new Vue({
    render: (h) => h(App),
    router,
}).$mount("#app");
```

**修改点**:

1. 将 Vue 3 的 `createApp` 改为 Vue 2 的 `new Vue` 方式
2. 引入路由配置 `router`
3. 引入全局样式 `./assets/index.css`
4. 引入字体图标 `iconfont.css`
5. 引入组件注册文件 `./components/index`
6. 全局注册 `Input` 组件

#### 5.2 App.vue 修改

**修改为**:

```html
<script>
    export default {
        name: "App",
    };
</script>

<template>
    <div id="app">
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
</template>

<style scoped lang="scss">
    #app {
        height: 100vh;
    }
</style>
```

**修改点**:

1. 添加了 `keep-alive` 组件，用于缓存页面状态
2. 根据 `meta.keepAlive` 判断是否缓存页面
3. 修改样式，设置 `#app` 高度为 `100vh`
4. 添加 `scoped` 和 `lang="scss"` 属性，使用 SCSS 预处理器

#### 5.3 vite.config.js 修改

**修改为**:

```javascript
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue2";
import postcssPxToViewport from "postcss-px-to-viewport";

export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
    css: {
        postcss: {
            plugins: [
                postcssPxToViewport({
                    unitToConvert: "px",
                    viewportWidth: 375,
                    propList: ["*"],
                }),
            ],
        },
    },
    server: {
        host: "0.0.0.0",
        open: true,
    },
});
```

**修改点**:

1. 将 `@vitejs/plugin-vue` 改为 `@vitejs/plugin-vue2`，适配 Vue 2
2. 添加 `postcss-px-to-viewport` 插件配置，实现移动端适配
    - `unitToConvert`: 需要转换的单位（px）
    - `viewportWidth`: 设计稿的视窗宽度（375px）
    - `propList`: 需要转换的属性列表（\* 表示所有属性）
3. 添加服务器配置：
    - `host: '0.0.0.0'`: 允许外部访问
    - `open: true`: 启动时自动打开浏览器

#### 4.4 路由配置 (src/router/index.js)

**修改为**:

```javascript
import Vue from "vue";
import VueRouter from "vue-router";
import { popupMsg } from "@/components/index";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        redirect: "/home",
        component: () => import("@/views/index/index.vue"),
        children: [
            {
                path: "/home",
                name: "Home",
                meta: { keepAlive: true },
                component: () => import("@/views/home/index.vue"),
            },
            // ... 其他子路由
        ],
    },
    // ... 其他路由
];

const router = new VueRouter({
    mode: "history",
    routes,
});

const blackList = ["/cart", "/useredit", "/orderlist", "/addresslist"];

// 路由守卫
router.beforeEach((to, from, next) => {
    const userinfo = localStorage.getItem("userinfo");
    const token = userinfo ? JSON.parse(userinfo).token : null;
    if (blackList.includes(to.path) && !token) {
        next("/login");
        popupMsg.warn("请先登录");
    } else {
        next();
    }
});

export default router;
```

**修改点**:

1. 修改路由配置文件，定义应用的路由结构
2. 配置嵌套路由，首页、分类、购物车、用户中心作为主布局的子路由
3. 添加登录、商品详情、订单等相关页面路由
4. 配置路由守卫，实现权限控制
    - 定义黑名单路由，需要登录才能访问的路由
    - 在路由跳转前判断是否是黑名单路由，检查 token，未登录则跳转到登录页

## 遇到的问题

### 1. 底部导航栏状态管理

-   **问题描述**: 商品详情页跳转购物车页面，底部高亮不会跟随路由的激活而激活,而是根据底部导航栏点击激活。
-   **解决方案**: 把导航栏点击激活改为后置守卫跟随路由变化而变化,并且临时存储刷新不丢失

    ```javascript
    data() {
        return {
            token: '',
            activeIndex: JSON.parse(sessionStorage.getItem('activeIndex')) || 0,
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
                  icon:'iconfont icon-denglu-copy',
                  dynamicText: true
                }
            ]
        }
    },
    created() {
        const userinfoStr = localStorage.getItem('userinfo');
        this.token = userinfoStr ? JSON.parse(userinfoStr).token : null;
        this.$router.afterEach((to, from) => {
            // 处理底部导航栏状态
            this.activeIndex = this.navItems.findIndex(item => item.path === to.path);
            if (this.activeIndex === -1) return // 未匹配到路由不进行存储
            sessionStorage.setItem('activeIndex', JSON.stringify(this.activeIndex))
        })
    },
    ```

### 2. 商品列表滚动加载问题

-   **问题描述**: 在 goodlist.vue 组件中，滚动加载功能存在问题。第 86 行的条件判断`if (this.params && !this.loading)`应该放在滚动事件监听内部，而不是外部。目前只有开始触发一下，导致一直滚动不刷新。

-   **问题原因**: 滚动事件监听没有进行条件判断，导致每次滚动都会触发 loadmore 方法，而 loadmore 方法内部虽然有条件判断，但无法阻止滚动事件的频繁触发。

-   **解决方案**: 将条件判断`if (this.params && !this.loading)`移到滚动事件监听内部，确保在滚动事件触发时先进行条件判断，避免不必要的性能消耗和错误触发。

-   **代码修改建议**:

    ```javascript
    mounted() {
        // 修改前
        if (this.params && !this.loading) {
            window.addEventListener("scroll", () => {
                this.loadmore();
            });
        }

        // 修改后
        window.addEventListener("scroll", () => {
            if (this.params && !this.loading) {
                this.loadmore();
            }
        });
    }
    ```

### 3. 购物车页面上下滑动触发左右滑动问题

-   **问题描述**: 在购物车页面（cart.vue）中，用户上下滑动浏览商品时左滑动会显示删除按钮，影响用户体验。

-   **问题原因**: 原始代码中，购物车商品的滑动删除功能没有区分什么时候展开，导致上下滑动偏左方向的滑动会拉出删除按钮。

-   **解决方案**: 通过添加滑动方向判断机制，准确区分用户的上下滑动和左右滑动意图，只有明显的水平滑动才会触发删除功能。

-   **具体实现步骤**:

    1. 在 data 中添加了`slideDirection`变量来记录滑动方向
    2. 添加了`startY`和`moveY`变量来记录垂直方向的滑动距离
    3. 在`touchstart`方法中记录初始的 X 和 Y 坐标，并初始化`slideDirection`为 null
    4. 在`touchmove`方法中计算水平和垂直方向的滑动距离，首次滑动时判断滑动方向：如果水平滑动距离大于垂直滑动距离，则设置为水平滑动；否则设置为垂直滑动。只有当`slideDirection`为'horizontal'时才处理左右滑动操作
    5. 在`touchend`方法中，只有当`slideDirection`为'horizontal'时才处理滑动结束的逻辑，并增加了滑动阈值（10px），避免微小误触

-   **代码修改要点**:

    ```javascript
    // data中添加变量
    data() {
        return {
            // ...原有变量
            startY: 0,
            moveY: 0,
            slideDirection: null
        }
    }

    // touchstart方法
    touchstart(e, i) {
        // ...原有代码
        this.startY = e.touches[0].clientY
        this.slideDirection = null
    }

    // touchmove方法
    touchmove(e, i) {
        this.moveX = e.changedTouches[0].clientX
        this.moveY = e.changedTouches[0].clientY

        const deltaX = this.moveX - this.startX
        const deltaY = this.moveY - this.startY

        if (this.slideDirection === null) {
            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                this.slideDirection = 'horizontal' // 水平
            } else {
                this.slideDirection = 'vertical' // 垂直
            }
        }

        if (this.slideDirection === 'horizontal') {
            // 处理水平滑动
        }
    }

    // touchend方法
    touchend(e, i) {
        if (this.slideDirection === 'horizontal') {
            // 处理水平滑动结束逻辑
        }
    }
    ```

-   **实现效果**: 通过这种方式，系统能够准确区分用户的上下滑动和左右滑动意图，当用户上下滑动浏览商品时不会触发删除操作，只有明显的水平滑动才会触发删除功能，提升了用户体验，减少了误操作。

### 4. 地区选择器遮罩层阻止滚动问题

-   **问题描述**: 在地区选择器组件（region.vue）中，遮罩层（.pop）覆盖在内容上，导致无法滚动下方内容。

-   **问题原因**: 遮罩层使用了绝对定位覆盖在整个选择器上，虽然没有设置背景色，但由于没有设置 pointer-events 属性，导致鼠标/触摸事件被遮罩层拦截，无法传递到下方的可滚动区域。

-   **解决方案**: 给遮罩层（.pop）添加`pointer-events: none`属性，使鼠标/触摸事件能够穿透遮罩层，传递到下方的可滚动区域，从而允许用户正常滚动选择地区。

-   **代码修改**:

    ```css
    .pop {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: linear-gradient(
            #fff,
            transparent calc(50% - 22px),
            transparent calc(50% + 22px),
            #fff
        );
        z-index: 1;
        pointer-events: none; /* 添加这行，使事件能够穿透遮罩层 */
    }
    ```

-   **实现效果**: 通过添加`pointer-events: none`属性，遮罩层不再拦截鼠标/触摸事件，用户可以正常滚动选择地区，同时保持了遮罩层的视觉效果。

### 5. 轮播图快速滑动卡顿问题 及 无缝后无过渡效果

-   **问题描述**: 在首页轮播图组件（banner.vue）中，用户快速滑动时轮播图会出现"抽抽"的卡顿现象，影响用户体验。

-   **问题原因**: 原始代码中，轮播图的触摸事件处理与过渡动画之间存在冲突，主要问题点包括：

    1. 在 `handleTouchMove` 中直接修改 transform 属性，但与状态管理存在冲突
    2. 模板中的内联样式绑定与 JavaScript 中的样式控制存在冲突
    3. 无缝滚动后未重新开启过渡效果

-   **解决方案**: 通过优化触摸事件处理逻辑和状态管理，改进轮播图的滑动体验：

    1. **模板结构优化**：
        - 移除模板中多余的内联样式绑定，改为只在 JavaScript 中动态控制
    2. **触摸结束逻辑优化**：
        - 引入了`touchTime`记录触摸开始时间，根据时间和距离综合判断是否切换轮播图
        - 优化了切换条件：快速滑动（按下松开间隔<300ms）且距离>10 像素，或者慢速滑动但距离>屏幕宽度的 1/3
        - 在触摸结束时恢复过渡效果，确保切换动画流畅
        - 直接调用 `prevSlide` 和 `nextSlide` 方法，而不是手动修改 `currentIndex`
    3. **自动轮播逻辑优化**：
        - 在 `nextSlide` 和 `prevSlide` 方法中，明确设置过渡效果
        - 优化了无缝滚动的处理，在到达边界时立即跳转并移除过渡效果,同步执行完成后执行 setTimeout 微任务 重新打开过渡效果
        - 简化了状态管理逻辑，确保状态转换的一致性
    4. **统一位置管理**：
        - 添加了 `updateCarouselPosition` 方法统一管理轮播图位置
        - 添加了对 `currentIndex` 的监听，只需要专注于控制下标，而不需要手动修改位置
    5. **初始化流程优化**：
        - 确保在获取轮播图数据后再初始化轮播图位置和自动播放
        - 在组件卸载时清除定时器，防止内存泄漏

-   **代码修改要点**:

    1. **模板结构优化**：

        ```html
        <template>
            <div class="carousel-container" ref="carouselContainer">
                <!-- 修改前 -->
                <div class="carousel-track" ref="carouselTrack" :style="{
                    transition: bianliang ? `transform 0.3s ease` :'none'
                }">

                <!-- 修改后 -->
                <div class="carousel-track" ref="carouselTrack">
                </div>
            </div>
        </template>
        ```

    2. **脚本部分优化**：

        ```javascript
        export default {
            data() {
                return {
                    slides: [],
                    currentIndex: 1,
                    timer: null,
                    startX: 0,
                    touchTime: 0,
                };
            },
            watch: {
                currentIndex() {
                    this.updateCarouselPosition();
                },
            },
            methods: {
                // 更新轮播图位置
                updateCarouselPosition() {
                    this.$refs.carouselTrack.style.transform = `translateX(-${
                        this.currentIndex * 100
                    }%)`;
                },

                // 下一张
                nextSlide() {
                    this.currentIndex++;
                    if (this.currentIndex > this.slides.length) {
                        setTimeout(() => {
                            this.$refs.carouselTrack.style.transition = "none";
                            this.currentIndex = 1;
                            // 添加 setTimeout 宏任务等同步任务执行完成后重新开启过渡效果
                            setTimeout(() => {
                                this.$refs.carouselTrack.style.transition =
                                    "transform 0.3s ease";
                            }, 10);
                        }, 300);
                    }
                },
            },
        };
        ```

-   **核心实现**:

    -   通过 CSS transform 实现轮播效果
    -   使用 touch 事件处理滑动操作
    -   通过复制首尾元素实现无缝滚动
    -   使用定时器实现自动播放

### 6. 日历组件滚动高度计算问题

-   **问题描述**: 在日历组件（calendar.vue）中，计算滚动位置的高度时没有考虑月份之间的间距（margin-bottom: 20px），导致滚动时显示的年月与页面实际位置不一致。

-   **问题原因**: 在 calendar.vue 文件的第 61 行，计算每个月份的高度时只添加了元素的高度（e.offsetHeight），但没有考虑 CSS 中定义的月份间距（margin-bottom: 20px）。这导致计算出的高度与实际渲染的高度不匹配，从而影响了滚动时年月显示的准确性。

-   **解决方案**: 在计算高度时，除了元素本身的高度外，还需要添加月份之间的间距（20px）。修改代码为`height += e.offsetHeight + 20;`，确保计算的高度与实际渲染的高度一致。

-   **代码修改**:

    ```javascript
    mounted() {
        // 修改前
        this.$nextTick(() => {
            const Container = this.$refs.calendarContainer;
            let height = 0;
            for (let i = 0; i < Container.children.length; i++) {
                this.calendarData[i].height = height;
                if (i !== children.length - 1) {
                    height += children[i].offsetHeight;
                }
            }
            Container.scrollTop = Container.scrollHeight;
        });

        // 修改后
        this.$nextTick(() => {
            const Container = this.$refs.calendarContainer;
            const children = Container.children;
            let height = 0;
            for (let i = 0; i < Container.children.length; i++) {
                this.calendarData[i].height = height;
                if (i !== children.length - 1) {
                    height += children[i].offsetHeight + 20; // 添加元素高度和月份间距
                }
            }
            Container.scrollTop = Container.scrollHeight;
        });
    }
    ```

-   **实现效果**: 通过在计算高度时添加月份间距（20px），确保了计算的高度与实际渲染的高度一致，从而解决了滚动时显示的年月与页面实际位置不一致的问题。用户在滚动日历时，顶部显示的年月能够准确反映当前查看的月份位置。



### 7. Region.vue 组件滑动滚动位置问题解决方案

-   **问题描述**:

    在 region.vue 组件中，使用 postcssPxToViewport 进行 px 到 vw 的转换时，JavaScript 代码中硬编码的 px 值没有被转换，导致在不同设备上滑动滚动的位置计算不准确。

-   **问题原因**:

    1. postcssPxToViewport 只能转换 CSS 中的 px 单位，无法转换 JavaScript 代码中的 px 值
    2. region.vue 组件中有多处使用 px 值进行计算和定位的地方，例如：
        - 列表项高度（44px）
        - 列表上下内边距（128px）
        - 渐变遮罩位置（22px）

-   **解决方案**:

        #### 1. 添加工具函数处理 JavaScript 中的 px 值

        ```javascript
        // 工具函数：获取当前视口宽度并计算实际像素值
        getActualPx(px, designWidth = 375) {
            const actualViewportWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            return px / designWidth \* actualViewportWidth;
        }
        ```

        #### 2. 修改计算方法使用实际像素值

        修改 `num()` 方法：

        ```javascript
        num(i) {
            const listLength = i === 1 ? this.provlist.length : i === 2 ? this.citylist.length : this.regionlist.length;
            return -(listLength - 1) * this.getActualPx(44);
        }
        ```

        修改 `handleTouchEnd()` 方法：

        ```javascript
        handleTouchEnd(e, i) {
            // ... 其他代码
            const actualItemHeight = this.getActualPx(44);
            const currentIndex = Math.round(Math.abs(finalPosition) / actualItemHeight);
            dome.style.transform = `translateY(${-currentIndex * actualItemHeight}px)`;
            this.Y[i].MoveY = -currentIndex * actualItemHeight;
            // ... 其他代码
        }
        ```

        #### 4. 添加窗口大小变化监听

        ```javascript
        mounted() {
            // 监听窗口大小变化
            window.addEventListener('resize', this.handleResize);
        },
        beforeDestroy() {
            // 移除窗口大小变化监听
            window.removeEventListener('resize', this.handleResize);
        },
        methods: {
            // 窗口变化重置选择
            handleResize() {
                this.update(0, 0)
                this.$refs.calendar.children[0].style.transform = `translateY(0px)`
                this.Y[0].MoveY = 0;
            },
            // ... 其他方法
        }
        ```

-   **解决效果**:

    通过以上修改，region.vue 组件在不同设备上的滑动滚动位置计算变得准确，不再出现位置偏移的问题。CSS 中的 px 值通过 postcssPxToViewport 自动转换为 vw 单位，而 JavaScript 中的 px 值通过 getActualPx 函数动态计算实际像素值，确保两者在不同设备上保持一致。

-   **注意事项**:

    1. 设计稿宽度（375px）需要与 postcssPxToViewport 配置中的 viewportWidth 保持一致
    2. 所有硬编码的 px 值都应该通过 getActualPx 函数进行转换
    3. 窗口大小变化时需要重新计算位置，确保响应式布局正确
    4. CSS 和 JavaScript 中的尺寸值需要保持一致，避免计算错误


### 8. 全局像素转换工具函数

为了在整个应用中统一处理像素转换，避免在每个组件中重复定义 `getActualPx` 函数，我们已经将该函数提取为全局工具函数。

#### 8.1 工具函数实现

在 `src/utils/pxUtils.js` 中实现了像素转换工具函数：

```javascript
export function getActualPx(px, designWidth = 375) {
    const actualViewportWidth =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
    return (px / designWidth) * actualViewportWidth;
}
```

#### 8.2 全局注册

在 `src/main.js` 中导入并使用该插件：

```javascript
// ...
import { getActualPx } from "./utils/pxUtils"; // 导入像素转换工具
Vue.prototype.$getActualPx = getActualPx // 全局注册像素转换工具
```

#### 8.3 优势

1. **代码复用**：避免在每个组件中重复定义相同的转换函数
2. **维护性**：集中管理像素转换逻辑，便于后续修改和维护
3. **一致性**：确保整个应用使用相同的转换逻辑，避免因不同实现导致的显示问题
4. **灵活性**：支持自定义设计稿宽度，适应不同设计规范

#### 8.4 示例：更新 region.vue 组件

我们已经将 region.vue 组件中的本地 `getActualPx` 方法替换为全局方法：

```javascript
// 修改前
num(i) {
    const listLength = i === 1 ? this.provlist.length : i === 2 ? this.citylist.length : this.regionlist.length;
    return -(listLength - 1) * this.$getActualPx(this.itemHeight);
},

// 修改后
num(i) {
    const listLength = i === 1 ? this.provlist.length : i === 2 ? this.citylist.length : this.regionlist.length;
    return -(listLength - 1) * this.$getActualPx(this.itemHeight);
},
```

通过这种方式，我们简化了组件代码，提高了代码的可维护性和复用性。