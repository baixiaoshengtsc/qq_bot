const group = require('./group')
const private = require('./private')


module.exports = async(msg) => {
  try {
    // console.log('---controller层入口msg---', msg)
    const message_type = msg.message_type // group
    if(message_type === 'group') {
      group(msg)
    }else if(message_type === 'private'){
      private(msg)
    }

  } catch (error) {
    console.log('---controller层入口错误---', error)
  }
}