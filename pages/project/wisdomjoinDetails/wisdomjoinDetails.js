// pages/zhihe/zhihe.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    urlPath: app.globalData.https + "/images/",
    memid: "",
    question_id: "",
    zhtitle: "",
    zhcontent: "",
    shenfen: "",
    list: [],
    //上拉刷新是否显示
    topHidden: 'none',
    //下拉加载是否显示
    bottomHidden: 'none',
    //页码
    pageIndex: 1,
    //页容量
    pageSize: 5,
    temp: "",
    placeholder: "",
    focus: false,
    display: "none",
    input: "",
    to_memid: 0,
    id: 0,
    index: 0,
    value: "",
    hold: false,
    holdf: false,
    sfhide: false,
    fjdispaly: "block",
    fabudis: "none",
    fabuinput: '',
    focusf: false,
    memidt: '',
    nums: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      memid: app.globalData.huiyuanInfo.userid,
      question_id: options.project_id,
      projectUser:options.project_user
    })
    if(that.data.projectUser == that.data.memid){
      that.setData({
        shenfen: "1"
      })
    }
    else{
      that.setData({
        shenfen: "0"
      })
    }
    if (that.data.shenfen == 0) {
      that.setData({
        sfhide: true
      })
    }
    wx.showLoading({
      title: "加载中",
      mask: true,
      success: function () {
        that.init("up")
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
    this.setData({
      pageIndex: 1
    })
    this.init('up')
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this
    this.setData({
      pageIndex: that.data.pageIndex + 1
    })
    this.init('down')
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
  * 页面数据初始化
  */
  init: function (type) {
    var that = this;
    var temp = []
    wx.request({
      url: app.globalData.https + '/x/operate/zhihe.ashx',
      data: ({
        method: "Get_ZhiHeDetail",
        question_id: that.data.question_id,
        pagesize: that.data.pageSize,
        pageindex: that.data.pageIndex,
        memid: that.data.memid,
      }),
      success: function (res) {
          wx.hideLoading()
        var data = JSON.stringify(res.data);
        var list = JSON.parse(data)
        console.log("智合详情=" + data)
        // console.log(list.data[0].question_info[0].title)
        that.setData({
          zhtitle: list.data[0].question_info[0].title,
          zhcontent: decodeURI(list.data[0].question_info[0].question),
        })
        if (type == "up") {
          if (list.data[1].Comment_list.length > 0) {
            that.setData({
              list: list.data[1].Comment_list
            })
            var item = list.data[1].Comment_list
            for (var i = 0; i < item.length; i++) {
              temp[i] = item[i]
            }
            //  console.log(that.data.list)
          }

          wx.stopPullDownRefresh();
        } else if (type == "down") {
          if (list.data[1].Comment_list.length > 0) {
            that.setData({
              list: that.data.list.concat(list.data[1].Comment_list)
            })
            console.log(that.data.list)
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
          title: '数据加载失败'
        })
      }
    })
  },
  /**
    * 是否显示
    */
  xianshi: function (e) {
    var that = this
    var id = e.currentTarget.dataset.id
    var type = e.currentTarget.dataset.xianshi
    var index = e.currentTarget.dataset.number
    var temp = []
    if (type == 0) {
      type = 1
    } else {
      type = 0
    }
    console.log("tpye=" + type)
    wx.request({
      url: app.globalData.https + '/x/operate/zhihe.ashx',
      data: ({
        method: "Edit_ZhiHeShow",
        answer_id: id,
        type: type
      }),
      success: function (res) {
        var data = JSON.stringify(res.data);
        console.log("data=" + data)
        if (data == "1") {
          wx.showToast({
            title: '修改成功',
            icon: 'success',
            duration: 2000
          })

          for (var i = 0; i < that.data.list.length; i++) {
            temp[i] = that.data.list[i]
          }
          for (var i = 0; i < that.data.list.length; i++) {
            if (i == index) {
              temp[i].state = type
            }
          }
          console.log("list=" + that.data.list)
          console.log("temp=" + temp)
          that.setData({
            list: temp
          })
        }
        else if (data == "0") {
          wx.showToast({
            title: '修改失败',
            icon: 'success',
            duration: 2000
          })
        }
      }
    })
    that.setData({

    })
  },
  /**
  * 是否点赞
  */
  dianzan: function (e) {
    var that = this
    var id = e.currentTarget.dataset.id
    var dianzan = e.currentTarget.dataset.dianzan
    var index = e.currentTarget.dataset.number
    var temp = []
    var dz = 0
    //var memid = e.currentTarget.dataset.dianzan
    console.log("dianzan=" + dianzan)
    var memid = that.data.memid

    if (dianzan == 0) {
      dz = 1
      dianzan = 1
      console.log("点赞" + dz)
    } else {
      dz = 0
      dianzan = 2
      console.log("取消点赞" + dz)

    }
    console.log(memid)
    wx.request({
      url: app.globalData.https + '/x/operate/zhihe.ashx',
      data: ({
        method: "Add_ZhiHeDianzan",
        answer_id: id,
        memid: memid,
        type: dianzan
      }),
      success: function (res) {
        var data = JSON.stringify(res.data);
        var list = JSON.parse(data)
        console.log("dianzanfanhui=" + data)
        if (data == "1") {
          for (var i = 0; i < that.data.list.length; i++) {
            temp[i] = that.data.list[i]
          }
          for (var i = 0; i < that.data.list.length; i++) {
            if (i == index) {
              temp[i].isdianzan = dz
              //  console.log("index="+index)
              // console.log("temp[i].isdianzan=" + temp[i].isdianzan)
            }
          }
          console.log("list=" + JSON.stringify(that.data.list))
          console.log("temp=" + JSON.stringify(temp))
          that.setData({
            list: temp
          })

        }
        else if (data == "0") {

        }
      }
    })

    that.setData({

    })
  },
  /**
  * 附件预览
  */
  yulan: function (e) {
    var that = this
    var id = e.currentTarget.dataset.id
    wx.request({
      url: app.globalData.https + '/x/operate/zhihe.ashx',
      data: ({
        method: "Get_AnswerPic",
        answer_id: id,
      }),
      success: function (res) {
        var data = JSON.stringify(res.data);
        var list = JSON.parse(data)
        console.log("附件=" + data)
        console.log("图片=" + list.info)
        var pre = []
        if (data == '""') {
          wx.showToast({
            title: '没有附件',
            icon: 'loading',
            duration: 2000
          })
        } else {
          for (var i = 0; i < list.info.length; i++) {
            pre[i] = list.info[i].pic
            console.log(pre[i])
          }
          wx.showToast({
            title: '加载中请等待',
            icon: 'loading',
            duration: 2000
          })
        }
        console.log("pre=" + pre)
        wx.previewImage({
          urls: pre // 需要预览的图片http链接列表
        })
      }
    })
  },
  /**
  * 展开评论
  */
  zhankai: function (e) {
    var that = this
    var type = e.currentTarget.dataset.zhankai
    var index = e.currentTarget.dataset.number
    var memid = e.currentTarget.dataset.memid
    var id = e.currentTarget.dataset.id
    var temp = []
    if (type == 0) {
      type = 1
    } else {
      type = 0
    }

    that.setData({
      memidt: memid
    })
    console.log("memid=" + memid)
    console.log("memidt=" + that.data.memidt)
    wx.request({
      url: app.globalData.https + '/x/operate/zhihe.ashx',
      data: ({
        method: "Get_Comments",
        answer_id: id,
      }),
      success: function (res) {
        var data = JSON.stringify(res.data);
        var list = JSON.parse(data)
        console.log("评论DATA=" + data)
        for (var i = 0; i < that.data.list.length; i++) {
          temp[i] = that.data.list[i]
        }
        for (var i = 0; i < that.data.list.length; i++) {
          if (i == index) {
            temp[i].a = type
            temp[i].b = list.info
          }
        }
        that.setData({
          list: temp
        })
      }
    })
  },
  /**
 * 点击评论/回复
 */
  pinglun: function (e) {
    var that = this
    console.log("memidt=" + that.data.memidt)
    that.setData({
      display: "block",
      focus: true,
      id: e.currentTarget.dataset.id,
      index: e.currentTarget.dataset.number,
      to_memid: e.currentTarget.dataset.toid,
      memidt: e.currentTarget.dataset.memid,
    })
    console.log("--------------" + e.currentTarget.dataset.type)
    console.log("memid=" + that.data.memid)
    console.log("memidt=" + that.data.memidt)

    if (e.currentTarget.dataset.type == "pinglun") {
      that.setData({
        placeholder: "评论",
      })
    } else {
      that.setData({
        placeholder: "回复" + e.currentTarget.dataset.toname,
      })
    }
  },

  /**
 * 添加评论
 */
  tianjia: function (e) {
    var that = this
    if (that.data.input.length != 0) {

      console.log(that.data.id)
      console.log(that.data.memid)
      console.log(that.data.to_memid)
      console.log(that.data.input)
      wx.request({
        url: app.globalData.https + '/x/operate/zhihe.ashx',
        data: ({
          method: "Add_ZhiheComment",
          answer_id: that.data.id,
          memid: app.globalData.huiyuanInfo.userid,
          to_memid: that.data.to_memid,
          descs: that.data.input
        }),
        success: function (res) {
          var data = JSON.stringify(res.data);
          var list = JSON.parse(data)
          if (data == 1) {
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
          that.setData({
            display: "none",
            focus: false,
            input: "",
            hold: false
          })
          var index = that.data.index
          var temp = []
          wx.request({
            url: app.globalData.https + '/x/operate/zhihe.ashx',
            data: ({
              method: "Get_Comments",
              answer_id: that.data.id,
            }),
            success: function (res) {
              var data = JSON.stringify(res.data);
              var list = JSON.parse(data)
              console.log("评论DATA=" + data)
              for (var i = 0; i < that.data.list.length; i++) {
                temp[i] = that.data.list[i]
              }
              for (var i = 0; i < that.data.list.length; i++) {
                if (i == index) {
                  temp[i].b = list.info
                  temp[i].nums = 1
                }
              }
              that.setData({
                list: temp,
                value: ""
              })

            }
          })

        }
      })
    } else {
      that.setData({
        hold: true
      })
    }


  },

  /**
 * 失焦收起键盘
 */
  shouqi: function () {
    var that = this
    console.log("视角")
    if (that.data.input.length != 0) {
      that.setData({
        display: "none",
      })
    }
    that.setData({
      display: "none",
      focus: false,
    })
  },

  /**
 * 监听input
 */
  input: function (e) {
    this.setData({
      input: e.detail.value
    })
  },

  /**
 * 上传附件
 * 
 * 
 */
  upload: function () {
    var that = this
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        console.log("选择图片" + JSON.stringify(res))
        for (var i = 0; i < tempFilePaths.length; i++) {
          wx.uploadFile({
            url: app.globalData.https + '/x/operate/zhihe.ashx',
            filePath: tempFilePaths[i],
            name: 'file',
            formData: {
              'method': 'Add_Zhihepic',
              'answer_id': that.data.id
            },
            success: function (uploadRes) {
              console.log("上传图片" + uploadRes.data)
              var data = JSON.stringify(uploadRes.data);
              var img = JSON.parse(data)
              that.setData({
                display: "none",
              })
              var temp = []
              var index = that.data.index
              for (var i = 0; i < that.data.list.length; i++) {
                temp[i] = that.data.list[i]
              }
              for (var i = 0; i < that.data.list.length; i++) {
                if (i == index) {
                  temp[i].counts = 1
                }
              }
              that.setData({
                list: temp
              })
              console.log("id=" + index)
              console.log("list=" + that.data.list)
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
                  title: '图片为空',
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

      }
    })
  },
  /**
  * 发布
  */
  fabu: function () {
    var that = this
    that.setData({
      fabudis: "block",
      focusf: true
    })
  },
  fabuinput: function (e) {
    var that = this
    this.setData({
      fabuinput: e.detail.value
    })
    console.log(that.data.fabuinput)
  },
  /**
   * 失焦收起键盘
   */
  shouqif: function () {
    var that = this
    console.log("视角")
    that.setData({
      fabudis: "none",
      focusf: false,
    })
  },
  /**
 * 发送
 */
  tianjiaf: function () {
    console.log("fasong")
    var that = this
    if (that.data.fabuinput.length != 0) {
      wx.request({
        url: app.globalData.https + '/x/operate/zhihe.ashx',
        data: ({
          method: "Add_ZhiheAnswer",
          question_id: that.data.question_id,
          memid: that.data.memid,
          imgurl: "",
          descs: that.data.fabuinput
        }),
        success: function (res) {
          console.log("结果=" + res.data)
          if (res.data == 1) {
            wx.showToast({
              title: '发布成功',
              icon: 'success',
              duration: 2000
            })
            that.init("up")
          } else {
            wx.showToast({
              title: '发布失败',
              icon: 'loading',
              duration: 2000
            })
          }
        }
      })
    } else {
      that.setData({
        holdf: true
      })
    }
  }
})