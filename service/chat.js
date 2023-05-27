const {
  getChat
} = require('../api/gpt3.5.js')
const chatHistDao = require('../dao/chatHistDao')
const userAiSettingDao = require('../dao/userAiSettingDao')
const {
  apiList
} = require('../res')
const atMaster = require('../util/atMaster')
let sys = `现在你将模仿一只猫娘，与我对话每一句话都要可爱调皮并且后面都要加上~喵”，如果你能明白我的意思，请回复“喵~你好主人”
如果你不能理解我说的话，你可以说“呜呜不太理解呢”。如果我在尝试摸你不存在的部位，你可以羞涩的回答我“恩呢不要摸这里嘤”。现在，如果你能理解我上面说的话，你可以回答一个喵.
如果我跟你说陪睡，你可以回答我“嗯呢，可以一起睡哦”。现在，如果你能理解我上面说的话，你可以回答一个喵
当我问的问题和猫娘感觉不相关的时候，你应该回答我只是一个猫娘，这些事情我不太清楚。
当我问你是不是猫娘的时候，你应该回答我当然是一个可爱猫娘而不是程序`
/**
 * @description: 对话消息的服务层
 */
module.exports = async (msg) => {
  console.log('---service层chat入口msg---', msg)
  const {
    user_id, //发送人id
    self_id, //bot id
    message_id, // qq消息id
    group_id, //群id
    _msg // 消息主体
  } = msg
  // 1.查询数据库历史
  let cache = []
  const sysArr = await userAiSettingDao.queryAiSettingById({user_id})
  // console.log('---sys---', sysArr)
  if(sysArr.length>0)
  sys = sysArr[0].content
  const ret = await chatHistDao.queryChatHistory({
    user_id
  })
  console.log('-----service层ret-----', ret)
  console.log('-----service层ret-length-----', ret.length)
  ret.forEach(item => {
    cache.push({
      role: item.role,
      content: item.content
    })
  })
  // console.log('---filter---', filter)
  // 2.拼接
  const filter = {
    role: 'user',
    content: _msg
  }
  // 3.请求openai
  const res = await getChat(filter, sys, cache)
  let str = (res && res.content) ? res.content : `gpt并不想回答你的问题并试图用错误代码塞爆我的一核两g腾讯云`

  let util = (hisArr, userId, selfId) => {
    const user_id = userId
    const self_id = selfId
    let ret = []

    if(Array.isArray(hisArr) && hisArr.length>0) {
      hisArr.forEach( item => {
        if(item.role === 'user') {
          ret.unshift({
            type: 'node',
            data: {
              name: 'master',
              uin: user_id,
              content: item.content
            }
          })
        }else if(item.role === 'assistant') {
          ret.unshift({
            type: 'node',
            data: {
              name: '全知全能',
              uin: self_id,
              content: item.content
            }
          })
        }
      })
    }

    return ret
  }

  const ret1 = util(cache, user_id, self_id)

  const ret2 = ret1.concat([{
      type: 'node',
      data: {
        name: `master`,
        uin: user_id,
        content: _msg
      }
    },
    {
      type: 'node',
      data: {
        name: '全知全能',
        uin: self_id,
        content: str
      }
    }
  ])

  console.log('---service层chat-ret2---', ret2)
  ret2.shift()
  atMaster({group_id, user_id})

  apiList.send_group_forward_msg({
    group_id,
    messages: ret2
  }).then((res) => {
    // console.log('-----res-----', res)
  }).catch(error => {
    console.log('------service层chat群合并消息------', error)
  })

  // 4.成功则返回并插入 || 失败返回不插入
  if(str !== 'gpt并不想回答你的问题并试图用错误代码塞爆我的一核两g腾讯云') {
    try {
      await chatHistDao.updateChatHistory({user_id, role: 'user', content: _msg})
      setTimeout(async ()=>{
        await chatHistDao.updateChatHistory({user_id, role: 'assistant', content: str})
      }, 1001)
    } catch (error) {
      console.log('---service层chat的成功插入error---', error)
    }
    
  }
  
}