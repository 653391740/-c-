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
// 购物车商品编辑
export const cartedit = (data) => {
    const formData = new URLSearchParams();
    for (const key in data) {
        formData.append(key, data[key]);
    }
    return http.post('cartedit', formData)
}
// 购物车商品删除
export const cartdel = (data) => {
    return http.post('cartdelete', data)
}