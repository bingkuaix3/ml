// xiangqing.js
var WxParse = require('../../../wxParse/wxParse.js');
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    urlPath: app.globalData.https + "/images/",
    id: null,
    xm_image: '',
    xm_name: '',
    xm_city: '',
    xm_time: '',
    xm_piao: '',
    xm_zhihe: '',
    xm_renhe: '',
    xm_zihe: '',
    xm_csr_image: '',
    xm_csr_name: '',
    xm_csr_shuo: '',
    xm_meilishuo: '',
    xm_introduce: '',
    xm_pics: null,
    isvoted: '',
    actionSheetHidden: true,
    actionSheetItems: [
      { bindtap: 'Tou1', txt: '推荐' },
      { bindtap: 'Tou2', txt: '不推荐' },
      { bindtap: 'Tou3', txt: '弃权' }
    ],
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
    xm_userid: '',
    flag: '',
    isHidden: true,
    isClick: "1",
    isJoin: '0',
    isLoad: false,
    votes_type:'0',
    userId:'',
    winWidth:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //接收参数
    var that = this;
    that.setData({
      id: options.id,
      isClick: options.type,
      userId:app.globalData.huiyuanInfo.userid
    })
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth
        })
      }
    })
    wx.showLoading({
      title: '加载中',
      mask: true,
      success: function () {
        that.loadXmInfo()
      }
    });
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
    if (app.globalData.huiyuanInfo.shoujihao == "") {
      wx.showModal({
        title: '提示',
        content: '请先注册合伙人',
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../../../pages/user/register/register',
            })
          } else if (res.cancel) {
            wx.navigateBack({
              
            })
          }
        }
      })
    }
  // if (this.data.isLoad == true)
      this.loadXmInfo()
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
  //加载项目信息
  loadXmInfo() {
    var that = this

    //请求数据
    wx.request({
      url: app.globalData.https + '/x/Handler/Handler.ashx',
      data: {
        a: 'Get_ProjectDetail',
        id: that.data.id,
        memid: app.globalData.huiyuanInfo.userid
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        wx.hideLoading()
        that.setData({
          isLoad:true
        })
        var data = JSON.stringify(res.data)
        console.log(data)
        var project_info = JSON.parse(data).data[0].project_info[0]
        var encode_info = JSON.parse(data).data[2].encode_info[0]
        var pics_info = JSON.parse(data).data[1].pics_info

        that.setData({
          xm_image: project_info.headpic,
          xm_name: project_info.name,
          xm_city: project_info.city,
          xm_time: project_info.createtime,
          xm_piao: project_info.votes,
          xm_zhihe: project_info.zhihe,
          xm_renhe: project_info.renhe,
          xm_zihe: project_info.zihe,
          xm_meilishuo: decodeURI(encode_info.meilisay),
          xm_csr_image: decodeURI(project_info.mempic),
          xm_csr_name: decodeURI(project_info.memname),
          xm_csr_shuo: decodeURI(encode_info.comment),
          xm_userid: project_info.memid,
          xm_pics: pics_info,
          isvoted: project_info.isvoted,
          guanchatuan_state: project_info.guanchatuan_state,
          guanchatuan_isReport: project_info.guanchatuan_isreport,
          tiyantuan_state: project_info.tiyantuan_state,
          tiyantuan_isReport: project_info.tiyantuan_isreport,
          zhuanjiatuan_state: project_info.zhuanjiatuan_state,
          zhuanjiatuan_isReport: project_info.zhuanjiatuan_isreport,
          guanchatuan_id: project_info.guanchatuan_id,
          tiyantuan_id: project_info.tiyantuan_id,
          zhuanjiatuan_id: project_info.zhuanjiatuan_id,
          xm_flag: project_info.flag,
          isJoin: encode_info.isjoin,
          votes_type: encode_info.votes_type
        })
        if (that.data.xm_pics.length > 0) {
          that.setData({
            isHidden: false
          })
        }
        else {
          that.setData({
            isHidden: true
          })
        }
        if (that.data.guanchatuan_state == "1") {
          that.setData({
            guanchatuan_state_txt: "筹备中"
          })
        } else if (that.data.guanchatuan_state == "2") {
          that.setData({
            guanchatuan_state_txt: "待发起"
          })
        } else if (that.data.guanchatuan_state == "3") {
          that.setData({
            guanchatuan_state_txt: "可申请"
          })
        } else if (that.data.guanchatuan_state == "4") {
          that.setData({
            guanchatuan_state_txt: "进行中"
          })
        } else if (that.data.guanchatuan_state == "5") {
          that.setData({
            guanchatuan_state_txt: project_info.guanchatuan
          })
        }
        if (that.data.tiyantuan_state == "1") {
          that.setData({
            tiyantuan_state_txt: "筹备中"
          })
        } else if (that.data.tiyantuan_state == "2") {
          that.setData({
            tiyantuan_state_txt: "待发起"
          })
        } else if (that.data.tiyantuan_state == "3") {
          that.setData({
            tiyantuan_state_txt: project_info.tiyantuan
          })
        }
        if (that.data.zhuanjiatuan_state == "1") {
          that.setData({
            zhuanjiatuan_state_txt: "筹备中"
          })
        } else if (that.data.tiyantuan_state == "2") {
          that.setData({
            zhuanjiatuan_state_txt: "待发起"
          })
        } else if (that.data.tiyantuan_state == "3") {
          that.setData({
            zhuanjiatuan_state_txt: project_info.zhuanjiatuan
          })
        }//          xm_introduce: decodeURI(encode_info.descs),
      
       // var a = decodeURIComponent(encode_info.descs).replace(/+/gm," ")
        WxParse.wxParse('xm_introduce', 'html', decodeURIComponent(encode_info.descs), that)
      },
      fail: function (data) {
        wx.showToast({
          title: '数据加载失败',
          duration: 1500
        })
      }
    })

  },
  isContain:function(val){
    if(val.contain("+"))
    a;
  },
  //点击投票
  actionSheetTap: function () {
    if (this.data.isClick == "2") {
      this.setData({
        actionSheetHidden: !this.data.actionSheetHidden
      })
    }
  },
  actionSheetbindchange: function () {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  //推荐
  bindTou1: function () {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
    this.settingXmPiao("1")
  },
  //不推荐
  bindTou2: function () {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
    this.settingXmPiao("2")
  },
  //弃权
  bindTou3: function () {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
    this.settingXmPiao("3")
  },
  //设置投票数
  settingXmPiao(type) {
    var that = this;
    wx.showLoading({
      title: '处理中',
      mask: true,
      success: function () {
        //请求数据
        wx.request({
          url: app.globalData.https + '/x/Handler/Handler.ashx',
          data: {
            a: 'Add_Votes',
            id: that.data.id,
            memid: app.globalData.huiyuanInfo.userid,
            type: type,
            project_id: that.data.id
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            wx.hideLoading()
            if (res.data == "yes") {
              wx.showToast({
                title: '投票成功',
                duration: 1500
              })
            } else if (res.data == "repeat") {
              wx.showToast({
                title: '该票已投过',
                duration: 1500
              })
            }
            else {
              wx.showToast({
                title: '该票失败',
                duration: 1500
              })
            }
            that.loadXmInfo()
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
  },
  //进入相关资质
  goToXgzz: function () {
    var that = this
    if (this.data.isClick == "2") {
      wx.navigateTo({
        url: '../../../pages/project/aptitude/aptitude?project_id=' + that.data.id,
      })
    }
  },
  //点击观察团
  goToGuanchatuan: function (e) {
    var that = this
    if (this.data.isClick == "2") {
      if (that.data.guanchatuan_state == "1"){
        wx.showToast({
          title: '观察团正在筹备中',
          duration: 1500
        })
      }
      else if (that.data.guanchatuan_state == "2" && app.globalData.huiyuanInfo.userid == that.data.xm_userid) {
        wx.navigateTo({
          url: '../../../pages/project/observer/observer?group_id=' + that.data.guanchatuan_id
        })
      }
      else if (that.data.guanchatuan_state == "2" && app.globalData.huiyuanInfo.userid != that.data.xm_userid){
        wx.showToast({
          title: '观察团正等待发起',
          duration:1500
        })
      }
      else if (that.data.guanchatuan_state == "3" && app.globalData.huiyuanInfo.userid != that.data.xm_userid) {
        wx.navigateTo({
          url: '../../../pages/project/observeGroupApply/observeGroupApply?project_id=' + that.data.id + "&group_id=" + that.data.guanchatuan_id + "&group_type=1"
        })
      }
      else if (that.data.guanchatuan_state == "3" && app.globalData.huiyuanInfo.userid == that.data.xm_userid) {
        wx.showToast({
          title: '项目方不可申请',
          duration: 1500
        })
      }
      else if (that.data.guanchatuan_state == "4" || that.data.guanchatuan_state == "5") {
        if (app.globalData.huiyuanInfo.userid != that.data.xm_userid && that.data.guanchatuan_isReport == '1') {
          wx.navigateTo({
            url: '../../../pages/project/reportSubmit/reportSubmit?project_id=' + that.data.id + "&group_id=" + that.data.guanchatuan_id + "&group_type=1"
          })
        } else {
          wx.navigateTo({
            url: '../../../pages/project/observeReport/observeReport?id=' + that.data.guanchatuan_id
          })
        }
      }
    }
  },
  //点击体验团
  goToTiyantuan: function () {
    var that = this
    if (this.data.isClick == "2") {
      if (that.data.tiyantuan_state == "2" && app.globalData.huiyuanInfo.userid == that.data.xm_userid) {
        wx.navigateTo({
          url: '../../../pages/project/experience/experience?group_id=' + that.data.tiyantuan_id
        })
      }
      else if (that.data.tiyantuan_state == "2" && app.globalData.huiyuanInfo.userid != that.data.xm_userid) {
        wx.showToast({
          title: '等待项目方发起体验团',
          duration: 1500
        })
      }
      else if (that.data.tiyantuan_state == "3") {
        if (app.globalData.huiyuanInfo.userid != that.data.xm_userid && that.data.tiyantuan_isReport == '1') {
          wx.navigateTo({
            url: '../../../pages/project/reportSubmit/reportSubmit?project_id=' + that.data.id + "&group_id=" + that.data.tiyantuan_id + "&group_type=2"
          })
        } else {
          wx.navigateTo({
            url: '../../../pages/project/experienceReport/experienceReport?id=' + that.data.tiyantuan_id
          })
        }
      }
    }
  },
  //点击专家团
  goToZhuanjiatuan: function () {
    var that = this

    if (this.data.isClick == "2") {
      if (that.data.tiyantuan_state == "2" && app.globalData.huiyuanInfo.userid == that.data.xm_userid) {
        wx.navigateTo({
          url: '../../../pages/project/expert/expert?group_id=' + that.data.zhuanjiatuan_id
        })
      }
      else if (that.data.zhuanjiatuan_state == "2" && app.globalData.huiyuanInfo.userid != that.data.xm_userid) {
        wx.showToast({
          title: '等待项目方发起体验团',
          duration: 1500
        })
      }
      else if (that.data.tiyantuan_state == "3") {
        if (app.globalData.huiyuanInfo.userid != that.data.xm_userid && that.data.zhuanjiatuan_isReport == '1') {
          wx.navigateTo({
            url: '../../../pages/project/reportSubmit/reportSubmit?project_id=' + that.data.id + "&group_id=" + that.data.zhuanjiatuan_id + "&group_type=3"
          })
        } else {
          wx.navigateTo({
            url: '../../../pages/project/expertReport/expertReport?id=' + that.data.zhuanjiatuan_id
          })
        }
      }

    }
  },
  //进入主页
  goToHome: function (e) {
    var that = this
    wx.navigateTo({
      url: '../../../pages/user/home/home?user_id=' + that.data.xm_userid
    })
  },
  preview:function(e){
    var that = this
    var urls=[]
    for(let i = 0; i < that.data.xm_pics.length;i++){
      urls.push(that.data.xm_pics[i].pic)
    }
    wx.previewImage({
      current: e.currentTarget.dataset.index, // 当前显示图片的http链接
      urls: urls // 需要预览的图片http链接列表
    })
  },
  //进入个人主页
  goToZhuye: function () {
    if (this.data.isClick == "2") {
    }
  },
  //进入智合
  goToWisdomjoin: function () {
    var that = this
    if (this.data.isClick == "2") {
      wx.navigateTo({
        url: '../../../pages/project/wisdomjoin/wisdomjoin?project_id=' + that.data.id + "&project_user=" + that.data.xm_userid,
      })
    }
  },
  //进入人合列表
  goToRenheLiebiao: function () {
    var that = this
    if (this.data.isClick == "2") {
      wx.navigateTo({
        url: '../../../pages/project/universitas/universitas?project_id=' + that.data.id + "&project_user=" + that.data.xm_userid,
      })
    }
  },
  //进入资合列表
  goToZiheLiebiao: function () {
    var that = this
    if (this.data.isClick == "2") {
      wx.navigateTo({
        url: '../../../pages/project/capital/capital?project_id=' + that.data.id + "&project_user=" + that.data.xm_userid,
      })
    }
  },
  //进入参与项目
  goToPartake: function () {
    var that = this
    wx.navigateTo({
      url: '../../../pages/project/partake/partake?project_id=' + that.data.id + "&project_user=" + that.data.xm_userid
    })
  },
  goToHome: function () {
    var that = this
    wx.navigateTo({
      url: '../../../pages/user/home/home?user_id=' + that.data.xm_userid
    })
  },
})