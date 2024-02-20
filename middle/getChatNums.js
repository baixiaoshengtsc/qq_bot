/**
 * @description: 查询chat次数
 * @param [] req
 * @param [] res
 * @param [] next
 * @return []
 */
const {chatPwDAO}  = require('../dao/chatPw')
module.exports = async (req, res, next) => {
  try {
    const ret = await chatPwDAO.queryAllQQNums()
    const ret2 = await chatPwDAO.queryAllChatNums()
    let util = (arr) => {
      let count = 0
      arr.forEach(item => {
        count += Number(item.nums)
      })
      return count
    }
    let count = util(ret2)
    count += Number(ret[0].count)
    res.send({
      status: 0,
      statusText: 'success',
      data: {
        nums: count
      }
    })
  } catch (error) {

    res.send({
      status: -1,
      statusText : 'chatPwDao.queryCount Error',
      data: null
    })
  }
}