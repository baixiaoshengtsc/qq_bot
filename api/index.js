const { request } = require('../common')

exports.apiList = {
  getChat: data => request.post('https://api.openai.com/v1/chat/completions', data),
  getImg: data => request.post('https://api.openai.com/v1/images/generations', data),
}