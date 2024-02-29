const express = require('express')
const app = express()
const helmet = require('helmet');
require('dotenv').config({ path: '.env.local' })

const bus = require('./middle/bus')
const auth = require('./middle/auth')
const controller = require('./middle/controller')
const updateMessage = require('./middle/updateMessage')

const {
  getChat
} = require('./api/gpt.js')
const {chatgpt} = require('./api/chatgpt.js')

const chatAuth = require('./middle/chatAuth.js')
const chatNums = require('./middle/chatNums.js')
const getChatNums = require('./middle/getChatNums.js')
app.all("*",function(req,res,next){
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin","http://localhost:3000");
  //允许的header类型
  res.header("Access-Control-Allow-Headers","content-type, Authorization");
  //跨域允许的请求方式 
  res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");
  if (req.method.toLowerCase() == 'options')
      res.send(200);  //让options尝试请求快速结束
  else
      next();
})

app.use(helmet());
app.use(express.static('./'))
app.use(express.json())

app.post('/', bus, auth, updateMessage, controller)
app.post('/exam', async (req, res, next) => {
  const data = req.body
console.log(req.body)
  const ipt = data.ipt?data.ipt:''
  console.log(ipt)

  const ret = await getChat(ipt)
  let str = (ret && ret.content) ? ret.content : `gpt并不想回答你的问题并试图用错误代码塞爆我的四核8g腾讯云`
  res.send(str)
})
app.post('/api/chat', chatAuth, chatNums, async(req, res ,next) => {
  console.log('--收到客户端消息--', req.body)
  const option = req.body.option
  const history = req.body.history
  const content = req.body.content
  try {
    const ret = await chatgpt({
      role: 'user',
      content
    }, option.system, history.map(item => {
      return {
        role: item.type,
        content: item.content
      }
    }), option.temperature, option.type, option.maxLength, res)
    // ret.data.pipe(res)
    // console.log('--gpt回复--', ret)
    // res.send({
    //   status: 0,
    //   statusText: 'success',
    //   data: ret
    // })
  } catch (error) {
    console.log('--gpt报错--', error)
    res.send({
      status: -1,
      statusText: `
openai响应错误，可能存在的问题如下：
-  如使用gpt4模型，请切换模型或者等待一分钟请求冷却后再试。
-  如非请求冷却问题请检查历史记录长度是否超标，请缩短设置历史记录长度后再次重试。
-  由于openai最近新发布视频模型，导致洋人的服务器被拉爆了，也有可能是单纯的openai服务器宕机。
> 
>  鸣大钟一次！
> 
>  推动杠杆，启动活塞和泵……
> 
>  鸣大钟两次！
> 
>  按下按钮，发动引擎，点燃涡轮，注入生命……
> 
>  鸣大钟三次！
> 
>  齐声歌唱，赞美万机之神！
>
***如果排除以上问题且安抚机魂后仍报错，请联系作者(485434766)。***
`,
      data: null
    })
  }
})

app.post('/api/chat/getNums', getChatNums)
app.listen(8060, () => {
  console.log('server running ai http://127.0.0.1')
}) 