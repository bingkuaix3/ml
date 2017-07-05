// privatechatList.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    urlPath: app.globalData.https + "/images/",
    list: [],
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
    this.loadList()
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
    this.loadList()
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
  loadList: function () {
    var that = this;
    wx.showLoading({
      title: '加载中',
      mask: true,
      success: function () {
        //请求数据
        wx.request({
          url: app.globalData.https + '/x/Operate/Home.ashx',
          data: {
            method: "Get_SiliaoList",
            memid: app.globalData.huiyuanInfo.userid,
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success(res) {
            wx.hideLoading()
            console.log("私聊"+JSON.stringify(res.data))
            that.setData({
              list: res.data.list
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
   * 进入私聊
   */
  goToPrivatechat:function(e){
    wx.navigateTo({
      url: '../../../pages/message/privatechat/privatechat?toUser='+e.currentTarget.dataset.user+"&slId="+e.currentTarget.dataset.id
    })
  }
})