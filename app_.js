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

app.listen(8060, () => {
  console.log('server running ai http://127.0.0.1')
}) 