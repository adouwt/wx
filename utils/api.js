// function request(url, params, success, fail) {
//   this.requestLoading(url, params, "", success, fail)
// }
// 展示进度条的网络请求
// url:网络请求的url
// params:请求参数
// message:进度条的提示信息
// success:成功的回调函数
// fail：失败的回调
// 基本的url
const defaultApi = require("../config.js");

function postData(url, params, message, success, fail) {
  console.log(params)
  wx.showNavigationBarLoading()
  if (message != "") {
    wx.showLoading({
      title: message,
    })
  }
  wx.request({
    url: defaultApi.defaultApiAddress + url,
    data: params,
    header: {
      //'Content-Type': 'application/json'
      'content-type': 'application/x-www-form-urlencoded'
    },
    method: 'post',
    success: function (res) {
      //console.log(res.data)
      wx.hideNavigationBarLoading()
      if (message != "") {
        wx.hideLoading()
      }
      if (res.statusCode == 200) {
        success(res.data)
      } else {
        fail(res)
      }

    },
    fail: function (res) {
      wx.hideNavigationBarLoading()
      if (message != "") {
        wx.hideLoading()
      }
      fail()
    },
    complete: function (res) {

    },
  })
}

function getData(url, params,  message, success, fail) {
  wx.request({
    url: defaultApi.defaultApiAddress + url,
    data: params,
    header: {
      // 'Content-Type': 'application/json'
      'content-type': 'application/x-www-form-urlencoded'
    },
    success: function (res) {
      //console.log(res.data)
      wx.hideNavigationBarLoading()
      if (message != "") {
        wx.hideLoading()
      }
      if (res.statusCode == 200) {
        success(res.data)
      } else {
        if(fail)
          fail(res)
      }
    },
    fail: function (res) {
      wx.hideNavigationBarLoading()
      if (message != "") {
        wx.hideLoading()
      }
      fail(res)
    },
    complete: function (res) {

    },
  })
}
module.exports = {
  postData: postData,
  getData: getData,
}