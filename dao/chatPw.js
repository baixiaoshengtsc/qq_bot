/*
 * @Author: baixiaoshengtsc 485434766@qq.com
 * @Date: 2024-02-20 21:33:33
 * @LastEditors: baixiaoshengtsc 485434766@qq.com
 * @LastEditTime: 2024-02-20 23:00:37
 * @FilePath: \qq_bot\dao\chatPw.JS
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const { fn } = require('./poolUtil.js')
const { pool } = require('./poolUtil.js')
const chatPwDAO = {
  updateChatPw: ({pw, nums}) => {
    try {
      const sql = `UPDATE chat_pw SET nums = ? WHERE pw=?`
      return fn(sql, [nums, pw])
    } catch (error) {
      console.log('---dao层updateChatPw---',error)
    }
  },
  queryChatPw: ({pw}) => {
    try {
      const sql = `SELECT * FROM chat_pw WHERE pw=? AND active = 1`
      return fn(sql, [pw+''])
    } catch (error) {
      console.log('---dao层queryChatPw---',error)
    }
  },
  queryAllQQNums:() => {
    try {
      const sql = `SELECT COUNT(*) as count FROM chat_his WHERE 1=?`
      return fn(sql, [1])
    } catch (error) {
      console.log('---queryAllQQNums---',error)
    }
  },
  queryAllChatNums:() => {
    try {
      const sql = `SELECT nums FROM chat_pw WHERE 1=?`
      return fn(sql, [1])
    } catch (error) {
      console.log('---queryAllChatNums---',error)
    }
  }
}
exports.chatPwDAO = chatPwDAO