// ziheliebiao.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    urlPath: app.globalData.https + "/images/",
    //项目id
    projectId: '',
    //项目负责人
    projectUser: '',
    //募资进行中列表
    jxzList: [],
    //募资已结束列表
    yjsList: [],
    //募资未开始列表
    wksList: [],
    //发布按钮是否隐藏
    isHidden: true,
    isLoad: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //接收传参
    this.setData({
      projectId: options.project_id
    })
    if (app.globalData.huiyuanInfo.userid == options.project_user)
      this.setData({
        isHidden: false
      })
    else
      this.setData({
        isHidden: true
      })
    var that = this
    wx.showLoading({
      title: '加载中',
      mask: true,
      success: function () {
        that.loadList()
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
    //加载列表
    if (this.data.isLoad)
      this.loadList()
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
  //进入发起募资
  goToFundraising: function () {
    var that = this
    wx.navigateTo({
      url: '../../../pages/project/capitalFundraising/capitalFundraising?project_id=' + that.data.projectId
    })
  },
  //加载列表
  loadList: function (type) {
    var that = this;

    //请求数据
    wx.request({
      url: app.globalData.https + '/x/Operate/Zihe.ashx',
      data: {
        method: "Get_ZiheList",
        project_id: that.data.projectId
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        wx.hideLoading()
        that.setData({
          isLoad:true
        })
        console.log("获取资合列表信息：" + JSON.stringify(res.data))
        that.setData({
          jxzList: res.data.data[0].jinxingzhong_info,
          yjsList: res.data.data[1].yijieshu_info,
        })

      },
      fail: function (res) {
        wx.showToast({
          title: '数据加载失败',
          duration: 1500
        })
      }
    })

  },
  //进入资合详情
  goToDetails: function (e) {
    var that = this
    wx.navigateTo({
      url: '../../../pages/project/capitalDetails/capitalDetails?capital_id=' + e.currentTarget.dataset.id + "&project_user=" + that.data.projectUser
    })
  }
})