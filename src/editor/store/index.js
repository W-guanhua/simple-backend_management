import Tab from '@editor/models/tab'
import { cloneDeep } from 'lodash'
const initWork = () => {
  return {
    project: '',
    projectName: '',
    tabList: [],
  }
}


const state = {
  work: initWork(),
  swaggerData: {
    apiList: [],
    definitionList: []      
  },
  currentTab: null,
  currentElement: null,
  currentCol: null
}

// getters
const getters = {
  selectApiList (state) {
    return (state.swaggerData.apiList || []).map(item => {
      return {
        value: item.apiName,
        label: item.summary
      }
    })
  }
}

// mutations
const mutations = {
    initWork (state, payload = {}) {
      const newWork = cloneDeep(payload)
      newWork.tabList = newWork.tabList.map(item => new Tab(item))
      state.work = newWork
    },
    updateSwaggerData (state, payload = {}) {
      Object.assign(state.swaggerData, payload)
    },
    createTab (state, payload = {}) {
      const tab = new Tab(payload)
      state.work.tabList.push(tab)
      state.currentTab = tab
      state.currentElement = null
    },
    setCurrentTab (state, index) {
      state.currentTab = state.work.tabList[index]
    },
    setCurrentCol (state, index) {
      state.currentCol = state.currentTab.cols[index]
    }
}
export default {
  namespaced: true,
  state,
  getters,
  mutations
}
