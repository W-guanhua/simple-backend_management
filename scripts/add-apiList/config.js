const path = require('path')
const resolve = dir => path.resolve(__dirname, dir)

module.exports = {
    // 自动生成api列表配置
    baseURL: 'https://xxx.aaaa.cn/bbb/',
    swaggerURL: 'https://xxx.aaaa.cn/bbb/v2/api-docs', // swagger的api地址，F12打开swagger,找到docs的接口。
    apiListSrcPath: resolve(`../../src/projects/example-project/apis/index.js`), // 生成的接口路径,一般不该，为固定名称
    copySrcPath: resolve(`../../src/projects/example-project/apis/index.copy.js`), // 生成url的备用存放地址,copy.js可随意命名
    whiteTags: ['中台接口'], // 需要生成tag的白名单，具体为接口文档的某一列的值
}
