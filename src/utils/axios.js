import {
    baseUrl, //引入baseUrl
} from "env.js";
import axios from 'axios';
import qs from 'qs';
import store from '../store/index.js';
 
// 创建 axios 实例
let service = axios.create({
    baseUrl: baseUrl,
    timeout: 20000,  // 请求超时时间
    crossDomain: true,//设置cross跨域
    withCredentials: true//设置cross跨域 并设置访问权限 允许跨域携带cookie信息
})
 
// 设置 post 默认 Content-Type
service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
 
// 添加请求拦截器
service.interceptors.request.use(
    
    (config) => {
        // if(store.state.requestLoading){
        //     return ;
        // }
         store.commit('OPEN_LOADING');
        // console.log( vue.$store.requestLoading)
        //判断请求方式是否为POST，进行转换格式
        config.method === 'post'
            ? config.data = qs.stringify({...config.data})
            : config.params = {...config.params};
        // 请求发送前进行处理
        return config
    },
    (error) => {
        store.commit('CLOSE_LOADING');
        // 请求错误处理
        return Promise.reject(error)
    }
)
 
// 添加响应拦截器
service.interceptors.response.use(
    (response) => {
        store.commit('CLOSE_LOADING');
        let { data } = response;
        return data
    },
    (error) => {
        store.commit('CLOSE_LOADING');
        let info = {},
            { errCode, errMsg, data } = error.response;
 
        if (!error.response) {
            info = {
                code: 5000,
                msg: 'Network Error'
            }
        } else {
            // 此处整理错误信息格式
            info = {
                code: errCode,
                data: data,
                msg: errMsg
            }
        }
    }
)
 
/**
 * 创建统一封装过的 axios 实例
 * @return {AxiosInstance}
 */
export default service
