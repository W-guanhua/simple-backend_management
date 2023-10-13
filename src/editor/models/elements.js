import { guid } from '@editor/utils/tools'

const createDefaultAtts = ({type}) => {
  return {}
}

export default class Element {
  constructor (option) {
    this.type = option.type
    this.name = option.name
    this.uuid = option.uuid || guid()
    this.attrs = option.attrs || createDefaultAtts(option)
  }
}