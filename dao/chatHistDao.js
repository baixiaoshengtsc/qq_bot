const { fn } = require('./poolUtil.js')
const getAUuid = require('../util/getAUuid')
const moment = require('moment')

const chatHistDao = {
  queryChatHistory: ({user_id}) => {
    try {
      const sql = `SELECT * FROM chat_his WHERE qq_id=? AND status = '1' ORDER BY created_time DESC LIMIT 20`
      return fn(sql, [user_id])
    } catch (error) {
      console.log('---dao层queryChatHistory---', error)
    }
  },
  updateChatHistory: ({user_id, role, content}) => {
    try {
      const sql = `INSERT INTO chat_his(qq_id, role, content, id, created_time, status) VALUES(?, ?, ?, ?, ?, ?)`
      return fn(sql, [user_id, role, content, getAUuid(), moment().format('yyyy-MM-DD hh:mm:ss.SSS'), '1'])
    } catch (error) {
      console.log('---dao层updateChatHistory---', error)
    }
  },
  deleteChatHistory: ({user_id}) => {
    try {
      const sql = `UPDATE chat_his SET status = '0' WHERE qq_id=? AND status = '1'`
      return fn(sql, [user_id])
    } catch (error) {
      console.log('---dao层deleteChatHistory---', error)
    }
  },
  queryLatestChatHistory: ({user_id}) => {
    try {
      const sql = `SELECT * FROM chat_his WHERE qq_id=? ORDER BY created_time DESC LIMIT 1`
      return fn(sql, [user_id])
    } catch (error) {
      console.log('---dao层queryLatestChatHistory---', error)
    }
  }
}

module.exports = chatHistDao