/**
 * *@author chengyuzhou
 * *@describe vue-cli 配置文件
 */
const path = require('path')
const resolve = dir => path.join(__dirname, dir)

module.exports = {
  publicPath: './',

  // 关闭文件名哈希
  filenameHashing: false,

  // eslint-loader 是否在保存的时候检查
  lintOnSave: true,

  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  assetsDir: 'static',

  // 以多页模式构建应用程序。
  pages: undefined,

  // 是否使用包含运行时编译器的 Vue 构建版本
  runtimeCompiler: true,

  // 列出想要通过 Babel 显式转译的依赖
  transpileDependencies: [
    /* string or regex */
  ],

  // webpack配置
  //对内部的 webpack 配置进行更细粒度的修改 https://github.com/neutrinojs/webpack-chain see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  chainWebpack: config => {
    /**
     * 删除懒加载模块的prefetch，降低带宽压力
     * https://cli.vuejs.org/zh/guide/html-and-static-assets.html#prefetch
     * 而且预渲染时生成的prefetch标签是modern版本的，低版本浏览器是不需要的
     */
    //config.plugins.delete('prefetch');
    //if(process.env.NODE_ENV === 'production') { // 为生产环境修改配置...process.env.NODE_ENV !== 'development'
    //} else {// 为开发环境修改配置...
    //}
    // 添加别名
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('views', resolve('src/views'))
    config.resolve.alias.set('/static', resolve('static'))
    //打包文件带hash
    config.output.filename('[name].[hash].js').end()
    //修复HMR
    config.resolve.symlinks(true)
  },
  css: {
    modules: false,
    sourceMap: false,
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  // webpack-dev-server 相关配置 https://webpack.js.org/configuration/dev-server/
  devServer: {
    host: '0.0.0.0',
    port: 8080, //端口号
    https: false, // https:{type:Boolean}
    open: true, //配置自动启动浏览器
    // before: app => {},
    proxy: {
      // 配置跨域处理,只有一个代理
      '/api': {
        target: process.env.VUE_APP_BASE_API,
        pathRewrite: {
          '^/api': ''
        },
        changeOrigin: true,
        ws: true, //websocket支持
        secure: false
      }
    },
    hotOnly: true // 热更新
  },

  // 第三方插件配置 https://www.npmjs.com/package/vue-cli-plugin-style-resources-loader
  pluginOptions: {}
}
