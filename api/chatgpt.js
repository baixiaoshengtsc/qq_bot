/*
 * @Author: baixiaoshengtsc 485434766@qq.com
 * @Date: 2024-02-19 21:38:02
 * @LastEditors: baixiaoshengtsc 485434766@qq.com
 * @LastEditTime: 2024-02-20 01:17:42
 * @FilePath: \qq_bot\api\chatgpt.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const { apiList } = require('./');
const modelList = {
  gpt4Plus: 'gpt-4-0125-preview',
  gpt4Img: 'gpt-4-1106-vision-preview',
  gpt4: 'gpt-4-1106-preview',
  gpt3_5:'gpt-3.5-turbo-0125',
}
exports.chatgpt = async (input, sys, cache, temperature=0.7, type='gpt4') => {
  let arr

  if (input) {
    if (cache.length > 24) {
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
      model: modelList[type], 
      messages: arr,
      temperature: temperature
    };
    let completion = await apiList.getChat(data).then((response)=>{
      // console.log('---response---' ,response)
      return response.data.choices[0].message
    }).catch((error)=>{
      // console.log(error)
      throw new Error(error);
    })
    
    return completion
  } catch (error) {
    throw new Error(error);
  }
}