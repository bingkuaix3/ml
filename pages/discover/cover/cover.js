// cover.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    img: '',
    head: '',
    name: '',
    rank: '',
    job: '',
    isGuanzhu: '',
    content: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadInfo()
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
  /**
   * 加载信息
   */
  loadInfo: function () {
    var that = this
    wx.request({
      url: app.globalData.https + '/x/Handler/Operate.ashx',
      data: ({
        a: "Get_CoverPerson",
        memid: app.globalData.huiyuanInfo.userid
      }),
      success: function (res) {
        wx.hideLoading()
        console.log(res.data)
        that.setData({
          id: res.data.memid,
          content: res.data.descs,
          img: res.data.pic,
          head: res.data.touxiang,
          job: res.data.zhiwu,
          name: res.data.xingming,
          rank: res.data.shenfen,
          isGuanzhu: res.data.isguanzhu
        })
      },
      fail: function () {
        wx.hideLoading()
      }
    })
  },
  guanzhu: function () {
    var that = this
    wx.request({
      url: app.globalData.https + '/x/Operate/Home.ashx',
      data: ({
        method: "Add_Guanzhu",
        userid: app.globalData.huiyuanInfo.userid,
        formid: that.data.id
      }),
      success: function (res) {
        wx.hideLoading()
        console.log(res.data)
        if(res.data =="1"){
          that.setData({
            isGuanzhu:"1"
          })
        }
        else{
          wx.showToast({
            title: '关注失败',
            duration:1500
          })
        }
      },
      fail: function () {
        wx.hideLoading()
      }
    })
  }
})