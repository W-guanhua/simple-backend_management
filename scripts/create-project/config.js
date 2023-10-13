
const project = 'example-project'

module.exports = {
    // 自动生成api列表配置
    project, // 生成的文件名
    projectName: '示例', // 项目名称
    baseURL: 'https://xxx.aaaa.cn/bbb/',
    swaggerURL: 'https://xxx.aaaa.cn/bbb/v2/api-docs', // swagger的api地址，F12打开swagger,找到docs的接口。
    tabList: [ // 生成的tabs的List内容
      {
        tab: 'ProjectTab1', // 组件文件名
        tabName: '配置1', // 配置名称
        jsonName: 'jsonName',   // 生成的schema.json的名称
        model: 'DTO', // 对应后端文档中definitions的models对象
        type: 'table',      // 应用的模板类型，目前仅支持 table/activity
        returnValue: 'res.value', // 对获取接口返回的值format, res为get接口返回的值
        // ignore: true,    // 是否忽略该项配置，一般用于已生成需增加配置，不想再次更改此tab时使用
        apiMap: {
          get: 'midIndex',  // 查接口 
          update: 'updateProductConfig', // 改接口，可为空
          add: 'updateProductConfig', // 增接口，可为空
          delete: 'deleteItem' // 删接口，可为空
        }
      },
      {
        tab: 'ProjectTab2',
        tabName: '活动配置',
        jsonName: 'headBanner',
        type: 'activity',
        returnValue: 'res.activityStatus',
        // ignore: true,
        apiMap: {
          get: 'midIndex',
          update: 'setActstatus',
        }
      },
      {
        tab: 'ProjectTab3',
        tabName: 'banner配置',
        type: 'banner',
        returnValue: 'res.bannerConfig',
        // ignore: true,
        apiMap: {
          get: 'midIndex',
          update: 'bannerConfig',
        }
      },
    ]
}
