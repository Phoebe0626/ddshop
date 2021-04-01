import axios from 'axios'

const request = axios.create({
  baseURL: 'http://api.7-orange.cn:7300/mock/5def6a2d448e330a1116366e/api/'
})

export default request
