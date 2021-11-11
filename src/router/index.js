import Vue from "vue";
import VueRouter from "vue-router";


const  Home = () => import('../views/home/Home')
const  Cart = () => import('../views/cart/Cart')
const  Profile = () => import('../views/profile/Profile')
const  Category = () => import('../views/category/Categroy')
const  Detail = () => import('../views/detail/Detail')

//1.按照插件

Vue.use(VueRouter)

const routes = [
  {
    path:'',
    redirect:'/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category

  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/detail/:id',
    component: Detail
  }

]

//2.创建实例对象
 const  router = new VueRouter({
   routes,
   mode: 'history'
 })

 export  default  router
