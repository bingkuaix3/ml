// zhiweiadd.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    urlPath: app.globalData.https + "/images/",
    projectId: '',
    type: '',// (1创始合伙人，2管理合伙人）
    name: '',// 名称
    descs: '',// 要求
    isWhole: '1',// 是否全职
    isSocial: '0',// 是否社会化
    isFucus: '1',// 是否集中办公，1是，0否
    isOther: '0',// 是否异地办公，1是，0否
    isMoney: '0',// 是否薪资待遇，1是，0否
    isStock: '0',// 是否入资占股，1是，0否
    isOriginal: '0',//  是否原始股权，1是，0否
    isOption: '0',// 是否期权，1是，0否
    firstHidden: 'block',
    secondHidden: 'none',
    thirdHidden: 'none',
    forthHidden: 'none',
    fifthHidden: 'none',
    whole:true,
    social:false,
    fucus:true,
    other:false,
    money:false,
    stock:false,
    original:false,
    option:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      projectId: options.project_id,
      type: options.type
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
  //first下一步
  firstNext: function () {
    if (this.data.name.length == 0) {
      wx.showToast({
        title: '请输入职位名称',
        duration: 1500
      })
      return;
    }
    if (this.data.name.length > 20) {
      wx.showToast({
        title: '职位名称不能超过20个字',
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
    if (this.data.descs.length== 0) {
      wx.showToast({
        title: '请输入职位要求',
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
  //forth上一步
  forthBefore: function () {
    this.setData({
      forthHidden: "none",
      thirdHidden: "block",
    })
  },
  //forth下一步
  forthNext: function () {
    this.setData({
      forthHidden: "none",
      fifthHidden: "block",
    })
  },
  //fifth上一步
  fifthBefore: function () {
    this.setData({
      fifthHidden: "none",
      forthHidden: "block",
    })
  },
  recordName: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  recordDescs:function(e){
    this.setData({
      descs: e.detail.value
    })
  },
  recordIsWhole: function (e) {
    if (e.detail.value == true) {
      this.setData({
        isWhole: 1,
        isSocial:0,
        whole:true,
        social:false
      })
    }
    else {
      this.setData({
        isWhole: 0,
        isSocial:1,
        whole: false,
        social: true
      })
    }
  },
  recordIsSocial: function (e) {
    if (e.detail.value == true) {
      this.setData({
        isSocial: 1,
        isWhole:0,
        whole: false,
        social: true
      })
    }
    else {
      this.setData({
        isSocial: 0,
        isWhole: 1,
        whole: true,
        social: false
      })
    }
  },
  recordIsFucus: function (e) {
    if (e.detail.value == true) {
      this.setData({
        isFucus: 1,
        isOther:0,
        fucus:true,
        other:false
      })
    }
    else {
      this.setData({
        isFucus: 0,
        isOther: 1,
        fucus: false,
        other: true
      })
    }
  },
  recordIsOther: function (e) {
    if (e.detail.value == true) {
      this.setData({
        isFucus: 0,
        isOther:1,
        fucus: false,
        other: true
      })
    }
    else {
      this.setData({
        isFucus: 1,
        isOther: 0,
        fucus: true,
        other: false
      })
    }
  },
  recordIsMoney: function (e) {
    if (e.detail.value == true) {
      this.setData({
        isMoney: 1
      })
    }
    else {
      this.setData({
        isMoney: 0
      })
    }
  },
  recordIsStock: function (e) {
    if (e.detail.value == true) {
      this.setData({
        isStock: 1
      })
    }
    else {
      this.setData({
        isStock: 0
      })
    }
  },
  recordIsOriginal: function (e) {
    if (e.detail.value == true) {
      this.setData({
        isOriginal: 1
      })
    }
    else {
      this.setData({
        isOriginal: 0
      })
    }
  },
  recordIsOption: function (e) {
    if (e.detail.value == true) {
      this.setData({
        isOption: 1
      })
    }
    else {
      this.setData({
        isOption: 0
      })
    }
  },
  //fifth 确认
  sure: function () {
    var that = this;

    wx.showModal({
      title: '提示',
      content: '你确定要添加新职位吗',
      success: function (res) {
        if (res.confirm) {
          wx.showLoading({
            title: '处理中',
            mask: true,
            success: function () {
              //请求数据
              wx.request({
                url: app.globalData.https + '/x/operate/renhe.ashx',
                data: {
                  method: "Add_Renhe",
                  project_id: that.data.projectId,
                  name:that.data.name,
                  type: that.data.type,
                  desc: encodeURI(that.data.descs),
                  iswhole: that.data.isWhole,
                  issocial: that.data.isSocial,
                  isfocus: that.data.isFucus,
                  isother: that.data.isOther,
                  ismoney: that.data.isMoney,
                  isstock: that.data.isStock,
                  isoriginal: that.data.isOriginal,
                  isoption: that.data.isOption
                },
                header: {
                  'content-type': 'application/json'
                },
                success: function (res) {
                  wx.hideLoading()
                  console.log(res)
                  if (res.data == 1) {
                    wx.showToast({
                      title: '添加新职位成功',
                      duration: 1500
                    })
                    setTimeout(function(){
                      wx.navigateBack()
                    },2000)
                  }
                  else {
                    wx.showToast({
                      title: '添加新职位失败',
                      duration: 1500
                    })
                  }
                },
                fail: function (res) {
                  wx.hideLoading()
                  wx.showToast({
                    title: '数据请求失败',
                    duration: 1500
                  })
                  setTimeout(function () {
                    wx.navigateBack()
                  }, 2000)
                }
              })
            }
          })
        } else if (res.cancel) {

        }
      }
    })
  },
})