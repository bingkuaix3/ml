// pages/fabu/fabu.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    urlPath: app.globalData.https + "/images/",
    //需求内容
    content: "",
    //项目ID
    projectId: "",
    //用户ID
    userId: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      projectId: options.project_id,
      userId: app.globalData.huiyuanInfo.userid
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
  //监听输入内容
  recordContent: function (e) {
    var that = this
    that.setData({
      content: e.detail.value
    })
  },
  //发布需求
  publish: function () {
    var that = this
    if (that.data.content.indexOf("'") != -1){
      wx.showToast({
        title: '不能输入单引号，请输入双引号',
        duration:1500
      })
      return;
    }
    wx.showLoading({
      title: '发布中',
      mask: true,
      success: function () {
        wx.request({
          url: app.globalData.https + '/x/operate/Zhihe_Add.ashx',
          method:"POST",
          data: ({
            method: "Add_ZhiHe",
            project_id: that.data.projectId,
            memid: that.data.userId,
            question: encodeURI(that.data.content)
          }),
          success: function (res) {       
            if (res.data == "1") {
              wx.showToast({
                title: '需求发布成功',
                icon: 'success',
                duration: 1500
              })
                wx.navigateBack()
            }
            else {
              wx.showToast({
                title: '需求发布失败',
                icon: 'success',
                duration: 1500
              })
            }
            wx.hideLoading()
          },
          fail:function(){
            wx.showToast({
              title: '数据请求失败',
              icon: 'success',
              duration: 1500
            })
          }
        })
      }
    })
  }
})  