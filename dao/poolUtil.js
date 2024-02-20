/*
 * @Author: baixiaoshengtsc 485434766@qq.com
 * @Date: 2024-02-17 10:52:38
 * @LastEditors: baixiaoshengtsc 485434766@qq.com
 * @LastEditTime: 2024-02-20 22:30:19
 * @FilePath: \qq_bot\dao\poolUtil.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const mysql = require('mysql')

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
})
const fn = (sql, arr) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((error, con) => {
      if(error) {
        con.release()
        reject(error)
        return
      }
      con.query(sql, arr, async (err, ret) => {
        if(err) {
          con.release()
          reject(error)
          return
        }
        con.release()
        resolve(ret)
      })
    })
  })
}
exports.fn = fn