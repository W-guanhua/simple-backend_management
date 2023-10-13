// 生成apiName
const getApiName = (data) => {
  let apiName = data.url.split('/').slice(-1)[0].replace(/[{|}]/g, '')
  return apiName
}
// 渲染url模板
const templteRenderUrl = (data) => {
  return `
    // ${data.summary}
    ${getApiName(data)}` +`: (params) => request.${data.methods}(` + '`' + data.url + '`, ' + ((data.methods === 'get' || data.methods === 'delete') ? '{ params }' : 'params')  + '),'

}
// 渲染url模板
const templteRenderUrl1 = (data) => {
  return `
  // ${data.summary}
  ${getApiName(data)}` +': `${baseURL}' + data.url + '`,'
}

// todo 根据swagger返回值，渲染models
const templateRenderModel = (data, sourceData) => {
  
}

module.exports = {
  getApiName,
  templteRenderUrl,
  templateRenderModel,
}

