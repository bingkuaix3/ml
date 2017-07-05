// xianshangshenqing.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    urlPath: app.globalData.https + "/images/",
    zhiweiId: '',
    projectUser: '',
    address:'',
    youhui:'',
    isHasQiquan: '', 
    amount:'',
    isShenqing:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      zhiweiId: options.job_id,
      projectUser: options.project_user
    })
    this.loadInfo()
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
  //加载申请职位信息
  loadInfo: function (type) {
    var that = this;
    wx.showLoading({
      title: '加载中',
      mask: true,
      success: function () {
        //请求数据
        wx.request({
          url: app.globalData.https + '/x/operate/renhe.ashx',
          data: {
            method: "Get_XianshangMem",
            id: that.data.zhiweiId,
            memid: app.globalData.huiyuanInfo.userid
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            wx.hideLoading()
            console.log("获取线上职位信息：" + JSON.stringify(res.data))
            that.setData({
              address: decodeURI(res.data.xianshang_info[0].conducturl),
              youhui: decodeURI(res.data.xianshang_info[0].AgentFavor),
              amount: res.data.xianshang_info[0].counts
            })
            if (res.data.xianshang_info[0].state == "1") {
              that.setData({
                isShenqing: true
              })
            }
            else {
              that.setData({
                isShenqing: false
              })
            }
            if (res.data.xianshang_info[0].IsOption=="1"){
              that.setData({
                isHasQiquan:"是"
              })
            }else{
              that.setData({
                isHasQiquan: "否"
              })
            }
          },
          fail: function (res) {
            wx.showToast({
              title: '数据加载失败',
              duration: 1500
            })
          }
        })
      }
    })
  },
  //申请
  shenqing: function () {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '你确定要申请加入吗',
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
                  method: "Join_Xianshang",
                  id: that.data.zhiweiId,
                  memid: app.globalData.huiyuanInfo.userid
                },
                header: {
                  'content-type': 'application/json'
                },
                success: function (res) {
                  wx.hideLoading()
                  console.log(res)
                  if (res.data == 1) {
                    wx.showToast({
                      title: '申请加入成功',
                      duration: 1500
                    })
                    wx.navigateBack()
                  }
                  else {
                    wx.showToast({
                      title: '申请加入失败',
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