import _ from 'lodash'
// 深拷贝
export function deepClone(target) {
    return JSON.parse(JSON.stringify(target))
}
// 防抖 - 事前
export function debounceBefore(func, wait) {
    return _.debounce(func, wait, {
        leading: true, // 指定调用在节流开始前
        trailing:false, // 指定调用在节流结束后
    })
}

// 防抖 - 事后
export function debounceAfter(func, wait) {
    return _.debounce(func, wait, {
        leading: false, // 指定调用在节流开始前
        trailing: true, // 指定调用在节流结束后
    })
}
/**
 * 通过Object的toString方法获取对象类型
 */
export const getType = obj => Object.prototype.toString.call(obj).replace(/\[object|\]|\s/g, '').toLowerCase()
// 类型判断
export const isArray = value => getType(value) === 'array'
export const isObject = value => getType(value) === 'object'
export const isString = value => getType(value) === 'string'
export const isNumber = value => getType(value) === 'number'
export const isBoolean = value => getType(value) === 'boolean'
export const isRegExp = value => getType(value) === 'regexp'
export const isPlainNumber = value => isNumber(value) && !isNaN(value)
export const isNestType = value => isArray(value) || isObject(value)
export const isNullObj = value => isObject(value) && JSON.stringify(value) === '{}'
