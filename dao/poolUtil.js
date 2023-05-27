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