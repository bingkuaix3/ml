// partake.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    urlPath: app.globalData.https + "/images/",
    id: '',
    xm_userid: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.project_id,
      xm_userid: options.project_user
    })
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
  goToZhihe: function () {
    var that = this
    wx.navigateTo({
      url: '../../../pages/project/wisdomjoin/wisdomjoin?project_id=' + that.data.id + "&project_user=" + that.data.xm_userid,
    })
  },
  goToRenhe: function () {
    var that = this
    wx.navigateTo({
      url: '../../../pages/project/universitas/universitas?project_id=' + that.data.id + "&project_user=" + that.data.xm_userid,
    })
  },
  goToZihe: function () {
    var that = this
    wx.navigateTo({
      url: '../../../pages/project/capital/capital?project_id=' + that.data.id + "&project_user=" + that.data.xm_userid,
    })
  }

})