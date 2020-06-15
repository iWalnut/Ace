// pages/result/result.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyWord: '',
    resultList: []
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      resultList: app.globalData.resultList
    }) 
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})