const { apiList } = require('../res')

/**
 * @description: @提问者公共工具
 * @param [number] group_id qq群id
 * @param [number] user_id 提问人qq
 */
module.exports = ({group_id, user_id}) => {
  const message = `[CQ:at,qq=${user_id}]`
  try {
    apiList.send_group_msg({group_id, message})
  } catch (error) {
    console.log('---util-atMaster---', error)
  }
}