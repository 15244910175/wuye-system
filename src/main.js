import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import '../public/reset.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/icon/font_1952916_lyvy8yd6qqb/iconfont.css'
//导入表格
import vueXlsxTable from 'vue-xlsx-table'
Vue.use(vueXlsxTable, {rABS: false})
//导出表格
import JsonExcel from 'vue-json-excel'
Vue.component('downloadExcel', JsonExcel)

Vue.use(ElementUI);
Vue.prototype.$axios = axios
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')



