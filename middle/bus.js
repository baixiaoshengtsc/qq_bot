
/**
 * @description: 事件上报以及心跳包分发
 * @param [] req
 * @param [] res
 * @param [] next
 * @return []
 */
module.exports = async (req, res, next) => {
  const {
    post_type,
    meta_event_type,
    self_id
  } = req.body
  res.send().status(204) 
  if (meta_event_type === 'heartbeat') {
    return
  }//心跳包信息
  // console.log('收到消息', req.body)
  req.msg = req.body
  next()
}