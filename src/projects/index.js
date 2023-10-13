/**
 * .vue组件处理
 * 主要是路由配置
 */
const files = require.context('./', true, /\.vue$/)
const tabs = []
const asideMenu = []
const childRoutes = []
files.keys().forEach(key => {
    const tmpList = key.split('/')
    const [,projectName, fileType, childMenu] = tmpList
    const childMenuName = childMenu.indexOf('.vue') >= 0 ? null : childMenu
    const targetName = tmpList[tmpList.length - 1].split('.')[0]
    /** tabs：侧边栏菜单 */
    if (fileType === 'tabs') {
        const filePath = key.split('tabs/')[1]
        const proDesc = require(`@/projects/${projectName}/project.config.js`).default
        const existProject = asideMenu.find(menu => menu.title === proDesc['title'])
        const tab = {
            title: proDesc.tabs[targetName] || targetName,
            path: `/${projectName}/tab/${filePath}`,
            name:  `${projectName}.tab.${targetName}`,
            component: resolve => {
                require([`@/projects/${projectName}/tabs/${filePath}`], resolve);
            }
        }
        if (existProject) {
            const childMenuTab = existProject.tabs.find(tabItem => tabItem.path === `/${projectName}/tab/${childMenuName}`)
            childMenuName ? childMenuTab ? 
            childMenuTab['childMenu'].push(tab) : 
            existProject.tabs.push({
                title: proDesc.tabs[childMenuName] || childMenuName,
                path: `/${projectName}/tab/${childMenuName}`,
                childMenu: [tab]
            }) : 
            existProject.tabs.push(tab)
        } else {
            asideMenu.push({
                order: proDesc['order'] || 100,
                title: proDesc['title'],
                tabs: childMenuName ? [{
                    title: proDesc.tabs[childMenuName] || childMenuName,
                    path: `/${projectName}/tab/${childMenuName}`,
                    childMenu: [tab]
                }] : [tab],
                hidden: proDesc['hidden']
            })
        }

        tabs.push(tab)
    }
    /** 子路由 */
    if (fileType === 'child-routes') {
        childRoutes.push({
            path: `/${projectName}/child/${targetName}`,
            name: `${projectName}.child.${targetName}`,
            component: resolve => {
                require([`@/projects/${projectName}/child-routes/${targetName}`], resolve);
            }
        })
    }
})
asideMenu.sort((a, b) => b['order'] - a['order']) // 排序
/** apis处理
 * this.$apis['comment-management']['api-name']
 */
const apisFiles = require.context('./', true, /apis$/)
const apis = {}
apisFiles.keys().forEach(key => {
    const projectName = key.split('/')[1]
    const path = key.split('./')[1]
    const apiFile = require(`@/projects/${path}/index.js`)
    apis[projectName] = apiFile.default
})
/** configs处理
 * this.$configs['comment-management']['config-option']
 */
const configsFiles = require.context('./', true, /apis$/)
const configs = {}
configsFiles.keys().forEach(key => {
    const projectName = key.split('/')[1]
    const configFile = require(`@/projects/${projectName}/project.config.js`)
    configs[projectName] = configFile.default
})
export {
    configs, // 所有项目的配置汇总
    apis, // this.$apis['comment-management']['api-name']
    tabs, // 用于注册路由
    asideMenu, // 用于初始化侧边菜单栏
    childRoutes, // 用于注册子路由
}