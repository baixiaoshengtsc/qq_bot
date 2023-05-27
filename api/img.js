const { apiList } = require('./');
exports.getImg = async (input)=>{
  let prompt = input


  try {
    let data = {
      prompt,
      n: 1,
      size: "1024x1024"
    };
    let url = await apiList.getImg(data).then((response)=>{
      console.log('----response.data---', response)
      return response.data.data[0].url
    }).catch((error)=>{
      console.log('----response.data---', error)
      console.log(error)
    })
    // let completion = await axios(config)
    //   .then((response) => {
    //     console.log("response.data:", JSON.stringify(response.data));
    //     return response.data.choices[0].message
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    return url
  } catch (error) {
    console.log('----response.data---', error)
    console.log(error);
  }
}