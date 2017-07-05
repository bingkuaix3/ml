// reportBao.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    urlPath: app.globalData.https + "/images/",
    guanchatuan_info:[],
    tiyantuan_info:[],
    zhuanjiatuan_info:[],
    guanchatuan_hidden:true,
    tiyantuan_hidden: true,
    zhuanjiatuan_hidden: true,
    guanchatuan_all:"查看全部",
    tiyantuan_all: "查看全部",
    zhuanjiatuan_all: "查看全部"
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
    this.loadInfo()
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
  loadInfo:function(){
    var that = this;
    wx.showLoading({
      title: '加载中',
      mask: true,
      success: function () {
        //请求数据
        wx.request({
          url: app.globalData.https + '/x/Operate/guanchatuan.ashx?',
          data: {
            method:"Get_My_Report",
            userid:app.globalData.huiyuanInfo.userid
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {

            console.log("获取报告宝信息：" + JSON.stringify(res.data))
            that.setData({
              guanchatuan_info: res.data.guanchatuan_info,
              tiyantuan_info: res.data.tiyantuan_info,
              zhuanjiatuan_info: res.data.zhuanjiatuan_info
            })
            wx.hideLoading()
          },
          fail: function (res) {
            wx.hideLoading()
            wx.showToast({
              title: '数据加载失败',
              duration: 1500
            })
          }
        })
      }
    })
  },
  gctAll:function(){
    var that = this
    if(that.data.guanchatuan_all=="查看全部")
      that.setData({
        guanchatuan_all:"隐藏其他",
        guanchatuan_hidden:false
      })
    else
      that.setData({
        guanchatuan_all: "查看全部",
        guanchatuan_hidden: true
      })
  },
  tytAll: function () {
    var that = this
    if (that.data.tiyantuan_all == "查看全部")
      that.setData({
        tiyantuan_all: "隐藏其他",
        tiyantuan_hidden: false
      })
    else
      that.setData({
        tiyantuan_all: "查看全部",
        tiyantuan_hidden: true
      })
  },
  zjtAll: function () {
    var that = this
    if (that.data.zhuanjiatuan_all == "查看全部")
      that.setData({
        zhuanjiatuan_all: "隐藏其他",
        zhuanjiatuan_hidden: false
      })
    else
      that.setData({
        zhuanjiatuan_all: "查看全部",
        zhuanjiatuan_hidden: true
      })
  },
  goToXiangqing:function(e){
    wx.navigateTo({
      url: '../../../pages/project/details/details?id=' + e.currentTarget.dataset.id + "&type=2"
    })
  }
})