const inquirer = require('inquirer')
const axios = require('axios')
const path = require('path')
const fs = require('fs-extra')
const chalk = require('chalk')
const resolve = (...file) => path.resolve(__dirname, ...file)
const log = message => console.log(chalk.green(`${message}`))
const successLog = message => console.log(chalk.blue(`${message}`))
const errorLog = error => console.log(chalk.red(`${error}`))
const Handlebars = require('Handlebars');

const {
    swaggerURL,
    project,
    projectName,
    baseURL,
    tabList,
} = require('./config')

const mainPath = path.resolve(__dirname, `../../src/projects/${project}`)


const createProjectConfig = async () => {
  const projectPath = path.resolve(mainPath, './project.config.js')
  await fs.ensureFile(projectPath)
  const template = await fs.readFile(resolve(`./template/project.config.js`), 'utf8')
  const fileContent = Handlebars.compile(template, 'utf8')
  fs.outputFile(projectPath, fileContent({
      title: projectName,
      baseURL,
      tabList
  }))
}

const tranModelToSchema = (model) => {
  return Object.entries(model?.properties || {}).reduce((arr, [key, value]) => {
    const jsType = {
      'string': 'string',
      'integer': 'number',
      'number': 'number',
    }[value.type]
    arr.push({
      prop: key,
      description: value.description,
      type: jsType || 'string'
    })
    return arr
  }, [])
} 

const createVue = async (item, schemaList) => {
  if (!['activity', 'table', 'banner'].includes(item.type)) {
    errorLog(`不支持的模板类型${item.type}`)
    return
  }
  const projectPath = path.resolve(mainPath, `./tabs/${item.tab}.vue`)
  await fs.ensureFile(projectPath)
  const template = await fs.readFile(resolve(`./template/${item.type}.vue`), 'utf8')
  const fileContent = Handlebars.compile(template, 'utf8')
  fs.outputFile(projectPath, fileContent({
    schemaList,
    ...item,
    project,
    projectName
  }))
}

const createJSONSchema = async (name, schemaList) => {
  const projectPath = path.resolve(mainPath, `./form-schemas/${name}.json`)
  await fs.ensureFile(projectPath)
  const template = await fs.readFile(resolve(`./template/schema.json`), 'utf8')
  const fileContent = Handlebars.compile(template, 'utf8')
  fs.outputFile(projectPath, fileContent({
    schemaList
  }))
}
 
const main = async () => {

  log('开始生成project.config.js')

  await createProjectConfig()

  const { data } = await axios.get(swaggerURL)
  const definitionData = data.definitions

  for(let item of tabList) {
    if (item.ignore) continue
    const model = definitionData[item.model]
    const schema = tranModelToSchema(model)
    await createVue(item, schema)
    if (model) {
      await createJSONSchema(item.jsonName, schema)
    }
    successLog(`${item.tab}完成生成`)
  }
}

main()
