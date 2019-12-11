//生产环境路由懒加载
module.exports = file => () => import("@/views/" + file + ".vue")