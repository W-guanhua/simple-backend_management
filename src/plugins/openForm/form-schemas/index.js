import demos from './demos.json'
const files = require.context('@/projects', true, /\.json$/)
const list = []
files.keys().forEach(path => {
    const pathFile = path.split('/')
    const dirName = pathFile[pathFile.length - 2]
    const projectName = pathFile[1]
    const schemaName = pathFile[pathFile.length - 1].split('.')[0]
    if (dirName === 'form-schemas') {
        list.push({
            projectName,
            schemaName,
            path
        })
    }
});

export default {
    demos,
    ...list.reduce((obj, {
        projectName,
        schemaName,
        path
    }) => {
        if (!obj[projectName]) {
            obj[projectName] = {}
        }
        obj[projectName][schemaName] = require(`@/projects${path.split('.')[1]}`)
        return obj
    }, {})
}