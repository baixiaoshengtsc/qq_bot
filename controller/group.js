const replaceMsg = require('../util/replaceMsg')
const { chat, aiSetting, deleteChatHis } = require('../service')

/**
 * @description: controller层的group入口
 * @param [] msg
 */
module.exports = (msg) => {
  try {
    console.log('---controller*group---', msg)
    const user_id = msg.user_id // 发送人
    const self_id = msg.self_id // 回复人,bot自己
    const message_id = msg.message_id // 消息id
    const group_id = msg.group_id // 群id
    let _msg = msg.raw_message ? msg.raw_message : msg.message //消息
    console.log(`_msg.indexOf('/智慧之问' !== -1)`, _msg.indexOf('/智慧之问' !== -1))
    if(_msg.indexOf('/设置人格') !== -1) {
      _msg = replaceMsg('/设置人格', _msg)
      const params = {
        user_id,
        self_id,
        message_id,
        group_id,
        _msg
      }
      aiSetting(params)
    }else if(_msg.indexOf('/智慧之问') !== -1) {
      _msg = replaceMsg('/智慧之问', _msg)
      const params = {
        user_id,
        self_id,
        message_id,
        group_id,
        _msg
      }
      chat(params)
    }else if(_msg.indexOf('/清除历史') !== -1) {
      console.log('---清除历史---')
      const params = {
        user_id,
        self_id,
        group_id,
      }
      deleteChatHis(params)
    }
  } catch (error) {
    console.log('---controller层group错误---', error)
  }

}