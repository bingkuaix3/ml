// pages/hdym/hdym.js
var app = getApp()
var pc = new Array();

pc[0] = new Array("请选择", "请选择");

pc[1] = new Array("北京", "北京");

pc[2] = new Array("上海", "上海");

pc[3] = new Array("天津", "天津");

pc[4] = new Array("重庆", "重庆");

pc[5] = new Array("河北", "石家庄|邯郸|邢台|保定|张家口|承德|廊坊|唐山|秦皇岛|沧州|衡水");

pc[6] = new Array("山西", "太原|大同|阳泉|长治|晋城|朔州|吕梁|忻州|晋中|临汾|运城");

pc[7] = new Array("内蒙古", "呼和浩特|包头|乌海|赤峰|呼伦贝尔|阿拉善|鄂尔多斯|兴安|乌兰察布|锡林郭勒|巴彦淖尔|通辽");

pc[8] = new Array("辽宁", "沈阳|大连|鞍山|抚顺|本溪|丹东|锦州|营口|阜新|辽阳|盘锦|铁岭|朝阳|葫芦岛");

pc[9] = new Array("吉林", "长春|吉林|四平|辽源|通化|白山|松原|白城|延边");

pc[10] = new Array("黑龙江", "哈尔滨|齐齐哈尔|牡丹江|佳木斯|大庆|绥化|鹤岗|鸡西|黑河|双鸭山|伊春|七台河|大兴安岭");

pc[11] = new Array("江苏", "南京|镇江|苏州|南通|扬州|盐城|徐州|连云港|常州|无锡|宿迁|泰州|淮安");

pc[12] = new Array("浙江", "杭州|宁波|温州|嘉兴|湖州|绍兴|金华|衢州|舟山|台州|丽水");

pc[13] = new Array("安徽", "合肥|芜湖|蚌埠|马鞍山|淮北|铜陵|安庆|黄山|滁州|宿州|池州|淮南|巢湖|阜阳|六安|宣城|亳州");

pc[14] = new Array("福建", "福州|厦门|莆田|三明|泉州|漳州|南平|龙岩|宁德");

pc[15] = new Array("江西", "南昌市|景德镇|九江|鹰潭|萍乡|新馀|赣州|吉安|宜春|抚州|上饶");

pc[16] = new Array("山东", "济南|青岛|淄博|枣庄|东营|烟台|潍坊|济宁|泰安|威海|日照|莱芜|临沂|德州|聊城|滨州|菏泽");

pc[17] = new Array("河南", "郑州|开封|洛阳|平顶山|安阳|鹤壁|新乡|焦作|濮阳|许昌|漯河|三门峡|南阳|商丘|信阳|周口|驻马店|济源");

pc[18] = new Array("湖北", "武汉|宜昌|荆州|襄樊|黄石|荆门|黄冈|十堰|恩施|潜江|天门|仙桃|随州|咸宁|孝感|鄂州|神农架");

pc[19] = new Array("湖南", "长沙|常德|株洲|湘潭|衡阳|岳阳|邵阳|益阳|娄底|怀化|郴州|永州|湘西|张家界");

pc[20] = new Array("广东", "广州|深圳|珠海|汕头|东莞|中山|佛山|韶关|江门|湛江|茂名|肇庆|惠州|梅州|汕尾|河源|阳江|清远| 潮州 | 揭阳 | 云浮");

pc[21] = new Array("广西", "南宁|柳州|桂林|梧州|北海|防城港|钦州|贵港|玉林|南宁|柳州|贺州|百色|河池");

pc[22] = new Array("海南", "海口|三亚");

pc[23] = new Array("四川", "成都|阿坝|巴中|达州|德阳|甘孜|广安|广元|乐山|凉山|泸州|眉山|绵阳|内江|南充|攀枝花|遂宁|雅安|宜宾|资阳|自贡");

pc[24] = new Array("贵州", "贵阳|六盘水|遵义|安顺|铜仁|黔西南|毕节|黔东南|黔南");

pc[25] = new Array("云南", "昆明|保山|楚雄|大理|德宏|迪庆|红河|丽江|临沧|怒江|曲靖|思茅|文山|西双版纳|玉溪|昭通");

pc[26] = new Array("西藏", "拉萨|日喀则|山南|林芝|昌都|阿里|那曲");

pc[27] = new Array("陕西", "西安|宝鸡|咸阳|铜川|渭南|延安|榆林|汉中|安康|商洛");

pc[28] = new Array("甘肃", "兰州|嘉峪关|金昌|白银|天水|酒泉|张掖|武威|定西|陇南|平凉|庆阳|临夏|甘南");

pc[29] = new Array("宁夏", "银川|石嘴山|吴忠|固原|中卫");

pc[30] = new Array("青海", "西宁|海东|海南|海北|黄南|玉树|果洛|海西");

pc[31] = new Array("新疆", "乌鲁木齐|阿克苏|阿拉尔|阿勒泰|巴音郭楞|博尔塔拉|昌吉|哈密|和田|喀什|克拉玛依|克孜勒苏柯尔克孜|石河子|塔城|图木舒克|吐鲁番|五家渠|伊犁");

pc[32] = new Array("香港", "香港");

pc[33] = new Array("澳门", "澳门");

pc[34] = new Array("台湾", "台湾");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    w: 0,
    y: 0,
    h: 0,
    memid: 0,
    listw: [],
    listy: [],
    listh: [],
    displayw: 0,
    displayy: 0,
    displayh: 0,
    displayww: 1,
    displayyw: 1,
    displayhw: 1,
    displayl: 1,
    displayr: 0,
    bjzk: 0,
    name: true,
    inputname: "",
    index: 0,
    hdid: 0,
    descs: true,
    inputdescs: "",
    main: 1,
    fengmian: 0,
    pic: "",
    shiijan: 0,
    sdata: "",
    stime: "",
    edata: "",
    etime: "",
    currenttime: "",
    address: 0,
    province: "",
    city: "",
    sheng: [],
    shi: [],
    disabled: 0,
    people: "",
    address1: "",
    money: 0,
    check: false,
    money1: "",
    state: 0,
    urlPath: app.globalData.https + "/images/",
    chooseChuangke: '',
    chooseJike: '',
    chooseJinke: '',
    chooseShuke: '',
    chooseZhike: '',
    chooseShike: '',
    chooseWeike: '',
    chooseHuike: '',
    chooseHaike: '',
    jiabin: 0,
    winHeight: '',
    listj: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winHeight: res.windowHeight
        })
      }
    })
    that.setData({
      memid: app.globalData.huiyuanInfo.userid
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
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winHeight: res.windowHeight
        })
      }
    })
    wx.showLoading({
      title: '加载中',
      mask: false,
      success: function () {
        that.init('up')
      }
    })
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
   * 页面初始数据加载
   */
  init: function () {
    var that = this
    wx.request({
      url: app.globalData.https + '/x/Operate/Activity.ashx',
      data: ({
        method: "Get_MyActivity",
        memid: that.data.memid
      }),
      success: function (res) {
        setTimeout(function () {
          wx.hideLoading()
        }, 2000)
        var data = JSON.stringify(res.data);
        var list = JSON.parse(data)
        console.log("活动信息=" + data)
        var temp = list.data[0].notend_list
        var temp1 = list.data[1].end_list
        var temp2 = list.data[2].join_list
        if (temp.length != 0) {
          that.setData({
            w: 1
          })
        }
        if (temp1.length != 0) {
          that.setData({
            y: 1
          })
        }
        if (temp2.length != 0) {
          that.setData({
            h: 1
          })
        }




        for (var i = 0; i < temp.length; i++) {
          temp[i].name = decodeURI(temp[i].name)
          if (temp[i].name.length > 5) {
            temp[i].name = temp[i].name.substr(0, 5) + "..."
          }
          temp[i].activitytime = temp[i].activitytime.substr(5, temp[i].activitytime.length - 8)
          temp[i].endtime = temp[i].endtime.substr(5, temp[i].endtime.length - 8)
          temp[i].descs = decodeURI(temp[i].descs)

        }
        for (var i = 0; i < temp1.length; i++) {
          temp1[i].name = decodeURI(temp1[i].name)
          if (temp1[i].name.length > 5) {
            temp1[i].name = temp1[i].name.substr(0, 5) + "..."
          }
          temp1[i].activitytime = temp1[i].activitytime.substr(5, temp1[i].activitytime.length - 8)
          temp1[i].descs = decodeURI(temp1[i].descs)

        }
        for (var i = 0; i < temp2.length; i++) {
          temp2[i].name = decodeURI(temp2[i].name)
          if (temp2[i].name.length > 5) {
            temp2[i].name = temp2[i].name.substr(0, 5) + "..."
          }
          temp2[i].activitytime = temp2[i].activitytime.substr(5, temp2[i].activitytime.length - 8)
          temp2[i].descs = decodeURI(temp2[i].descs)

        }
        that.setData({
          listw: list.data[0].notend_list,
          listy: list.data[1].end_list,
          listh: list.data[2].join_list
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
   *  隐藏展开
   */
  changel: function (e) {
    var that = this
    that.setData({
      displayl: 1,
      displayr: 0
    })
  },

  /**
   *  隐藏展开
   */
  changer: function (e) {
    var that = this
    that.setData({
      displayr: 1,
      displayl: 0,
    })

  },

  /**
   *  隐藏展开
   */
  displayw: function (e) {
    var that = this
    if (that.data.bjzk == 0) {
      if (that.data.displayw == 0) {
        that.setData({
          displayw: 1,
          displayyw: 0,
        })
      } else {
        that.setData({
          displayw: 0,
          displayyw: 1,
        })
      }
    }


  },

  /**
   *  编辑展开
   */
  bianjiw: function (e) {
    var index = e.currentTarget.dataset.index
    var temp = []
    var that = this
    for (var i = 0; i < that.data.listw.length; i++) {
      temp[i] = that.data.listw[i]
    }
    if (temp[index].b == 0) {
      temp[index].b = 1
      console.log("___" + temp[index].b)
      for (var i = 0; i < that.data.listw.length; i++) {
        if (i == index) {

        } else {
          temp[i].a = 1
        }
      }
      that.setData({
        bjzk: 1,
        displayw: 1,
        displayyw: 0,
      })
    } else {
      temp[index].b = 0
      console.log("___" + temp[index].b)
      for (var i = 0; i < that.data.listw.length; i++) {
        if (i == index) {

        } else {
          temp[i].a = 0
        }
      }
      that.setData({
        bjzk: 0,
      })
    }
    that.setData({
      listw: temp
    })
    console.log("________" + JSON.stringify(that.data.listw))


  },
  /**
   *  隐藏展开
   */
  displayy: function (e) {
    var that = this
    if (that.data.displayy == 0) {
      that.setData({
        displayy: 1,
        displayww: 0,
      })
    } else {
      that.setData({
        displayy: 0,
        displayww: 1,
      })
    }
  },

  /**
   *  隐藏展开
   */
  displayh: function (e) {
    var that = this
    if (that.data.displayh == 0) {
      that.setData({
        displayh: 1,
      })
    } else {
      that.setData({
        displayh: 0,
      })
    }
  },

  /**
   *  点击跳转
   */
  jumpdetail: function (e) {
    console.log(e.currentTarget.dataset.id)
  },

  /**
   *  修改名称
   */
  nchange: function (e) {

    var that = this
    that.setData({
      name: false,
      index: e.currentTarget.dataset.index,
      hdid: e.currentTarget.dataset.id
    })
    console.log(that.data.index)
    console.log(that.data.hdid)
  },
  nameco: function () {
    var that = this
    if (that.data.inputname.length == 0) {
      wx.showToast({
        title: '请输入名称',
        icon: 'loading'
      })
    } else {
      if (that.data.inputname.length > 50) {
        wx.showToast({
          title: '输入内容过长',
          icon: 'loading'
        })
      } else {
        wx.request({
          url: app.globalData.https + '/x/Operate/Activity.ashx',
          data: ({
            method: "Update_Activity",
            activity_id: that.data.hdid,
            type: 1,
            name: that.data.inputname
          }),
          success: function (res) {
            if (res.data == 1) {
              wx.showToast({
                title: '修改成功',
                icon: "success"
              })
              if (that.data.inputname.length > 5) {
                that.data.listw[that.data.index].name = that.data.inputname.substr(0, 5) + "..."
              } else {
                that.data.listw[that.data.index].name = that.data.inputname
              }
              that.setData({
                name: true,
                listw: that.data.listw,
                index: 0,
                hdid: 0
              })
            } else {
              wx.showToast({
                title: '修改失败',
                icon: "loading"
              })
            }
          },
          fail: function () {
          }
        })

      }
    }
  },
  nameca: function () {
    var that = this
    that.setData({
      name: true
    })
  },
  inputname: function (e) {
    var that = this
    that.setData({
      inputname: e.detail.value
    })
  },

  /**
   *  修改介绍
   */
  dchange: function (e) {

    var that = this
    that.setData({
      descs: false,
      index: e.currentTarget.dataset.index,
      hdid: e.currentTarget.dataset.id
    })
    console.log(that.data.index)
    console.log(that.data.hdid)
  },
  descsco: function () {
    var that = this
    if (that.data.inputdescs.length == 0) {
      wx.showToast({
        title: '请输入活动介绍',
        icon: 'loading'
      })
    } else {
      wx.request({
        url: app.globalData.https + '/x/Operate/Activity.ashx',
        data: ({
          method: "Update_Activity",
          activity_id: that.data.hdid,
          type: 8,
          descs: encodeURI(that.data.inputdescs)
        }),
        success: function (res) {
          if (res.data == 1) {
            wx.showToast({
              title: '修改成功',
              icon: "success"
            })
            that.data.listw[that.data.index].descs = that.data.inputdescs
            that.setData({
              descs: true,
              listw: that.data.listw,
              index: 0,
              hdid: 0
            })
          } else {
            wx.showToast({
              title: '修改失败',
              icon: "loading"
            })
          }
        },
        fail: function () {
        }
      })
    }
  },
  descsca: function () {
    var that = this
    that.setData({
      descs: true
    })
  },
  inputdescs: function (e) {
    var that = this
    that.setData({
      inputdescs: e.detail.value
    })
  },
  descschange: function (e) {
    var that = this
    that.setData({
      inputdescs: e.detail.value
    })
  },

  /**
   *  修改封面
   */
  pchange: function (e) {
    var index = e.currentTarget.dataset.index
    var id = e.currentTarget.dataset.id
    var pic = e.currentTarget.dataset.pic
    var that = this
    that.setData({
      main: 0,
      fengmian: 1,
      index: index,
      hdid: id,
      pic: pic
    })
  },
  uploadpic: function () {
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        console.log("选择图片" + JSON.stringify(res))
        wx.uploadFile({
          url: app.globalData.https + "/x/Operate/Activity.ashx",
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'method': 'Update_Activity',
            'activity_id': that.data.hdid,
            'type': 2
          },
          success: function (uploadRes) {
            console.log("上传图片" + uploadRes.data)
            if (uploadRes.data == "1") {
              wx.showToast({
                title: '修改成功',
                icon: 'success'
              })
              var temp = []
              temp = that.data.listw
              temp[that.data.index].pic = tempFilePaths[0]
              that.setData({
                pic: tempFilePaths[0],
                listw: temp
              })
              console.log("pic=" + that.data.pic)
              console.log("pic=" + that.data.listw[that.data.index])
            }
            else if (uploadRes.data == "0") {
              wx.showToast({
                title: '修改失败',
                icon: 'success'
              })
            }
          },
          fail: function (res) {
            console.log("上传图片失败" + JSON.stringify(res))
          }
        })
      }
    })
  },

  fcan: function () {
    var that = this
    that.setData({
      main: 1,
      fengmian: 0
    })
  },

  /**
   *  修改时间
   */
  tchange: function (e) {
    var index = e.currentTarget.dataset.index
    var id = e.currentTarget.dataset.id
    var pic = e.currentTarget.dataset.pic
    var that = this
    that.setData({
      main: 0,
      shijian: 1,
      index: index,
      hdid: id,
      pic: pic,
      currenttime: new Date().Format("yyyy-MM-dd")
    })
    console.log("当前时间=" + that.data.currenttime)
  },
  csdata: function (e) {
    this.setData({
      sdata: e.detail.value
    })
  },
  cstime: function (e) {
    this.setData({
      stime: e.detail.value
    })
  },
  cedata: function (e) {
    this.setData({
      edata: e.detail.value
    })
  },
  cetime: function (e) {
    this.setData({
      etime: e.detail.value
    })
  },
  tcan: function () {
    var that = this
    that.setData({
      main: 1,
      shijian: 0
    })
  },
  tcon: function () {
    var that = this
    var stime = that.data.sdata + "-" + that.data.stime.replace(":", "-")
    var etime = that.data.edata + "-" + that.data.etime.replace(":", "-")
    if (stime >= etime) {
      wx.showToast({
        title: '输入时间有误',
        icon: "loading"
      })
    } else {
      wx.request({
        url: app.globalData.https + '/x/Operate/Activity.ashx',
        data: ({
          method: "Update_Activity",
          activity_id: that.data.hdid,
          type: 3,
          year: stime.split("-")[0],
          month: stime.split("-")[1],
          day: stime.split("-")[2],
          hour: stime.split("-")[3],
          minute: stime.split("-")[4],
          end_year: etime.split("-")[0],
          end_month: etime.split("-")[1],
          end_day: etime.split("-")[2],
          end_hour: etime.split("-")[3],
          end_minute: etime.split("-")[4]
        }),
        success: function (res) {
          if (res.data == 1) {
            wx.showToast({
              title: '修改成功',
              icon: "success"
            })
            var temp = []
            temp = that.data.listw
            temp[that.data.index].activitytime = stime.split("-")[1] + "/" + stime.split("-")[2] + " " + stime.split("-")[3] + ":" + stime.split("-")[4]
            temp[that.data.index].endtime = etime.split("-")[1] + "/" + etime.split("-")[2] + " " + etime.split("-")[3] + ":" + etime.split("-")[4]
            that.setData({
              main: 1,
              shijian: 0,
              listw: temp
            })
          } else {
            wx.showToast({
              title: '修改失败',
              icon: "loading"
            })
          }
        },
        fail: function () {
        }
      })

    }
  },

  /**
   *  修改地址
   */
  achange: function (e) {
    var index = e.currentTarget.dataset.index
    var id = e.currentTarget.dataset.id
    var pic = e.currentTarget.dataset.pic
    var people = e.currentTarget.dataset.people
    var address = e.currentTarget.dataset.address
    var province = e.currentTarget.dataset.province
    var city = e.currentTarget.dataset.city
    var that = this
    that.setData({
      main: 0,
      address: 1,
      index: index,
      hdid: id,
      people: people,
      address1: address,
      province: province,
      city: city
    })
    var initsheng = []
    for (var i = 0; i < pc.length; i++) {
      initsheng[i] = pc[i][0]
    }
    that.setData({
      sheng: initsheng,
    })
    if (that.data.shi.length == 0) {
      that.setData({
        shi: pc[1][1].split("|")
      })
    }
  },
  acan: function () {
    var that = this
    that.setData({
      main: 1,
      address: 0
    })
  },
  acon: function () {
    var that = this
    that.setData({
      main: 1,
      address: 0
    })
    wx.request({
      url: app.globalData.https + '/x/Operate/Activity.ashx',
      data: ({
        method: "Update_Activity",
        activity_id: that.data.hdid,
        type: 4,
        province: that.data.province,
        city: that.data.city,
        address: that.data.address1,
        people: that.data.people
      }),
      success: function (res) {
        if (res.data == 1) {
          wx.showToast({
            title: '修改成功',
            icon: "success"
          })
          var temp = []
          temp = that.data.listw
          temp[that.data.index].province = that.data.province
          temp[that.data.index].city = that.data.city
          temp[that.data.index].address = that.data.address1
          temp[that.data.index].people = that.data.people
          that.setData({
            main: 1,
            shijian: 0,
            listw: temp
          })
        } else {
          wx.showToast({
            title: '修改失败',
            icon: "loading"
          })
        }
      },
      fail: function () {
      }
    })
    console.log(that.data.city)
  },
  inputa: function (e) {
    var that = this
    that.setData({
      address1: e.detail.value
    })
  },
  inputp: function (e) {
    var that = this
    that.setData({
      people: e.detail.value
    })
  },
  /**
   * 选择省
   */
  xuanzesheng: function (e) {
    var that = this
    var sheng = that.data.sheng
    that.setData({
      province: sheng[e.detail.value],
      shi: pc[e.detail.value][1].split("|"),
      city: pc[e.detail.value][1].split("|")[0],
    })
    console.log("省=" + that.data.province)
    if (that.data.province == "全部") {
      that.setData({
        disabled: 1,
      })
    } else {
      that.setData({
        disabled: 0,
      })
    }

  },

  /**
   * 选择市
   */
  xuanzeshi: function (e) {
    var that = this
    var shi = that.data.shi
    that.setData({
      city: shi[e.detail.value]
    })
    // console.log(parseInt(e.detail.value) + 1)
    console.log("市" + that.data.city)
    // console.log("市z" + shi[parseInt(e.detail.value) + 1])
  },

  /**
   *  修改收费
   */
  mchange: function (e) {
    var index = e.currentTarget.dataset.index
    var id = e.currentTarget.dataset.id
    var money = e.currentTarget.dataset.money
    var that = this
    that.setData({
      main: 0,
      money: 1,
      index: index,
      hdid: id,
      money1: money
    })
    console.log(money)
    if (money == "") {
      that.setData({
        check: false
      })
    } else {
      that.setData({
        check: true
      })
    }
  },
  mschange: function (e) {
    var that = this
    this.setData({
      check: e.detail.value
    })
    if (e.detail.value == false) {
      that.setData({
        money1: 0
      })
    }
  },
  mcan: function () {
    var that = this
    that.setData({
      main: 1,
      money: 0
    })
  },
  mcon: function () {
    var that = this
    var ischarge = 0
    if (that.data.money1 == "") {
      ischarge = 0
    } else {
      ischarge = 1
    }
    wx.request({
      url: app.globalData.https + '/x/Operate/Activity.ashx',
      data: ({
        method: "Update_Activity",
        activity_id: that.data.hdid,
        type: 6,
        ischarge: ischarge,
        chargemoney: that.data.money1
      }),
      success: function (res) {
        if (res.data == 1) {
          wx.showToast({
            title: '修改成功',
            icon: "success"
          })
          var temp = []
          temp = that.data.listw
          temp[that.data.index].chargemoney = that.data.money1
          that.setData({
            main: 1,
            money: 0,
            listw: temp
          })
        } else {
          wx.showToast({
            title: '修改失败',
            icon: "loading"
          })
        }
      },
      fail: function () {
      }
    })

  },
  inputm: function (e) {
    var that = this
    that.setData({
      money1: e.detail.value
    })
    console.log(that.data.money1)
  },

  /**
   *  修改生态位
   */
  schange: function (e) {
    var index = e.currentTarget.dataset.index
    var id = e.currentTarget.dataset.id
    var that = this
    that.setData({
      main: 0,
      state: 1,
      index: index,
      hdid: id,
      chooseChuangke: e.currentTarget.dataset.chuangke,
      chooseJike: e.currentTarget.dataset.jike,
      chooseJinke: e.currentTarget.dataset.jinke,
      chooseShuke: e.currentTarget.dataset.shuke,
      chooseZhike: e.currentTarget.dataset.zhike,
      chooseShike: e.currentTarget.dataset.shike,
      chooseWeike: e.currentTarget.dataset.weike,
      chooseHuike: e.currentTarget.dataset.huike,
      chooseHaike: e.currentTarget.dataset.haike,
    })

  },
  scon: function () {
    var that = this
    wx.request({
      url: app.globalData.https + '/x/Operate/Activity.ashx',
      data: ({
        method: "Update_Activity",
        activity_id: that.data.hdid,
        type: 5,
        shuke_level: that.data.chooseShuke,
        zhike_level: that.data.chooseZhike,
        shike_level: that.data.chooseShike,
        jinke_level: that.data.chooseJinke,
        haike_level: that.data.chooseHaike,
        huike_level: that.data.chooseHuike,
        chuangke_level: that.data.chooseChuangke,
        jike_level: that.data.chooseJike,
        weike_level: that.data.chooseWeike
      }),
      success: function (res) {
        if (res.data == 1) {
          wx.showToast({
            title: '修改成功',
            icon: "success"
          })
          var temp = that.data.listw
          temp[that.data.index].shuke_level = that.data.chooseShuke,
            temp[that.data.index].zhike_level = that.data.chooseZhike,
            temp[that.data.index].shike_level = that.data.chooseShike,
            temp[that.data.index].jinke_level = that.data.chooseJinke,
            temp[that.data.index].haike_level = that.data.chooseHaike,
            temp[that.data.index].huike_level = that.data.chooseHuike,
            temp[that.data.index].chuangke_level = that.data.chooseChuangke,
            temp[that.data.index].jike_level = that.data.chooseJike,
            temp[that.data.index].weike_level = that.data.chooseWeike
          that.setData({
            main: 1,
            state: 0,
            listw: temp
          })
        } else {
          wx.showToast({
            title: '修改失败',
            icon: "loading"
          })
        }
      },
      fail: function () {
      }
    })

  },
  chooseChuangke: function () {
    console.log(this.data.urlPath + "chuang.png")
    if (this.data.chooseChuangke == "") {
      this.setData({
        chooseChuangke: "1"
      })
    }
    else {
      this.setData({
        chooseChuangke: ""
      })
    }
  },
  chooseJike: function () {
    if (this.data.chooseJike == "") {
      this.setData({
        chooseJike: "1"
      })
    }
    else {
      this.setData({
        chooseJike: ""
      })
    }
  },
  chooseJinke: function () {
    if (this.data.chooseJinke == "") {
      this.setData({
        chooseJinke: "1"
      })
    }
    else {
      this.setData({
        chooseJinke: ""
      })
    }
  },
  chooseShuke: function () {
    if (this.data.chooseShuke == "") {
      this.setData({
        chooseShuke: "1"
      })
    }
    else {
      this.setData({
        chooseShuke: ""
      })
    }
  },
  chooseZhike: function () {
    if (this.data.chooseZhike == "") {
      this.setData({
        chooseZhike: "1"
      })
    }
    else {
      this.setData({
        chooseZhike: ""
      })
    }
  },
  chooseShike: function () {
    if (this.data.chooseShike == "") {
      this.setData({
        chooseShike: "1"
      })
    }
    else {
      this.setData({
        chooseShike: ""
      })
    }
  },
  chooseWeike: function () {
    if (this.data.chooseWeike == "") {
      this.setData({
        chooseWeike: "1"
      })
    }
    else {
      this.setData({
        chooseWeike: ""
      })
    }
  },
  chooseHuike: function () {
    if (this.data.chooseHuike == "") {
      this.setData({
        chooseHuike: "1"
      })
    }
    else {
      this.setData({
        chooseHuike: ""
      })
    }
  },
  chooseHaike: function () {
    if (this.data.chooseHaike == "") {
      this.setData({
        chooseHaike: "1"
      })
    }
    else {
      this.setData({
        chooseHaike: ""
      })
    }
  },

  /**
   *  修改嘉宾
   */
  jchange: function (e) {
    var index = e.currentTarget.dataset.index
    var id = e.currentTarget.dataset.id
    var that = this
    that.setData({
      main: 0,
      jiabin: 1,
      index: index,
      hdid: id,
    })
    wx.request({
      url: app.globalData.https + '/x/Operate/Activity.ashx',
      data: ({
        method: "Get_AcitivityGuest",
        activity_id: id
      }),
      success: function (res) {
        var data = JSON.stringify(res.data);
        var list = JSON.parse(data)
        console.log("嘉宾信息=" + data)
        that.setData({
          listj: list.guest_info
        })
      },
      fail: function () {

      }
    })
  },

  jcon: function () {
    var that = this
    that.setData({
      main: 1,
      jiabin: 0
    })
  },

  /**
   *  邀请新嘉宾
   */
  jump: function (e) {

  },

  /**
   *  取消邀请
   */
  canj: function (e) {
    var that = this
    var id = e.currentTarget.dataset.id
    var index = e.currentTarget.dataset.index
    wx.request({
      url: app.globalData.https + '/x/Operate/Activity.ashx',
      data: ({
        method: "Del_AcitivityGuest",
        id: id
      }),
      success: function (res) {
        if (res.data == 1) {
          wx.showToast({
            title: '操作成功',
            icon: "success"
          })
          var temp = that.data.listj
          temp.splice(index, 1)
          that.setData({
            listj: temp
          })
        } else {
          wx.showToast({
            title: '操作失败',
            icon: "loading"
          })
        }
      },
      fail: function () {
        wx.showToast({
          title: '操作失败',
          icon: "loading"
        })
      }
    })
  },
  goToPublish:function(){
    wx.navigateTo({
      url: '../../../pages/discover/activity/activityPublish/activityPublish',
    })
  }
})
Date.prototype.Format = function (fmt) { //author: meizz 
  var o = {
    "M+": this.getMonth() + 1, //月份 
    "d+": this.getDate(), //日 
    "h+": this.getHours(), //小时 
    "m+": this.getMinutes(), //分 
    "s+": this.getSeconds(), //秒 
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
    "S": this.getMilliseconds() //毫秒 
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}