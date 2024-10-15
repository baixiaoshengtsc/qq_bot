const { fn } = require('./poolUtil.js')

const ff14Dao = {
    queryIdByItem:({item_name})=>{
      try {
        const sql = `SELECT * FROM ff14_item_with_id WHERE item_name=?`
        return fn(sql, [item_name])
      } catch (error) {
        console.log('---dao层queryIdByItem---',error)
      }
    },
    updateItem: ({item_name, item_id}) => {
      try {
        const sql = `INSERT INTO ff14_item_with_id(item_name, item_id) VALUES(?, ?)`
        return fn(sql, [item_name, item_id])
      } catch (error) {
        console.log('---dao层updateItem---',error)
      }
    },
}
module.exports = ff14Dao