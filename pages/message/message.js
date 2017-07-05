// xiaoxi.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    urlPath: app.globalData.https + "/images/",
    fansAmount: 0,
    noticeAmount: 0,
    privatechatAmount: 0,
    systemAmout: 0,
    invitationAmount:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.login(function (huiyuanInfo) {
  
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
    this.loadInfo(); 
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
  /**
   * 加载信息
   */
  loadInfo: function () {
    var that = this;
    wx.showLoading({
      title: '加载中',
      mask: true,
      success: function () {
        //请求数据
        wx.request({
          url: app.globalData.https + '/x/Handler/Operate.ashx',
          data: {
            a: "Get_MessageList",
            memid: app.globalData.huiyuanInfo.userid,
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success(res) {
            wx.hideLoading()
            console.log(JSON.stringify(res.data))
            that.setData({
              noticeAmount: res.data.tongzhi_counts,
              systemAmount: res.data.xitongxiaoxi_counts,
              fansAmount: res.data.xinzengfenxi,
              invitationAmount: res.data.yaoqinghan,
              privateAmount: res.data.siliao
            })
          },
          fail() {
            wx.hideLoading()
            wx.showToast({
              title: '数据请求失败'
            })
          }
        })
      }
    })
  },
  /**
   * 进入粉丝列表
   */
  goToFans: function () {
    wx.navigateTo({
      url: '../../pages/message/fans/fans',
    })
  },
  /**
   * 进入通知
   */
  goToNotice: function () {
    wx.navigateTo({
      url: '../../pages/message/notice/notice',
    })
  },
  /**
   * 进入私聊
   */
  goToPrivatechat: function () {
    wx.navigateTo({
      url: '../../pages/message/privatechatList/privatechatList',
    })
  },
  /**
   * 进入系统消息
   */
  goToSystem: function () {
    wx.navigateTo({
      url: '../../pages/message/system/system',
    })
  },
  /**
   * 进入邀请函
   */
  goToInvitation:function(){
    wx.navigateTo({
      url: '../../pages/message/invitation/invitation',
    })
  }
})