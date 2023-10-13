const inquirer = require('inquirer')
// index.js
const chalk = require('chalk')
const path = require('path')
const fs = require('fs-extra')
const resolve = (...file) => path.resolve(__dirname, ...file)
const log = message => console.log(chalk.green(`${message}`))
const successLog = message => console.log(chalk.blue(`${message}`))
const errorLog = error => console.log(chalk.red(`${error}`))

inquirer.prompt([
    {
        type: 'input', // 问题类型
        name: 'projectName', // 数据属性名
        message: '请输入项目中文名称', // 提示信息
        default: '', // 默认值
        validate: (e) => { return Boolean(e)}
    },
    {
        type: 'input', // 问题类型
        name: 'fileName', // 数据属性名
        message: '请输入项目文件夹名称(英文)', // 提示信息
        default: '', // 默认值
        validate: (e) => { return Boolean(e)}
    },
]).then(async ({projectName, fileName}) =>{
    // copy项目文件夹
    const dirExist = await fs.pathExists(`../../src/projects/${fileName}`)
    if (dirExist) {
        log(dirExist)
        errorLog(`目录 /projects/${fileName} 已存在`)
    } else {
        log('开始复制模板')
        await fs.ensureDir(`../../src/projects/${fileName}`)
        await fs.copy(resolve('./template'), resolve(`../../src/projects/${fileName}`))
        log('开始初始化文件')
        const Handlebars = require('Handlebars');
        const template = await fs.readFile(resolve(`../../src/projects/${fileName}/project.config.js`), 'utf8')
        const fileContent = Handlebars.compile(template, 'utf8')
        fs.outputFile(resolve(`../../src/projects/${fileName}/project.config.js`), fileContent({
            projectName
        }))
        successLog('done!')
    }
    
}).catch(error => {
    errorLog(error)
    process.exit(0)
})