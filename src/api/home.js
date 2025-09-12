import http from '@/utils/request'

// 首页导航分类
export const getcate = () => {
    return http.get('getcate')
}
// 所有分类
export const getcates = () => {
    return http.get('getcates')
}
// 轮播图
export const getbanner = () => {
    return http.get('getbanner')
}
// 热门推荐&上新推荐&所有商品
export const gethortgoods = () => {
    return http.get('gethortgoods')
}
// 商品列表
export const getgoodlist = (params) => {
    return http.get('getgoodlist', { params })
}
// 商品详情
export const getgoodsinfo = (params) => {
    return http.get('getgoodsinfo', { params })
}
// 搜索
export const search = (params) => {
    return http.get('search', { params })
}

