/*
 * @Author: baixiaoshengtsc 485434766@qq.com
 * @Date: 2024-02-19 21:38:02
 * @LastEditors: baixiaoshengtsc 485434766@qq.com
 * @LastEditTime: 2024-10-15 15:21:25
 * @FilePath: \qq_bot\api\ff14.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const { apiList } = require('./');
const fs = require('fs');
const modelList = {
  gpt4o: 'gpt-4o',
  gpt4Plus: 'gpt-4-0125-preview',
  gpt4Img: 'gpt-4-1106-vision-preview',
  gpt4: 'gpt-4-1106-preview',
  gpt3_5:'gpt-3.5-turbo-0125',
}
exports.itemList = async (name) => {
  try {
    let data = {
      string: name
    };
    let {data: data2} = await apiList.getDataIds(data)
    // console.log('枚举物品数据', data2)
    return data2
  } catch (error) {
    throw new Error(error);
  }
}

exports.dataList = async (id) => {
  try {
    let data = {
      id
    };
    let {data: data2} = await apiList.getItemData(data)
    // console.log('获取物品价格情况', data2)
    return data2
  } catch (error) {
    throw new Error(error);
  }
}