//index.js
//获取应用实例
const app = getApp();
const network = require("../../utils/api.js");
Page({
  data: {
    wxAllUser: []
  },
  onLoad: function () {
    this.initData()
  },
  initData: function(){
    let _this = this
    network.getData('/get/alluser', 
    {},
    '', 
    function (res) {
      _this.setData({
        wxAllUser: res.users
      })
    }, function () {
      wx.showToast({
        title: '获取签到数据失败',
      })
    })
  }
})
