import axios from 'axios'

export function request (url, params) {
  // 请求超过30s为超时
  const instance = axios.create({
    baseURL: '/api',
    timeout: 30000,
    // 当前请求为跨域类型时是否在请求中协带cookie
    withCredentials: true
  })
  // axios拦截器
  // 请求拦截
  instance.interceptors.request.use(config => {
    return config
  }, err => {
    console.log(err)
  })

  instance.defaults.withCredentials = true

  if (params) {
    params = {
      params: params
    }
    return instance.get(url, params)
  } else {
    return instance.get(url)
  }
}
