var app = getApp()
// pages/xiangmu/xiangmu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    urlPath: app.globalData.https + "/images/",
    modal: true,
    tishi: true,
    tishie: true,
    jieshaoh: true,
    csrs: true,
    input: "",
    textarea: "",
    textareac: "",
    xiangmuname: "",
    hangyez: "",
    hangyes: "",
    hangye: [],
    xiangmujieshao: "",
    chuangshirenshuo: "",
    xiangmufengmian: "",
    xiangmutupian: "",
    ziliaorenzheng: "",
    projectid: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.project_id)
    var that = this
    that.setData({
      projectid: options.project_id
    })
    wx.showLoading({
      title: "加载中",
      mask: false,
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
    this.init()
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
   * 初始化数据
   */
  init: function () {
    var that = this
    wx.request({
      url: app.globalData.https + '/x/Handler/Handler.ashx',
      data: {
        a: "Get_ProjectInfo",
        project_id: that.data.projectid
      },
      success: function (res) {
          wx.hideLoading()

        var data = JSON.stringify(res.data);
        var list = JSON.parse(data)
        console.log("项目：" + data)
        that.setData({
          xiangmuname: list.project_info[0].name,
          hangyes: list.project_info[0].typename,
          xiangmujieshao: decodeURI(list.project_info[0].descs),
          textarea: decodeURI(list.project_info[0].descs),
          chuangshirenshuo: list.project_info[0].comment,
          textareac: list.project_info[0].comment,
          xiangmufengmian: list.project_info[0].fengmian_state,
          xiangmutupian: list.project_info[0].xiangqing_state,
          ziliaorenzheng: list.project_info[0].zizhi_state,

        })
        console.log("init")
        console.log(that.data.xiangmufengmian)
        console.log(that.data.xiangmutupian)
        console.log(that.data.ziliaorenzheng)
        //console.log(that.data.changshirenshuo)
      }
    })
    wx.request({
      url: app.globalData.https + '/x/Handler/Handler.ashx',
      data: {
        a: "Get_Project_Type",
      },
      success: function (res) {

        var data = JSON.stringify(res.data);
        var temp = []
        var list = JSON.parse(data)
        console.log(res.data)
        for (var i = 1; i < list.type_info.length; i++) {
          temp[i - 1] = list.type_info[i]
        }
        // console.log("行业类型：" + temp)
        // console.log("行业类型：" + data)
        that.setData({
          hangye: res.data.type_info
        })
        console.log("行业类型：" + JSON.stringify(that.data.hangye))
      }
    })

  },
  //项目介绍弹出框

  jieshao: function () {
    var that = this
    this.setData({
      jieshaoh: false,
      textarea: that.data.xiangmujieshao
    })
  },

  //项目介绍弹出框确认事件
  jieshaoconfirm: function () {
    var that = this
    if (that.data.textarea.length > 230) {
      that.setData({
        jieshaoh: true,
        tishi: false
      })
    } else if (that.data.textarea.length == 0) {
      that.setData({
        jieshaoh: true,
        tishie: false
      })
    } else {
      that.setData({
        jieshaoh: true,
        xiangmujieshao: that.data.textarea
      })
      that.upload(4, that.data.xiangmujieshao)
    }
    // console.log(that.data.textarea)
    // console.log(that.data.xiangmujieshao)
    // console.log(that.data.textarea.length)

  },

  //项目介绍弹出框取消事件
  jieshaocancel: function () {
    var that = this
    that.setData({
      jieshaoh: true,
    })
    // console.log("取消")
    // console.log(that.data.textarea)
    // console.log(that.data.xiangmujieshao)
  },
  textarea: function (e) {
    var that = this
    this.setData({
      textarea: e.detail.value
    })
    // console.log("textarea" + that.data.textarea)
    // console.log("xiangmujieshao" + that.data.xiangmujieshao)
  },

  //修改项目名称
  mingcheng: function () {
    var that = this
    that.setData({
      modal: false,
      input: that.data.xiangmuname
    })

  },
  //弹出框确认事件
  modalconfirm: function () {
    var that = this
    if (that.data.input.length > 16) {
      that.setData({
        modal: true,
        tishi: false,

      })
    } else if (that.data.input.length == 0) {
      that.setData({
        modal: true,
        tishie: false
      })
    } else {
      that.setData({
        modal: true,
        xiangmuname: that.data.input
      })

      that.upload(1, that.data.xiangmuname)
    }
  },
  //弹出框取消事件
  modalcancel: function () {
    var that = this
    that.setData({
      modal: true,
      input: that.data.xiangmuname
    })
  },
  //弹出框输入
  input: function (e) {
    this.setData({
      input: e.detail.value
    })
  },
  //修改项目名称
  csrs: function () {
    var that = this
    that.setData({
      csrs: false,
      textareac: that.data.chuangshirenshuo
    })
    // console.log("测试" + that.data.chuangshirenshuo)
    // console.log("测试" + that.data.textareac)
  },
  //弹出框确认事件
  csrsconfirm: function () {
    var that = this
    if (that.data.textareac.length > 230) {
      that.setData({
        csrs: true,
        tishi: false
      })
    } else if (that.data.textareac.length == 0) {
      that.setData({
        csrs: true,
        tishie: false,
      })
    } else {
      that.setData({
        csrs: true,
        chuangshirenshuo: that.data.textareac
      })
      console.log(that.data.textareac)
      console.log(that.data.chuangshirenshuo)
      that.upload(6, that.data.chuangshirenshuo)
    }
    // console.log("确认textareac"+that.data.textareac)
    // console.log("chuangshirenshuo" +that.data.chuangshirenshuo)
    // console.log("length" +that.data.textareac.length)
  },
  //弹出框取消事件
  csrscancel: function () {
    var that = this
    that.setData({
      csrs: true
    })
    // console.log("取消textareac" + that.data.textareac)
    // console.log("chuangshirenshuo" + that.data.chuangshirenshuo)
    // console.log("length" + that.data.textareac.length)

  },
  //弹出框输入
  textareac: function (e) {
    var that = this
    this.setData({
      textareac: e.detail.value
    })
    // console.log("textareac" + that.data.textareac)
    // console.log("chuangshirenshuo" + that.data.chuangshirenshuo)
    // console.log("length" + that.data.textareac.length)
  },

  //提示框
  tishiconfirm: function () {
    this.setData({
      tishi: true
    })
  }
  ,
  tishieconfirm: function () {
    this.setData({
      tishie: true
    })
  }
  ,
  //行业选择
  hangye: function (e) {
    var that = this
    var hangye = that.data.hangye
    that.setData({
      hangyez: hangye[e.detail.value].id,
      hangyes: hangye[e.detail.value].name
    })
    that.upload(2, that.data.hangyez)
  },
  //图片上传
  uploadfengmian: function () {
    var that = this
    console.log("上传封面")
    that.addPic(3)

  },
  uploadtupian: function () {

  },
  uploadrenzheng: function () {

  },
  //单张上传
  addPic: function (type) {
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        console.log("选择图片" + JSON.stringify(res))
        wx.uploadFile({
          url: app.globalData.https + "/x/Handler/Handler.ashx",
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'a': 'Update_Project',
            'type': type,
            'project_id': that.data.projectid,
            'value': ''
          },
          success: function (uploadRes) {
            console.log("上传图片" + uploadRes.data)
            var data = JSON.stringify(uploadRes.data);
            var img = JSON.parse(data)
            that.setData({
              xiangmufengmian: "http://qing.meilizhongguo.wang/upload/project/" + img
            })

            if (uploadRes.data == "1") {
              wx.showToast({
                title: '添加成功',
                icon: 'success',
                duration: 2000
              })
            }
            else if (uploadRes.data == "0") {
              wx.showToast({
                title: '出错',
                icon: 'success',
                duration: 2000
              })
            }
            else if (uploadRes.data == "-2") {
              wx.showToast({
                title: '图片格式错误',
                icon: 'success',
                duration: 2000
              })
            }
            else if (uploadRes.data == "-3") {
              wx.showToast({
                title: '图片过大',
                icon: 'success',
                duration: 2000
              })
            }
            else if (uploadRes.data == "-4") {
              wx.showToast({
                title: '文件为空',
                icon: 'success',
                duration: 2000
              })
            }
            // that.loadPic();
          },
          fail: function (res) {
            console.log("上传图片失败" + JSON.stringify(res))
          }
        })
      }
    })
  },

  upload: function (type, value) {
    var that = this
    wx.request({
      url: app.globalData.https + '/x/Handler/Handler.ashx',
      data: ({
        a: 'Update_Project',
        type: type,
        project_id: that.data.projectid,
        value: value,
      }),
      success: function (res) {
        var data = JSON.stringify(res.data);
        var resdata = JSON.parse(data)
        console.log(resdata)

        if (resdata == "1") {
          wx.showToast({
            title: '修改成功',
            icon: 'success',
            duration: 2000
          })
        }
        else if (resdata == "0") {
          wx.showToast({
            title: '出错',
            icon: 'success',
            duration: 2000
          })
        }
        else if (resdata == "-2") {
          wx.showToast({
            title: '图片格式错误',
            icon: 'success',
            duration: 2000
          })
        }
        else if (resdata == "-3") {
          wx.showToast({
            title: '图片过大',
            icon: 'success',
            duration: 2000
          })
        }
        else if (resdata == "-4") {
          wx.showToast({
            title: '文件为空',
            icon: 'success',
            duration: 2000
          })
        }
      }
    })
  },
  /**
  * 跳转图片页面
  */
  jumptupian: function (e) {
    var that = this
    wx.navigateTo({
      url: '../../../pages/project/pictures/pictures?id=' + that.data.projectid + "&type=" + e.currentTarget.dataset.type + "&state=" + e.currentTarget.dataset.state,
    })
  }

})