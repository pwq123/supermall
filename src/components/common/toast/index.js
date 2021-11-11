import Toast from "./Toast";
const obj = {}
obj.install = function (Vue) {
  // Vue.extend(trn)

  // document.body.appendChild(Toast.$el)
  //1.创建组件构造器
  const toastContrustor = Vue.extend(Toast)
  //2.new的方式，根据组件构造器，可以创建一个组件对象
  const toast = new toastContrustor()
  // console.log('执行了obj的install函数',Vue)

//  3.将组件对象，手动挂载到某一个元素上
  toast.$mount(document.createElement('div'))
//  4.toast.$el对应到就是div
  document.body.appendChild(toast.$el)
  Vue.prototype.$toast = toast;
  }
export default obj
