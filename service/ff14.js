const {
  getChat
} = require('../api/gpt3.5.js')
const chatHistDao = require('../dao/chatHistDao')
const userAiSettingDao = require('../dao/userAiSettingDao')
const { itemList, dataList } = require('../api/ff14.js')

const {
  apiList
} = require('../res')
const ff14Dao = require('../dao/ff14Dao.js')
const atMaster = require('../util/atMaster')

let msgUtil = (arr) => {
  if (!Array.isArray(arr)) return false

  let index = 0

  let strArr = []

  arr.forEach((item, i) => {
    if (Math.floor(i / 49) > index) {
      index++
    }
    strArr[index] ? strArr[index] += item : strArr[index] = item
  })

  return strArr
}

/**
 * @description: ff14服务的消息层
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

  try {
    // 1.查询商品名称
    // 2.如果大于一个，返回列表，如果只有一个，直接查询
    // 3.查询对应的id，返回数据

    const dbret = await ff14Dao.queryIdByItem({ item_name: _msg })
    console.log('数据库结果', dbret)
    let str

    const msgBody = [{
      type: 'node',
      data: {
        name: 'master',
        uin: user_id,
        content: _msg
      }
    }
    ]

    let fMsg = (str, arr) => {
      if (!Array.isArray(arr)) return
      msgBody.push({
        type: 'node',
        data: {
          name: '全知全能',
          uin: self_id,
          content: str
        }
      })

      arr.forEach((item) => {
        msgBody.push({
          type: 'node',
          data: {
            name: '全知全能',
            uin: self_id,
            content: item
          }
        })
      })
    }

    if (dbret.length <= 0) {
      const ret1 = await itemList(_msg)
      const results = ret1.Results
      const fResult = results.map((item) => {
        return item.Name
      })
      if (fResult.length > 1) {
        str = `存在多个搜索结果，请从以下结果中选择你想要的或者复制游戏中精确的物品名称\n` + fResult.join('\n')
        msgBody.push({
          type: 'node',
          data: {
            name: '全知全能',
            uin: self_id,
            content: str
          }
        })
      } else if (fResult.length === 1) {

        let util = (time) => {
          return new Date(time).toLocaleString()
        }

        const id = results[0].ID
        const name = results[0].Name
        const ret2 = await dataList(id)
        const list = ret2.listings
        const fList = list.map((item) => {
          return `${item.worldName}--价格:${item.pricePerUnit}--数量:${item.quantity}${item.hq ? '(hq)' : ''}\n`
        })
        const len = list.length

        const lastTime = util(ret2.lastUploadTime)
        const avg = ret2.averagePrice
        const hqAvg = ret2.averagePriceHQ
        const nqAvg = ret2.averagePriceNQ
        const min = ret2.minPrice
        const max = ret2.maxPrice
        const minName = list[0].worldName
        const maxName = list[len - 1].worldName

        str = `大区：莫古力\n查询内容: ${name}\n最后更新时间: ${lastTime}\n均价: ${avg} hq均价: ${hqAvg} nq均价:${nqAvg}\n 最低价: ${min}(${minName}) 最高价: ${max}(${maxName})\n`
        const msgList = msgUtil(fList)
        if (msgList.length > 0) {
          fMsg(str, msgList)
        } else {
          fMsg(str)
          msgBody.push({
            type: 'node',
            data: {
              name: '全知全能',
              uin: self_id,
              content: '暂无该物品信息，请尝试查询其它内容'
            }
          })
        }
        await ff14Dao.updateItem({ item_id: id, item_name: name })
      } else {
        str = `未找到该物品的价格信息，请确认是否输入了正确的物品名`
        msgBody.push({
          type: 'node',
          data: {
            name: '全知全能',
            uin: self_id,
            content: str
          }
        })
      }
    } else {
      let util = (time) => {
        return new Date(time).toLocaleString()
      }

      const id = dbret[0].item_id
      const name = dbret[0].item_name
      const ret2 = await dataList(id)
      const list = ret2.listings
      const fList = list.map((item) => {
        return `${item.worldName}--价格:${item.pricePerUnit}--数量:${item.quantity}${item.hq ? '(hq)' : ''}\n`
      })
      const len = list.length

      const lastTime = util(ret2.lastUploadTime)
      const avg = ret2.averagePrice
      const hqAvg = ret2.averagePriceHQ
      const nqAvg = ret2.averagePriceNQ
      const min = ret2.minPrice
      const max = ret2.maxPrice
      const minName = list[0].worldName
      const maxName = list[len - 1].worldName

      str = `大区：莫古力\n查询内容: ${name}\n最后更新时间: ${lastTime}\n均价: ${avg} hq均价: ${hqAvg} nq均价:${nqAvg}\n 最低价: ${min}(${minName}) 最高价: ${max}(${maxName})\n`
      const msgList = msgUtil(fList)
      if (msgList.length > 0) {
        fMsg(str, msgList)
      } else {
        fMsg(str)
        msgBody.push({
          type: 'node',
          data: {
            name: '全知全能',
            uin: self_id,
            content: '暂无该物品信息，请尝试查询其它内容'
          }
        })
      }
    }

    atMaster({ group_id, user_id })

    apiList.send_group_forward_msg({
      group_id,
      messages: msgBody
    }).then((res) => {
      // console.log('-----res-----', res)
    }).catch(error => {
      console.log('------service层ff14物品价格消息------', error)
    })
  } catch (error) {
    const {
      user_id, //发送人id
      self_id, //bot id
      message_id, // qq消息id
      group_id, //群id
      _msg // 消息主体
    } = msg
    const msgBody = [{
      type: 'node',
      data: {
        name: 'master',
        uin: user_id,
        content: _msg
      }
    },{
      type: 'node',
      data: {
        name: '全知全能',
        uin: self_id,
        content: '飙车太快接口冷却啦，请稍后再试!'
      }
    }
    ]
    atMaster({ group_id, user_id })

    apiList.send_group_forward_msg({
      group_id,
      messages: msgBody
    }).then((res) => {
      // console.log('-----res-----', res)
    }).catch(error => {
      console.log('------service层ff14物品价格消息------', error)
    })
  }



}