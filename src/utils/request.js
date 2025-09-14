import axios from "axios";
import { msg } from '../components/index'
const service = axios.create({
    baseURL: 'http://43.138.15.137:4000/api/',
    timeout: 5000
});

//请求拦截器
service.interceptors.request.use(config => {
    const userinfoStr = localStorage.getItem('userinfo');
    const userinfo = userinfoStr ? JSON.parse(userinfoStr) : null;
    if (userinfo) {
        config.headers['Authorization'] = 'Bearer ' + userinfo.token;
    }
    return config;
}, error => {
    return Promise.reject(error)
});

//响应拦截器
service.interceptors.response.use(response => {
    const { code, list } = response.data
    if (code === 403) {
        msg('登录过期请重新登录')
        localStorage.removeItem('userinfo')
        window.location.href = '/login'
    }
    return response.data;
}, error => {
    // 处理请求超时逻辑
    console.log(error);

    if (error.code === 'ECONNABORTED' && error.message.includes('timeout')) {
        msg('请求超时，请检查网络连接后重试')
    }
    return Promise.reject(error)
});

export default service