import Vue from 'vue'
import MsgComponent from '../components/msg.vue'

// 创建一个扩展的构造器
const MsgConstructor = Vue.extend(MsgComponent)

// 创建一个实例并挂载到body上
const instance = new MsgConstructor()
instance.$mount()
document.body.appendChild(instance.$el)

// 添加到Vue原型上
Vue.prototype.$msg = function (message, duration = 2000) {
  instance.show(message, duration)
}

// 导出一个函数，以便在非Vue上下文中使用
export default function (message, duration = 2000) {
  instance.show(message, duration)
}