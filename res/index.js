const { request } = require('../common/res')

exports.apiList = {
  send_group_forward_msg: data => request.post('http://localhost:5700/send_group_forward_msg', data),
  send_group_msg: data => request.post('http://localhost:5700/send_group_msg', data),
}