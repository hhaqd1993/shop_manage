import Vue from 'vue'
import App from './App'
import router from './router'

// 导入elementUI组件库
import ElementUI from 'element-ui'
// 导入elementUI的样式
import 'element-ui/lib/theme-chalk/index.css'
// 导入公共样式
import '@/assets/common.css'
// 使用elementUI这个插件
Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
