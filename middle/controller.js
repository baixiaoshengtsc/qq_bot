const controller = require('../controller')

/**
 * @description: controller层业务分发
 * @param [] req
 * @param [] res
 * @param [] next
 * @return []
 */
module.exports = async (req, res, next) => {
  controller(req.msg)
}