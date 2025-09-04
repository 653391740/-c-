import http from '@/utils/request'
// 购物车商品列表
export const cartlist = () => {
    return http.get('cartlist', {
        params: {
            uid: JSON.parse(localStorage.getItem('userinfo')).uid
        }
    })
}

// 加入购物车
export const cartadd = (data) => {
    return http.post('cartadd', {
        uid: JSON.parse(localStorage.getItem('userinfo')).uid || '',
        ...data
    })
}