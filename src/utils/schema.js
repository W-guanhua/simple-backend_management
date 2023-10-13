import * as _ from './_'
// 深拷贝
export function deepClone(target) {
    return JSON.parse(JSON.stringify(target))
    // return _.cloneDeep(target)
}
/** schema 转 json数据 */
export function schema2data (schema) {
    let jsonData = {}
    let temp = _.deepClone(schema)
    return objectParser(temp, jsonData)


    function objectParser(objSchema, result = {}) {
        let copy = _.deepClone(result)
        let props = objSchema.properties || objSchema
        if (!props) return copy

        for (const key in props) {
            const prop = props[key]
            if (prop.type === 'object') {
                copy[key] = objectParser(prop, copy)
            } else {
                copy[key] = prop.value || ''
            }
        }
        return copy
    }
}
/** schema 转 json数据 */
export function schema2json (schema) {
    let jsonData = {}
    let temp = _.deepClone(schema)
    return objectParser(temp, jsonData)


    function objectParser(objSchema, result = {}) {
        let copy = _.deepClone(result)
        let props = objSchema.properties || objSchema
        if (!props) return copy

        for (const key in props) {
            const prop = props[key]
            if (prop.type === 'object') {
                copy[key] = objectParser(prop, copy)
            } else {
                copy[key] = prop.value || ''
            }
        }
        return copy
    }
}

/** 把现有数据合并到schema中
 */
export function mergeSchemaData (schema, data, extraData = {}) {
    schema = JSON.parse(JSON.stringify(schema))
    if (!schema.type || !_.isString(schema.type)) {
        for (const key in schema) {
            schema[key].value = data[key] || schema[key].value
        }
        // for (const key in extraData) {
        //     Object
        //     schema[key] = extraData[key]
        // }
        Object.entries(extraData).forEach(([key, value]) => {
            schema[key] = Object.assign(schema[key], value)
            console.log(schema[key])
        })
    } else {
        console.log('schema', schema)
        for (const key in schema.properties) {
            schema.properties[key].value = data[key] || schema.properties[key].value
        }
    }
    
    return schema
}