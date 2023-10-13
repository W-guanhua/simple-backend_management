// 配置参考: https://cli.vuejs.org/zh/config/
require('./env')
var path = require('path')
function resolve (dir) {
 return path.join(__dirname, dir)
}
module.exports = {
    productionSourceMap: false,
    publicPath: './', //相对路径转绝对路径
    // webpack-dev-server 的配置项
    devServer: {
        disableHostCheck: true,
        overlay: {
            warnings: true,
            errors: true
        },
    },
    css: {
        extract: false,
        sourceMap: false,
        loaderOptions: {
            less: {
                javascriptEnabled: true //less 配置
            }
        },
        modules: false
    },
    chainWebpack: config => {
        config.resolve.alias
        .set('@', resolve('/src'))
        .set('@editor', resolve('/src/editor'))
        .set('@utils', resolve('src/utils'))
        .set('@configs', resolve('src/configs'))

        return config
    }
}