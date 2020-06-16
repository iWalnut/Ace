//index.js
const app = getApp()

Page({
  data: {
    logged: false,
    takeSession: false,
    requestResult: '',
    list: [],
    idList: []
  },

  onLoad: function() {
    // 从数据库获取活动列表
    const db = wx.cloud.database()
    let that = this
    // 搜索介绍中含有关键词的活动
    db.collection('follow').where({
      _openid: app.globalData.openId
    }).get({
      success(res) {
        that.setData({
          idList: res.data
        }) 
        // 遍历根据id查询具体的活动信息
        for(var i=0;i<that.data.idList.length;i++){
          db.collection('activity').where({
            _id:that.data.idList[i].activityId
          }).get({
            success(res) {
              that.setData({
                'list':that.data.list.concat(res.data[0])
              })
              console.log(that.data.list)
            },
            fail: err => {
              console.log('失败')
            }
          })
        }
    },
    fail: err => {
      console.log('失败')
    }
  })
  },
  onItemClick: function(e){
    app.globalData.item = this.data.list[e.currentTarget.dataset.index]
    wx.navigateTo({
      url: '/pages/item/item',
    })
  }
})
