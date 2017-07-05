// privatechat.js
var app = getApp()
var socketOpen = false;//连接状态
var timer_kaibozhuangtai = null;//开播状态监听
var timer_luyinzhuangtai = null;//录音状态监听
var timer_dangqianshijian = null;//当前时间监听
var time_audio = null;//当前时间监听
//时间倒计时
var interval = 1000;
var luyinishijian = 59;//录音时间
var siliaoid = '';//私聊ID
Page({

  /**
   * 页面的初始数据
   */
  data: {
    urlPath: app.globalData.https + "/images/",
    //窗口高度
    winHeight: '',
    //滚动视图高度
    viewHeight: '',
    //滚动条的位置
    scrollTop: 0,
    //滚动条高度
    scrollHeight: 0,
    //发送信息框的高度
    boxHeight: 50,
    //发送信息框内容是否显示
    boxHidden: true,
    //选择语音状态
    yuyinSelected: "false",
    //选择文字状态
    wenziSelected: "false",
    //选择媒体库状态
    meitielected: "false",
    //私聊消息
    slList: [],
    //私聊ID
    slId: '',
    //私聊对象
    toUser: '',
    userId: '',
    //文本内容
    word: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(app.globalData.huiyuanInfo)
    //接收参数
    that.setData({
      toUser: options.toUser,
      slId: options.slId,
      userId: app.globalData.huiyuanInfo.userid
    })
    //初始scorll-view高度
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winHeight: res.windowHeight,
          viewHeight: res.windowHeight - 50 - 4
        })
      }
    })
    that.loadHistory()
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
    var that = this
    wx.connectSocket({
      url: 'wss://qing.meilizhongguo.wang/x/SiliaoSocket.ashx'
    })
    wx.onSocketOpen(function (res) {
      var that = this
      socketOpen = true
      console.log('WebSocket连接已打开！');
    })
    wx.onSocketError(function (res) {
      console.log('WebSocket连接打开失败，请检查！')
    })
    wx.onSocketMessage(function (res) {
      //收到服务器内容
      var info = JSON.parse(res.data);
      console.log("收到服务器内容：" + JSON.stringify(info));
      if (info.History.length > 0) {
        //是否本直播间信息
        if (info.History[0].serialnumber == that.data.slId) {
          if (info.History[0].caozuo == 'add') {
            //渲染聊天
            let list_history = that.data.slList;
            list_history = list_history.concat(info.History);
            that.setData({
              slList: list_history
            });
          }
          else if (info.History[0].caozuo == 'delete') {
            //删除聊天
            that.removeByValue(that, that.data.slList, info.History[0].id);
          }
        }
      }
    })
    wx.onSocketClose(function (res) {
      socketOpen = false
      console.log('WebSocket 已关闭！')
    })
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
   * 打开语音
   */
  openYuyin: function () {
    var that = this
    that.setData({
      boxHeight: 190,
      boxHidden: false,
      viewHeight: that.data.winHeight - 190 - 50 - 4,
      yuyinSelected: "true",
      wenziSelected: "false",
      meitiSelected: "false"
    })
  },
  /**
   * 打开文字
   */
  openWenzi: function () {
    var that = this
    that.setData({
      boxHeight: 56,
      boxHidden: false,
      viewHeight: that.data.winHeight - 56 - 50 - 4,
      yuyinSelected: "false",
      wenziSelected: "true",
      meitiSelected: "false"
    })
  },
  /**
   * 打开媒体库
   */
  openMeiti: function () {
    var that = this
    that.setData({
      boxHeight: 80,
      boxHidden: false,
      viewHeight: that.data.winHeight - 80 - 50 - 2,
      yuyinSelected: "false",
      wenziSelected: "false",
      meitiSelected: "true"
    })
  },
  /**
   * 隐藏信息发送框
   */
  hideSendBox: function () {
    var that = this
    that.setData({
      boxHeight: 0,
      boxHidden: true,
      viewHeight: that.data.winHeight - 50 - 2,
      yuyinSelected: "false",
      wenziSelected: "false",
      meitiSelected: "false"
    })
  },
  /**
   * 监听滚动条
   */
  recordScroll: function (e) {
    this.setData({
      scrollHeight: e.detail.scrollHeight
    })
  },
  /**
   * 监听文本输入
   */
  recordWord: function (e) {
    this.setData({
      word: e.detail.value
    })
  },
  /**
   * 发送文本内容
   */
  sendWord: function () {
    var that = this
    var caozuo = 'add';//操作add，delete
    var xingming = app.globalData.huiyuanInfo.xingming
    var touxiang = app.globalData.huiyuanInfo.touxiangurl
    var types = '1';//消息类型：2语音，1文字，3图片
    var mp3time = '';//语音时长
    var mp3name = '';//语音名称
    var yuyinimg = '';//语音图标

    var word = that.data.word;
    if (word == '') {
      wx.showToast({
        title: '请输入内容',
        icon: 'success'
      })
      return;
    }

    if (socketOpen) {
      wx.sendSocketMessage({
        data: '0' + ',' + that.data.userId + ',' + that.data.slId + ',' + types + ',' + caozuo + ',' + xingming + ',' + touxiang + ',' + word + ',' + mp3time + ',' + mp3name + ',' + yuyinimg
      })
      //清空文本框
      that.setData({
        word: ''
      });
      //关闭提示窗口
      wx.hideToast();
    } else {
      console.log('Error：发送失败');
    }
  },
  /**
   * 加载历史消息
   */
  loadHistory: function () {
    var that = this
    wx.request({
      url: app.globalData.https + '/x/Operate/SiliaoXiaoxi.ashx',
      data: {
        method: 'Get_SiliaoHistory',
        id: that.data.slId
      },
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        var str = JSON.stringify(res.data);
        console.log('历史记录：' + str);
        var info = JSON.parse(str);
        if (info.History.length > 0) {
          var list_history = that.data.slList;
          list_history = list_history.concat(info.History);
          that.setData({
            slList: list_history,
          })
          that.setData({
            scrollTop: list_history.length * 80
          })
        }
        // that.setData({
        //   scrollTop: that.data.list_history.length * 300,
        //   scrollHeight: that.data.scrollHeight + 300,
        // });

      }
    })
  },
  removeByValue: function (that, arr, val) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].id == val) {
        arr.splice(i, 1);
        that.setData({
          slList: arr
        });
        break;
      }
    }
  }
})