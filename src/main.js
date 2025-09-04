import Vue from 'vue'
import App from './App.vue'
import './assets/index.css'
import router from './router'
import '@/assets/font_5013562_fto4iomcxbi/iconfont.css'
import './components/index'
import Input from './components/input.vue'
Vue.component('Input', Input)

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
