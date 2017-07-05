// pictures.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    urlPath: app.globalData.https + "/images/",
    pics: [],
    actionSheetHidden: true,
    actionSheetItems: [
      { bindtap: 'Delete', txt: '删除' }
    ],
    pic_id: '',
    xm_id: '',
    type: 0,
    have: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      xm_id: options.id,
      type: options.type,
      have: options.state
    })
    console.log("xm_id=" + options.id)
    console.log("type=" + options.type)
    console.log("state=" + options.state)
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
    this.loadPic();
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
  //加载图片
  loadPic: function () {
    var that = this
    //请求数据
    wx.request({
      url: app.globalData.https + '/x/handler/handler.ashx',
      data: {
        a: 'Get_Pic',
        project_id: that.data.xm_id,
        type: that.data.type
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(" 图片列表" + JSON.stringify(res))
        that.setData({
          pics: res.data.pic_info
        })
      }
    });
  },
  //添加资质图片
  addPic: function () {
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
            'a': 'Add_Pic',
            'pictype': that.data.type,
            'project_id': that.data.xm_id,
            'orderby': '1 '
          },
          success: function (uploadRes) {
            console.log("上传图片" + uploadRes.data)
            if (uploadRes.data.flag == "1") {
              wx.showToast({
                title: '添加成功',
                icon: 'success',
                duration: 2000
              })
            }
            else if (uploadRes.data.flag == "-1") {
              wx.showToast({
                title: '数据插入失败',
                icon: 'success',
                duration: 2000
              })
            }
            else if (uploadRes.data.flag == "-2") {
              wx.showToast({
                title: '图片格式错误',
                icon: 'success',
                duration: 2000
              })
            }
            else if (uploadRes.data.flag == "-3") {
              wx.showToast({
                title: '图片过大',
                icon: 'success',
                duration: 2000
              })
            }
            that.loadPic();
          },
          fail: function (res) {
            console.log("上传图片失败" + JSON.stringify(res))
          }
        })
      }
    })
  },
  //点击图片
  actionSheetTap: function (e) {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden,
      pic_id: e.currentTarget.dataset.id
    })
  },
  actionSheetbindchange: function () {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  //删除
  bindDelete: function () {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
    var that = this
    //请求数据
    wx.request({
      url: app.globalData.https + '/x/Handler/Handler.ashx',
      data: {
        a: 'Del_Pic',
        pic_id: that.data.pic_id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res)
        that.loadPic();
      }
    });
  },
  addPic1: function () {
    console.log("gengxin")
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        console.log("选择图片" + JSON.stringify(res))
        wx.uploadFile({
          url: app.globalData.https + "/x/handler/handler.ashx",
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'a': 'Add_Project_headpic_DB',
            'project_id': that.data.xm_id,
          },
          success: function (uploadRes) {
            console.log("上传图片ffff" + uploadRes.data)
            var data = JSON.stringify(uploadRes.data);
            console.log(data)
            that.loadPic();
          },
          fail: function (res) {
            console.log("上传图片失败" + JSON.stringify(res))
          }
        })
      }
    })
  },
})