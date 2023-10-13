const inquirer = require('inquirer')

// 设置问题
module.exports = function () {
    return inquirer.prompt([
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
    ]).then( answers =>{
        // 处理结果
        console.log(`你的名字: `, answers)
        
    }).catch(error => {
        process.exit(0)
    })
}