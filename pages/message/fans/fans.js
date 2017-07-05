// fans.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    urlPath: app.globalData.https + "/images/",
    list: [],
    pageIndex: 1,
    pageSize: 10
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
      pageIndex: 1
    })
    this.loadList("up")
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
    this.setData({
      pageIndex: 1
    })
    this.loadList("up")
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this
    that.setData({
      pageIndex: that.pageIndex + 1
    })
    this.loadList("down")
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  /**
   * 加载列表信息
   */
  loadList: function (type) {
    var that = this;
    wx.showLoading({
      title: '加载中',
      mask: true,
      success: function () {
        //请求数据
        wx.request({
          url: app.globalData.https + '/x/Handler/operate.ashx',
          data: {
            a: "Get_MyFensi",
            userid: app.globalData.huiyuanInfo.userid,
            page: that.data.pageIndex,
            pagesize: that.data.pageSize
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success(res) {
            wx.hideLoading()
            console.log(JSON.stringify(res.data))
            if (type == "up") {
              if (res.data.list.length > 0)
                that.setData({
                  list: res.data.list
                })
            }
            else {
              if (res.data.list.length > 0)
                that.setData({
                  list: that.data.list.concat(res.data.list)
                })
              else {
                that.setData({
                  pageSize: that.data.pageSize - 1
                })

              }
            }
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
  }
})