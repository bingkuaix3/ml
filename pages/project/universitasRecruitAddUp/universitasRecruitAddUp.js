// ARMS.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    urlPath: app.globalData.https + "/images/",
    jobId: '',
    address: '',
    youhui: '',
    isHasQq: false,
    amount: '',
    firstHidden: 'block',
    secondHidden: 'none',
    thirdHidden: 'none',
    forthHidden: 'none'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      jobId: options.job_id
    })
    console.log(this.data.projectId)
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
  //first下一步
  firstNext: function () {
    if (this.data.address.length == 0) {
      wx.showToast({
        title: '请输入数字平台地址',
        duration: 1500
      })
      return;
    }
    this.setData({
      firstHidden: "none",
      secondHidden: "block",
    })
  },
  //second上一步
  secondBefore: function () {
    this.setData({
      firstHidden: "block",
      secondHidden: "none",
    })
  },
  //second下一步
  secondNext: function () {
    if (this.data.youhui.length == 0) {
      wx.showToast({
        title: '请输入代理商优惠',
        duration: 1500
      })
      return;
    }
    this.setData({
      secondHidden: "none",
      thirdHidden: "block",
    })
  },
  //third上一步
  thirdBefore: function () {
    this.setData({
      secondHidden: "block",
      thirdHidden: "none",
    })
  },
  //second下一步
  thirdNext: function () {
    this.setData({
      thirdHidden: "none",
      forthHidden: "block",
    })
  },
  //forth上一步
  forthBefore: function () {
    this.setData({
      forthHidden: "none",
      thirdHidden: "block",
    })
  },
  //监听数字平台地址输入
  recordAddress: function (e) {
    this.setData({
      address: e.detail.value
    })
  },
  //监听优惠内容的输入
  recordYouhui: function (e) {
    this.setData({
      youhui: e.detail.value
    })
  },
  //监听是否奖励期权
  recordIsHasQd: function (e) {
    this.setData({
      isHasQq: e.detail.value
    })
  },
  //监听合伙人数量
  recordAmount: function (e) {
    this.setData({
      amount: e.detail.value
    })
  },
  //提交
  sure: function () {
    var that = this;
    if (that.data.amount.length == 0 || that.data.amount == 0) {
      wx.showToast({
        title: '请输入合伙人数量',
        duration: 1500
      })
      return;
    }
    wx.showModal({
      title: '提示',
      content: '你确定要添加线上渠道招募吗',
      success: function (res) {
        if (res.confirm) {
          wx.showLoading({
            title: '处理中',
            mask: true,
            success: function () {
              var isgivestock;
              if (that.data.isHasQq == true) {
                isgivestock = "1"
              }
              else {
                isgivestock = "0"
              }
              
              //请求数据
              wx.request({
                url: app.globalData.https + '/x/operate/renhe.ashx',
                data: {
                  method: "Add_Xianshang",
                  id: that.data.jobId,
                  conducturl: encodeURI(that.data.address),
                  agentfavor:  encodeURI(that.data.youhui),
                  isgivestock: isgivestock,
                  partnercount: that.data.amount
                },
                header: {
                  'content-type': 'application/json'
                },
                success: function (res) {
                  wx.hideLoading()
                  if (res.data == 1) {
                    wx.showToast({
                      title: '添加线上招募成功',
                      duration: 1500
                    })
                    setTimeout(function(){
                      wx.navigateBack()
                    },2000)

                  }
                  else {
                    wx.showToast({
                      title: '添加线上招募失败',
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
        } else if (res.cancel) {

        }
      }
    })
  }
})