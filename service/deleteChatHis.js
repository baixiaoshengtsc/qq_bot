const chatHistDao = require('../dao/chatHistDao')
const atMaster = require('../util/atMaster')
const {
  apiList
} = require('../res')
/**
 * @description: 清空历史记录
 * @param [] msg 消息对象
 */
module.exports = async (msg) => {
  const {
    user_id,
    self_id,
    group_id,
  } = msg

  try {
    await chatHistDao.deleteChatHistory({
      user_id
    })
    atMaster({
      group_id,
      user_id
    })
    apiList.send_group_msg({
      group_id,
      message: '清除成功了~'
    }).catch((error) => {
      console.log('---service层deleteChatHis清除成功回调error---', error)
    })
  } catch (error) {
    console.log('---service层deleteChatHis数据库报错---', error)
    atMaster({
      group_id,
      user_id
    })
    apiList.send_group_msg({
      group_id,
      message: `清除失败,${error}`
    }).catch((error) => {
      console.log('---service层deleteChatHis清除成功回调error---', error)
    })
  }


}