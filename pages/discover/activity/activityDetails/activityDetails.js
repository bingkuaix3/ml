// pages/hdxq/hdxq.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    urlPath: app.globalData.https + "/images/",
    activity_id: "",
    list: [],
    listt: [],
    lists: [],
    display: 0,
    jiantou: 0,
    descs: "",
    isJoin: '1',
    money: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      activity_id: options.activity_id,//options.id
    })
    wx.showLoading({
      title: "加载中",
      mask: true,
      success: function () {
        that.init("up")
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
   * 页面信息加载
   */
  init: function () {
    var that = this
    wx.request({
      url: app.globalData.https + '/x/Operate/Activity.ashx',
      data: ({
        method: "Get_ActivityDetail",
        activity_id: that.data.activity_id,
        memid: app.globalData.huiyuanInfo.userid
      }),
      success: function (res) {
        wx.hideLoading()
        var data = JSON.stringify(res.data);

        var list = JSON.parse(data)
        console.log("页面数据=" + data)
        //console.log("页面数据=" + list.data[0].activity_info[0].name)
        if (list.data[0].activity_info[0].name.length > 17) {
          list.data[0].activity_info[0].name = list.data[0].activity_info[0].name.substr(0, 17) + "..."
        }
        list.data[0].activity_info[0].activitytime = list.data[0].activity_info[0].activitytime.substr(0, list.data[0].activity_info[0].activitytime.length - 3)
        // list.data[0].activity_info[0].descs = "你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好"
        if (list.data[0].activity_info[0].descs.length > 60) {
          that.setData({
            descs: list.data[0].activity_info[0].descs.substr(0, 60) + "...",
            display: 1
          })
        } else {
          that.setData({
            descs: list.data[0].activity_info[0].descs,
          })
        }
        that.setData({
          isJoin: list.data[0].activity_info[0].isJoin,
          money: list.data[0].activity_info[0].chargemoney,
          list: list.data[0].activity_info,
          listt: list.data[1].guest_info,
          lists: list.data[2].register_info
        })
        that.setData({
          isJoin: list.data[0].activity_info[0].isjoin,
          money: list.data[0].activity_info[0].chargemoney,
        })
        console.log(JSON.stringify(that.data.list))
      },
      fail: function () {
        setTimeout(function () {
          wx.hideLoading()
        }, 2000)
      }
    })
  },

  /**
   * 展开隐藏内容
   */
  zhankai: function () {
    var that = this
    if (that.data.jiantou == 0) {
      that.setData({
        jiantou: 1,
        descs: that.data.list[0].descs
      })

    } else {
      that.setData({
        jiantou: 0,
        descs: that.data.list[0].descs.substr(0, 60) + "..."
      })

    }
  },
  /**
   * 参与活动
   */
  goToJoin: function () {
    var that = this
    var money = 0
    if (that.data.money == '') {
      money = 0;
    }
    else {
      money = that.data.money;
    }
    var tip = "你确定要参与活动吗";
    if (money != 0) {
      tip = '你确定要支付[' + money + ']美丽币参与活动吗'
    }
    wx.showModal({
      title: '提示',
      content: tip,
      success: function (res) {
        if (res.confirm) {
          wx.showLoading({
            title: '处理中',
            mask: true,
            success: function () {
              //请求数据
              wx.request({
                url: app.globalData.https + '/x/Operate/Activity.ashx',
                data: {
                  method: "Join_Acitivity",
                  activityid: that.data.activity_id,
                  memid: app.globalData.huiyuanInfo.userid,
                  money: money,
                },
                header: {
                  'content-type': 'application/json'
                },
                success: function (res) {
                  wx.hideLoading()
                  if (res.data == "1") {
                    that.setData({
                      isJoin: 1
                    })
                    wx.showToast({
                      title: '参与活动成功',
                      duration: 1500
                    })
                  } else if (res.data == "-1"){
                    wx.showToast({
                      title: '超过活动人数上限',
                      duration: 1500
                    })
                  } else if (res.data == "-2") {
                    wx.showToast({
                      title: '活动未开始或已结束',
                      duration: 1500
                    })
                  } else if (res.data == "-3") {
                    wx.showToast({
                      title: '该活动已被删除',
                      duration: 1500
                    })
                  } else if (res.data == "-4") {
                    wx.showToast({
                      title: '系统错误',
                      duration: 1500
                    })
                  } else if (res.data == "-5") {
                    wx.showToast({
                      title: '已经参加过',
                      duration: 1500
                    })
                  }else if (res.data == "0") {
                    wx.showToast({
                      title: '数据库记录失败',
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
  }
})