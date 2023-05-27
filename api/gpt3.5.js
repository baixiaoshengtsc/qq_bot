const { apiList } = require('./');
exports.getChat = async (input, sys, cache) => {
  let arr

  if (input) {
    if (cache.length >= 10) {
      cache.shift()
    }
    cache.push(input)
  }

  if (sys) {
    arr = [{
        "role": "system",
        "content": sys
      }
    ].concat(cache)
  } else {
    arr = cache
    console.log('-----sys-----', sys)
  }
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