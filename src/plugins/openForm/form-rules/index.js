import defaultRules from './default-rules'

const files = require.context('@/projects', true, /\.js$/)
const list = []
files.keys().forEach(path => {
    const pathFile = path.split('/')
    const dirName = pathFile[pathFile.length - 2]
    const projectName = pathFile[1]
    const schemaName = pathFile[pathFile.length - 1].split('.')[0]
    if (dirName === 'form-schemas' &&  schemaName === 'rules') {
        list.push({
            projectName,
            schemaName,
            path
        })
    }
});

export default {
    ...defaultRules,
    ...list.reduce((obj, {
        path
    }) => {
        return Object.assign({}, obj, require(`@/projects${path.split('.')[1]}`).default)
    }, {})
}