// 引入scp2
var client = require('scp2');
// 下面三个插件是部署的时候控制台美化所用 可有可无
const ora = require('ora');
const chalk = require('chalk');
const spinner = ora(chalk.green('正在发布到服务器...'));
spinner.start();
// companyName：公司名称
// projectName：项目名称
const projectName = 'develop_companyName/projectName'
client.scp('./dist/', {    // 本地打包文件的位置
  "host": '193.112.212.169', // 服务器的IP地址
  "port": '22',            // 服务器端口， 一般为 22
  "username": 'root',       // 用户名
  "password": 'szl07302',     // 密码
  "path": '/data/www/scp/front-end/' + projectName            // 项目部署的服务器目标位置
}, err =>{
  spinner.stop();
  if (!err) {
    console.log(chalk.green("项目发布完毕!"))
    console.log(chalk.green(`中台测试链接：https://dollartest.mdollar.cn/scp/front-end/${projectName}/index.html`))
    // TODO:在这里可以发送一条钉钉群推送，告知测试环境已经生成；考虑配合钉钉项目管理自动建群功能；
  } else {
    console.log("err", err)
  }
})