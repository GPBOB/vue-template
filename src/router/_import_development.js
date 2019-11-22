// 开发环境路由正常方式加载（使用懒加载会影响webpack热更新太慢）
module.exports = file => require("@/views/" + file + ".vue").default