import axios from 'axios'

import { Message, Notification } from 'element-ui'

axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers.post['Content-Type'] = 'text/plain;charset=UTF-8'
let service = axios.create({
  // baseURL: 'http://18.163.114.150',
  timeout: 10000
})

 // 请求拦截 可在请求头中加入token等
service.interceptors.request.use(config => {

  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截 对响应消息作初步的处理
service.interceptors.response.use(resp => {
  if (resp.data) {
    if (resp.data.code !== '0') {
      Message({
        type: 'error',
        message: resp.data.message,
        duration: 5000
      })
    }
    return { code: resp.data.code, data: resp.data.data, msg: resp.data.message }
  } else {
    return resp
  }
}, error => {
  if (error.response) {
    switch (error.response.states) {
      case 400: {
        if (error.response && error.response.data && error.response.data.message) {
          Notification.error({
            title: '400错误',
            message: error.response.data.message,
            duration: 5000,
            closable: true
          })
        }
        break
      }
    }
  }
})

export default service