const { pool } = require('./poolUtil.js')

const userDAO = {
  getUserById:(id, cb)=>{
    try {
      pool.getConnection((err, con)=>{
        if(err) throw err
        const sql = `SELECT * FROM user`
        con.query(sql,(err, result)=>{
          con.release()
          if(err) throw err
          cb(result)
        })
      })
    } catch (error) {
      console.log(error)
    }
  }
}
exports.userDAO = userDAO