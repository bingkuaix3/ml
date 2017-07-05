// zhiweisqrlist.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    urlPath: app.globalData.https + "/images/",
    //职位id
    zhiweiId: '',
    //职位名称
    zhiweiName: '',
    //申请人列表
    sqrList: [],
    //页码
    pageIndex: 1,
    //页容量
    pageSize: 10,
    //是否批量拒绝
    isPiliang: false,
    //批量拒绝显示文本
    plText: '批量拒绝',
    initValue: false,
    plBox: [],
    isQudao: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      zhiweiId: options.job_id,
    })
    this.setData({
      pageIndex: 1
    })
    //加载列表
    this.loadSqrList('up')
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
      pageIndex: 1
    })
    this.loadSqrList('up')
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this
    this.setData({
      pageIndex: that.data.pageIndex + 1
    })
    this.loadSqrList('down')
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //删除职位
  deleteZhiwei: function () {
    var that = this
    console.log("职位ID" + that.data.zhiweiId)
    wx.showModal({
      title: '提示',
      content: '您确定要删除该职位吗',
      success: function (res) {
        if (res.confirm) {
          wx.showLoading({
            title: '处理中',
            mask: true,
            success: function () {
              //请求数据
              wx.request({
                url: app.globalData.https + '/x/operate/renhe.ashx',
                data: {
                  method: "Del_Renhe",
                  id: that.data.zhiweiId
                },
                header: {
                  'content-type': 'application/json'
                },
                success: function (res) {
                  wx.hideLoading()
                  console.log(res)
                  if (res.data == 1) {
                    wx.showToast({
                      title: '删除职位成功',
                      duration: 1500
                    })
                    wx.navigateBack()
                  }
                  else {
                    wx.showToast({
                      title: '删除职位失败',
                      duration: 1500
                    })
                  }
                },
                fail: function (res) {
                  wx.showToast({
                    title: '数据请求失败',
                    duration: 1500
                  })
                }
              })
            }
          })
        } else if (res.cancel) {

        }
      }
    })

  },
  //加载申请人列表
  loadSqrList: function (type) {
    var that = this;
    wx.showLoading({
      title: '加载中',
      mask: true,
      success: function () {
        //请求数据
        wx.request({
          url: app.globalData.https + '/x/operate/renhe.ashx',
          data: {
            method: "Get_ShenheList",
            job_id: that.data.zhiweiId,
            pageindex: that.data.pageIndex,
            pagesize: that.data.pageSize
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            wx.hideLoading()
            console.log("获取申请人列表信息：" + JSON.stringify(res.data))
            if (type == "up") {
              that.setData({
                zhiweiName: res.data.data[0].name[0].name
              })
              if (that.data.zhiweiName == "线下" || that.data.zhiweiName == "线上") {
                that.setData({
                  isQudao: true
                })
              }
              else {
                that.setData({
                  isQudao: false
                })
              }
              console.log(that.data.isQudao)
              if (res.data.data[1].info.length > 0) {
                that.setData({
                  sqrList: res.data.data[1].info
                })
              }
              else {
                that.setData({
                  pageIndex: that.data.pageIndex - 1
                })
              }
              wx.stopPullDownRefresh();
            } else if (type == "down") {
              if (res.data.data[1].info.length > 0) {
                that.setData({
                  sqrList: that.data.sqrList.concat(res.data.data[1].info)
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
              duration: 1500
            })
          }
        })
      }
    })
  },
  //批量是否选择
  isSelected: function (e) {
    var that = this
    var box = that.data.plBox
    if (e.detail.value.length > 0) {

      box.push(e.currentTarget.dataset.no)
      that.setData({
        plBox: box
      })
    }
    else {
      for (let i = 0; i < box.length; i++) {
        if (box[i] == e.currentTarget.dataset.no) {
          box.splice(i, 1)
        }
      }
    }
    console.log(that.data.plBox)
  },
  //点击批量拒绝
  selectPlRefuse: function () {
    var that = this
    if (that.data.isPiliang == false) {
      that.setData({
        plBox: [],
        initValue: false
      })
      that.setData({
        isPiliang: true,
        plText: "全部拒绝"
      })
    } else {

      var ids = "";
      var box = that.data.plBox
      if (box.length == 0) {
        wx.showToast({
          title: '请先选择要拒绝的申请人',
          duration: 1500
        })
        return;
      }
      for (let i = 0; i < box.length; i++) {
        if (ids == "") {
          ids = box[i]
        } else {
          ids += "," + box[i]
        }
      }
      console.log(ids)
      wx.showModal({
        title: '提示',
        content: '您确定要批量拒绝选中的申请人吗',
        success: function (res) {
          if (res.confirm) {
            wx.showLoading({
              title: '处理中',
              mask: true,
              success: function () {
                //请求数据
                wx.request({
                  url: app.globalData.https + '/x/operate/renhe.ashx',
                  data: {
                    method: "Refuse_Renhe",
                    str: ids
                  },
                  header: {
                    'content-type': 'application/json'
                  },
                  success: function (res) {
                    wx.hideLoading()
                    console.log(res)
                    if (res.data == 1) {
                      wx.showToast({
                        title: '拒绝成功',
                        duration: 1500
                      })
                      var box1 = that.data.sqrList;
                      for (let i = 0; i < box1.length; i++) {
                        for (let j = 0; j < box.length; j++) {
                          if (box1[i].ID == box[j])
                            box1.splice(i, 1)
                        }
                      }
                      that.setData({
                        sqrList: box1,
                        initValue: false
                      })
                    }
                    else {
                      wx.showToast({
                        title: '拒绝失败',
                        duration: 1500
                      })
                    }
                  },
                  fail: function (res) {
                    wx.showToast({
                      title: '数据请求失败',
                      duration: 1500
                    })
                  }
                })
              }
            })
          } else if (res.cancel) {

          }
        }
      })
    }
  },
  closePiliang: function () {
    this.setData({
      isPiliang: false,
      plText: "批量拒绝"
    })
  },
  //接收申请人
  accept: function (e) {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '你确定要接受该申请人吗',
      success: function (res) {
        if (res.confirm) {
          wx.showLoading({
            title: '处理中',
            mask: true,
            success: function () {
              //请求数据
              wx.request({
                url: app.globalData.https + '/x/operate/renhe.ashx',
                data: {
                  method: "Edit_Renhe_Mem",
                  id: e.currentTarget.dataset.id,
                  type: 2
                },
                header: {
                  'content-type': 'application/json'
                },
                success: function (res) {
                  wx.hideLoading()
                  console.log(res)
                  if (res.data == 1) {
                    wx.showToast({
                      title: '接受成功',
                      duration: 1500
                    })
                    wx.navigateBack()
                  }
                  else {
                    wx.showToast({
                      title: '接受失败',
                      duration: 1500
                    })
                  }
                },
                fail: function (res) {
                  wx.showToast({
                    title: '数据请求失败',
                    duration: 1500
                  })
                }
              })
            }
          })
        } else if (res.cancel) {

        }
      }
    })
  },
  //拒绝申请人
  refuse: function (e) {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '您确定要拒绝该申请人吗',
      success: function (res) {
        if (res.confirm) {
          wx.showLoading({
            title: '处理中',
            mask: true,
            success: function () {
              //请求数据
              wx.request({
                url: app.globalData.https + '/x/operate/renhe.ashx',
                data: {
                  method: "Edit_Renhe_Mem",
                  id: e.currentTarget.dataset.id,
                  type: 3
                },
                header: {
                  'content-type': 'application/json'
                },
                success: function (res) {
                  wx.hideLoading()
                  console.log(res)
                  if (res.data == 1) {
                    wx.showToast({
                      title: '拒绝成功',
                      duration: 1500
                    })
                    var box = that.data.sqrList;
                    for (let i = 0; i < box.length; i++) {
                      if (e.currentTarget.dataset.id == box[i].ID) {
                        box.splice(i, 1)
                      }
                    }
                    that.setData({
                      sqrList: box
                    })
                  }
                  else {
                    wx.showToast({
                      title: '拒绝失败',
                      duration: 1500
                    })
                  }
                },
                fail: function (res) {
                  wx.showToast({
                    title: '数据请求失败',
                    duration: 1500
                  })
                }
              })
            }
          })
        } else if (res.cancel) {

        }
      }
    })
  },
  goToDetail:function(e){
    var that = this
    wx.navigateTo({
      url: '../../pages/user/home/home?user_id=' + e.currentTarget.datast.userId
    })
  }
})