// renheliebiao.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    urlPath: app.globalData.https + "/images/",
    //项目
    projectId: '',
    projectUser: '',
    //创始人
    csrSelected: 0,
    csrNeed: 0,
    csrShenhe: 0,
    csrList: [],
    csrHidden: 'none',
    //管理
    glSelected: 0,
    glNeed: 0,
    glShenhe: 0,
    glList: [],
    glHidden: 'none',
    //渠道
    qdSelected: 0,
    qdNeed: 0,
    qdUpSelected: 0,
    qdUpNeed: 0,
    qdUpHidden: true,
    qdUpEditCtrl: false,
    qdUpAddCtrl: false,
    qdDownSelected: 0,
    qdDownNeed: 0,
    qdDownHidden: true,
    qdDownCtrl: false,
    qdDownCtrol: false,
    qdShenhe: 0,
    qdUpList: [],
    qdDownList: [],
    //用户ID
    userId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      projectId: options.project_id,
      projectUser: options.project_user,
      userId: app.globalData.huiyuanInfo.userid
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
  //加载人合列表
  loadList: function () {
    var that = this;
    wx.showLoading({
      title: '加载中',
      mask: true,
      success: function () {
        //请求数据
        wx.request({
          url: app.globalData.https + '/x/operate/renhe.ashx',
          data: {
            method: "RenheList",
            project_id: that.data.projectId
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            wx.hideLoading()
            console.log("获取人合列表信息：" + JSON.stringify(res.data))
            //创始人
            var chuangshi_head = res.data.data[4].chuangshi_head[0]
            that.setData({
              "csrSelected": chuangshi_head.xianshang_yizhao,
              "csrNeed": chuangshi_head.chuangshi_zhiwei,
              "csrShenhe": chuangshi_head.chuangshi_daishenhe,
              "csrList": res.data.data[0].chuangshi_list
            })
            //管理合伙人
            var guanli_head = res.data.data[5].guanli_head[0]
            that.setData({
              "glSelected": guanli_head.guanli_yizhao,
              "glNeed": guanli_head.guanli_zhiwei,
              "glShenhe": guanli_head.guanli_daishenhe,
              "glList": res.data.data[1].guanli_list
            })
            //渠道
            var xianshang_head = res.data.data[6].xianshang_head[0]
            var xianxia_head = res.data.data[7].xianxia_head[0]
            that.setData({
              "qdUpSelected": parseInt(xianshang_head.xianshang_yizhao),
              "qdUpNeed": parseInt(xianshang_head.xianshang_zhiwei),
              "qdDownSelected": parseInt(xianxia_head.xianxia_yizhao),
              "qdDownNeed": parseInt(xianxia_head.xianxia_zhiwei),
              "qdSelected": parseInt(xianshang_head.xianshang_yizhao) + parseInt(xianxia_head.xianxia_yizhao),
              "qdNeed": parseInt(xianshang_head.xianshang_zhiwei) + parseInt(xianxia_head.xianxia_zhiwei),
              "qdShenhe": parseInt(xianshang_head.xianshang_daishenhe) + parseInt(xianxia_head.xianxia_daishenhe),
              "qdUpList": res.data.data[2].xianshang_list,
              "qdDownList": res.data.data[3].xianxia_list
            })
            if (that.data.qdUpSelected < that.data.qdUpNeed && that.data.projectUser == that.data.userId) {
              that.setData({
                qdUpEditCtrl: true
              })
            }
            else {
              that.setData({
                qdUpEditCtrl: false
              })
            }
            if (that.data.qdDownSelected < that.data.qdDownNeed && that.data.projectUser == that.data.userId) {
              that.setData({
                qdDownEditCtrl: true
              })
            }
            else {
              that.setData({
                qdDownEditCtrl: false
              })
            }
            if (that.data.qdUpNeed == 0 && that.data.projectUser == that.data.userId) {
              that.setData({
                qdUpAddCtrl: true
              })
            } else {
              that.setData({
                qdUpAddCtrl: false
              })
            }
            if (that.data.qdDownNeed == 0 && that.data.projectUser == that.data.userId) {
              that.setData({
                qdDownAddCtrl: true
              })
            } else {
              that.setData({
                qdDownAddCtrl: false
              })
            }
          
          },
          fail: function (res) {
            wx.hideLoading()
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
  //控制创始人的显示与隐藏
  csrCtrl: function () {
    if (this.data.csrHidden == 'block') {
      this.setData({
        csrHidden: 'none'
      })
    } else {
      this.setData({
        csrHidden: 'block'
      })
    }
  },
  //控制管理的显示与隐藏
  glCtrl: function () {
    if (this.data.glHidden == 'block') {
      this.setData({
        glHidden: 'none'
      })
    } else {
      this.setData({
        glHidden: 'block'
      })
    }
  },
  //控制线上的显示与隐藏
  qdUpCtrl: function () {
    if (this.data.qdUpHidden == false) {
      this.setData({
        qdUpHidden: true
      })
    } else {
      this.setData({
        qdUpHidden: false
      })
    }
  },
  //控制线下的显示与隐藏
  qdDownCtrl: function () {
    if (this.data.qdDownHidden == false) {
      this.setData({
        qdDownHidden: true
      })
    } else {
      this.setData({
        qdDownHidden: false
      })
    }
  },
  //进入创始人职位添加
  goToCsrZhiweiAdd: function (e) {
    var that = this
    if (this.data.projectUser == this.data.userId) {
      wx.navigateTo({
        url: '../../../pages/project/universitasJobAdd/universitasJobAdd?project_id=' + that.data.projectId + '&type=1'
      })
    }
    else{
      wx.showToast({
        title: '抱歉，您不是项目方',
        duration:1500
      })
    }
  },
  //进入创始人职位编辑
  goToCsrZhiweiEdit: function (e) {
    if (this.data.projectUser == this.data.userId) {
      wx.navigateTo({
        url: '../../../pages/project/universitasJobEdit/universitasJobEdit?job_id=' + e.currentTarget.dataset.id,
      })
    } else {
      wx.showToast({
        title: '抱歉，您不是项目方',
        duration: 1500
      })
    }
  },
  //进入管理职位添加
  goToGlZhiweiAdd: function (e) {
    var that = this
    if (this.data.projectUser == this.data.userId) {
      wx.navigateTo({
        url: '../../../pages/project/universitasJobAdd/universitasJobAdd?project_id=' + that.data.projectId + '&type=2'
      })
    } else {
      wx.showToast({
        title: '抱歉，您不是项目方',
        duration: 1500
      })
    }
  },
  //进入管理职位编辑
  goToGlZhiweiEdit: function (e) {
    if (this.data.projectUser == this.data.userId) {
      wx.navigateTo({
        url: '../../../pages/project/universitasJobEdit/universitasJobEdit?job_id=' + e.currentTarget.dataset.id,
      })
    } else {
      wx.showToast({
        title: '抱歉，您不是项目方',
        duration: 1500
      })
    }
  },
  //进入创始人职位的申请
  goToCsrZhiweiShenqing: function (e) {
    if (this.data.projectUser != this.data.userId) {
      wx.navigateTo({
        url: '../../../pages/project/universitasJobApply/universitasJobApply?job_id=' + e.currentTarget.dataset.id+"&type=1"
      })
    } else {
      wx.showToast({
        title: '抱歉，您不是项目方',
        duration: 1500
      })
    }
  },
  //进入管理职位的申请
  goToGlZhiweiShenqing: function (e) {
    if (this.data.projectUser != this.data.userId) {
      wx.navigateTo({
        url: '../../../pages/project/universitasJobApply/universitasJobApply?job_id=' + e.currentTarget.dataset.id+"&type=2"
      })
    } else {
      wx.showToast({
        title: '抱歉，您不是项目方',
        duration: 1500
      })
    }
  },
  //进入职位签约人详情
  goToZhiweiQyrDetail: function (e) {
    if (this.data.projectUser == this.data.userId) {
      wx.navigateTo({
        url: '../../../pages/project/universitasSurrender/universitasSurrender?job_id=' + e.currentTarget.dataset.id + "&state=1"
      })
    } else {
      wx.showToast({
        title: '抱歉，您不是项目方',
        duration: 1500
      })
    }
  },
  //进入职位申请人列表
  goToZhiweiSqrList: function (e) {
    if (this.data.projectUser == this.data.userId) {
      wx.navigateTo({
        url: '../../../pages/project/universitasJobApplicant/universitasJobApplicant?job_id=' + e.currentTarget.dataset.id + "&job_name=" + e.currentTarget.dataset.name
      })
    } else {
      wx.showToast({
        title: '抱歉，您不是项目方',
        duration: 1500
      })
    }
  },
  //进入线上职位招募
  goToXianshangAdd: function (e) {
    var that = this
    if (that.data.projectUser == that.data.userId) {
      wx.navigateTo({
        url: '../../../pages/project/universitasRecruitAddUp/universitasRecruitAddUp?job_id=' + e.currentTarget.dataset.id
      })
    } else {
      wx.showToast({
        title: '抱歉，您不是项目方',
        duration: 1500
      })
    }
  },
  //进入线上职位编辑
  goToXianshangEdit: function (e) {
    var that = this
    if (this.data.projectUser == this.data.userId) {
      wx.navigateTo({
        url: '../../../pages/project/universitasRecruitEditUp/universitasRecruitEditUp?job_id=' + e.currentTarget.dataset.id + "&project_id=" + that.data.projectId
      })
    } else {
      wx.showToast({
        title: '抱歉，您不是项目方',
        duration: 1500
      })
    }
  },
  //进入线上职位申请
  goToXianshangShenqing: function (e) {
    var that = this
    if (this.data.projectUser != this.data.userId) {
      wx.navigateTo({
        url: '../../../pages/project/universitasJobUpApply/universitasJobUpApply?job_id=' + e.currentTarget.dataset.id+"&project_user="+that.data.projectUser
      })
    } else {
      wx.showToast({
        title: '抱歉，您不是项目方',
        duration: 1500
      })
    }
  },
  //进入线下职位招募
  goToXianxiaAdd: function (e) {
    var that = this
    if (that.data.projectUser == that.data.userId) {
      wx.navigateTo({
        url: '../../../pages/project/universitasRecruitAddDown/universitasRecruitAddDown?job_id=' + e.currentTarget.dataset.id
      })
    } else {
      wx.showToast({
        title: '抱歉，您不是项目方',
        duration: 1500
      })
    }
  },
  //进入线下职位编辑
  goToXianxiaEdit: function (e) {
    var that = this
    if (this.data.projectUser == this.data.userId) {
      wx.navigateTo({
        url: '../../../pages/project/universitasRecruitEditDown/universitasRecruitEditDown?job_id=' + e.currentTarget.dataset.id+"&project_id="+that.data.projectId
      })
    } else {
      wx.showToast({
        title: '抱歉，您不是项目方',
        duration: 1500
      })
    }
  },
  //进入线下职位申请
  goToXianxiaShenqing: function (e) {
    var that = this
    if (this.data.projectUser != this.data.userId) {
      wx.navigateTo({
        url: '../../../pages/project/universitasJobDownApply/universitasJobDownApply?job_id=' + e.currentTarget.dataset.id+"&project_user"+that.data.projectUser
      })
    } else {
      wx.showToast({
        title: '抱歉，您不是项目方',
        duration: 1500
      })
    }
  },
  //进入渠道职位签约人详情
  goToQdZhiweiQyrDetail: function (e) {
    if (this.data.projectUser == this.data.userId) {
      wx.navigateTo({
        url: '../../../pages/project/universitasSurrender/universitasSurrender?job_id=' + e.currentTarget.dataset.id + "&state=0"
      })
    } else {
      wx.showToast({
        title: '抱歉，您不是项目方',
        duration: 1500
      })
    }
  }

})