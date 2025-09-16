/**
 * 像素转换工具函数
 * 用于将设计稿中的像素值转换为实际设备上的像素值
 */

/**
 * 根据设备实际宽度转换设计稿像素值
 * @param {number} px - 设计稿中的像素值
 * @param {number} designWidth - 设计稿宽度，默认为375px
 * @returns {number} 转换后的实际像素值
 */
export function getActualPx(px, designWidth = 375) {
    const actualViewportWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    return px / designWidth * actualViewportWidth;
}