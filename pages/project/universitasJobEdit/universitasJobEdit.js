// editorship.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    urlPath: app.globalData.https + "/images/",
    jobId: "",
    name: "",
    descs: "",
    IsWhole: "",
    IsSocial: "",
    IsFocus: "",
    IsOther: "",
    IsMoney: "",
    IsStock: "",
    IsOriginal: "",
    IsOption: "",
    bianji: false,
    zhiwei: 0,
    yaoqiu: 0,
    hehuo: 0,
    daiyu: 0,
    jili: 0,
    namet: "",
    IsWholet: "",
    IsSocialt: "",
    IsFocust: "",
    IsOthert: "",
    IsMoneyt: "",
    IsStockt: "",
    IsOriginalt: "",
    IsOptiont: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      jobId: options.job_id
    })
    that.init()
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

  /**
   * 页面数据加载
   */
  init: function () {
    var that = this
    wx.request({
      url: app.globalData.https + '/x/operate/renhe.ashx',
      data: ({
        method: "Get_Renhe",
        id: that.data.jobId,
      }),
      success: function (res) {
        var data = JSON.stringify(res.data);
        var list = JSON.parse(data)
        console.log("职位=" + data)
        that.setData({
          name: decodeURI(list.info[0].Name),
          descs: decodeURI(list.info[0].descs),
        })

        if (list.info[0].IsWhole == 0) {
          that.setData({
            IsWhole: ""
          })
        } else {
          that.setData({
            IsWhole: "全职"
          })
        } if (list.info[0].IsSocial == 0) {
          that.setData({
            IsSocial: ""
          })
        } else {
          that.setData({
            IsSocial: "社会化"
          })
        }
        if (list.info[0].IsFocus == 0) {
          that.setData({
            IsFocus: ""
          })
        } else {
          that.setData({
            IsFocus: "集中办公"
          })
        }
        if (list.info[0].IsOther == 0) {
          that.setData({
            IsOther: ""
          })
        } else {
          that.setData({
            IsOther: "异地办公"
          })
        }
        if (list.info[0].IsMoney == 0) {
          that.setData({
            IsMoney: ""
          })
        } else {
          that.setData({
            IsMoney: "有薪资待遇"
          })
        }
        if (list.info[0].IsStock == 0) {
          that.setData({
            IsStock: ""
          })
        } else {
          that.setData({
            IsStock: "需入资占股"
          })
        }
        if (list.info[0].IsOriginal == 0) {
          that.setData({
            IsOriginal: ""
          })
        } else {
          that.setData({
            IsOriginal: "原始股权"
          })
        }
        if (list.info[0].IsOption == 0) {
          that.setData({
            IsOption: ""
          })
        } else {
          that.setData({
            IsOption: "期权"
          })
        }

      }
    })
  },

  /**
   * 职位页面
   */
  zhiwei: function (e) {
    var that = this
    that.setData({
      bianji: true,
      zhiwei: 1
    })
  },
  zcon: function (e) {
    var that = this
    that.setData({
      bianji: false,
      zhiwei: 0
    })
    that.change(1, that.data.namet, "", "", "", "", "", "", "", "", "", )
  },
  zcan: function (e) {
    var that = this
    that.setData({
      bianji: false,
      zhiwei: 0
    })
  },
  zw: function (e) {
    var that = this
    that.setData({
      namet: e.detail.value
    })
    console.log(that.data.namet)
  },

  /**
   * 要求页面
   */
  yaoqiu: function (e) {
    var that = this
    that.setData({
      bianji: true,
      yaoqiu: 1
    })
  },
  ycon: function (e) {
    var that = this
    that.setData({
      bianji: false,
      yaoqiu: 0
    })
    that.change(2, "", that.data.descst, "", "", "", "", "", "", "", "", )
  },
  ycan: function (e) {
    var that = this
    that.setData({
      bianji: false,
      yaoqiu: 0
    })
  },
  yq: function (e) {
    var that = this
    that.setData({
      descst: e.detail.value
    })
    console.log(that.data.descst)
  },

  /**
   * 合伙页面
   */
  hehuo: function (e) {
    var that = this
    that.setData({
      bianji: true,
      hehuo: 1
    })
  },
  hcon: function (e) {
    var that = this
    that.setData({
      bianji: false,
      hehuo: 0
    })
    that.change(3, "", "", that.data.IsWholet, that.data.IsSocialt, that.data.IsFocust, that.data.IsOthert, "", "", "", "", )
  },
  hcan: function (e) {
    var that = this
    that.setData({
      bianji: false,
      hehuo: 0
    })
  },
  sj: function (e) {
    var that = this
    if (e.detail.value == "全职") {
      that.setData({
        IsWholet: 1,
        IsSocialt: 0,
      })
    } else {
      that.setData({
        IsWholet: 0,
        IsSocialt: 1,
      })
    }
  },
  dd: function (e) {
    var that = this
    if (e.detail.value == "集中办公") {
      that.setData({
        IsFocust: 1,
        IsOthert: 0,
      })
    } else {
      that.setData({
        IsFocust: 0,
        IsOthert: 1,
      })
    }
  },
  /**
   * 待遇页面
   */
  daiyu: function (e) {
    var that = this
    that.setData({
      bianji: true,
      daiyu: 1,
    })
    if (that.data.IsMoney == "") {
      that.setData({
        IsMoneyt: 0
      })
    } else {
      that.setData({
        IsMoneyt: 1
      })
    }
    if (that.data.IsStock == "") {
      that.setData({
        IsStockt: 0
      })
    } else {
      that.setData({
        IsStockt: 1
      })
    }
  },
  dcon: function (e) {
    var that = this
    that.setData({
      bianji: false,
      daiyu: 0
    })

    that.change(4, "", "", '', '', '', '', that.data.IsMoneyt, that.data.IsStockt, "", "", )
  },
  dcan: function (e) {
    var that = this
    that.setData({
      bianji: false,
      daiyu: 0
    })
  },
  xz: function (e) {
    var that = this
    if (e.detail.value == true) {
      that.setData({
        IsMoneyt: 1
      })
    } else {
      that.setData({
        IsMoneyt: 0
      })
    }
  },
  zg: function (e) {
    var that = this
    if (e.detail.value == true) {
      that.setData({
        IsStockt: 1
      })
    } else {
      that.setData({
        IsStockt: 0
      })
    }
  },

  /**
   * 激励页面
   */
  jili: function (e) {
    var that = this
    that.setData({
      bianji: true,
      jili: 1
    })
    if (that.data.IsOriginal == "") {
      that.setData({
        IsOriginalt: 0
      })
    } else {
      that.setData({
        IsOriginalt: 1
      })
    }
    if (that.data.IsOption == "") {
      that.setData({
        IsOptiont: 0
      })
    } else {
      that.setData({
        IsOptiont: 1
      })
    }
  },
  jcon: function (e) {
    var that = this
    that.setData({
      bianji: false,
      jili: 0
    })
    that.change(5, "", "", '', '', '', '', '', '', that.data.IsOriginalt, that.data.IsOptiont)
  },
  jcan: function (e) {
    var that = this
    that.setData({
      bianji: false,
      jili: 0
    })
  },
  gq: function (e) {
    var that = this
    if (e.detail.value == true) {
      that.setData({
        IsOriginalt: 1
      })
    } else {
      that.setData({
        IsOriginalt: 0
      })
    }
  },
  qq: function (e) {
    var that = this
    if (e.detail.value == true) {
      that.setData({
        IsOptiont: 1
      })
    } else {
      that.setData({
        IsOptiont: 0
      })
    }
  },
  /**
   * 修改数据
   */
  change: function (type, name, descs, iswhole, issocial, isfocus, isother, ismoney, isstock, isoriginal, isoption) {
    if (name.length > 20) {
      wx.showToast({
        title: '职位名称不能超过20个字',
        duration: 1500
      })
      return;
    }
    var that = this
    wx.request({
      url: app.globalData.https + '/x/operate/renhe.ashx',
      data: ({
        method: "Update_Renhe",
        id: that.data.jobId,
        type: type,
        name: encodeURI(name),
        descs: encodeURI(descs),
        iswhole: iswhole,
        issocial: issocial,
        isfocus: isfocus,
        isother: isother,
        ismoney: ismoney,
        isstock: isstock,
        isoriginal: isoriginal,
        isoption: isoption
      }),
      success: function (res) {
        if (res.data == "1") {
          wx.showToast({
            title: '操作成功',
            icon: 'success',
          })
          if (type == 1) {
            console.log("type=" + type)
            that.setData({
              name: that.data.namet
            })
          } else if (type == 2) {

          } else if (type == 3) {
            if (that.data.IsWholet == 0) {
              that.setData({
                IsWhole: ""
              })
            } else {
              that.setData({
                IsWhole: "全职"
              })
            } if (that.data.IsSocialt == 0) {
              that.setData({
                IsSocial: ""
              })
            } else {
              that.setData({
                IsSocial: "社会化"
              })
            }
            if (that.data.IsFocust == 0) {
              that.setData({
                IsFocus: ""
              })
            } else {
              that.setData({
                IsFocus: "集中办公"
              })
            }
            if (that.data.IsOthert == 0) {
              that.setData({
                IsOther: ""
              })
            } else {
              that.setData({
                IsOther: "异地办公"
              })
            }
          } else if (type == 4) {
            if (that.data.IsMoneyt == 0) {
              that.setData({
                IsMoney: ""
              })
            } else {
              that.setData({
                IsMoney: "有薪资待遇"
              })
            }
            if (that.data.IsStockt == 0) {
              that.setData({
                IsStock: ""
              })
            } else {
              that.setData({
                IsStock: "需入资占股"
              })
            }
          } else {
            if (that.data.IsOriginalt == 0) {
              that.setData({
                IsOriginal: ""
              })
            } else {
              that.setData({
                IsOriginal: "原始股权"
              })
            }
            if (that.data.IsOptiont == 0) {
              that.setData({
                IsOption: ""
              })
            } else {
              that.setData({
                IsOption: "期权"
              })
            }
          }
        }
        else if (res.data == "0") {
          wx.showToast({
            title: '操作出错',
            icon: 'loading',
          })
        }
      }
    })
  }

})