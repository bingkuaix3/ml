// pages/jllb/jllb.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    memid: "",
    list: [],
    hd: 0,
    modal: true,
    array: "",
    urlPath: app.globalData.https + "/images/"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      memid: app.globalData.huiyuanInfo.userid
    })
    wx.showLoading({
      title: "加载中",
      mask: true,
      success: function () {
        that.init()
      }
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

  /**
   *  页面数据初始化
   */
  init: function () {
    var that = this
    wx.request({
      url: app.globalData.https + '/x/Handler/Operate.ashx',
      data: ({
        a: "Get_CVList",
        memid: that.data.memid
      }),
      success: function (res) {
        setTimeout(function () {
          wx.hideLoading()
        }, 2000)
        var data = JSON.stringify(res.data);
        var list = JSON.parse(data)
        console.log("数据" + data)
        that.setData({
          list: list.CV_info
        })

      },
      fail: function () {
        setTimeout(function () {
          wx.hideLoading()
        }, 2000)
      }
    })
  },
  /**
 *  编辑
 */
  bj: function () {
    var that = this
    if (that.data.hd == 0) {
      that.setData({
        hd: 1
      })
    } else {
      that.setData({
        hd: 0
      })
    }
  },
  /**
 *  选中
 */
  check: function (e) {
    var that = this
    var id = e.currentTarget.dataset.id
    var index = e.currentTarget.dataset.index
    var array = ""
    console.log("id=" + id)
    console.log("index=" + index)
    var temp = []
    for (var i = 0; i < that.data.list.length; i++) {
      temp[i] = that.data.list[i]
    }
    if (temp[index].a != 1) {
      temp[index].a = 1
      array = that.data.array + id + ","
    } else {
      temp[index].a = 0
      array = that.data.array
      array = array.replace(id + ',', '')
      console.log("----------------")
    }
    that.setData({
      list: temp,
      array: array
    })
    console.log("array=" + that.data.array)
  },
  /**
 *  跳转
 */
  jump: function (e) {
    wx.navigateTo({
      url: '../../../pages/user/resumeBao/resumeEdit/resumeEdit?id='+e.currentTarget.dataset.id,
    })
  },
  /**
 *  跳转
 */
  jumpxz: function () {
    wx.navigateTo({
      url: '../../../pages/user/resumeBao/resumeNew/resumeNew',
    })
  },
  /**
 *  删除确认
 */
  modalconfirm: function () {
    var that = this
    var temp = []
    this.setData({
      modal: true,
      hd: 0
    })
    if (that.data.array.length != 0) {
      that.setData({
        array: that.data.array.substr(0, that.data.array.length - 1)
      })
      wx.request({
        url: app.globalData.https + '/x/Handler/Operate.ashx',
        data: ({
          a: "Del_CV",
          cv_id: that.data.array
        }),
        success: function (res) {
          if (res.data == 1) {
            wx.showToast({
              title: '删除成功',
              icon: 'success',
            })
            for (var i = 0; i < that.data.list.length; i++) {
              temp[i] = that.data.list[i]
            }
            for (var i = 0; i < that.data.list.length; i++) {
              temp[i].a = 0
            }
            that.setData({
              list: temp,
              array: ""
            })
            that.init()
          } else {
            wx.showToast({
              title: '删除失败',
              icon: 'loading',
            })
          }
        },
        fail: function () {

        }
      })
    }
  },
  /**
 *  删除取消
 */
  modalcancel: function () {
    this.setData({
      modal: true,
    })
  },
  /**
 *  删除
 */
  delete: function () {
    this.setData({
      modal: false
    })
  }
})