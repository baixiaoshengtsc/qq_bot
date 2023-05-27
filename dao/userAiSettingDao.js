const { fn } = require('./poolUtil.js')
const getAUuid = require('../util/getAUuid')

const userAiSettingDao = {
    queryAiSettingById:({user_id})=>{
      try {
        const sql = `SELECT content FROM user_ai_setting WHERE qq_id=?`
        return fn(sql, [user_id])
      } catch (error) {
        console.log('---dao层queryAiSettingById---',error)
      }
    },
    updateAiSetting: ({user_id, sys}) => {
      try {
        const sql = `INSERT INTO user_ai_setting(qq_id, content, id) VALUES(?, ?, ?)`
        return fn(sql, [user_id, sys, getAUuid()])
      } catch (error) {
        console.log('---dao层updateAiSetting---',error)
      }
    },
    editAiSetting: ({user_id, sys}) => {
      try {
        const sql = `UPDATE user_ai_setting SET content = ? WHERE qq_id=?`
        return fn(sql, [sys, user_id])
      } catch (error) {
        console.log('---dao层editAiSetting---',error)
      }
    },
    deleteAiSetting: ({user_id}) => {
      try {
        const sql = `DELETE FROM user_ai_setting WHERE qq_id=?`
        return fn(sql, [user_id])
      } catch (error) {
        console.log('---dao层deleteAiSetting---',error)
      }
    }
}
module.exports = userAiSettingDao