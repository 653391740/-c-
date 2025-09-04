import Vue from 'vue'
import MsgComponent from '../components/msg.vue'
import PopupMsgComponent from '../components/popupmsg.vue'

// 创建一个扩展的构造器
const MsgConstructor = Vue.extend(MsgComponent)
const PopupMsgConstructor = Vue.extend(PopupMsgComponent)

// 创建一个实例并挂载到body上
const instance = new MsgConstructor()
instance.$mount()
document.body.appendChild(instance.$el)

// 创建popupmsg实例并挂载到body上
const popupInstance = new PopupMsgConstructor()
popupInstance.$mount()
document.body.appendChild(popupInstance.$el)

// 添加到Vue原型上
Vue.prototype.$msg = function (message, duration = 2000) {
  instance.show(message, duration)
}

// 创建popupMsg函数实例
const popupMsg = function(message, duration = 2000) {
  popupInstance.info(message, duration)
  return popupMsg
}

// 添加链式调用方法
popupMsg.info = function (message, duration = 2000) {
  popupInstance.info(message, duration)
  return this
}
popupMsg.error = function (message, duration = 2000) {
  popupInstance.error(message, duration)
  return this
}
popupMsg.success = function (message, duration = 2000) {
  popupInstance.success(message, duration)
  return this
}

Vue.prototype.$popupMsg = popupMsg

// 导出一个函数，以便在非Vue上下文中使用
export default function (message, duration = 2000) {
  instance.show(message, duration)
}

// 导出popupmsg组件
export { PopupMsgComponent }