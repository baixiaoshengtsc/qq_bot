
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
  const ret = await chatPwDAO.queryChatPw({pw})
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