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
        component: () => import('@/views/goodlist.vue'),
    },
    {
        path: '/gooddesc',
        name: 'Gooddesc',
        component: () => import('@/views/gooddesc/index.vue'),
    },
    {
        path: '/useredit',
        name: 'Useredit',
        component: () => import('@/views/user/useredit.vue'),
    },
    {
        path: '/orderconfirm',
        name: 'Orderconfirm',
        component: () => import('@/views/cart/orderconfirm.vue')
    },
    {
        path: '/addresslist',
        name: 'Addresslist',
        component: () => import('@/views/address/addresslist.vue')
    },
    {
        path: '/orderlist',
        name: 'Orderlist',
        component: () => import('@/views/orderlist.vue')
    },
    {
        path: '/addressadd',
        name: 'Addressadd',
        component: () => import('@/views/address/addressadd.vue')
    },
]

const router = new VueRouter({
    mode: 'history',
    routes
})

const blackList = ['/cart']

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