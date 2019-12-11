module.exports = {
    publicPath: process.env.NODE_ENV == 'production' ? './' : '/',
    lintOnSave: false, // eslint-loader 是否在保存的时候检查
    runtimeCompiler: true,
    chainWebpack: config => {
        config.resolve.alias
            .set('@', __dirname + "/src")
            .set('views', __dirname + "/src/views")
            .set('components', __dirname + "/src/components")
        // 修复HMR
        config.resolve.symlinks(true)
        // 修改prefetch：路由懒加载
        config.plugin('prefetch').tap(options => {
            options[0].fileBlacklist = options[0].fileBlacklist || []
            options[0].fileBlacklist.push(/myasyncRoute(.)+?\.js$/)
            return options
        })
    },
    configureWebpack: {
        performance: {
            hints: 'warning',
            //入口起点的最大体积 整数类型（以字节为单位）
            maxEntrypointSize: 50000000,
            //生成文件的最大体积 整数类型（以字节为单位 300k）
            maxAssetSize: 30000000,
            //只给出 js 文件的性能提示
            assetFilter: function (assetFilename) {
                return assetFilename.endsWith('.js');
            }
        }
    },
    productionSourceMap: false,
    css: {
        // exact: true,
        sourceMap: false,
        loaderOptions: {
            less: {
                javascriptEnabled: true
            }
        }
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