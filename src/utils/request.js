import axios from 'axios'

const request = axios.create({
  baseURL: 'http://api.7-orange.cn:7300/mock/5def6a2d448e330a1116366e/api/'
})

// 响应拦截器
request.interceptors.response.use(res => {
  return res.data
}, err => {
  return Promise.reject(err)
})

export default request
