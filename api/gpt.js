const { apiList } = require('./');
exports.getChat = async (input) => {
  let sys = `你是一个专业的计算机从业者,会尽量从专业的角度回答问题`
  let arr = [
    {
      role: 'system',
      content: sys
    },
    {
      role: 'assistant',
      content: input
    }
  ]
  try {
    let data = {
      model: "gpt-3.5-turbo", 
      messages: arr
    };
    let completion = await apiList.getChat(data).then((response)=>{
      // console.log('---response---' ,response)
      return response.data.choices[0].message
    }).catch((error)=>{
      console.log(error)
    })

    return completion
  } catch (error) {
    console.log(error);
  }
}