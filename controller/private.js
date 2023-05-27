module.exports = (msg) => {
  console.log('---controller*private---', msg)
  try {
    const user_id = msg.user_id // 发送人
    const self_id = msg.self_id // 回复人,bot自己
    const group_id = msg.group_id // 群id
    const message_id = msg.message_id // 消息id
    let _msg = msg.raw_message ? msg.raw_message : msg.message //消息
  } catch (error) {
    console.log(error)
  }
}