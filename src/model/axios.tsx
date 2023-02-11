//@ts-nocheck

import    axios  from  "axios";
// // 拦截器的配置
// // 请求头拦截
// axios.interceptors.request.use(config => {
//     // 在发送请求之前做些什么
//     if(window.localStorage.getItem("token")){
//         config.headers.common["token"]=window.localStorage.getItem("token")
//     }
//     return config;
// }, error => {
//     // 对请求错误做些什么
//     return Promise.reject(error);
// });
// //响应头拦截
// axios.interceptors.response.use(response => {
// return response;
// },error => {
// if (error.response) {
//     switch (error.response.status) {
//         // 返回401，清除token信息并跳转到登录页面
//         case 404:
//             alert("跳到错误页面");
//         break;
//         case  500:
//             alert("接口调用错误")
//             break;
//     }
//     // 返回接口返回的错误信息
//     return Promise.reject(error.response.data);
// }
// });
// axios.defaults.baseURL=process.env.REACT_APP_URL
export  default  axios;
