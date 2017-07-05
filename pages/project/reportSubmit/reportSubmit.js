// guanchabaogao.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    urlPath: app.globalData.https + "/images/",
    //项目ID
    projectId:null,
    //团ID
    groupId:null,
    //团类别
    groupType:null,
    //评论
    comment: '',
    //图片列表
    imgs: [],
    //视频
    video: '',
    //评分
    scoreList: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    score: 0,
    //图片和视频的宽度
    width: null,
    //图片和视频的高度
    height: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      projectId:options.project_id,
      groupId:options.group_id,
      groupType:options.group_type
    })
    wx.getSystemInfo({
      success: function (res) {
        var winWidth = res.windowWidth
        that.setData({
          width: (winWidth - 12 - 35) * 0.32,
          height: ((winWidth - 12 - 35) * 0.3) * 0.75
        })
        console.log(that.data.width)
        console.log(that.data.height)
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
  settingScore: function (e) {
    var index = e.currentTarget.dataset.index
    var list = this.data.scoreList
    var score = 0
    for (let i = 0; i < list.length; i++) {
      if (i < index) {
        list[i] = 2
        score++
      }
      if (i > index)
        list[i] = 0
    }
    if ((list[index] + 1) == 1) {
      list[index] = 1
      score = score + 0.5
    } else if ((list[index] + 1) == 2) {
      list[index] = 2
      score = score + 1
    } else if ((list[index] + 1) == 3) {
      list[index] = 0
    }
    this.setData({
      scoreList: list,
      score: score
    })
  },
  //监听评论输入
  recordComment: function (e) {
    this.setData({
      comment: e.detail.value
    })
  },
  //选择图片
  uploadImage: function () {
    var that = this
    if (that.data.imgs.length > 9) {
      wx.showToast({
        title: '只能上传九张图片',
        icon: 'success',
        duration: 2000
      })
      return;
    }
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        for (let i = 0; i < tempFilePaths.length; i++) {
          wx.uploadFile({
            url: app.globalData.https + "/x/Operate/GuanchaTuan.ashx",
            filePath: tempFilePaths[i],
            name: 'file',
            formData: {
              'method': 'Submit_SantuanPic'
            },
            success: function (resUpload) {
              if (resUpload.data == "0") {
                wx.showToast({
                  title: '图片上传失败',
                  icon: 'success',
                  duration: 2000
                })
              }
              else {
                var img = []
                img.push(resUpload.data)
                that.setData({
                  imgs: that.data.imgs.concat(img)
                })
              }
            }
          })
        }
      }
    })
  },
  //删除图片
  deleteImage: function (e) {
    var img = this.data.imgs
    var temp = []
    for (let i = 0; i < img.length; i++) {
      if (i != e.currentTarget.dataset.index)
        temp.push(img[i])
    }
    this.setData({
      imgs: temp
    })
  },
  //选择视频
  uploadVideo: function () {
    var that = this
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: 'back',
      success: function (res) {

        wx.uploadFile({
          url: app.globalData.https + "/x/Operate/GuanchaTuan.ashx",
          filePath: res.tempFilePath,
          name: 'file',
          formData: {
            'method': 'Add_ReportVedio'
          },
          success: function (resUpload) {
            console.log(JSON.stringify(resUpload))
            if (resUpload.data == "0") {
              wx.showToast({
                title: '视频上传失败',
                icon: 'success',
                duration: 2000
              })
            }
            else {
              that.setData({
                video: resUpload.data
              })
            }
          }
        })
      }
    })
  },
  //删除视频
  deleteVideo: function () {
    this.setData({
      video: ''
    })
  },
  //发布
  publish: function () {
    var that = this;
    if (that.data.comment == '') {
      wx.showToast({
        title: '请输入评论内容',
        duration: 1500
      })
      return;
    }
    var imgUrl = ""
    for (let i = 0; i < that.data.imgs.length; i++) {
      if (imgUrl == "")
        imgUrl += that.data.imgs[i]
      else
        imgUrl += "|" + that.data.imgs[i]
    }
    wx.showLoading({
      title: '加载中',
      mask: true,
      success: function () {
        //请求数据
        wx.request({
          url: app.globalData.https + '/x/Operate/GuanchaTuan.ashx',
          data: {
            method: "Submit_Santuan",
            project_id: that.data.projectId,
            id: '1',
            memid: app.globalData.huiyuanInfo.userid,
            type: that.data.groupType,
            score: that.data.score,
            descs: that.data.comment,
            imgurl: imgUrl,
            vedio: that.data.video
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            console.log("提交报告结果"+res.data)
            wx.hideLoading()
            if(res.data == "1")
            {
              wx.showToast({
                title: '提交报告成功',
                duration: 1500
              })
            }
            else{
              wx.showToast({
                title: '提交报告失败',
                duration: 1500
              })
            }
          }
        })
      }
    })
  }
})