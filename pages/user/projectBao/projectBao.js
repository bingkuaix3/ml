// xiangmubao.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    urlPath: app.globalData.https + "/images/",
    id: '',
    //用户ID
    userId: null,
    //选择发起项目
    fqSelected: 'top-active',
    //选择参与项目
    cySelected: '',
    //页码
    pageIndex: 1,
    //页容量
    pageSize: 10,
    //项目列表
    list: [],
    //面板内容高度
    pHeight: '',
    //屏幕高度
    winHeight: '',
    //观察团值
    gctValue: '',
    //体验团值
    tytValue: '',
    //专家团值
    zjtValue: '',
    //智合值
    zhiheValue: '',
    //人合值
    renheValue: '',
    //资合值
    ziheValue: '',
    //三团状态
    guanchatuan_id: '',
    guanchatuan_state: '',
    guanchatuan_state_txt: '',
    guanchatuan_isReport: '0',
    tiyantuan_id: '',
    tiyantuan_state: '',
    tiyantuan_state_txt: '',
    tiyantuan_isReport: '0',
    zhuanjiatuan_id: '',
    zhuanjiatuan_state: '',
    zhuanjiatuan_state_txt: '',
    zhuanjiatuan_isReport: '',
    isNew:false,
    xm_userid:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    //接收参数
    that.setData({
      userId: options.user_id
    })
    //获取设备信息
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winHeight: res.windowHeight
        })
      }
    })
    this.selectFqXiangmu()
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
    if(this.data.isNew)
      this.selectFqXiangmu()
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
    var that = this
    that.setData({
      pageIndex: that.data.pageIndex + 1
    })
    if (that.data.fqSelected != '') {
      that.loadFqList("down")
    } else if (that.data.cySelected != '') {
      that.loadCyList("down")
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //进入发起新项目
  goToFqXiangmu: function () {
    this.setData({
      isNew:true
    })
    wx.navigateTo({
      url: '../../../pages/project/newProject/newProject'
    })
  },
  //选择发起项目
  selectFqXiangmu: function () {
    var that = this
    that.setData({
      fqSelected: 'top-active',
      cySelected: '',
      pHeight: that.data.winHeight - 45 - 50 - 80,
      pageIndex: 1
    })
    this.loadFqList("up")
  },
  //选择参与项目
  selectCyXiangmu: function () {
    var that = this
    that.setData({
      fqSelected: '',
      cySelected: 'top-active',
      pHeight: that.data.winHeight - 45 - 80,
      pageIndex: 1
    })
    this.loadCyList("up")
  },
  //面板折叠和收缩控制
  panelCtrl: function (e) {
    var that = this
    var list = that.data.list
    var isOpen = true;
    for (let i = 0; i < list.length; i++) {
      if (list[i].id == e.currentTarget.dataset.id) {
        if (list[i].a == "block") {
          list[i].a = "none"
          list[i].b = "block"
          isOpen = false
        }
        else {
          that.queryDetail(e.currentTarget.dataset.id)
          isOpen = true
          list[i].a = "block"
          list[i].b = "block"
        }
      }
      else {
        list[i].state = "none"
      }
    }
    if (isOpen == true) {
      for (let i = 0; i < list.length; i++) {
        if (list[i].id != e.currentTarget.dataset.id)
          list[i].b = "none"
      }
    }
    else {
      for (let i = 0; i < list.length; i++) {
        if (list[i].id != e.currentTarget.dataset.id)
          list[i].b = "block"
      }
    }

    that.setData({
      list: list
    })
  },
  //加载发起的项目列表
  loadFqList: function (type) {
    var that = this;
    wx.showLoading({
      title: '加载中',
      mask: true,
      success: function () {
        //请求数据
        wx.request({
          url: app.globalData.https + '/x/handler/handler.ashx',
          data: {
            a: "Get_MyProject",
            memid: that.data.userId,
            pagesize: that.data.pageSize,
            pageindex: that.data.pageIndex
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            wx.hideLoading()
            that.setData({
              isNew:false
            })
            console.log("获取发起的项目列表信息：" + JSON.stringify(res.data))
            if (type == "up") {
              that.setData({
                list: res.data.myproject_list
              })
            }
            else {
              if (res.data.myproject_list.length > 0) {
                that.setData({
                  list: that.data.list.concat(res.data.myproject_list)
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
            wx.hideLoading()
            wx.showToast({
              title: '数据加载失败',
              duration: 1500
            })
          }
        })
      }
    })
  },
  //加载参与的项目列表
  loadCyList: function (type) {
    var that = this;
    wx.showLoading({
      title: '加载中',
      mask: true,
      success: function () {
        //请求数据
        wx.request({
          url: app.globalData.https + '/x/handler/handler.ashx',
          data: {
            a: "Get_JoinProject",
            memid: that.data.userId,
            pagesize: that.data.pageSize,
            pageindex: that.data.pageIndex
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            wx.hideLoading()
            console.log("获取参与的项目列表信息：" + JSON.stringify(res.data))
            if (type == "up") {
              that.setData({
                list: res.data.joinproject_list
              })
            }
            else {
              if (res.data.joinproject_list.length > 0) {
                that.setData({
                  list: that.data.list.concat(res.data.joinproject_list)
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
            wx.hideLoading()
            wx.showToast({
              title: '数据加载失败',
              duration: 1500
            })
          }
        })
      }
    })
  },
  //查询项目信息
  queryDetail: function (projectId) {
    var that = this;
    wx.showLoading({
      title: '加载中',
      mask: true,
      success: function () {
        //请求数据
        wx.request({
          url: app.globalData.https + '/x/handler/handler.ashx',
          data: {
            a: "Get_ProjectDetail",
            memid: that.data.userId,
            id: projectId
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            wx.hideLoading()
            console.log("获取项目详情信息：" + JSON.stringify(res.data))
            var info = res.data.data[0].project_info[0]
            that.setData({
              id: info.id,
              xm_userid: info.memid,
              gctValue: info.guanchatuan,
              tytValue: info.tiyantuan,
              zjtValue: info.zhuanjiatuan,
              zhiheValue: info.zhihe,
              renheValue: info.renhe,
              ziheValue: info.zihe,
              guanchatuan_state: info.guanchatuan_state,
              guanchatuan_isReport: info.guanchatuan_isreport,
              tiyantuan_state: info.tiyantuan_state,
              tiyantuan_isReport: info.tiyantuan_isreport,
              zhuanjiatuan_state: info.zhuanjiatuan_state,
              zhuanjiatuan_isReport: info.zhuanjiatuan_isreport,
              guanchatuan_id: info.guanchatuan_id,
              tiyantuan_id: info.tiyantuan_id,
              zhuanjiatuan_id: info.zhuanjiatuan_id,
            })
            if (info.guanchatuan_state == "1") {
              that.setData({
                guanchatuan_state_txt: "筹备中"
              })
            } else if (info.guanchatuan_state == "2") {
              that.setData({
                guanchatuan_state_txt: "待发起"
              })
            } else if (info.guanchatuan_state == "3") {
              that.setData({
                guanchatuan_state_txt: "可申请"
              })
            } else if (info.guanchatuan_state == "4") {
              that.setData({
                guanchatuan_state_txt: "进行中"
              })
            } else if (info.guanchatuan_state == "5") {
              that.setData({
                guanchatuan_state_txt: info.guanchatuan
              })
            }
            if (info.tiyantuan_state == "1") {
              that.setData({
                tiyantuan_state_txt: "筹备中"
              })
            } else if (info.tiyantuan_state == "2") {
              that.setData({
                tiyantuan_state_txt: "待发起"
              })
            } else if (info.tiyantuan_state == "3") {
              that.setData({
                tiyantuan_state_txt: info.tiyantuan
              })
            }
            if (info.zhuanjiatuan_state == "1") {
              that.setData({
                zhuanjiatuan_state_txt: "筹备中"
              })
            } else if (info.tiyantuan_state == "2") {
              that.setData({
                zhuanjiatuan_state_txt: "待发起"
              })
            } else if (info.tiyantuan_state == "3") {
              that.setData({
                zhuanjiatuan_state_txt: info.zhuanjiatuan
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
  //进入项目预览
  goToYulan: function (e) {
    wx.navigateTo({
      url: '../../../pages/project/details/details?id=' + e.currentTarget.dataset.id + "&type=1"
    })
  },
  //进入项目编辑
  goToProjectEdit: function (e) {
    wx.navigateTo({
      url: '../../../pages/project/editProject/editProject?project_id=' + e.currentTarget.dataset.id
    })
  },
  //点击观察团
  goToGuanchatuan: function (e) {
    var that = this

    if (that.data.guanchatuan_state == "2" && app.globalData.huiyuanInfo.userid == that.data.userId) {
      wx.navigateTo({
        url: '../../../pages/project/observer/observer?group_id=' + that.data.guanchatuan_id
      })
    }
    else if (that.data.guanchatuan_state == "3" && app.globalData.huiyuanInfo.userid != that.data.userId) {
      wx.navigateTo({
        url: '../../../pages/project/observeGroupApply/observeGroupApply?project_id=' + that.data.id + "&group_id=" + that.data.guanchatuan_id + "&group_type=1"
      })
    }
    else if (that.data.guanchatuan_state == "4" || that.data.guanchatuan_state == "5") {
      if (app.globalData.huiyuanInfo.userid != that.data.userId && that.data.guanchatuan_isReport == '1') {
        wx.navigateTo({
          url: '../../../pages/project/reportSubmit/reportSubmit?project_id=' + that.data.id + "&group_id=" + that.data.guanchatuan_id + "&group_type=1"
        })
      } else {
        wx.navigateTo({
          url: '../../../pages/project/observeReport/observeReport?id=' + that.data.guanchatuan_id
        })
      }
    }

  },
  //点击体验团
  goToTiyantuan: function () {
    var that = this


    if (that.data.tiyantuan_state == "2" && app.globalData.huiyuanInfo.userid == that.data.userId) {
      wx.navigateTo({
        url: '../../../pages/project/experience/experience?group_id=' + that.data.tiyantuan_id
      })
    }
    else if (that.data.tiyantuan_state == "3") {
      if (app.globalData.huiyuanInfo.userid != that.data.userId && that.data.tiyantuan_isReport == '1') {
        wx.navigateTo({
          url: '../../../pages/project/reportSubmit/reportSubmit?project_id=' + that.data.id + "&group_id=" + that.data.tiyantuan_id + "&group_type=2"
        })
      } else {
        wx.navigateTo({
          url: '../../../pages/project/experienceReport/experienceReport?id=' + that.data.tiyantuan_id
        })
      }
    }

  },
  //点击专家团
  goToZhuanjiatuan: function () {
    var that = this
    if (that.data.tiyantuan_state == "2" && app.globalData.huiyuanInfo.userid == that.data.userId) {
      wx.navigateTo({
        url: '../../../pages/project/expert/expert?group_id=' + that.data.zhuanjiatuan_id
      })
    }
    else if (that.data.tiyantuan_state == "3") {
      if (app.globalData.huiyuanInfo.userid != that.data.userId && that.data.zhuanjiatuan_isReport == '1') {
        wx.navigateTo({
          url: '../../../pages/project/reportSubmit/reportSubmit?project_id=' + that.data.id + "&group_id=" + that.data.zhuanjiatuan_id + "&group_type=3"
        })
      } else {
        wx.navigateTo({
          url: '../../../pages/project/expertReport/expertReport?id=' + that.data.zhuanjiatuan_id
        })
      }
    }


  },
  //进入智合
  goToWisdomjoin: function () {
    var that = this

    wx.navigateTo({
      url: '../../../pages/project/wisdomjoin/wisdomjoin?project_id=' + that.data.id + "&project_user=" + that.data.xm_userid,
    })

  },
  //进入人合列表
  goToRenheLiebiao: function () {
    var that = this

    wx.navigateTo({
      url: '../../../pages/project/universitas/universitas?project_id=' + that.data.id + "&project_user=" + that.data.xm_userid,
    })

  },
  //进入资合列表
  goToZiheLiebiao: function () {
    var that = this

    wx.navigateTo({
      url: '../../../pages/project/capital/capital?project_id=' + that.data.id + "&project_user=" + that.data.xm_userid,
    })

  },
  //进入参与项目
  goToPartake: function () {
    var that = this
    wx.navigateTo({
      url: '../../../pages/project/partake/partake?project_id=' + that.data.id + "&project_user=" + that.data.xm_userid
    })
  }
})