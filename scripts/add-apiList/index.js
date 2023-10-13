const inquirer = require('inquirer')
const axios = require('axios')
const path = require('path')
const fs = require('fs-extra')
const chalk = require('chalk')
const resolve = (...file) => path.resolve(__dirname, ...file)
const log = message => console.log(chalk.green(`${message}`))
const successLog = message => console.log(chalk.blue(`${message}`))
const errorLog = error => console.log(chalk.red(`${error}`))

const {templateRenderModel, templteRenderUrl, getApiName} = require('./template')

const {
    swaggerURL,
    apiListSrcPath,
    copySrcPath,
    whiteTags
} = require('./config')

log('开始获取swagger数据')
axios.get(swaggerURL).then(res => {
    const data = res.data.paths
    const definitionData = res.data.definitions
    const arr = []
    for (const [url, value] of Object.entries(data)) {
        for (const [methods, extraData] of Object.entries(value)) {
            arr.push({
                url,
                methods,
                tags: extraData.tags[0],
                summary: extraData.summary,
                operationId: extraData.operationId,
                apiName: getApiName({url, methods}),
            })
        }
    }
    const apiListStr = arr.filter(item => whiteTags.indexOf(item.tags)>=0).reduce((str, item) => {
        return str + templteRenderUrl(item)
    },'')
    inquirer.prompt([
        {
            type: 'confirm',
            name: 'choice', // 数据属性名
            message: '是否直接覆盖原api文件', // 提示信息
            default: '', // 默认值
            validate: (e) => { return Boolean(e)}
        }
    ]).then(async ({ choice }) => {
        if (!choice) {
            await fs.ensureFile(copySrcPath)
        }
        console.log('apiListSrcPath', apiListSrcPath)
        fs.outputFile(resolve(choice? apiListSrcPath : copySrcPath), 
`import request from './request'

export default {
    request,
    ${apiListStr}
}`)
        successLog('api列表生成成功')
    })

}).catch(err => {
    errorLog('操作失败' + err)
})
