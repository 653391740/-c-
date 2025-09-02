import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/home',
        component: () => import('@/views/index/index.vue'),
        children: [
            {
                path: '/home',
                name: 'Home',
                component: () => import('@/views/home/index.vue'),
            },
            {
                path: '/cate',
                name: 'Cate',
                component: () => import('@/views/cate/index.vue'),
            },
            {
                path: '/cart',
                name: 'Cart',
                component: () => import('@/views/cart/index.vue'),
            },
            {
                path: '/user',
                name: 'User',
                component: () => import('@/views/user/index.vue'),
            },
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/login.vue'),
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

const whiteList = ['/login', '/home', '/cate', '/cart', '/user']

// 路由守卫
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('yanxuan_token');
    if (whiteList.includes(to.path) || token) {
        next();
    } else {
        next(from.path);
    }
})


export default router