import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./components"; // 全局组件,新增.vue文件时会自动注册到全局
import './apis'
import "./plugins"
import JsonViewer from 'vue-json-viewer'
import store from './store/index'
Vue.use(JsonViewer)
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
