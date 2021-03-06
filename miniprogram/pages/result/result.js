// pages/result/result.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyWord: '',
    resultList: [],
    showModalStatus: false,
    region: ['北京市', '北京市', '海淀区'],
    customItem: '全部'
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
  powerDrawer: function (e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
  },
  util: function(currentStatu){
    /* 动画部分 */
    // 第1步：创建动画实例 
    var animation = wx.createAnimation({
      duration: 200,  //动画时长
      timingFunction: "linear", //线性
      delay: 0  //0则不延迟
    });
    
    // 第2步：这个动画实例赋给当前的动画实例
    this.animation = animation;
 
    // 第3步：执行第一组动画：Y轴偏移240px后(盒子高度是240px)，停
    animation.translateY(240).step();
 
    // 第4步：导出动画对象赋给数据对象储存
    this.setData({
      animationData: animation.export()
    })
    
    // 第5步：设置定时器到指定时候后，执行第二组动画
    setTimeout(function () {
      // 执行第二组动画：Y轴不偏移，停
      animation.translateY(0).step()
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象
      this.setData({
        animationData: animation
      })
      
      //关闭抽屉
      if (currentStatu == "close") {
        this.setData(
          {
            showModalStatus: false
          }
        );
      }
    }.bind(this), 200)
  
    // 显示抽屉
    if (currentStatu == "open") {
      this.setData(
        {
          showModalStatus: true
        }
      );
    }
  },
  goHome:function(){
    wx.switchTab({
      url: '/pages/home/home',
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
    app.globalData.item = this.data.list[e.currentTarget.dataset.index]
    wx.navigateTo({
      url: '/pages/item/item',
    })
  },
  filter: function(e){
    var j = 0
    for(let i in this.data.list){
      console.log(this.data.list[i].region)
      console.log(this.data.region)
      if(this.data.list[i].region.toString() == this.data.region.toString()){
        app.globalData.resultList[j++] = this.data.list[i]
      }
      else if(this.data.region[2].toString() == '全部' && this.data.list[i].region[0].toString() == this.data.region[0].toString()&& this.data.list[i].region[1].toString() == this.data.region[1].toString()){
        app.globalData.resultList[j++] = this.data.list[i]
      }
      else if(this.data.region[1].toString() == '全部' && this.data.list[i].region[0].toString() == this.data.region[0].toString()){
        app.globalData.resultList[j++] = this.data.list[i]
      }
      else if(this.data.region[0].toString() == '全部'){
        app.globalData.resultList = this.data.list
        break;
      }
     }
     wx.navigateTo({
      url: '/pages/result/result',
    })
  },
  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value
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