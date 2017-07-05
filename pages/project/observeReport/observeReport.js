// pages/guanchatuan/guanchatuan.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    urlPath: app.globalData.https + "/images/",
    tuanid: "",
    memid: '',
    pagesize: 5,
    pageindex: 1,
    //上拉刷新是否显示
    topHidden: 'none',
    //下拉加载是否显示
    bottomHidden: 'none',
    list: [],
    score: 0,
    display: "none",
    focus: false,
    input: '',
    placeholder: "",
    value: '',
    tuantype:'',
    tuanname:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      tuanid: options.id,
      memid: app.globalData.huiyuanInfo.userid,
      tuanname:"观察团"
    })
    // console.log(app.globalData.huiyuanInfo)
    // console.log(app.globalData.huiyuanInfo.userid)
    wx.showLoading({
      title: '加载中',
      mask: true,
      success: function () {
        that.init('up')
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
    this.setData({
      pageindex: 1
    })
    this.init('up')
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this
    this.setData({
      pageindex: that.data.pageindex + 1
    })
    this.init('down')
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 数据初始化方法
   */
  init: function (type) {
    var that = this
    var temp = []
    wx.request({
      url: app.globalData.https + '/x/Operate/GuanchaTuan.ashx',
      data: ({
        method: "Get_SantuanReport",
        id: that.data.tuanid,
        memid: that.data.memid,
        pagesize: that.data.pagesize,
        pageindex: that.data.pageindex

      }),
      success: function (res) {
          wx.hideLoading()
        var data = JSON.stringify(res.data);
        var list = JSON.parse(data)
        console.log("观察团信息=" + data)
        // console.log("-----" + list.data[0].santuan_info[0].score)
        that.setData({
          score: parseFloat(list.data[0].santuan_info[0].score).toFixed(1),
        })
        if (type == "up") {
          if (list.data[2].report_list.length > 0) {
            that.setData({
              list: list.data[2].report_list
            })
            var item = list.data[2].report_list
            for (var i = 0; i < item.length; i++) {
              temp[i] = item[i]
            }
            //  console.log(that.data.list)
          }

          wx.stopPullDownRefresh();
        } else if (type == "down") {
          if (list.data[2].report_list.length > 0) {
            that.setData({
              list: that.data.list.concat(list.data[2].report_list)
            })
            console.log(that.data.list)
          }
          else {
            that.setData({
              pageIndex: that.data.pageIndex - 1
            })
          }
        }
      },
      fail: function () {
        setTimeout(function () {
          wx.hideLoading()
        }, 2000)
      }
    })

  },

  /**
   * 点赞
   */
  dianzan: function (e) {
    var that = this
    // console.log("tpye=" + e.currentTarget.dataset.type)
    // console.log("id="+e.currentTarget.dataset.id)
    var type = e.currentTarget.dataset.type
    var id = e.currentTarget.dataset.id
    var index = e.currentTarget.dataset.index
    var temp = []
    if (type == 0) {
      type = 1
    } else {
      type = 2
    }
    wx.request({
      url: app.globalData.https + '/x/Operate/GuanchaTuan.ashx',
      data: ({
        method: "Add_ReportDianzan",
        type: type,
        report_id: id,
        santuan_id: that.data.tuanid,
        memid: that.data.memid
      }),
      success: function (res) {
        if (res.data == 1) {
          wx.showToast({
            title: '操作成功',
            icon: 'success',
            duration: 2000
          })
          for (var i = 0; i < that.data.list.length; i++) {
            temp[i] = that.data.list[i]
          }
          if (type == 1) {
            temp[index].isdianzan = 1
          } else {
            temp[index].isdianzan = 0
          }
          that.setData({
            list: temp,
          })

        } else {
          wx.showToast({
            title: '操作失败',
            icon: 'loading',
            duration: 2000
          })
        }
      }
    })
  },

  /**
   * 点击评论/回复
   */
  pinglun: function (e) {
    var that = this
    console.log("memid=" + that.data.memid)
    that.setData({
      display: "block",
      focus: true,
      id: e.currentTarget.dataset.id,
      index: e.currentTarget.dataset.number,
      to_memid: e.currentTarget.dataset.toid,
      memid: that.data.memid,
      memname: app.globalData.huiyuanInfo.xingming,
      tomemname: e.currentTarget.dataset.toname,
      value: ""
    })
    console.log("--------------" + e.currentTarget.dataset.type)
    console.log("memid=" + that.data.memid)
    console.log("to_memid=" + that.data.to_memid)
    console.log("memname=" + that.data.memname)
    console.log("tomemname=" + that.data.tomemname)


    if (e.currentTarget.dataset.type == "pinglun") {
      that.setData({
        placeholder: "评论",
      })
    } else {
      that.setData({
        placeholder: "回复" + e.currentTarget.dataset.toname,
      })
    }
  },
  /**
 * 提交评论内容
 */
  tianjia: function (e) {
    var that = this
    var temp = []
    var index = that.data.index
    if (that.data.input.length != 0) {

      console.log(that.data.id)
      console.log(that.data.memid)
      console.log(that.data.to_memid)
      console.log(that.data.input)
      wx.request({
        url: app.globalData.https + '/x/Operate/GuanchaTuan.ashx',
        data: ({
          method: "Add_Comment",
          report_id: that.data.id,
          memid: that.data.memid,
          to_memid: that.data.to_memid,
          descs: that.data.input
        }),
        success: function (res) {
          var data = JSON.stringify(res.data);
          var list = JSON.parse(data)
          if (data == 1) {
            wx.showToast({
              title: '操作成功',
              icon: 'success',
              duration: 2000
            })
            for (var i = 0; i < that.data.list.length; i++) {
              temp[i] = that.data.list[i]
            }
            temp[index].comments_list = temp[index].comments_list.concat([{
              "memid": that.data.memid,
              "p_memid": that.data.to_memid,
              "createtime": "2017-06-15 16:59",
              "descs": that.data.input,
              "memname": that.data.memname,
              "p_memname": that.data.tomemname
            }])
            if (temp[index].comments_list.length>2){
              temp[index].flag=1
            }
            that.setData({
              list: temp,
            })
            console.log("---------list=" + that.data.list)

          } else {
            wx.showToast({
              title: '操作失败',
              icon: 'loading',
              duration: 2000
            })
          }
          that.setData({
            display: "none",
            focus: false,
            input: "",
            hold: false
          })
        }
      })
    } else {
      that.setData({
        hold: true
      })
    }
  },

  /**
  * 监听input
  */
  input: function (e) {
    var that = this
    this.setData({
      input: e.detail.value
    })
    console.log(that.data.input)
  },

  /**
 * 失焦收起键盘
 */
  shouqi: function () {
    var that = this
    console.log("视角")
    if (that.data.input.length != 0) {
      that.setData({
        display: "none",
      })
    }
    that.setData({
      display: "none",
      focus: false,
    })
  },

  /**
 * 展开/收起评论
 */
  click: function (e) {
    var that = this
    var index = e.currentTarget.dataset.number
    var type = e.currentTarget.dataset.zhankai
    var temp = []
    for (var i = 0; i < that.data.list.length; i++) {
      temp[i] = that.data.list[i]
    }
    if(type==0){
      temp[index].a = 1
    }else{
      temp[index].a = 0
    }
    that.setData({
      list: temp,
    })
    console.log("展开")
    console.log(type)
  }
})