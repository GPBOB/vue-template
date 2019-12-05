import Vue from 'vue'
import VueRouter from 'vue-router'
import {baseRouter} from './common'

const _import = require('./_import_' + process.env.NODE_ENV)


Vue.use(VueRouter)

const baseRouters = baseRouter

const router = new VueRouter({
    routes:baseRouters,
// 路由跳转回到顶部
    scrollBehavior: () => {
        // return 期望滚动到哪个的位置
        return {x: 0, y: 0}
    }
})


export default router
