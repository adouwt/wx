Page({
  data: {
    imgUrl: '',
    disabled: false,
    plain: false,
    loading: false
  },
  onLoad: function(options) {
    this.setData({
      title: options.title
    })
  },
  chooseImage: function () {
    let _this = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let tempFilePaths = res.tempFilePaths;
        _this.setData({
          imgUrl: tempFilePaths
        })
        console.log(tempFilePaths)
      }
    })
  },
  scanCode: function () {
    wx.scanCode({
      success: (res) => {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        console.log(res)
      }
    })
  },
  upload: function () {
    wx.uploadFile({
      url: 'https://example.weixin.qq.com/upload', // 仅为示例，非真实的接口地址
      filePath: this.data.imgUrl[0],
      name: 'file',
      formData: {
        user: 'test'
      },
      success(res) {
        const data = res.data
        // do something
        console.log(data, 'ok')
      },
      fail (err) {
        console.log(err)
      }
    })
  }
})