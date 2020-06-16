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
    wx.setNavigationBarTitle({ title: '活动详情' })
  },
  onShow: function() {
    this.setData({
      item: app.globalData.item
    })
    let that = this
    const db = wx.cloud.database()
    db.collection('user').where({
      _openid: that.data.item._openid
    }).get({
      success(res) {
        that.setData({
          name: res.data[0].nickname,
          avatar: res.data[0].avatarUrl
        })
        // console.log('查询成功', res.data)
        // console.log(this)
      },
      fail: err => {
        console.log('失败')
      }
    })
    db.collection('follow').where({
      _openid: that.data.item._openid,
      activityId: that.data.item._id
    }).get({
      success(res) {
        console.log(res.data)
        if(res.data != ''){
          that.setData({
            state: true,
            id: res.data[0]._id
          })
        }
        else {
          that.setData({
            state: false
          })
        }
        // console.log('查询成功', res.data)
        // console.log(this)
      },
      fail: err => {
        console.log('失败')
      }
})
  },
  follow: function(){
    let that = this
    const db = wx.cloud.database()
      db.collection("follow").add({
        data:{
          // 操作云数据库时openId会自动添加
          activityId: that.data.item._id
        }
      }).then(res=>{
        console.log(res)
        that.setData({
          state: true,
          id: res._id
        })
      }).catch(res=>{
        console.log("添加至数据库失败",res)
      })   
    },
    unfollow: function(){
      let that = this
      console.log(that.data.id)
      const db = wx.cloud.database()
      db.collection('follow').doc(that.data.id).remove({
        success(res) {
          that.onShow()
        }
      })
    }    
})
