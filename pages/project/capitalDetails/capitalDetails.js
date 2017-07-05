// zihexiangqing.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    urlPath: app.globalData.https + "/images/",
    //资合ID
    capitalId: '',
    //项目发起方
    projectUser: '',
    //目标金额
    mbMoney: '',
    //已筹金额
    ycMoney: '',
    //进度百分比
    per: '',
    //每股价格
    gujia: '',
    //参与者已认筹金额
    yirenchou: '',
    //每股占比
    meiguzhanbi: '',
    //参与者股份占比
    gufenzhanbi: '',
    //开始时间
    startTime: '',
    //投资人列表
    tzrList: [],
    //页码
    pageIndex: 1,
    //每页条数
    pageSize: 10
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      capitalId: options.capital_id,
      projectUser: options.project_user
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
    this.loadDetail()
    this.setData({
      pageIndex: 1
    })
    this.loadTzrList("up")
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
    this.setData({
      pageIndex: 1
    })
    this.loadTzrList("up")
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this
    this.setData({
      pageIndex: that.data.pageIndex + 1
    })
    this.loadTzrList('down')
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //加载详情
  loadDetail: function (type) {
    var that = this;
    wx.showLoading({
      title: '加载中',
      mask: true,
      success: function () {
        //请求数据
        wx.request({
          url: app.globalData.https + '/x/Operate/Zihe.ashx',
          data: {
            method: "Get_ZiheDetail",
            id: that.data.capitalId,
            memid: app.globalData.huiyuanInfo.userid
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            wx.hideLoading()
            console.log("获取资合详情信息：" + JSON.stringify(res.data))
            var info = res.data.info[0]
            that.setData({
              mbMoney: info.targetmoney,
              ycMoney: info.alreadymoney,
              startTime: info.starttime,
              per: info.per,
              gujia: info.unitprice,
              yirenchou: info.mymoeny,
              meiguzhanbi: info.unitpercent,
              gufenzhanbi: info.mystock
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
  //加载投资人
  loadTzrList: function (type) {
    var that = this;
    wx.showLoading({
      title: '加载中',
      mask: true,
      success: function () {
        //请求数据
        wx.request({
          url: app.globalData.https + '/x/Operate/Zihe.ashx',
          data: {
            method: "Get_ZiheMem",
            id: that.data.capitalId,
            pageindex: that.data.pageIndex,
            pagesize: that.data.pageSize
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            wx.hideLoading()
            console.log("获取资合投资人信息：" + JSON.stringify(res.data))
            if (type == "up") {
              if (res.data.list.length > 0) {
                that.setData({
                  tzrList: res.data.list
                })
              }
              else {
                that.setData({
                  pageIndex: that.data.pageIndex - 1
                })
              }
              wx.stopPullDownRefresh();
            } else if (type == "down") {
              if (res.data.list.length > 0) {
                that.setData({
                  tzrList: that.data.sqrList.concat(res.data.list)
                })
              }
              else {
                that.setData({
                  pageIndex: that.data.pageIndex - 1
                })
              }
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
  }
})