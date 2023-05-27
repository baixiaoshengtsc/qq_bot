const { fn } = require('./poolUtil.js')

const userDAO = {
    queryUserById:({user_id})=>{
      try {
        const sql = `SELECT * FROM user WHERE qq_id=?`
        return fn(sql, [user_id])
      } catch (error) {
        console.log('---dao层queryUserById---',error)
      }
    },
    updateUser: ({user_id, nickname}) => {
      try {
        const sql = `INSERT INTO user(qq_id, qq_name) VALUES(?, ?)`
        return fn(sql, [user_id,nickname])
      } catch (error) {
        console.log('---dao层updateUser---',error)
      }
    },
    deleteUser: ({user_id}) => {
      try {
        const sql = `DELETE FROM user WHERE qq_id=?`
        return fn(sql, [user_id])
      } catch (error) {
        console.log('---dao层deleteUser---',error)
      }
    }
}
module.exports = userDAO