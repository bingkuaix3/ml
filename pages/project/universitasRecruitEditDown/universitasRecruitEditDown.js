// zhiweixianxia.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    urlPath: app.globalData.https + "/images/",
    bianji: false,
    pingtai: 0,
    quyu: 0,
    feiyong: 0,
    hehuo: 0,
    projectid: "",
    pt: "",
    fy: "",
    qy: "",
    hh: "",
    ptt: "",
    qut: "",
    hht: "",
    fyt: "",
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
        type: 2
      }),
      success: function (res) {
        wx.hideLoading()
        var data = JSON.stringify(res.data);
        var list = JSON.parse(data)
        console.log("线下=" + data)
        that.setData({
          pt: list.info[0].conducturl,
          hh: list.info[0].PartnerCount,
          fy: list.info[0].agentmoney,
          qy: list.info[0].area
        })
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
    that.change(1, that.data.ptt, 0, 0, 0, 0, 0, "", "")
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
    console.log(e.detail.value)
    that.setData({
      ptt: e.detail.value
    })
  },

  /**
   * 区域页面
   */
  quyu: function () {
    var that = this
    that.setData({
      bianji: true,
      quyu: 1,
      qyt: that.data.qy
    })
  },
  qcon: function () {
    var that = this
    that.setData({
      bianji: false,
      quyu: 0
    })
    if (that.data.qyt == "省") {
      console.log("省")
      that.change(2, "", 1, 0, 0, 0, 0, "", that.data.hht)
    } else if (that.data.qyt == "市") {
      console.log("市")
      that.change(2, "", 0, 1, 0, 0, 0, "", that.data.hht)
    } else if (that.data.qyt == "区") {
      console.log("区")
      that.change(2, "", 0, 0, 1, 0, 0, "", that.data.hht)
    } else if (that.data.qyt == "乡镇") {
      console.log("乡镇")
      that.change(2, "", 0, 0, 0, 1, 0, "", that.data.hht)
    } else if (that.data.qyt == "社区") {
      console.log("社区")
      that.change(2, "", 0, 0, 0, 0, 1, "", that.data.hht)
    }

  },
  qcan: function () {
    var that = this
    that.setData({
      bianji: false,
      quyu: 0
    })
  },

  /**
   * 费用页面
   */
  feiyong: function () {
    var that = this
    that.setData({
      bianji: true,
      feiyong: 1
    })
  },
  fcon: function () {
    var that = this
    that.setData({
      bianji: false,
      feiyong: 0
    })
    that.change(3, "", 0, 0, 0, 0, 0, that.data.fyt, "")
  },
  fcan: function () {
    var that = this
    that.setData({
      bianji: false,
      feiyong: 0
    })
  },
  fy: function (e) {
    var that = this
    console.log(e.detail.value)
    that.setData({
      fyt: e.detail.value
    })

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
    that.change(4, "", 0, 0, 0, 0, 0, "", that.data.hht)
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
  change: function (type, pt, prov, city, area, vil, com, fy, hh) {
    console.log(type)
    var that = this
    wx.request({
      url: app.globalData.https + '/x/operate/renhe.ashx',
      data: ({
        method: "Update_Xianxia",
        id: that.data.zhiweiid,
        type: type,
        conducturl: pt,
        province: prov,
        city: city,
        area: area,
        village: vil,
        community: com,
        agentmoney: fy,
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
          // } else if (type == 2) {
          //   that.setData({
          //     qy: that.data.qyt
          //   })
          // } else if (type == 3) {
          //   that.setData({
          //     fy: that.data.fyt
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
  },
  /**
 * 区域选择
 */
  check: function (e) {
    var that = this
    that.setData({
      qyt: e.currentTarget.dataset.area,
    })
  }
})