//index.js
const app = getApp()

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    logged: false,
    takeSession: false,
    requestResult: ''
  },

  onLoad: function() {
    wx.setNavigationBarTitle({ title: '入口' })

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.getUserInfo()
    }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    let that = this
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
            // 用户已经同意小程序获取用户信息
            // 调用云函数获取openID
            wx.cloud.callFunction({
              name: 'login',
              data: {},
              success: res => {
                app.globalData.openId = res.result.openid
              },
              fail: err => {
                console.error('[云函数] [login] 调用失败', err)
              }
            })
            wx.getUserInfo({
              success: function(res) {
                app.globalData.userInfo = res.userInfo
                that.setData({
                  userInfo: app.globalData.userInfo,
                  hasUserInfo: true
                })
              }
            })
          }
        }
    })
  },

  onShareAppMessage: function () {
    let users = wx.getStorageSync('user');
    if (res.from === 'button') { }
    return {
      title: '转发',
      path: '/pages/index/index',
      success: function (res) { }
    }
  },

  onGetUserInfo: function(e) {
    if (!this.data.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },
  goHome:function(){
    wx.switchTab({
      url: '/pages/home/home',
    })
  }
})
