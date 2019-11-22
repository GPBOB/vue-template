import Vue from 'vue'
import VueRouter from 'vue-router'

const _import = require('./_import_' + process.env.NODE_ENV)


Vue.use(VueRouter)

const routes = [
    {
        path: '/login',
        name: 'login',
        component: _import("login/login")
    },
    {
        path: '/home',
        name: 'home',
        component: _import("Home")
    },
]

const router = new VueRouter({
    routes,
// 路由跳转回到顶部
    scrollBehavior: () => {
        // return 期望滚动到哪个的位置
        return {x: 0, y: 0}
    }
})


export default router
