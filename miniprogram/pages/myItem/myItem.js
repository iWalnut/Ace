//home.js
const app = getApp()

Page({
  data: {
    logged: false,
    takeSession: false,
    requestResult: '',
    item: {},
    name: '',
    avatar: '',
    state: false,
    id: null
  },

  onLoad: function() {
    wx.setNavigationBarTitle({ title: '我的活动' })
  },
  onShow: function() {
    const db = wx.cloud.database()
    let that = this
    db.collection('activity').where({
      _id:app.globalData.item._id
    }).get({
      success(res) {
        that.setData({
          item: res.data[0]
        })
        app.globalData.iem = res.data[0] 
    },
    fail: err => {
      console.log('失败')
    }
  })
    this.setData({
      name: app.globalData.userInfo.nickName,
      avatar: app.globalData.userInfo.avatarUrl
    })
  },
  edit: function(){
    wx.navigateTo({
      url: '/pages/editItem/editItem',
    })   
    },
    delete: function(){
      let that = this
      wx.showModal({
        title: '提示',
        content: '确定要删除吗？',
        success: function (sm) {
          if (sm.confirm) {
            // 用户点击了确定 可以调用删除方法了
            const db = wx.cloud.database()
            db.collection('activity').doc(that.data.item._id).remove({
              success(res) {
                wx.navigateTo({
                  url: '/pages/myProj/myProj',
                })
              }
            })
          } else if (sm.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }    
})
