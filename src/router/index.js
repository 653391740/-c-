import Vue from 'vue'
import VueRouter from 'vue-router'
import { popupMsg } from '@/components/index'


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
                meta: { keepAlive: true },
                component: () => import('@/views/index/home/index.vue'),
            },
            {
                path: '/cate',
                name: 'Cate',
                meta: { keepAlive: true },
                component: () => import('@/views/index/cate/index.vue'),
            },
            {
                path: '/cart',
                name: 'Cart',
                component: () => import('@/views/index/cart/index.vue'),
            },
            {
                path: '/user',
                name: 'User',
                component: () => import('@/views/index/user/index.vue'),
            },
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/login/login.vue'),
    },
    {
        path: '/formlogin',
        name: 'Formlogin',
        component: () => import('@/views/login/formlogin.vue'),
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('@/views/login/register.vue'),
    },
    {
        path: '/smslogin',
        name: 'Smslogin',
        component: () => import('@/views/login/smslogin.vue'),
    },
    {
        path: '/goodslist',
        name: 'Goodslist',
        component: () => import('@/views/goodslist.vue'),
    },
    {
        path: '/gooddesc',
        name: 'Gooddesc',
        component: () => import('@/views/gooddesc/index.vue'),
    },
    {
        path: '/useredit',
        name: 'Useredit',
        meta: { keepAlive: true },
        component: () => import('@/views/index/user/useredit.vue'),
    },
    {
        path: '/orderconfirm',
        name: 'Orderconfirm',
        component: () => import('@/views/index/cart/orderconfirm.vue')
    },
    {
        path: '/addresslist',
        name: 'Addresslist',
        component: () => import('@/views/address/addresslist.vue')
    },
    {
        path: '/orderlist',
        name: 'Orderlist',
        meta: { keepAlive: true },
        component: () => import('@/views/orderlist.vue')
    },
    {
        path: '/addressadd',
        name: 'Addressadd',
        component: () => import('@/views/address/addressadd.vue')
    },
    {
        path: '/addressedit',
        name: 'Addressedit',
        component: () => import('@/views/address/addressedit.vue')
    },
    {
        path: '/pay',
        name: 'Pay',
        component: () => import('@/views/pay.vue')
    },
    {
        path: '/search',
        name: 'Search',
        component: () => import('@/views/search.vue')
    }
]

const router = new VueRouter({
    routes
})

const blackList = ['/cart', '/useredit', '/orderlist', '/addresslist']

// 路由守卫
router.beforeEach((to, from, next) => {
    const userinfo = localStorage.getItem('userinfo');
    const token = userinfo ? JSON.parse(userinfo).token : null;
    if (blackList.includes(to.path) && !token) {
        next('/login');
        popupMsg.warn('请先登录');
    } else {
        next();
    }
})

export default router