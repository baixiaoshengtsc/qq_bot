const axios = require('axios');

const key = process.env.API_KEY

const AJAX = axios.create({
  baseUrl: '',
})
const getProxy = () => {
  if(process.env.ENV === 'development') {
    return {
      host: "127.0.0.1",
      port: 7890,
      protocol: "http"
    }
  }else if(process.env.ENV === 'production') {
    return {
      host: "clash-docker",
      port: 7890,
      protocol: "http"
    }
  }
}
AJAX.interceptors.request.use(function (config) {
  // console.log('发送前拦截器', config.headers)
  if(!config.headers.Authorization) {
    Object.assign(config.headers, {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${key}`
    })
  }
  // config.proxy = getProxy()
  return config
}, function(error){
  console.log('AJAX错误', error)
})

exports.request = {
  get(url, param = {}) {
    return AJAX.get(url, {
      params: param,
    })
  },
  post(url, param = {}, config) {
    console.log('post请求', url, param, config)
    return AJAX.post(url, param, config)
  },
  
}
