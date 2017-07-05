// pages/guanchatuan/guanchatuan.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    urlPath: app.globalData.https + "/images/",
    memid: '',
    pagesize: 5,
    pageindex: 1,
    //上拉刷新是否显示
    topHidden: 'none',
    //下拉加载是否显示
    bottomHidden: 'none',
    list: [],
    listt: [],
    score: 0,
    display: "none",
    focus: false,
    input: '',
    placeholder: "",
    value: '',
    tuantype: '',
    textarea: '',
    pic: [],
    vedio: "",
    userId:'',
    isSame:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this
    console.log(that.data.pic.length)
    that.setData({
      userId: app.globalData.huiyuanInfo.userid,
      memid:options.user_id
    })
    // console.log(app.globalData.huiyuanInfo)
    // console.log(app.globalData.huiyuanInfo.userid)
    if(that.data.memid == that.data.userId){
      that.setData({
        isSame:true
      })
    }else{
       that.setData({
        isSame:false
      })
    }
    wx.showLoading({
      title: '加载中',
      mask: true,
      success: function () {
        that.title()
        that.init('up')
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
      pageindex: 1
    })
    this.init('up')
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this
    this.setData({
      pageindex: that.data.pageindex + 1
    })
    this.init('down')
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 数据初始化方法
   */
  init: function (type) {
    var that = this
    var temp = []
    wx.request({
      url: app.globalData.https + '/x/Operate/Home.ashx',
      data: ({
        method: "Get_MemDongtai",
        userid: that.data.memid,
        pagesize: that.data.pagesize,
        page: that.data.pageindex,

      }),
      success: function (res) {
        wx.hideLoading()
        var data = JSON.stringify(res.data);
        var list = JSON.parse(data)
        console.log("个人主页列表=" + data)


        if (type == "up") {
          if (list.length > 0) {
            that.setData({
              list: list
            })
            var item = list
            for (var i = 0; i < item.length; i++) {
              temp[i] = item[i]
            }
            //  console.log(that.data.list)
          }

          wx.stopPullDownRefresh();
        } else if (type == "down") {
          if (list.length > 0) {
            that.setData({
              list: that.data.list.concat(list)
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
      fail: function () {
        setTimeout(function () {
          wx.hideLoading()
        }, 2000)
      }
    })

  },

  /**
   * 加载头部信息
   */
  title: function () {
    var that = this
    var temp = []
    wx.request({
      url: app.globalData.https + '/x/Operate/Home.ashx',
      data: ({
        method: "Get_MemHome",
        userid: that.data.memid,
        formid: that.data.memid
      }),
      success: function (res) {
        wx.hideLoading()
        var data = JSON.stringify(res.data);
        var list = JSON.parse(data)
        console.log("个人主页信息=" + data)
        that.setData({
          listt: list.list
        })
      },
      fail: function () {
        setTimeout(function () {
          wx.hideLoading()
        }, 2000)
      }
    })

  },

  /**
   * 点赞
   */
  dianzan: function (e) {
    var that = this
    // console.log("tpye=" + e.currentTarget.dataset.type)
    // console.log("id="+e.currentTarget.dataset.id)
    var type = e.currentTarget.dataset.type
    var id = e.currentTarget.dataset.id
    var index = e.currentTarget.dataset.index
    var temp = []
    if (type == 0) {
      type = 1
    } else {
      type = 2
    }
    wx.request({
      url: app.globalData.https + '/x/Operate/Home.ashx',
      data: ({
        method: "Add_Dianzan",
        id: id,
        userid: that.data.memid
      }),
      success: function (res) {
        if (res.data == 1) {
          // wx.showToast({
          //   title: '操作成功',
          //   icon: 'success',
          //   duration: 2000
          // })
          for (var i = 0; i < that.data.list.length; i++) {
            temp[i] = that.data.list[i]
          }
          if (type == 1) {
            temp[index].isdianzan = 1
          } else {
            temp[index].isdianzan = 0
          }
          that.setData({
            list: temp,
          })

        } else {
          wx.showToast({
            title: '操作失败',
            icon: 'loading',
            duration: 2000
          })
        }
      }
    })
  },

  /**
   * 点击评论/回复
   */
  pinglun: function (e) {
    var that = this
    console.log("memid=" + that.data.memid)
    that.setData({
      display: "block",
      focus: true,
      id: e.currentTarget.dataset.id,
      index: e.currentTarget.dataset.number,
      to_memid: e.currentTarget.dataset.toid,
      memid: that.data.memid,
      memname: app.globalData.huiyuanInfo.xingming,
      tomemname: e.currentTarget.dataset.toname,
      value: ""
    })
    console.log("--------------" + e.currentTarget.dataset.type)
    console.log("memid=" + that.data.memid)
    console.log("to_memid=" + that.data.to_memid)
    console.log("memname=" + that.data.memname)
    console.log("tomemname=" + that.data.tomemname)


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
 * 提交评论内容
 */
  tianjia: function (e) {
    var that = this
    var temp = []
    var index = that.data.index
    if (that.data.input.length != 0) {

      console.log(that.data.id)
      console.log(that.data.memid)
      console.log(that.data.to_memid)
      console.log(that.data.input)
      wx.request({
        url: app.globalData.https + '/x/Operate/Home.ashx',
        data: ({
          method: "Add_Comments",
          id: that.data.id,
          memid: that.data.memid,
          p_memid: that.data.to_memid,
          descs: that.data.input
        }),
        success: function (res) {
          var data = JSON.stringify(res.data);
          var list = JSON.parse(data)
          if (data == 1) {
            // wx.showToast({
            //   title: '操作成功',
            //   icon: 'success',
            //   duration: 2000
            // })
            for (var i = 0; i < that.data.list.length; i++) {
              temp[i] = that.data.list[i]
            }
            temp[index].commentlist = temp[index].commentlist.concat([{
              "memid": that.data.memid,
              "to_memid": that.data.to_memid,
              "descs": that.data.input,
              "memname": that.data.memname,
              "to_memname": that.data.tomemname
            }])
            if (temp[index].commentlist.length > 2) {
              temp[index].flag = 1
            }
            that.setData({
              list: temp,
            })
            console.log("---------list=" + that.data.list)

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
        }
      })
    } else {
      that.setData({
        hold: true
      })
    }
  },

  /**
  * 监听input
  */
  input: function (e) {
    var that = this
    this.setData({
      input: e.detail.value
    })
    console.log(that.data.input)
  },
  /**
* 监听textarea
*/
  textarea: function (e) {
    var that = this
    this.setData({
      textarea: e.detail.value
    })
    console.log(that.data.textarea)
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
 * 展开/收起评论
 */
  click: function (e) {
    var that = this
    var index = e.currentTarget.dataset.number
    var type = e.currentTarget.dataset.zhankai
    var temp = []
    for (var i = 0; i < that.data.list.length; i++) {
      temp[i] = that.data.list[i]
    }
    if (type == 0) {
      temp[index].a = 1
    } else {
      temp[index].a = 0
    }
    that.setData({
      list: temp,
    })
    console.log("展开")
    console.log(type)
  },

  /**
 * 预览图片
 */
  pro: function (e) {
    if (e.currentTarget.dataset.src != "") {
      wx.previewImage({
        current: e.currentTarget.dataset.src, // 当前显示图片的http链接
        urls: [e.currentTarget.dataset.src] // 需要预览的图片http链接列表
      })
    }

  },
  /**
* 发布
*/
  fabu: function (e) {
    var that = this
    var temp = []
    console.log("发布")
    var text = that.data.textarea

    if (that.data.textarea != '') {
      wx.showLoading({
        title: '加载中',
        mask: true,
        success: function () {
          wx.request({
            url: app.globalData.https + '/x/Operate/Home.ashx',
            data: ({
              method: "Add_Pengyouquan",
              userid: that.data.memid,
              neirong: that.data.textarea
            }),
            success: function (res) {
              console.log("id获取成功=" + res.data)
              wx.hideLoading()
              that.setData({
                textarea: ""
              })
              temp = that.data.list
              temp.splice(0, 0, {
                "id": res.data,
                "a": "0",
                "wenzi": text,
                "tupan1": "",
                "tupan2": "",
                "tupan3": "",
                "vedio": "",
                "userid": that.data.memid,
                "shenfen": "",
                "city": "",
                "headpic": app.globalData.huiyuanInfo.headpic,
                "name": app.globalData.huiyuanInfo.xingming,
                "zan": "0",
                "isdianzan": "0",
                "flag": "0",
                "commentlist": [],
                "riqi": new Date().format("MM-dd hh:mm:ss")
              })
              that.setData({
                list: temp
              })
              console.log("数据=" + JSON.stringify(that.data.list))
              if (that.data.vedio != "") {
                wx.uploadFile({
                  url: app.globalData.https + "/x/Operate/Home.ashx",
                  filePath: that.data.vedio,
                  name: 'file',
                  formData: {
                    method: "Add_Pengyouquan_Vedio",
                    id: res.data
                  },
                  success: function (resUpload) {
                    if (resUpload.data == "yes") {
                      temp = that.data.list
                      temp.splice(0, 1, {
                        "id": res.data,
                        "a": "0",
                        "wenzi": text,
                        "tupan1": "",
                        "tupan2": "",
                        "tupan3": "",
                        "vedio": that.data.vedio,
                        "userid": that.data.memid,
                        "shenfen": "",
                        "city": "",
                        "headpic": app.globalData.huiyuanInfo.headpic,
                        "name": app.globalData.huiyuanInfo.xingming,
                        "zan": "0",
                        "isdianzan": "0",
                        "flag": "0",
                        "commentlist": [],
                        "riqi": new Date().format("MM-dd hh:mm:ss")
                      })
                      that.setData({
                        list: temp
                      })
                      console.log("数据=" + JSON.stringify(that.data.list))
                      console.log("视频上传成功=")
                      if (that.data.pic.length != 0) {
                        for (var i = 0; i < that.data.pic.length; i++) {
                          wx.uploadFile({
                            url: app.globalData.https + "/x/Operate/Home.ashx",
                            filePath: that.data.pic[i],
                            name: 'file',
                            formData: {
                              method: "Add_Pengyouquan_Pic",
                              id: res.data,
                              index: i + 1
                            },
                            success: function (resUpload1) {
                              if (resUpload1.data != "") {
                                // wx.showToast({
                                //   title: '成功',
                                //   icon: 'loading',
                                //   duration: 2000
                                // })
                                if (resUpload1.data == 1) {
                                  temp = that.data.list
                                  console.log("temp[0].tupan1=" + temp[0].tupan1)
                                  temp[0].tupan1 = that.data.pic[0]
                                  console.log("temp[0].tupan1=" + temp[0].tupan1)
                                  that.setData({
                                    list: temp
                                  })
                                  console.log("数据=" + JSON.stringify(that.data.list))
                                } else if (resUpload1.data == 2) {
                                  temp = that.data.list
                                  console.log("temp[0].tupan2=" + temp[0].tupan2)
                                  temp[0].tupan2 = that.data.pic[1]
                                  console.log("temp[0].tupan2=" + temp[0].tupan2)
                                  that.setData({
                                    list: temp
                                  })
                                  console.log("数据=" + JSON.stringify(that.data.list))
                                } else if (resUpload1.data == 3) {
                                  temp = that.data.list
                                  console.log("temp[0].tupan3=" + temp[0].tupan3)
                                  temp[0].tupan3 = that.data.pic[2]
                                  console.log("temp[0].tupan3=" + temp[0].tupan3)
                                  that.setData({
                                    list: temp
                                  })
                                  console.log("数据=" + JSON.stringify(that.data.list))

                                } else {
                                  wx.showToast({
                                    title: '图片上传失败',
                                    icon: 'loading',
                                    duration: 2000
                                  })
                                }
                              }
                            }
                          })
                        }

                      }
                    } else {
                      console.log("视频上传失败=")
                    }
                  }
                })
              } else {
                console.log("没有视频=")
                if (that.data.pic.length != 0) {
                  for (var i = 0; i < that.data.pic.length; i++) {

                    wx.uploadFile({
                      url: app.globalData.https + "/x/Operate/Home.ashx",
                      filePath: that.data.pic[i],
                      name: 'file',
                      formData: {
                        method: "Add_Pengyouquan_Pic",
                        id: res.data,
                        index: i + 1
                      },
                      success: function (resUpload1) {
                        if (resUpload1.data != "") {
                          console.log("i=" + i)
                          console.log("图片传成功=")
                          // wx.showToast({
                          //   title: '成功',
                          //   icon: 'loading',
                          //   duration: 2000
                          // })
                          if (resUpload1.data == 1) {
                            temp = that.data.list
                            console.log("temp[0].tupan1=" + temp[0].tupan1)
                            temp[0].tupan1 = that.data.pic[0]
                            console.log("temp[0].tupan1=" + temp[0].tupan1)
                            that.setData({
                              list: temp
                            })
                            console.log("数据=" + JSON.stringify(that.data.list))
                          } else if (resUpload1.data == 2) {
                            temp = that.data.list
                            console.log("temp[0].tupan2=" + temp[0].tupan2)
                            temp[0].tupan2 = that.data.pic[1]
                            console.log("temp[0].tupan2=" + temp[0].tupan2)
                            that.setData({
                              list: temp
                            })
                            console.log("数据=" + JSON.stringify(that.data.list))
                          } else if (resUpload1.data == 3) {
                            temp = that.data.list
                            console.log("temp[0].tupan3=" + temp[0].tupan3)
                            temp[0].tupan3 = that.data.pic[2]
                            console.log("temp[0].tupan3=" + temp[0].tupan3)
                            that.setData({
                              list: temp
                            })
                            console.log("数据=" + JSON.stringify(that.data.list))
                          }


                        } else {
                          wx.showToast({
                            title: '图片上传失败',
                            icon: 'loading',
                            duration: 2000
                          })
                        }
                      }
                    })
                  }

                } else {
                  console.log("没有图片=")
                }
              }


            },
            fail: function () {
              wx.showToast({
                title: '发布失败',
                icon: 'loading',
                duration: 2000
              })
            }
          })
        }
      })

    } else {
      wx.showToast({
        title: '请输入内容',
        icon: 'loading',
        duration: 2000
      })
    }
  },
  /**
* 视频
*/
  shipin: function () {
    console.log("视频")
    var that = this
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: 'back',
      success: function (res) {
        that.setData({
          vedio: res.tempFilePath
        })
      }
    })
  },
  /**
* 图片
*/
  tupian: function () {
    console.log("图片")
    var that = this
    wx.chooseImage({
      count: 3,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        that.setData({
          pic: tempFilePaths
        })
        console.log(that.data.pic.length)
      }

    })
  },
  /**
* 删除图片
*/
  delete: function (e) {
    var that = this
    console.log(e.currentTarget.dataset.index)
    if (e.currentTarget.dataset.index == 3) {
      that.setData({
        vedio: ""
      })
    } else {
      var temp = []
      temp = that.data.pic
      temp.splice(e.currentTarget.dataset.index, 1)
      that.setData({
        pic: temp
      })
    }

  },
  goToFollow:function(){
    wx.navigateTo({
      url: '../../../pages/user/follow/follow',
    })
  }
})
Date.prototype.format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1,                 //月份 
    "d+": this.getDate(),                    //日 
    "h+": this.getHours(),                   //小时 
    "m+": this.getMinutes(),                 //分 
    "s+": this.getSeconds(),                 //秒 
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
    "S": this.getMilliseconds()             //毫秒 
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
}   