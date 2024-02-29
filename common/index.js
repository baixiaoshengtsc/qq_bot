const axios = require('axios');

const key = process.env.API_KEY

const AJAX = axios.create({
  baseUrl: '',
})

AJAX.interceptors.request.use(function (config) {
  Object.assign(config.headers, {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${key}`
  })
  config.proxy = {
    host: "127.0.0.1",
    port: 7890,
    protocol: "http"
  }
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
    return AJAX.post(url, param, config)
  },
  
}
