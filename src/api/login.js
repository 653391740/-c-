import http from '@/utils/request'
// 账号密码登录
export const login = (data) => {
    return http.post('login', data)
}
export const register = (data) => {
    const formData = new URLSearchParams();
    for (const key in data) {
        formData.append(key, data[key]);
    }
    return http.post('register', formData)
}