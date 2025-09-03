import http from '@/utils/request'

export const login = (data) => {
    return http.post('login', data)
}
export const getcate = () => {
    return http.get('getcate')
}
export const getbanner = () => {
    return http.get('getbanner')
}
export const gethortgoods = () => {
    return http.get('gethortgoods')
}
