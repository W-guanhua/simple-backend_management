const axios = require('axios')
const path = require('path')
const fs = require('fs-extra')

const {
  swaggerURL,
  whiteTags
} = require('./config')

const { 
  filterApiList, parseDefinitions
} = require('../utils/swagger')
const main = async () => {

  const { data } = await axios.get(swaggerURL)

  const { paths, definitions } = data
  const apiList = filterApiList(paths, whiteTags)
  const definitionList = parseDefinitions(definitions)
  fs.writeJSON(path.resolve(__dirname, './swagger.json'), {definitionList, apiList}, {
    spaces: 4
  })
}

main()