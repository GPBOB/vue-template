// const resolve = dir => path.join(__dirname, dir)

module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
    lintOnSave: false, // eslint-loader 是否在保存的时候检查
    chainWebpack: config => {
        config.resolve.alias
            .set('@', __dirname + "/src")
            .set('views', __dirname + "/src/views")
            .set('components', __dirname + "/src/components")
        // 修复HMR
        config.resolve.symlinks(true)
    },
    css: {
        // exact: true,
        loaderOptions: {}
    },
    devServer: {
        open: true,
        host: 'localhost',
        port: 8080,
        hotOnly: true,
        https: false,
        proxy: {
            "/api": {
                target: process.env.VUE_APP_API_URL,
                pathRewrite: {"^/api": ""},
                changeOrigin: false,
                ws: false,
            },
        }
    }
}