// zihemuzi.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    urlPath: app.globalData.https + "/images/",
    //项目ID
    projectId: '',
    //第一层
    firstHidden: 'block',
    //第二层
    secondHidden: 'none',
    //目标资金
    money: '',
    //出让股份百分比
    rate: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      projectId: options.project_id
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
  //返回
  back: function () {
    wx.navigateBack()
  },
  //第一层下一步
  firstNext: function () {
    if (this.data.money == '') {
      wx.showToast({
        title: '请输入目标金额',
        duration: 1500
      })
      return;
    }
    this.setData({
      firstHidden: 'none',
      secondHidden: 'block'
    })
  },
  //第二层上一步
  secondBefore: function () {
    this.setData({
      firstHidden: 'block',
      secondHidden: 'none'
    })
  },
  //监听输入目标金额
  recordMoney: function (e) {
    this.setData({
      money: e.detail.value
    })
  },
  //监听输入出让股份百分比
  recordRate: function (e) {
    this.setData({
      rate: e.detail.value
    })
  },
  sure: function () {
    if (this.data.rate == '') {
      wx.showToast({
        title: '请输入出让股份百分比',
        duration: 1500
      })
      return;
    }
    if (this.data.rate > 100 || this.data.rate < 0) {
      wx.showToast({
        title: '请输入出让股份百分比(0-100)',
        duration: 1500
      })
      return;
    }
    var that = this;
    wx.showModal({
      title: '提示',
      content: '你确定要发起募资吗',
      success: function (res) {
        wx.showLoading({
          title: '发起中',
          mask: true,
          success: function () {
            //请求数据
            wx.request({
              url: app.globalData.https + '/x/Operate/Zihe.ashx',
              data: {
                method: "Add_Zihe",
                project_id: that.data.projectId,
                targetmoney: that.data.money,
                mostStock: that.data.rate
              },
              header: {
                'content-type': 'application/json'
              },
              success: function (res) {
                wx.hideLoading()
                console.log("获取发起募资结果信息：" + JSON.stringify(res.data))
                if (res.data == "1") {
                  wx.showToast({
                    title: '发起募资成功',
                    duration: 1500
                  })
                  setTimeout(function(){
                    wx.navigateBack()
                  },2000)
           
                }
                else {
                  wx.showToast({
                    title: '发起募资失败',
                    duration: 1500
                  })
                }
              },
              fail: function (res) {
                wx.showToast({
                  title: '数据请求失败',
                  duration: 1500
                })
              }
            })
          }
        })
      }
    })
  }
})