const userDao = require('../dao/userDao')
const chatHistDao = require('../dao/chatHistDao')
const atMaster = require('../util/atMaster')
const {
  apiList
} = require('../res')

const moment = require('moment')

/**
 * @description: 指令更新消息中间件
 */
module.exports = async (req, res, next) => {
  try {
    if(req.updateControl) {
      const { msg } = req
      const user_id = msg.user_id // 发送人
      const self_id = msg.self_id // 回复人,bot自己
      const group_id = msg.group_id // 群id
      const sender = msg.sender || ''
      const nickname = sender && sender.nickname ? sender.nickname : user_id
      let _msg = msg.raw_message ? msg.raw_message : msg.message //消息

      const ret = await chatHistDao.queryLatestChatHistory({user_id})
      console.log('---middle中间件updateMessage查询账号最新发言记录----', ret)
      if(Array.isArray(ret) && ret.length>0) {
        const t = moment(ret[0].created_time)
        const updateT = moment('2023-06-27')
        console.log('t<updateT', t<updateT)
        if(t<updateT) {
          const updatedMsg = [
            {
              type: 'node',
              data: {
                name: '全知全能',
                uin: self_id,
                content: `~2023-05-19最新功能日志~`
              }
            },
            {
              type: 'node',
              data: {
                name: '全知全能',
                uin: self_id,
                content: `~使用/清除历史可以清除之前的对话历史了~`
              }
            },
            {
              type: 'node',
              data: {
                name: '全知全能',
                uin: self_id,
                content: `~2023-06-28最新功能日志~`
              }
            },
            {
              type: 'node',
              data: {
                name: '全知全能',
                uin: self_id,
                content: `~api付费问题终于解决了现在存储20条上下文and优化了一下合并转发的历史消息and改了点不知道怎么辉石的bug~`
              }
            },
          ]
          atMaster({group_id, user_id})
          apiList.send_group_forward_msg({group_id, messages:updatedMsg}).catch((error) => {
            console.log('---service层deleteChatHis清除成功回调error---', error)
          })
        }
      }
    }
  } catch (error) {
    console.log('---middle-auth---', error)
  }

  next()
}