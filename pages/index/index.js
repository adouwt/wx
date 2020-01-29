//index.js
//获取应用实例
const app = getApp();
const network = require("../../utils/api.js");
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    defaultSize: 'default',
    primarySize: 'default',
    warnSize: 'default',
    disabled: true,
    isSignIn: false,
    loading: false,
    currentIndex: 0,
    allIndex: 0
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
        disabled: false
      })
      this.initData()
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
          disabled: false
        })
        this.initData()
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true,
            disabled: false
          })
        }
      })
      this.initData()
    }
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    console.log(22)
  },
  postData:function(){
    var _this = this
    network.postData('/post/wexinSignIn', 
    this.data.userInfo, 
    '正在加载数据', 
    function (res) {
      console.log(res)
      wx.showToast({
        title: res.message,
        icon: 'fail',
        duration: 1000
      })
      _this.setData({
        isSignIn: true,
        currentIndex: res.currentIndex || 0,
        allIndex: res.allIndex || 0
      })
    }, function () {
      wx.showToast({
        title: '加载数据失败',
      })
    })
  },
  getData:function(){
    network.getData('/get/alluser', 
    {}, 
    'loading...',
    function (res) {
    //res就是我们请求接口返回的数据
      console.log(res, 'get')
    })
  },
  initData: function(){
    let _this = this
    network.postData('/post/wexinSignInInit', 
    _this.data.userInfo, 
    '', 
    function (res) {
      console.log(res)
      if (res.isSignIn) {
        _this.setData({
          isSignIn: true,
          currentIndex: res.currentIndex || 0,
          allIndex: res.allIndex || 0
        })
      }
    }, function () {
      wx.showToast({
        title: '签到初始化失败',
      })
    })
  }
})
