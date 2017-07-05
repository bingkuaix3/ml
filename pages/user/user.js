// huiyuan.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    huiyuanInfo:null,
    urlPath: app.globalData.https+"/images/"
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
    var that = this
    app.login(function (huiyuanInfo) {
      that.setData({
        huiyuanInfo: huiyuanInfo
      })
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
  
  },
  //进入个人资料
  goToInformation:function(){
    wx.navigateTo({
      url: '../../pages/user/information/information'
    })
  },
  //进入主页
  goToHome:function(){
    var that = this
    wx.navigateTo({
      url: '../../pages/user/home/home?user_id='+that.data.huiyuanInfo.userid
    })
  },
  //进入财富宝
  goToFortuneBao:function(){
    wx.navigateTo({
      url: '../../pages/user/fortuneBao/fortuneBao'
    })
  },
  //进入简历宝
  goToResumeBao:function(){
    wx.navigateTo({
      url: '../../pages/user/resumeBao/resumeBao'
    })
  },
  //进入活动宝
  goToActivityBao: function () {
    wx.navigateTo({
      url: '../../pages/user/activityBao/activityBao'
    })
  },
  //进入项目宝
  goToProjectBao:function(){
    var that = this
    wx.navigateTo({
      url: '../../pages/user/projectBao/projectBao?user_id='+that.data.huiyuanInfo.userid
    })
  },
  //进入报告宝
  goToReportBao:function(){
    var that = this
    wx.navigateTo({
      url: '../../pages/user/reportBao/reportBao?user_id=' + that.data.huiyuanInfo.userid
    })
  },
  //进入关于
  goToAbout:function(){
    wx.navigateTo({
      url: '../../pages/user/about/about'
    })
  }
})