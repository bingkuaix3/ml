// zhiweixgxianshang.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    urlPath: app.globalData.https + "/images/",
    bianji: false,
    pingtai: 0,
    daili: 0,
    xiaoshou: 0,
    hehuo: 0,
    projectid: "",
    pt: "",
    sh: "",
    hh: "",
    ptt: "",
    sht: "",
    hht: "",
    dl: "",
    zhiweiid: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      projectid: options.project_id,
      zhiweiid: options.job_id
    })
    this.init()
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
   * 页面数据加载
   */
  init: function () {
    var that = this
    wx.request({
      url: app.globalData.https + '/x/operate/renhe.ashx',
      data: ({
        method: "Get_Qudao",
        id: that.data.zhiweiid,
        type: 1
      }),
      success: function (res) {
        wx.hideLoading()
        var data = JSON.stringify(res.data);
        var list = JSON.parse(data)
        console.log(data)
        that.setData({
          pt: decodeURI(list.info[0].conducturl),
          sh: list.info[0].IsGiveStock,
          hh: list.info[0].PartnerCount,
          dl: decodeURI(list.info[0].AgentFavor),
        })
        console.log(that.data.dl)
      }
    })
  },

  /**
   * 平台页面
   */
  pingtai: function () {
    var that = this
    that.setData({
      bianji: true,
      pingtai: 1
    })
  },
  pcon: function () {
    var that = this
    that.setData({
      bianji: false,
      pingtai: 0,
    })
    console.log("pcon")
    that.change(1, that.data.ptt, "", "", "")
  },
  pcan: function () {
    var that = this
    that.setData({
      bianji: false,
      pingtai: 0
    })
  },
  /**
   * 输入
   */
  pt: function (e) {
    var that = this
 
    that.setData({
      ptt: e.detail.value
    })
  },

  /**
   * 代理商页面
   */
  daili: function () {
    var that = this
    that.setData({
      bianji: true,
      daili: 1
    })
  },
  dcon: function () {
    var that = this
    that.setData({
      bianji: false,
      daili: 0
    })
    that.change(2, "", that.data.dl, "", "")
  },
  dcan: function () {
    var that = this
    that.setData({
      bianji: false,
      daili: 0
    })
  },
  dl: function (e) {
    var that = this
    console.log(e.detail.value)
    that.setData({
      dl: e.detail.value
    })
 
  },
  /**
   * 销售页面
   */
  xiaoshou: function () {
    var that = this
    that.setData({
      bianji: true,
      xiaoshou: 1
    })
  },
  xcon: function () {
    var that = this
    that.setData({
      bianji: false,
      xiaoshou: 0
    })
    that.change(3, "", "", that.data.sht, "")
  },
  xcan: function () {
    var that = this
    that.setData({
      bianji: false,
      xiaoshou: 0
    })
  },
  sh: function (e) {
    var that = this
    console.log(e.detail.value)
    if (e.detail.value == false) {
      that.setData({
        sht: 0
      })
    } else {
      that.setData({
        sht: 1
      })
    }

    console.log("sht=" + that.data.sht)
  },
  /**
   * 合伙人页面
   */
  hehuo: function () {
    var that = this
    that.setData({
      bianji: true,
      hehuo: 1
    })
  },
  hcon: function () {
    var that = this
    that.setData({
      bianji: false,
      hehuo: 0
    })
    that.change(4, "", "", "", that.data.hht)
  },
  hcan: function () {
    var that = this
    that.setData({
      bianji: false,
      hehuo: 0
    })
  },
  hh: function (e) {
    var that = this
    console.log(e.detail.value)
    that.setData({
      hht: e.detail.value
    })
    console.log("hht=" + that.data.hht)
  },
  /**
   * 输入信息接口
   */
  change: function (type, pt, dl, xs, hh) {
    console.log(type)
    var that = this
    wx.request({
      url: app.globalData.https + '/x/operate/renhe.ashx',
      data: ({
        method: "Update_Xianshang",
        id: that.data.zhiweiid,
        type: type,
        conducturl: encodeURI(pt),
        agentfavor: encodeURI(dl),
        isgivestock: xs,
        partnercount: hh
      }),
      success: function (res) {
        if (res.data == "1") {
          wx.showToast({
            title: '操作成功',
            icon: 'success',
          })
          that.init()
          // if (type == 1) {
          //   console.log("type=" + type)
          //   that.setData({
          //     pt: that.data.ptt
          //   })
          //   console.log("pt=" + that.data.pt)
          // } else if (type == 2) {
          //   console.log("dl=" + that.data.dl)
          // } else if (type == 3) {
          //   that.setData({
          //     sh: that.data.sht
          //   })
          // } else {
          //   that.setData({
          //     hh: that.data.hht
          //   })
          // }
        }
        else if (res.data == "0") {
          wx.showToast({
            title: '操作出错',
            icon: 'loading',
          })
        }
      }
    })
  }
})