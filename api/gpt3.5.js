/*
 * @Author: baixiaoshengtsc 485434766@qq.com
 * @Date: 2024-02-17 10:52:38
 * @LastEditors: baixiaoshengtsc 485434766@qq.com
 * @LastEditTime: 2024-02-20 00:55:46
 * @FilePath: \qq_bot\api\gpt3.5.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const { apiList } = require('./');
exports.getChat = async (input, sys, cache) => {
  let arr

  if (input) {
    if (cache.length > 20) {
      cache.shift()
    }
    cache.push(input)
  }

  if (sys) {
    arr = [{
        "role": "system",
        "content": sys
      }
    ].concat(cache)
  } else {
    arr = cache
    console.log('-----sys-----', sys)
  }
  try {
    let data = {
      model: "gpt-4o", 
      messages: arr
    };
    let completion = await apiList.getChat(data).then((response)=>{
      console.log('---response---' ,response)
      return response.data.choices[0].message
    }).catch((error)=>{
      console.log(error)
    })

    return completion
  } catch (error) {
    console.log(error);
  }
}