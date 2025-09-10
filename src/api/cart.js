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
    return http.post('cartadd', data)
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
// 地址列表
export const addresslist = () => {
    return http.get(`addresslist`, { params: { uid: JSON.parse(localStorage.getItem('userinfo')).uid } })
}
// 订单列表
export const orderlist = (data) => {
    return http.get(`orderlist`, {
        params: {
            ...data,
            uid: JSON.parse(localStorage.getItem('userinfo')).uid
        }
    })
}
// 订单详情
export const orderadd = (data) => {
    return http.post(`orderadd`, data)
}
// 支付宝支付
export const alipay = (data) => {
    return http.post(`alipay`, data)
}
// 地址添加
export const addressadd = (data) => {
    return http.post(`addressadd`, data)
}
// 地址编辑
export const addressedit = (data) => {
    return http.post(`addressedit`, data)
}
// 地址删除
export const addressremove = (data) => {
    return http.post(`addressremove`, data)
}
