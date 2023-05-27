const express = require('express')
const app = express()
require('dotenv').config({ path: '.env.local' }) 

const bus = require('./middle/bus')
const auth = require('./middle/auth')
const controller = require('./middle/controller')
const updateMessage = require('./middle/updateMessage')

app.use(express.static('./'))
app.use(express.json())

app.post('/', bus, auth, updateMessage, controller)

app.listen(8060, () => {
  console.log('server running ai http://127.0.0.1')
}) 