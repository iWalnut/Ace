//index.js
const app = getApp()

Page({
  data: {
    logged: false,
    takeSession: false,
    requestResult: '',
    avatarUrl: '',
    userInfo: {}
  },

  onLoad: function() {
    this.setData({
      userInfo: app.globalData.userInfo,
      avatarUrl: app.globalData.userInfo.avatarUrl,
    })
  },

  getMyProj: function(){
    wx.navigateTo({
      url: '/pages/myProj/myProj',
    })
  },
})
