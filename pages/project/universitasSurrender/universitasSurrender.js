// zhiweijieyue.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    urlPath: app.globalData.https + "/images/",
    id: "",
    name: "",
    job: "",
    identy: "",
    headpic: "",
    hetong: "",
    text: "",
    cvid: '',
    memid: "",
    state: 2,//0招募 ,1签约
    hidden: true,
    xinxi: false,
    jianli: true,
    jieyue: false,
    shenqing: false,
    jianliname: "",
    createtime: "",
    updatetime: "",
    headpic: "",
    name: "",
    phone: "",
    city: "",
    sex: "",
    school: "",
    intime: "",
    gotime: "",
    level: "",
    work: '',
    cname: "",
    cintime: "",
    cgotime: "",
    clevel: "",
    cjobname: "",
    cwork: "",
    cdescs: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      id:options.job_id,
      state:options.state
    })
    if (that.data.state == 0) {
      wx.setNavigationBarTitle({
        title: '已招募详情',
      })
      that.setData({
        jieyue: false,
        shenqing: true
      })
    } else if (that.data.state == 1) {
      wx.setNavigationBarTitle({
        title: '已签约人详情',
      })
      that.setData({
        jieyue: false,
        shenqing: true
      })
    } else {
      wx.setNavigationBarTitle({
        title: '申请人详情',
      })
      that.setData({
        jieyue: true,
        shenqing: false
      })
    }
   
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
   * 页面数据初始化
   */
  init: function () {
    var that = this
    wx.request({
      url: app.globalData.https + '/x/operate/renhe.ashx',
      data: ({
        method: "Get_RenheMemInfo",
        id: that.data.id
      }),
      success: function (res) {
          wx.hideLoading()
        var data = JSON.stringify(res.data);
        var list = JSON.parse(data)
        console.log("解约页面数据=" + data)
        console.log("解约页面数据=" + list.info[0].xingming)
        that.setData({
          name: list.info[0].xingming,
          job: list.info[0].zhiwu,
          identy: list.info[0].shenfen,
          headpic: list.info[0].headpic,
          hetong: list.info[0].hetong,
          text: list.info[0].descs,
          cvid: list.info[0].cv_id,
          memid: list.info[0].memid
        })
      }
    })
  },
  /**
   * 解约按钮绑定
   */
  jieyue: function () {
    var that = this
    that.setData({
      hidden: false
    })
  },
  /**
   * modal 确定 取消
   */
  confirm: function () {
    var that = this
    that.setData({
      hidden: true
    })
    wx.request({
      url: app.globalData.https + '/x/operate/renhe.ashx',
      data: ({
        method: "Del_RenheMemInfo",
        id: that.data.id
      }),
      success: function (res) {
        if (res.data == 1) {
          wx.showToast({
            title: '解约成功',
            icon: 'success',
            duration: 2000
          })
          setTimeout(function(){
             wx.navigateTo()
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
  cancel: function () {
    var that = this
    that.setData({
      hidden: true
    })
  },
  /**
   * 查看简历
   */
  jianli: function () {
    var that = this
    that.setData({
      xinxi: true,
      jianli: false
    })
    wx.request({
      url: app.globalData.https + '/x/Handler/Operate.ashx',
      data: {
        a: "Get_CVDetail",
        id: that.data.cvid,
        memid: that.data.memid
      },
      success: function (res) {
        var data = JSON.stringify(res.data);
        var list = JSON.parse(data)
        console.log("简历数据" + data)
        that.setData({
          jianliname: list.data[0].CV_info[0].name,
          createtime: list.data[0].CV_info[0].createtime.substr(0, 8),
          updatetime: list.data[0].CV_info[0].updatetime.substr(0, 8),
          headpic: "http://qing.meilizhongguo.wang/" + list.data[0].CV_info[0].headpic,
          name: list.data[0].CV_info[0].memname,
          phone: list.data[0].CV_info[0].phone,
          city: list.data[0].CV_info[0].live_city,
          sex: list.data[0].CV_info[0].sex,
          birthday: list.data[0].CV_info[0].birthday.substr(0, 8),
          school: list.data[1].school_info[0].name,
          intime: list.data[1].school_info[0].starttime.substr(0, 8),
          gotime: list.data[1].school_info[0].endtime.substr(0, 8),
          level: list.data[1].school_info[0].level,
          work: list.data[1].school_info[0].majorname,
          cname: list.data[2].job_info[0].name,
          cintime: list.data[2].job_info[0].starttime,
          cgotime: list.data[2].job_info[0].endtime,
          clevel: list.data[2].job_info[0].level,
          cjobname: list.data[2].job_info[0].job_name,
          cwork: list.data[2].job_info[0].job_type,
          cdescs: list.data[2].job_info[0].descs,
        })
      }
    })
  }
  ,
  /**
   * 隐藏简历
   */
  jianlih: function () {
    var that = this
    that.setData({
      xinxi: false,
      jianli: true
    })
  }
  ,
  /**
   * 申请页面 接受/拒绝
   */
  shenqing: function (e) {
    var that = this
    var type = e.currentTarget.dataset.type
    console.log("type=" + type)
    wx.request({
      url: app.globalData.https + '/x/operate/renhe.ashx',
      data: {
        method: "Edit_Renhe_Mem",
        id: that.data.id,
        type: type
      },
      success: function (res) {
        console.log(res.data)
        if (res.data == 1) {
          wx.showToast({
            title: '操作成功',
            icon: 'success',
            duration: 2000
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
  }
})