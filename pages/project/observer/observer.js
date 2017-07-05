// guanchatuan.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    urlPath: app.globalData.https + "/images/",
    //项目ID
    groupId: '',
    //邀请内容
    yqContent: '',
    //邀请日期
    yqDate: '莅临日期',
    //邀请时间
    yqTime: '莅临时间'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      groupId: options.group_id
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
  //监听邀请内容
  yqCotentChange: function (e) {
    this.setData({
      yqContent: e.detail.value
    })
  },
  //监听日期选择
  yqDateChange: function (e) {
    this.setData({
      yqDate: e.detail.value
    })
  },
  //监听时间选择
  yqTimeChange: function (e) {
    this.setData({
      yqTime: e.detail.value
    })
  },
  //发起邀请
  faQiYaoqing: function () {
    var that = this;
    if (that.data.yqContent == "") {
      wx.showToast({
        title: '请输入邀请函',
        duration: 1500
      })
      return;
    }
    if (that.data.yqDate == "" || that.data.yqDate == "莅临日期") {
      wx.showToast({
        title: '请设置邀请日期',
        duration: 1500
      })
      return;
    }
    if (that.data.yqTime == "" || that.data.yqTime == "莅临时间") {
      wx.showToast({
        title: '请设置邀请时间',
        duration: 1500
      })
      return;
    }
    wx.showModal({
      title: '提示',
      content: '你确定要发起邀请吗',
      success: function (res) {
        if (res.confirm) {
          wx.showLoading({
            title: '处理中',
            mask: true,
            success: function () {
              //请求数据
              wx.request({
                url: app.globalData.https + '/x/operate/Santuan_Add.ashx',
                data: {
                  method: "Add_Santuan",
                  id: that.data.groupId,
                  descs: encodeURI(that.data.yqContent),
                  date: that.data.yqDate,
                  time: encodeURI(that.data.yqTime),
                  type: "1"
                },
                method:"post",
                header: {
                  'content-type': 'application/json'
                },
                success: function (res) {
                  console.log("获取发起邀请结果信息：" + JSON.stringify(res.data))
                  wx.hideLoading()
                  if (res.data == "1") {
                    wx.showToast({
                      title: '发起邀请成功',
                      duration: 1500
                    })
                    wx.navigateBack({

                    })
                  }
                  else {
                    wx.showToast({
                      title: '发起邀请失败',
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
      }
    })
  }
})