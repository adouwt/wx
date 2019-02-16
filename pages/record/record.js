//index.js
//获取应用实例
const app = getApp();
const network = require("../../utils/api.js");
Page({
  data: {
    luckyDraw: []
  },
  onLoad: function () {
    this.setData({
      luckyDraw: app.globalData.luckyDraw
    })
  },
  onShow: function () {
    this.setData({
      luckyDraw: app.globalData.luckyDraw
    })
    console.log(this.data.luckyDraw)
  },
  initData: function(){
  }
})
