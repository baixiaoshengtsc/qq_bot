/*
 * @Author: baixiaoshengtsc 485434766@qq.com
 * @Date: 2024-02-19 21:38:02
 * @LastEditors: baixiaoshengtsc 485434766@qq.com
 * @LastEditTime: 2025-02-06 09:25:30
 * @FilePath: \qq_bot\api\chatgpt.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const { apiList } = require('./');
const fs = require('fs');
const modelList = {
  dsV3: 'deepseek-chat',
  dsR1: 'deepseek-reasoner',
  gpt4o: 'gpt-4o',
  gpt4Plus: 'gpt-4o',
  gpt4Img: 'gpt-4-1106-vision-preview',
  gpt4: 'gpt-4o',
  gpt3_5:'gpt-3.5-turbo-0125',
}
exports.chatgpt = async (input, sys, cache, temperature=0.7, type='gpt4', maxLength=20, res) => {
  let arr

  if (input) {
    if (cache.length > maxLength) {
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
    if(type == 'dsV3' || type == 'dsR1') {
      let data = {
        model: modelList[type], 
        messages: arr,
        temperature: temperature,
        stream: true
      };
      console.log('进入deepseek model', modelList[type])

      const key = process.env.DS_API_KEY

      console.log('进入deepseek model', key)
      let {data: data2} = await apiList.getDeepSeekChat(data, {
        responseType:'stream',
        headers:{
        // 'Content-Type': 'text/event-stream',
        Authorization: `Bearer ${key}`,
      }})
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');
      data2.pipe(res)
    }else {
      let data = {
        model: modelList[type], 
        messages: arr,
        temperature: temperature,
        stream: true
      };
      console.log('model', modelList[type])
      let {data: data2} = await apiList.getChat(data, {
        responseType:'stream',
        headers:{
        'Content-Type': 'text/event-stream',
      }})
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');
      data2.pipe(res)
    }
  } catch (error) {
    console.log('报错===》', error)
    throw new Error(error)
  }
  // const stream = fs.createReadStream('api/download.txt');
  
  // stream.pipe(res)

  // res.set({
  //   'Content-Type': 'text/event-stream',
  //   'Cache-Control': 'no-cache',
  //   'Connection': 'keep-alive'
  // });
  // // 及时发送刷新响应头
  // res.flushHeaders();
  // setInterval(() => {
  //   const data = {
  //     message: `Current time is ${new Date().toLocaleTimeString()}`
  //   };
  // res.write(`data: ${JSON.stringify(data)}\n\n`);
  // }, 3000)
}