import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const home = () => import("../views/Home.vue")    //懒加载
const login = () => import("../views/login.vue")

const gogh = () => import("../views/gogh.vue")

const check = () => import("../views/check.vue")

const ques = () => import("../views/ques.vue")

const routes = [
  {
    path: '',
    redirect: '/login'   //重定向
  },
  {
    path: '/home',
    name: 'home',
    component: home
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
    {
    path: '/check',
    name: 'check',
    component: check
  },
    {
    path: '/ques',
    name: 'ques',
    component: ques
  },
    {
    path: '/gogh',
    name: 'gogh',
    component: gogh
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


//使用push的方法
const RouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (to) {
  return RouterPush.call(this, to).catch(err => err)
}

//使用replace的方法
const RouterReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace (to) {
  return RouterReplace.call(this, to).catch(err => err)
}


export default router
