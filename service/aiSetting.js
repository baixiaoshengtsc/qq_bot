const userAiSettingDao = require('../dao/userAiSettingDao')
const {
  apiList
} = require('../res')
const atMaster = require('../util/atMaster')
/**
 * @description: ai设置的服务层
 */
module.exports = async (msg) => {
  console.log('---service层aiSetting入口msg---', msg)
  const {
    user_id, //发送人id
    self_id, //bot id
    message_id, // qq消息id
    group_id, //群id
    _msg // 消息主体
  } = msg

  await userAiSettingDao.editAiSetting({user_id, sys:_msg})
  const sys = await userAiSettingDao.queryAiSettingById({user_id})
  console.log('---service-aiSetting-sys---', sys)
  let resMsgArr = []
  if(sys&&sys.length>0) {
    resMsgArr = [
      {
        type: 'node',
        data: {
          name: '全知全能',
          uin: self_id,
          content: `设置成功,人设咒语为:`
        }
      },
      {
        type: 'node',
        data: {
          name: '全知全能',
          uin: self_id,
          content: sys[0].content
        }
      }
    ]
  }else {
    resMsgArr = [
      {
        type: 'node',
        data: {
          name: '全知全能',
          uin: self_id,
          content: `设置失败,请重试或直接让牛马作者查数据库`
        }
      }
    ]
  }
  
  atMaster({ group_id, user_id })
  apiList.send_group_forward_msg({
    group_id,
    messages: resMsgArr
  }).catch(error => {
    console.log('---service层aiSetting群合并消息---', error)
  })
}