const project = 'example-project'

module.exports = {
  project, // 生成的文件名
  projectName: '示例', // 项目名称
  baseURL: 'https://xxx.aaaa.cn/bbb/',
  swaggerURL: 'https://xxx.aaaa.cn/bbb/v2/api-docs', // swagger的api地址，F12打开swagger,找到docs的接口。
  whiteTags: ['中台相关接口'], // 需要生成tag的白名单，具体为接口文档的某一列的值
}