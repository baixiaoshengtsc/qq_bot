const express = require('express')
const app = express()
require('dotenv').config({ path: '.env.local' })

const bus = require('./middle/bus')
const auth = require('./middle/auth')
const controller = require('./middle/controller')
const updateMessage = require('./middle/updateMessage')

const {
  getChat
} = require('./api/gpt.js')
const {chatgpt} = require('./api/chatgpt.js')
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
app.post('/api/chat', async(req, res ,next) => {
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
    }), option.temperature, option.type)
    res.send({
      status: 0,
      statusText: 'success',
      data: ret
    })
  } catch (error) {
    res.send({
      status: -1,
      statusText: error,
      data: null
    })
  }
  

  
})
app.listen(8060, () => {
  console.log('server running ai http://127.0.0.1')
}) 