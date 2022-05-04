import Vue from 'vue'
// import axios from 'axios'
// import axios from '/src/utils/axios.js'
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

import axios from 'axios'

// 添加请求拦截器，在请求头中加token,Cookie
// axios.interceptors.request.use(
//   config => {
//     if (localStorage.getItem('Authorization')) {
//       config.headers.Authorization = localStorage.getItem('Authorization');
//     }
//     if (localStorage.getItem('Cookies')) {
//       config.headers.Cookies = localStorage.getItem('Cookies');
//     }
//     return config;
//   }, error => {
//     return Promise.reject(error);
//   });

// // 这里拦截401错误，并重新跳入登页重新获取token
// axios.interceptors.response.use(
//   response => {
//     console.log("response.use" + response)
//     if (response.data.data && response.data.data.ecode == '401') {
//       localStorage.removeItem('Authorization');
//       localStorage.removeItem('Cookie');
//       this.$router.push('/login');
//     } else {
//       return response;
//     }
//   }, error => {
//     if (error.response) {
//       switch (error.response.status) {
//         case 401:
//           localStorage.removeItem('Authorization');
//           localStorage.removeItem('Cookie');
//           this.$router.push('/login');
//       }
//     }
//     return Promise.reject(error.response.data)
//   }
// );


