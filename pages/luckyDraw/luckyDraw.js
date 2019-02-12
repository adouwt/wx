//index.js
//获取应用实例
const app = getApp();
const network = require("../../utils/api.js");
Page({
  data: {
    wxAllUser: [],
    indicatorDots: false,
    autoplay: true,
    interval: 10,
    duration: 10,
    swiperCurrent: 0
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
  },
  changeIndicatorDots(e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay(e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange(e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange(e) {
    this.setData({
      duration: e.detail.value
    })
  },
  stop () {
    this.setData({
      autoplay: !this.data.autoplay
    })
    console.log(this.data.swiperCurrent)
  }
})
