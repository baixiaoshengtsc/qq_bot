/**
 * @description: 去除空格和指令
 * @param [] reg 指令内容
 * @param [] val 消息原句
 * @return [string] 
 */
module.exports = (reg, val) => {
  return val.replace(reg, '').replace(/^[\t\r\f\n\s]+|[\t\r\f\n\s]+$/g, '')
}