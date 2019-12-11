const _import = require('../_import_' + process.env.NODE_ENV)

export const baseRouter = [
    {
        path: '/home',
        name: 'home',
        component: _import("Home")
    },
    {
        path: '/login',
        name: 'login',
        component: _import("login/login")
    },
    {
        path: '/404',
        name: 'error404',
        component: _import("common/404")
    },
]