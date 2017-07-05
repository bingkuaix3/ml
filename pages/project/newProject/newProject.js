// xinxiangmu.js
var WxParse = require('../../../wxParse/wxParse.js');
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    urlPath: app.globalData.https + "/images/",
    firstHidden: 'block',
    secondHidden: 'none',
    thirdHidden: 'none',
    forthHidden: 'none',
    fifthHidden: 'none',
    //行业
    hangyeList: [],
    selectedHangye: "请选择所属行业",
    selectedHangyeId: "",
    //项目名称
    name: '',
    //项目封面
    img: '',
    //项目介绍
    introduce: '',
    //创始人说
    csrs: '',
    imgs: [],
    actionSheetHidden: true,
    actionSheetItems: [
      { bindtap: 'Delete', txt: '删除' }
    ],
    index: '',
    introduces:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadHangyeList()
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
  recordIntroduce: function (e) {
    console.log(e.detail.value)
    this.setData({
      introduce: e.detail.value
    })
  },
  recordCsrs: function (e) {
    this.setData({
      csrs: e.detail.value
    })
  },
  //选择图片
  selectFengmian: function () {
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var tempFilePaths = res.tempFilePaths

        wx.uploadFile({
          url: app.globalData.https + "/x/handler/handler.ashx",
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            a: "Add_Project_headpic"
          },
          success: function (resUpload) {
            console.log(resUpload)
            if (resUpload.data == "0") {
              wx.showToast({
                title: '图片上传失败',
                icon: 'success',
                duration: 2000
              })
            }
            else if (resUpload.data == "-2") {
              wx.showToast({
                title: '图片格式错误',
                icon: 'success',
                duration: 2000
              })
            }
            else if (resUpload.data == "-2") {
              wx.showToast({
                title: '图片过大',
                icon: 'success',
                duration: 2000
              })
            }
            else {
              that.setData({
                img: resUpload.data
              })
            }
          }
        })
      }

    })
  },
  //监听项目名称输入
  recordName: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  //返回
  back: function () {
    wx.navigateBack()
  },
  //first下一步
  firstNext: function () {
    if (this.data.selectedHangyeId == '' || this.data.selectedHangyeId == '1') {
      wx.showToast({
        title: '请选择所属行业',
        duration: 1500
      })
      return;
    }
    this.setData({
      firstHidden: "none",
      secondHidden: "block",
    })
  },
  //second上一步
  secondBefore: function () {
    this.setData({
      firstHidden: "block",
      secondHidden: "none",
    })
  },
  //second下一步
  secondNext: function () {
    if (this.data.name.length == 0) {
      wx.showToast({
        title: '请输入项目名称',
        duration: 1500
      })
      return;
    }
    this.setData({
      secondHidden: "none",
      thirdHidden: "block",
    })
  },
  //third上一步
  thirdBefore: function () {
    this.setData({
      secondHidden: "block",
      thirdHidden: "none",
    })
  },
  //second下一步
  thirdNext: function () {
    if (this.data.img == "") {
      wx.showToast({
        title: '请选择项目封面',
        duration: 1500
      })
      return;
    }
    this.setData({
      thirdHidden: "none",
      forthHidden: "block",
    })
  },
  //forth上一步
  forthBefore: function () {
    this.setData({
      forthHidden: "none",
      thirdHidden: "block",
    })
  },
  //forth下一步
  forthNext: function () {
    console.log(this.data.introduce)
    if (this.data.introduce.length == 0) {
      wx.showToast({
        title: '请输入项目介绍',
        duration: 1500
      })
      return;
    }
    this.setData({
      forthHidden: "none",
      fifthHidden: "block",
    })
  },
  //fifth上一步
  fifthBefore: function () {
    this.setData({
      fifthHidden: "none",
      forthHidden: "block",
    })
  },
  //监听行业选择
  hangyeChange: function (e) {
    var that = this
    that.setData({
      selectedHangyeId: that.data.hangyeList[e.detail.value].id,
      selectedHangye: that.data.hangyeList[e.detail.value].name
    })
  },
  //加载行业
  loadHangyeList: function () {
    var that = this
    wx.showLoading({
      title: '加载中',
      mask: true,
      success: function () {
        //请求数据
        wx.request({
          url: app.globalData.https + '/x/handler/handler.ashx',
          data: {
            a: "Get_Project_Type"
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            wx.hideLoading()
            console.log("获取行业信息：" + JSON.stringify(res.data))
            that.setData({
              hangyeList: res.data.type_info
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
  //确定
  sure: function () {
    var that = this
    var imgstr = ""
    if (that.data.imgs.length == 0) {
      wx.showToast({
        title: '请添加资质图片',
        duration: 1500
      })
      return;
    }
    for (var i = 0; i < that.data.imgs.length; i++) {
      imgstr = imgstr + that.data.imgs[i] + "|"
    }
    console.log(imgstr)
    wx.showLoading({
      title: '加载中',
      mask: false,
      success: function () {
        //请求数据
        wx.request({
          url: app.globalData.https + '/x/Handler/Project_Add.ashx',
          data: {
            a: "Project_Add",
            name: that.data.name,
            type_id: that.data.selectedHangyeId,
            descs: encodeURI(that.data.introduce),
            memid: app.globalData.huiyuanInfo.userid,
            pic: encodeURI(that.data.img),
            comment: imgstr
          },
          header: {
            'content-type': 'application/json'
          },
          method:"POST",
          success: function (res) {
            wx.hideLoading()
            console.log("获取行业信息：" + JSON.stringify(res.data))
            if (res.data == "1") {
              wx.showToast({
                title: '发起新项目成功',
                duration: 1500
              })
              setTimeout(function () {
                wx.navigateBack()
              }, 2000)

            } else {
              wx.showToast({
                title: '发起新项目失败',
                duration: 1500
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

  /**
   * 添加资质
   */
  tjzz: function () {
    var that = this
    var temp = []

    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        for (var i = 0; i < tempFilePaths.length; i++) {
          wx.uploadFile({
            url: app.globalData.https + "/x/handler/handler.ashx",
            filePath: tempFilePaths[i],
            name: 'file',
            formData: {
              a: "Add_Project_headpic"
            },
            success: function (resUpload) {
              console.log("res=" + resUpload.data)
              if (resUpload.data == "0") {
                wx.showToast({
                  title: '图片上传失败',
                  icon: 'success',
                  duration: 2000
                })
              }
              else if (resUpload.data == "-2") {
                wx.showToast({
                  title: '图片格式错误',
                  icon: 'success',
                  duration: 2000
                })
              }
              else if (resUpload.data == "-2") {
                wx.showToast({
                  title: '图片过大',
                  icon: 'success',
                  duration: 2000
                })
              }
              else {
                temp.push(resUpload.data)
                that.setData({
                  imgs: temp
                })
                console.log("imgs=" + that.data.imgs)
              }
            }
          })
        }
      }
    })
  },
  //点击图片
  actionSheetTap: function (e) {
    var that = this
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden,
      index: e.currentTarget.dataset.index
    })
    console.log(that.data.index)
  },
  actionSheetbindchange: function () {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  //删除
  bindDelete: function () {
    var temp = []
    var that = this
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
    console.log(that.data.imgs)
    temp = that.data.imgs
    temp.splice(that.data.index, 1)
    console.log(temp)
    that.setData({
      imgs: temp
    })
    console.log(that.data.imgs)
  }
})