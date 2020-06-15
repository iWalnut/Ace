//home.js
const app = getApp()

Page({
  data: {
    logged: false,
    takeSession: false,
    requestResult: '',
    keyWord: '',
    list: []
  },

  onLoad: function() {
    wx.setNavigationBarTitle({ title: '活动' })
  },
  onShow: function() {
    // 从数据库获取活动列表
    const db = wx.cloud.database()
    let that = this
    // 搜索介绍中含有关键词的活动
    db.collection('activity').get({
      success(res) {
        that.setData({
          list: res.data
        }) 
    },
    fail: err => {
      console.log('失败')
    }
  })
  },
  newActivity:function(){
    wx.navigateTo({
      url: '/pages/new/new',
    })
  },
  goSearch:function(e){
    console.log(e.detail.value)
    var that = this
    this.data.keyWord = e.detail.value  
    // console.log(that.data.keyWord)
    const db = wx.cloud.database()
    // 搜索介绍中含有关键词的活动
    db.collection('activity').where({
      intro: {
        $regex:'.*'+ that.data.keyWord, //关键词模糊匹配查询
        $options: 'i' //不区分大小写
      }
    }).get({
      success(res) {
        app.globalData.resultList = res.data
        wx.navigateTo({
          url: '/pages/result/result',
        })
      // console.log('查询成功', res.data)
      // console.log(this)
    },
    fail: err => {
      console.log('失败')
    }
  })
  },
  onItemClick: function(e){
    console.log(e)
    app.globalData.item = this.data.list[e.currentTarget.dataset.index]
    wx.navigateTo({
      url: '/pages/item/item',
    })
  }
})
