// zhiweizmxianxia.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    urlPath: app.globalData.https + "/images/",
    jobId: '',
    address: '',
    zone: '',
    feiyong: '',
    amount: '',
    firstHidden: 'block',
    secondHidden: 'none',
    thirdHidden: 'none',
    forthHidden: 'none',
    zone1: true,
    zone2: true,
    zone3: true,
    zone4: true,
    zone5: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      jobId: options.job_id
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
  selectZone1: function () {
    this.setData({
      zone: 1,
      zone1: false,
      zone2: true,
      zone3: true,
      zone4: true,
      zone5: true
    })
  },
  selectZone2: function () {
    this.setData({
      zone: 2,
      zone1: true,
      zone2: false,
      zone3: true,
      zone4: true,
      zone5: true
    })
  },
  selectZone3: function () {
    this.setData({
      zone: 3,
      zone1: true,
      zone2: true,
      zone3: false,
      zone4: true,
      zone5: true
    })
  },
  selectZone4: function () {
    this.setData({
      zone: 4,
      zone1: true,
      zone2: true,
      zone3: true,
      zone4: false,
      zone5: true
    })
  },
  selectZone5: function () {
    this.setData({
      zone: 5,
      zone1: true,
      zone2: true,
      zone3: true,
      zone4: true,
      zone5: false
    })
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
    if (this.data.zone == 0) {
      wx.showToast({
        title: '请选择最小区域范围',
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
  //forth 确认
  sure: function () {

  },
  //监听数字平台地址输入
  recordAddress: function (e) {
    this.setData({
      address: e.detail.value
    })
  },
  //监听输入代理或加盟费用
  recordFeiyong: function (e) {
    this.setData({
      feiyong: e.detail.value
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
      content: '你确定要添加线下渠道招募吗',
      success: function (res) {
        if (res.confirm) {
          wx.showLoading({
            title: '处理中',
            mask: true,
            success: function () {
              var province = '0', city = '0', area = '0', village = '0', community = '0';
              if (that.data.zone == 1) {
                province = "1"
              }
              else if (that.data.zone == 2) {
                city = "1"
              }
              else if (that.data.zone == 3) {
                area = '1'
              }
              else if (that.data.zone == 4) {
                village = '1'
              }
              else if (that.data.zone == 5) {
                community = '1'
              }
              //请求数据
              wx.request({
                url: app.globalData.https + '/x/operate/renhe.ashx',
                data: {
                  method: "Add_Xianxia",
                  id: that.data.jobId,
                  conducturl: encodeURI(that.data.address),
                  province: province,
                  city: city,
                  area: area,
                  village: village,
                  community: community,
                  agentmoney: that.data.feiyong,
                  partnercount: that.data.amount
                },
                header: {
                  'content-type': 'application/json'
                },
                success: function (res) {
                  wx.hideLoading()
                  if (res.data == 1) {
                    wx.showToast({
                      title: '添加新招募成功',
                      duration: 1500
                    })
                    setTimeout(function () {
                      wx.navigateBack()
                    }, 2000)

                  }
                  else {
                    wx.showToast({
                      title: '添加新招募失败',
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