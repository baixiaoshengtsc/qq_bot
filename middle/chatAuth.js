
// @ts-ignore
const {chatPwDAO}  = require('../dao/chatPw')
/**
 * @description: chat验证
 * @param [] req
 * @param [] res
 * @param [] next
 * @return []
 */
module.exports = async (req, res, next) => {
  const pw = req.body.option.pw
  if(!pw) {
    res.send({
      status: -1,
      statusText : '请输入卡密或，请联系作者485434766',
      data: null
    })
    return
  }
  if(pw == '76b00f07-e408-1dd2-a8c6-7ce0800d8694') {
    const ret = await chatPwDAO.queryChatPw({pw: 'fefdc625-13a8-4a81-b82a-b0bf768eb5a1'})
    if(!ret || ret.length<=0) {
      res.send({
        status: -1,
        statusText : '卡密已失效或过期，请联系作者485434766',
        data: null
      })
      return
    }else {
      req.nums = ret[0].nums
      next()
    }
    // next()
  }else {
    const ret = await chatPwDAO.queryChatPw({pw: 'fefdc625-13a8-4a81-b82a-b0bf768eb5a1'})
    if(!ret || ret.length<=0) {
      res.send({
        status: -1,
        statusText : '卡密已失效或过期，请联系作者485434766',
        data: null
      })
      return
    }else {
      req.nums = ret[0].nums
      next()
    }
  }
}