import Vue from 'vue'
import Router, { RouteConfig } from 'vue-router'

Vue.use(Router)

const routes: Array<RouteConfig> = [{
    path: '/',
    redirect: 'home'
}, {
  path: '/home',
  name: 'home',
  component: () => import('../views/home/index.vue')
}, {
    path: '/about',
    name: 'about',
    component: () => import('../views/about/index.vue')
}]

export default new Router({
    mode: 'hash',
    routes: routes
})