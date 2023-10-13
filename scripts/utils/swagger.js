
const getApiName = (data) => {
  let apiName = data.url.split('/').slice(-1)[0].replace(/[{|}]/g, '')
  return apiName
}

const filterApiList = (data, whiteTags = []) => {
  const arr = []
  for (const [url, value] of Object.entries(data)) {
      for (const [methods, extraData] of Object.entries(value)) {
        const tag = extraData.tags[0]
        if (whiteTags.indexOf(tag)>=0 || !whiteTags.length) {
          arr.push({
              url,
              methods,
              tag: extraData.tags[0],
              summary: extraData.summary,
              operationId: extraData.operationId,
              apiName: getApiName({url, methods}),
          })
        }
      }
  }
  return arr
}

const parseDefinitions = (definitions) => {
  return Object.entries(definitions).reduce((arr, [modelName, data]) => {
    arr.push({
      ...data,
      title: data.title || modelName
    })
    return arr
  }, [])
}

module.exports = {
  filterApiList,
  parseDefinitions
}
