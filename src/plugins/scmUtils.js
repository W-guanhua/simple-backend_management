import _ from 'lodash'
import Vue from 'vue'
import axios from 'axios'
import mpAdapter from 'axios-miniprogram-adapter'
import {
    deepClone,
} from '@/utils/_'
class SchemaUtils {
    constructor() {}
    /** 
     * 把现有数据合并到schema中
     * 注：会改变schema源数据
     */
    mergeSchemaData(schema, data) {
        schema = JSON.parse(JSON.stringify(schema))
        for (const key in schema) {
            schema[key].value = data[key] || schema[key].value
        }
        return schema
    }
    /**
     * 校验schema-form，根据每一项的pattern正则字段
     * @param {Object} schemaJson schema-json
     * @return rawInfo or Boolean(false)
     */
    checkScmForm(schemaJson) {
        const rawInfo = {}
        const invalidList = Object.entries(schemaJson).reduce((invalidList, [key, item]) => {
            const {
                pattern,
                value,
                title,
                require
            } = item
            rawInfo[key] = value
            if (require && (value == '' || value == undefined)) invalidList.push(title)
            return invalidList
        }, [])
        if (invalidList.length) {
            Vue.prototype.$message.error(`请检查配置：${invalidList.join('、')}`)
            return Promise.resolve(false)
        }
        return Promise.resolve(rawInfo)
    }

    /** schema 转 json数据 */
    schema2Data(schema) {
        let temp = deepClone(schema)
        return objectParser1(temp)

        function objectParser1(schema) {
            const props = schema.properties
            const obj = {}
            for (const key in props) {
                const prop = props[key]
                if (prop.type === 'object') {
                    obj[key] = objectParser1(prop)
                } else {
                    obj[key] = prop.value || ''
                }
            }
            return obj
        }
    }

    /** schema 转 json数据 */
    schema2data(schema) {
        let jsonData = {}
        let temp = deepClone(schema)
        return objectParser(temp, jsonData)


        function objectParser(objSchema, result = {}) {
            let copy = deepClone(result)
            let props = objSchema.properties
            if (!props) return copy

            for (const key in props) {
                const prop = props[key]
                if (prop.type === 'object') {
                    console.log('J', JSON.stringify(prop))
                    copy[key] = objectParser(prop, copy)
                } else {
                    copy[key] = prop.value || ''
                }
            }
            return copy
        }
    }

    /** schema 转 json数据 (活动组件)*/
    schema2sketch({
        components,
        activityStatus
    }) {
        return {
            components: components.reduce((result, component) => {
                const copy = deepClone(component)
                result.push({
                    componentType: copy.componentType,
                    componentAlias: copy.componentAlias,
                    thumbUrl: copy.thumbUrl,
                    data: this.schema2Data(copy.schema),
                })
                return result
            }, []),
            activityStatus: this.schema2Data(activityStatus)
        }
    }

    /** 根据项目名和环境获取json文件路径 */
    getJsonFilePath({
        projectName,
        apiEnv, // dev\product_test\product
        jsonEnv, // sketch \ publish
    }) {
        // todo：配置各环境的baseURL
        const baseURL = {
            dev: 'https://jy.cdollar.cn:8888/jiaoyinmini/only_for_product_test/configCenter',
            product_test: 'https://www.mdollar.cn/jiaoyin-res/file_dc',
            product: 'https://jy.cdollar.cn:8888/jiaoyinmini/miniappconfig/config_center',
        } [apiEnv]
        projectName = encodeURIComponent(projectName)
        const fileName = {
            sketch: `${projectName}_tmp.json`,
            publish: `${projectName}.json`,
        } [jsonEnv]
        return `${baseURL}/${fileName}?t=${Date.now()}`
    }

    getJsonData({
        client, // mp \ h5
        projectName,
        apiEnv, // dev\product_test\product
        jsonEnv, // sketch \ publish
    }) {
        const filePath = this.getJsonFilePath({
            projectName,
            apiEnv, // dev\product_test\product
            jsonEnv, // sketch \ publish
        })
        console.log('filePath', filePath)
        const httpOptions = {}
        // todo: 快速生成一个带loading功能和环境检测功能的http请求
        if (client === 'mp' || client === 'uni') {
            httpOptions.adapter = mpAdapter
        }
        const http = axios.create(httpOptions)
        return http.get(filePath).then(res => res.data)
    }
}
export default (Vue, options) => {
    console.log('SchemaUtils')
    Vue.prototype.$schemaUtils = new SchemaUtils()
}