var app = getApp()
var timer;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    urlPath: app.globalData.https + "/images/",
    //观察团ID
    groupId: null,
    //观察团介绍
    introduce: '',
    //具体时间
    dateTime: null,
    //观察团日期
    date: '',
    //观察团时间
    time: '',
    //天
    day: '0',
    //时
    hour: '00',
    //分
    minute: '00',
    //秒
    second: '00',
    //是否结束
    isOver:true,
    projectId: '',
    groupType:'',
    isShenqing:'0'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      groupId: options.group_id,
      projectId:options.project_id,
      groupType:options.group_type
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
  //加载信息
  loadInfo: function () {
    var that = this
    wx.showLoading({
      title: '加载中',
      mask: true,
      success: function () {
        //请求数据
        wx.request({
          url: app.globalData.https + '/x/operate/GuanChaTuan.ashx',
          data: {
            method: "Get_Join_Santuan",
            id: that.data.groupId,
            memid:app.globalData.huiyuanInfo.userid
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            wx.hideLoading()
            console.log("获取人合列表信息：" + JSON.stringify(res.data))
            var info = res.data.info[0]
            that.setData({
              introduce: decodeURI(info.descs),
              dateTime: info.date,
              isShenqing:info.isshenqing
            })
            that.setData({
              date: that.convertToDate(info.date),
              time: that.convertToTime(info.date)
            })
            //开始倒计时
            that.countDown()
           
          },
          fail: function (res) {
            wx.showToast({
              title: '数据加载失败',
              duration: 1500
            })
            setTimeout(function(){
              wx.navigateBack()
            },2000)
          }
        })
      }
    })
  },
  //日期转换
  convertToDate: function (val) {
    var date = new Date(val)
    return date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate() + "日"
  },
  //时间转换
  convertToTime: function (val) {
    var date = new Date(val)
    return date.getHours() + ":" + date.getMinutes()
  },
  //倒计时
  countDown: function () {
    var that = this
    timer = setInterval(function () {
      var curDate = new Date()
      var date = new Date(that.data.dateTime)
      if ((date - curDate) >= 0) {
        var day = parseInt((date - curDate) / 1000 / 3600 / 24)
        var hour = parseInt((date - curDate) / 1000 / 3600) - (day * 24)
        var minute = parseInt((date - curDate) / 1000 / 60 - (day * 24 * 60) - (hour * 60))
        var second = parseInt((date - curDate) / 1000) - (day * 24 * 3600) - (hour * 3600) - (minute * 60)
        that.setData({
          isOver:false,
          day: day,
          hour: that.convertToValue(hour),
          minute: that.convertToValue(minute),
          second: that.convertToValue(second)
        })
        console.log(hour + ":" + minute + ":" + second)
      }
      else {
        that.setData({
          isOver: true
        })
        clearInterval(timer)
      }

    }, 1000)
  },
  //保持两位
  convertToValue: function (val) {
    if (val < 10)
      return "0" + val;
    else
      return val;
  },
  //申请观察团
  apply:function(){
    var that = this;
    wx.showModal({
      title: '提示',
      content: '你确定要申请成为观察团吗',
      success: function (res) {
    wx.showLoading({
      title: '处理中',
      mask: true,
      success: function () {
        //请求数据
        wx.request({
          url: app.globalData.https + '/x/Operate/GuanchaTuan.ashx',
          data: {
            method: 'Join_Santuan',
            project_id: that.data.groupId,
            memid:app.globalData.huiyuanInfo.userid,
            type:that.data.groupType
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            wx.hideLoading()
            if(res.data == "1"){
              wx.showToast({
                title: '申请观察团成功',
                duration: 1500
              })
              setTimeout(function () {
                wx.navigateBack()
              }, 2000)
            }
            else
              wx.showToast({
                title: '申请观察团失败',
                duration: 1500
              })
          },
          fail: function (data) {
            wx.showToast({
              title: '数据请求失败',
              duration: 1500
            })
          }
        })
      }
    })
      }
    })
  }
})