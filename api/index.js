/*
 * @Author: baixiaoshengtsc 485434766@qq.com
 * @Date: 2024-02-17 10:52:38
 * @LastEditors: baixiaoshengtsc 485434766@qq.com
 * @LastEditTime: 2025-02-05 17:06:42
 * @FilePath: \qq_bot\api\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const { request } = require('../common')

exports.apiList = {
  //getChat: (data, config) => request.post('https://api.openai.com/v1/chat/completions', data, config),
  getImg: data => request.post('https://api.openai.com/v1/images/generations', data),
  getChat: (data, config) => request.post('https://hk.xty.app/v1/chat/completions', data, config),
  getDeepSeekChat: (data, config) => request.post('https://api.deepseek.com/chat/completions', data, config),
  // getImg: data => request.post('https://hk.xty.app/v1/images/generations', data),
  // getChat: (data, config) => request.post('https://hk.xty.app/v1/chat/completions', data, config),
  // getImg: data => request.post('https://hk.xty.app/v1/images/generations', data),

  getDataIds: data => request.get(`https://cafemaker.wakingsands.com/search`, {indexes: 'Item', ...data}),
  getItemData: data => request.get(`https://universalis.app/api/v2/莫古力/${data.id}`),
}