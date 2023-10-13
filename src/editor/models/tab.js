import { guid } from '@editor/utils/tools'
import store from '../store/index'

const getDefaultApiMap = () => {
  return {
    get: '',  // 查接口 
    update: '', // 改接口，可为空
    add: '', // 增接口，可为空
    delete: '' // 删接口，可为空
  }
}

const getDefaultCol = ({description, prop} = {}) => {
  return {
    label: description || '新增列',
    prop: prop || '',
    type: 'string',
    format: '',
    show: true
  }
}

const createCols = ({model, type} = {}) => {
  const { swaggerData } = store.state
  const { definitionList } = swaggerData || {}
  if (['table'].includes(type)) {
    if (!definitionList || !definitionList.length) return []
    const relative = definitionList.find(item => item.title === model)
    if (!relative) return []
    return Object.entries(relative.properties).map(([prop, {description}]) => {
      return getDefaultCol({description, prop})
    })
  } else {
    return []
  }
}

export default class Tab {
  constructor (option) {
    this.tab = option.tab
    this.tabName = option.tabName
    this.jsonName = option.jsonName
    this.type = option.type
    this.model = option.model
    this.returnValue = option.returnValue
    this.uuid = option.uuid || guid()
    this.apiMap = option.apiMap || getDefaultApiMap()
    this.cols = option.cols || createCols(option)
  }

  addCol () {
    this.cols.push(getDefaultCol())
  }
}