//index.js
//获取应用实例
const app = getApp();
const network = require("../../utils/api.js");
Page({
  data: {
    wxAllUser: [],
    luckyDraw: [],
    indicatorDots: false,
    autoplay: false,
    interval: 10,
    duration: 10,
    swiperCurrent: 0,
    index: 0
  },
  onLoad: function () {
    this.initData()
  },
  onShow: function () {
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
  },
  swiperChange: function (e) {
    this.setData({
      index: e.detail.current   //获取当前轮播图片的下标
    })
  },
  stop () {
    this.setData({
      autoplay: false,
      swiperCurrent: this.data.index,
    })
    app.globalData.luckyDraw.push(this.data.wxAllUser[this.data.swiperCurrent])
    console.log(this.data.swiperCurrent) // 数组下标，抽奖抽到这位就从库里删除这个用户
    console.log(app.globalData.luckyDraw)
  },
  start () {
    this.setData({
      autoplay: true,
      swiperCurrent: this.data.index
    })
    console.log(this.data.swiperCurrent, '删除index 的数据') // 数组下标，抽奖抽到这位就从库里删除这个用户
  }
})
