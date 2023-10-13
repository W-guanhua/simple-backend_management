import Vue from 'vue'


const files = require.context('./', true, /\.vue$/)
files.keys().forEach(key => {
    const componentName = key.split('./')[1]
    const component = require(`@/components/${componentName}`).default
    Vue.component(`G${componentName.split('.')[0]}`, component)
})