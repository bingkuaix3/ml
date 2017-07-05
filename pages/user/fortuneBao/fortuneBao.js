// pages/wo/caifubao/caifubao.js
var app = getApp()
Page({
  //页面的初始数据
  data: {
    urlPath: app.globalData.https + "/images/",
    meilibi: '',
    meilijifen: ''
  },
  //生命周期函数--监听页面加载
  onLoad: function (options) {
    
  },
  //生命周期函数--监听页面初次渲染完成
  onReady: function () {

  },
  //生命周期函数--监听页面显示
  onShow: function () {
    var that = this
    //获取会员信息
    app.login(function (huiyuanInfo) {
      //更新数据
      that.setData({
        meilibi: huiyuanInfo.meilibi,
        meilijifen: huiyuanInfo.meilijifen
      })
    })
  },
  //生命周期函数--监听页面隐藏
  onHide: function () {

  },
  //生命周期函数--监听页面卸载
  onUnload: function () {

  },
  //页面相关事件处理函数--监听用户下拉动作
  onPullDownRefresh: function () {

  },
  //页面上拉触底事件的处理函数
  onReachBottom: function () {

  },
  //用户点击右上角分享
  onShareAppMessage: function () {

  },
  //进入充值页面
  goToRecharge:function(){
    wx.navigateTo({
      url: '../../../pages/user/fortuneBao/recharge/recharge',
    })
  },
  //进入明细页面
  goToDetails: function () {
    wx.navigateTo({
      url: '../../../pages/user/fortuneBao/details/details',
    })
  },
  goToTixian:function(){
    
  }
})