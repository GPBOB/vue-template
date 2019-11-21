import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
]

const router = new VueRouter({
    // mode: 'history',
    base: process.env.BASE_URL,
    routes,
// 路由跳转回到顶部
    scrollBehavior: () => {
        // return 期望滚动到哪个的位置
        return {x: 0, y: 0}
    }
})


export default router
