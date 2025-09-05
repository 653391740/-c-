import http from '@/utils/request'
// 账号密码登录
export const login = (data) => {
    return http.post('login', data)
}
// 发送短信验证码
export const sms = (params) => {
    return http.get('sms', { params })
}
export const smslogin = (data) => {
    const formData = new URLSearchParams();
    for (const key in data) {
        formData.append(key, data[key]);
    }
    return http.post('smslogin', formData)
}
// 注册
export const register = (data) => {
    const formData = new URLSearchParams();
    for (const key in data) {
        formData.append(key, data[key]);
    }
    return http.post('register', formData)
}