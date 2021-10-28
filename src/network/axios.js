import axios from "axios";

export function request(config) {
// 创建实例
const instance = axios.create({
  baseURL: 'http://1.12.227.123:3000/',
  timeout: 15000,
  // 当前请求为跨域类型时是否在请求中携带cookie
  withCredentials: true
});
// 请求拦截
instance.interceptors.request.use(data => {
  return data
}, err => {
  console.log(err);
});
// 响应拦截
instance.defaults.withCredentials = true
instance.interceptors.response.use((res) => {
  return res.data
}, err => {
  console.log(err);
});
// 发送真正的网络请求
return instance(config)
}

