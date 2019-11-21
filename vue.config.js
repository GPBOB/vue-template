// const resolve = dir => path.join(__dirname, dir)

module.exports = {
    publicPath: "./",
    chainWebpack: config => {
        config.resolve.alias
            .set('@', __dirname + "/src")
            .set('views', __dirname + "/src/views")
            .set('components', __dirname + "/src/components")
    },
    css: {
        exact: true,
        loaderOptions: {}
    },
    devServer: {
        open: true,
        host: 'localhost',
        port: '8080',
        hotOnly: true,
        proxy: {
            "/api": {
                target: process.env.VUE_APP_API_URL,
                pathRewrite: {"^/api": ""}
            }
        }
    }
}