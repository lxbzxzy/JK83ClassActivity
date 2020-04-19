// 云函数入口文件
const cloud = require('wx-server-sdk');
cloud.init({
  env: 'jk83basic-nx6u3'
})
const db= cloud.database();

var request = require('request');

// 云函数入口函数
exports.main = async (event, context) => {
  request({
    url: 'www.baidu.com',
    method:'get',
    function(error,response,body){
      return body
    }
  })
}