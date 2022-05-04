//根据不同的环境更改不同的baseUrl
let baseUrl = '';
 
//开发环境下
if (process.env.NODE_ENV == 'development') {
    baseUrl = '';
 
} else if (process.env.NODE_ENV == 'production') {
    baseUrl = '';
}
 
export {
    baseUrl,//导出baseUrl
}
