import axios from "axios";
const service = axios.create({
    baseURL: 'http://43.138.15.137:4000/api/',
    timeout: 5000
});

//请求拦截器
service.interceptors.request.use(config => {
    const token = localStorage.getItem('sc_token');
    if (token) {
        config.headers['Authorization'] = token;
    }
    return config;
}, error => {
    return Promise.reject(error)
});

//响应拦截器
service.interceptors.response.use(response => {
    return response.data;
}, error => {
    // 处理请求超时逻辑
    if (error.code === 'ECONNABORTED' && error.message.includes('timeout')) {
        Message.error('请求超时，请检查网络连接后重试')
    }
    return Promise.reject(error)
});

export default service