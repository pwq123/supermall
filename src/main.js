import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./store";
import totast from 'components/common/toast'

import FastClick from 'fastclick'
import VueLazyload from "vue-lazyload";
 Vue.config.productionTip = false
//添加事件总线对象
Vue.prototype.$bus = new Vue()

//安装totast插件
Vue.use(totast)

//解决移动端300ms的延迟
FastClick.attach(document.body)


//使用懒加载的插件
Vue.use(VueLazyload,{
  loading: require('../src/assets/img/common/placeholder.png')
})

new Vue({
  render: h => h(App),
   router,
   store
}).$mount('#app')
