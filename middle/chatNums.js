/**
 * @description: chat计数
 * @param [] req
 * @param [] res
 * @param [] next
 * @return []
 */
const {chatPwDAO}  = require('../dao/chatPw')
module.exports = async (req, res, next) => {
  try {
    const nums = req.nums
    const pw = req.body.option.pw
    const ret = await chatPwDAO.updateChatPw({pw, nums :Number(nums)+1})
    next()
  } catch (error) {

    res.send({
      status: -1,
      statusText : 'chatPwDao.updateChatPw UpdataError',
      data: null
    })
  }
}