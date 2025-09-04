import http from '@/utils/request'

export const cartlist = () => {
    return http.get('cartlist', {
        params: {
            uid: JSON.parse(localStorage.getItem('userinfo')).uid
        }
    })
}
export const cartadd = (data) => {
    return http.post('cartadd', {
        uid: JSON.parse(localStorage.getItem('userinfo')).uid || '',
        ...data
    })
}