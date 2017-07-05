// applyFor.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    urlPath: app.globalData.https + "/images/",
    zhiweiId: '',
    zhiweiName: '',
    zhiweiMiaoshu: '',
    hezuofangshi: '',
    isZhangu: '',
    isHasXinzi: '',
    gulifangshi: '',
    jianli: [],
    selectedJianli: '',
    isShenqing:true,
    type:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      zhiweiId: options.job_id,
      type:options.type
    })
    this.loadDetail()
    this.loadJianli()
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
  selectJianli: function (e) {
    var that = this
    var list = that.data.jianli
    for (let i = 0; i < list.length; i++) {
      list[i].a = "true"
    }
    list[e.currentTarget.dataset.index].a = "false"
    that.setData({
      jianli: list,
      selectedJianli: list[e.currentTarget.dataset.index].id
    })

  },
  //加载信息
  loadDetail: function () {
    var that = this
    wx.showLoading({
      title: '加载中',
      mask: true,
      success: function () {
        //请求数据
        wx.request({
          url: app.globalData.https + '/x/operate/renhe.ashx',
          data: {
            method: "Get_RenheApply",
            id: that.data.zhiweiId,
            memid: app.globalData.huiyuanInfo.userid
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            wx.hideLoading()
            console.log(res)
            var info = res.data.apply_info[0]
            that.setData({
              zhiweiName: info.name,
              zhiweiMiaoshu: decodeURI(info.descs)
            })
            if(info.isok == "1"){
              that.setData({
                isShenqing:true
              })
            }
            else{
              that.setData({
                isShenqing: false
              })
            }
            if (info.iswhole == "1") {
              that.setData({
                hezuofangshi: "全职"
              })
            } else {
              that.setData({
                hezuofangshi: "兼职"
              })
            }
            if (info.isstock == "1") {
              that.setData({
                isZhangu: "是"
              })
            }
            else {
              that.setData({
                isZhangu: "否"
              })
            }
            if (info.ismoney = "1") {
              that.setData({
                isHasXinzi: "是"
              })
            } else {
              that.setData({
                isHasXinzi: "否"
              })
            }
            if (info.isoriginal == "1") {
              that.setData({
                gulifangshi: "原始股权"
              })
            }
            else {
              that.setData({
                gulifangshi: "无原始股权"
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
  //加载简历
  loadJianli: function () {
    var that = this
    wx.showLoading({
      title: '加载中',
      mask: true,
      success: function () {
        //请求数据
        wx.request({
          url: app.globalData.https + '/x/handler/Operate.ashx',
          data: {
            a: "Get_CVList",
            memid: app.globalData.huiyuanInfo.userid
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            wx.hideLoading()
            console.log(res)
            that.setData({
              jianli: res.data.CV_info
            })
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
  shenqing: function () {
    var that = this;
    if(that.data.selectedJianli ==''){
      wx.showToast({
        title: '请选择一个简历',
        duration: 1500
      })
      return;
    }
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
                  method: "Add_RenheApply",
                  job_id: that.data.zhiweiId,
                  memid: app.globalData.huiyuanInfo.userid,
                  cv_id: that.data.selectedJianli
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