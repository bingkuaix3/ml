// WisdomInDetails.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    urlPath: app.globalData.https + "/images/",
    //项目id
    projectId: '',
    //项目负责人
    projectUser:'',
    //智合信息列表
    list: [],
    //页码
    pageIndex: 1,
    //页容量
    pageSize: 10,
    //发布按钮是否隐藏
    isHidden:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //接收传参
    this.setData({
      projectId: options.project_id
    })
    if(app.globalData.huiyuanInfo.userid == options.project_user)
      this.setData({
        isHidden:false
      })
    else
      this.setData({
        isHidden: true
      })
    this.setData({
      pageIndex: 1
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
    //加载列表
    this.loadList('up')
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
      pageIndex: 1
    })
    this.loadList('up')
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this
    this.setData({
      pageIndex: that.data.pageIndex+1
    })
    this.loadList('down')
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //进入发布新需求
  goToPublish: function () {
    var that = this
    wx.navigateTo({
      url: '../../../pages/project/wisdomjoinPublish/wisdomjoinPublish?project_id=' + that.data.projectId,
    })
  },
  //加载列表
  loadList: function (type) {
    var that = this;
    wx.showLoading({
      title: '加载中',
      mask: true,
      success: function () {
        //请求数据
        wx.request({
          url: app.globalData.https + '/x/operate/zhihe.ashx',
          data: {
            method: "Get_ZhiHeList",
            project_id: that.data.projectId,
            pageindex: that.data.pageIndex,
            pagesize: that.data.pageSize
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            wx.hideLoading()
            console.log("获取智合列表信息：" + JSON.stringify(res.data))
            if (type == "up") {
              if (res.data.zhihe_list.length > 0) {
                that.setData({
                  list:that.decode(res.data.zhihe_list)
                })
              }
              else {
                that.setData({
                  pageIndex: that.data.pageIndex - 1
                })
              }
              wx.stopPullDownRefresh();
            } else if (type == "down") {
              if (res.data.zhihe_list.length > 0) {
                that.setData({
                  list: that.data.list.concat(res.data.zhihe_list)
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
            wx.showToast({
              title: '数据加载失败',
              duration:1500
            })
          }
        })
      }
    })
  },
  //进入回复详情
  goToDetails:function(e){
    wx.navigateTo({
      url: '../../../pages/project/wisdomjoinDetails/wisdomjoinDetails?project_id='+e.currentTarget.dataset.id+"&project_user="+e.currentTarget.dataset.memid
    })
  },
  decode:function(list){
    var box = []
    var temp;
    for(let i=0;i<list.length;i++){
      temp = list[i]
      temp.question = decodeURI(list[i].question)
      box.push(temp)
    }
    console.log(box)
    return box;
  }
})