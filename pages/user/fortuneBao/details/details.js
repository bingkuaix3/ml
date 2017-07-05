// pages/wo/caifubao/mingxi/mingxi.js
var app = getApp()
Page({
  //页面的初始数据
  data: {
    urlPath: app.globalData.https + "/images/",
    list: [],
    page: 1, 
    pagesize: 20
  },
  //生命周期函数--监听页面加载
  onLoad: function (options) {
  
  },
  // 生命周期函数--监听页面初次渲染完成
  onReady: function () {
  
  },
  //生命周期函数--监听页面显示
  onShow: function () {
    var that = this;
    //请求数据
    wx.request({
      url: app.globalData.https + '/x/Get_YuELieBiao.aspx',
      data: {
        userid: app.globalData.huiyuanInfo.userid,
        page: that.data.page,
        pagesize: that.data.pagesize
      },
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        var str = JSON.stringify(res.data);
        let list = that.data.list;
        list = list.concat(res.data.list);
        that.setData({
          list: list,
          page: that.data.page + 1
        });
        //隐藏动画
        wx.hideNavigationBarLoading();
      }
    })
  },
  //生命周期函数--监听页面隐藏
  onHide:function () {
  
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
  // 用户点击右上角分享
  onShareAppMessage: function () {
  
  },
  //下拉刷新
  onReachBottom: function () {
    var that = this
    wx.showNavigationBarLoading();
    //请求数据
    wx.request({
      url: app.globalData.https + '/x/Get_YuELieBiao.aspx',
      data: {
        userid: app.globalData.huiyuanInfo.userid,
        page: that.data.page,
        pagesize: that.data.pagesize
      },
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        var str = JSON.stringify(res.data);
        let list = that.data.list;
        list = list.concat(res.data.list);
        that.setData({
          list: list,
          page: that.data.page + 1
        });
        //隐藏动画
        wx.hideNavigationBarLoading();
      }
    })
  },
})