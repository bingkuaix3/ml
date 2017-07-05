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
      pageIndex: that.data.pageIndex + 1
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
          url: app.globalData.https + '/x/Handler/Operate.ashx',
          data: {
            a: "Get_MyYaoqinghan",
            memid: app.globalData.huiyuanInfo.userid,
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
              if (res.data.yaoqinghan.length > 0)
                that.setData({
                  list: res.data.yaoqinghan
                })
            }
            else {
              if (res.data.yaoqinghan.length > 0)
                that.setData({
                  list: that.data.list.concat(res.data.yaoqinghan)
                })
              else {
                that.setData({
                  pageIndex: that.data.pageIndex - 1
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
  },
  /**
  * 显示与隐藏控制
  */
  control: function (e) {
    var that = this
    var id = e.currentTarget.dataset.id
    var type = e.currentTarget.dataset.type
    var list = that.data.list
    for (let i = 0; i < list.length; i++) {
      if (id == list[i].id) {
        list[i].a = "1"
      }
      else {
        list[i].a = "0"
      }
    }
    that.setData({
      list: list
    })
  },
  huifu:function(e){
    var that = this;
    wx.showLoading({
      title: '加载中',
      mask: true,
      success: function () {
        //请求数据
        wx.request({
          url: app.globalData.https + '/x/Handler/Operate.ashx',
          data: {
            a: "Update_MyYaoqinghan",
            id: e.currentTarget.dataset.id,
            type:e.currentTarget.dataset.type
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success(res) {
            wx.hideLoading()
            console.log(JSON.stringify(res.data))
            if(res.data == "1"){
              if(e.currentTarget.dataset.type == "1"){
                wx.showToast({
                  title: '您已接受邀请',
                  duration: 1500
                })
              }else{
                wx.showToast({
                  title: '您已拒绝邀请',
                  duration: 1500
                })
              }
              var list = that.data.list
              for (let i = 0; i < list.length; i++) {
                if (e.currentTarget.dataset.id == list[i].id) {
                  list[i].state = e.currentTarget.dataset.type
                }
              }
              that.setData({
                list:list
              })
            }
            else{
              wx.showToast({
                title: '处理失败',
                duration: 1500
              })
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