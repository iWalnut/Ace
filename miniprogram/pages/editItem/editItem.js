//index.js
var format = require("format.js");

const app = getApp()

Page({
  data: {
    logged: false,
    takeSession: false,
    requestResult: '',
    title: '2333',
    intro: '23333',
    region: ['北京市', '北京市', '海淀区'],
    beginDate: '2020-06-15',
    endDate: '2020-06-15',
    fileId: null,
    customItem: '全部'
  },

  onLoad: function() {
    wx.setNavigationBarTitle({ title: '发起活动' })
    this.setData({
      title: app.globalData.item.title,
      intro: app.globalData.item.intro,
      region: app.globalData.item.region,
      beginDate: app.globalData.item.beginDate,
      endDate: app.globalData.item.endDate,
      fileId: app.globalData.item.fileId
    })
  },

  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  },

  bindBeginDateChange: function(e) {
    this.setData({
      beginDate: e.detail.value
    })
  },
  bindEndDateChange: function(e) {
    this.setData({
      endDate: e.detail.value
    })
  },

  // 上传图片
  doUpload: function () {
    let that = this
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {

        wx.showLoading({
          title: '上传中',
        })

        const filePath = res.tempFilePaths[0]
        
        // 上传图片     
        const cloudPath = app.globalData.openId + new Date().format("yy-m-d-H-i-s") + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            wx.showToast({
              title: '上传成功',
            })
            that.setData({
              fileId: res.fileID
            })
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })
      },
      fail: e => {
        console.error(e)
      }
    })
  },

  // 获取表单数据
  getForm:function(e){
    var formdata = e.detail.value
    this.setData({
      title:formdata.title,
      intro:formdata.intro,
      "data.region":formdata.region,
      "data.beginDate":formdata.beginDate,
      "data.endDate":formdata.endDate
    })
    this.formSubmit()
  },

  //表单提交至云数据库
  formSubmit:function(){
    var curDate = new Date().format("yy-m-d")
    console.log(this.data)
    if(this.data.beginDate>=curDate){
      const db = wx.cloud.database()
      console.log("开始")
      db.collection("activity").doc(app.globalData.item._id)
      .update({
        data:{
          // 操作云数据库时openId会自动添加
          title:this.data.title,
          intro:this.data.intro,
          region:this.data.region,
          beginDate:this.data.beginDate,
          endDate:this.data.endDate,
          fileId: this.data.fileId,
        }
      }).then(res=>{
        console.log("添加至数据库成功",res)
        wx.switchTab({
          url: '/pages/myItem/myItem',
        })
      }).catch(res=>{
        console.log("添加至数据库失败",res)
      })   
    }
  }
})
