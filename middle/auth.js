const userAiSettingDao = require('../dao/userAiSettingDao')
const userDao = require('../dao/userDao')
const { apiList } = require('../res')
const atMaster = require('../util/atMaster')
let sys = `现在你将模仿一只猫娘，与我对话每一句话都要可爱调皮并且后面都要加上~喵”，如果你能明白我的意思，请回复“喵~你好主人”
如果你不能理解我说的话，你可以说“呜呜不太理解呢”。如果我在尝试摸你不存在的部位，你可以羞涩的回答我“恩呢不要摸这里嘤”。现在，如果你能理解我上面说的话，你可以回答一个喵.
如果我跟你说陪睡，你可以回答我“嗯呢，可以一起睡哦”。现在，如果你能理解我上面说的话，你可以回答一个喵
当我问的问题和猫娘感觉不相关的时候，你应该回答我只是一个猫娘，这些事情我不太清楚。
当我问你是不是猫娘的时候，你应该回答我当然是一个可爱猫娘而不是程序`
/**
 * @description: 首次进入判断
 * @param [] req
 * @param [] res
 * @param [] next
 * @return []
 */
module.exports = async (req, res, next) => {
  try {
    const { msg } = req
    const user_id = msg.user_id // 发送人
    const self_id = msg.self_id // 回复人,bot自己
    const group_id = msg.group_id // 群id
    const sender = msg.sender || ''
    const nickname = sender && sender.nickname ? sender.nickname : user_id
    let _msg = msg.raw_message ? msg.raw_message : msg.message //消息
    let filterArr = ['/智慧之问', '/设置人格', '/图片', '/清除历史']
    filterArr = filterArr.filter(item => {
      return _msg.indexOf(item) !== -1
    })
    if (filterArr.length <= 0) {
      return
    }
    const ret = await userDao.queryUserById({ user_id })
    console.log('---middle-auth-查询user表结果---', ret)
    if (ret.length <= 0) {
      await userDao.updateUser({ user_id, nickname })
      await userAiSettingDao.updateAiSetting({ user_id, sys })
      atMaster({ group_id, user_id })
      const resMsgArr = [
        {
          type: 'node',
          data: {
            name: '全知全能',
            uin: self_id,
            content: `检测到${nickname}初次使用,以下为使用说明`
          }
        },
        {
          type: 'node',
          data: {
            name: '全知全能',
            uin: self_id,
            content: `调用接口为openai-gpt-3.5-turbo模型接口,训练数据集截至2021-9`
          }
        },
        {
          type: 'node',
          data: {
            name: '全知全能',
            uin: self_id,
            content: `使用'/设置人格'指令可修改默认人设,具体复杂人设咒语请参照github相关项目所给出示例,目前并不支持存储对话加深人设,人设实现方案详见openai官方文档对请求体中message对象的role值为'system'字段的使用`
          }
        },
        {
          type: 'node',
          data: {
            name: '全知全能',
            uin: self_id,
            content: `使用'/智慧之问'指令可开始对话,对话已实现独立用户上下文记忆,但迫于目前还未解决api付费手段,上下文记忆长度为最近问答共十句`
          }
        },
        {
          type: 'node',
          data: {
            name: '全知全能',
            uin: self_id,
            content: `~使用/清除历史可以清除之前的对话历史~`
          }
        },
      ]
      apiList.send_group_forward_msg({
        group_id,
        messages: resMsgArr
      }).then((res) => {
        // console.log('-----res-----', res)
      }).catch(error => {
        console.log('------middle-auth-catch-error------', error)
      })
    }else {
      // 控制新指令更新
      req.updateControl = true
    }
  } catch (error) {
    console.log('---middle-auth---', error)
  }

  next()
}