// zhaoMuXianShang.js
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
    type: 0,
    huodong: 1,
    mingcheng: 0,
    shijian: 0,
    feiyong: 0,
    fengmian: 0,
    dizhi: 0,
    pic: "",
    memid: "",
    people: "",
    ischarge: "",
    chargemoney: "",
    stime: "",
    etime: "",
    name: "",
    sdata: "",
    stime: "",
    edata: "",
    etime: "",
    currenttime: "",
    check: false,
    money: 0,
    address: "",
    province: "",
    city: "",
    sheng: [],
    shi: [],
    disabled: 0,
    urlPath: app.globalData.https + "/images/",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      memid: app.globalData.huiyuanInfo.userid,
      currenttime: new Date().Format("yyyy-MM-dd")
    })
    console.log(that.data.currenttime)
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
   * 页面切换
   */
  cancel: function () {
    wx.navigateBack({
      
    })
  },
  firstnext: function () {
    var that = this
    if (that.data.type == 0) {
      wx.showToast({
        title: '请选择活动类型',
      })
    } else {
      that.setData({
        huodong: 0,
        fengmian: 1
      })
      console.log("活动类型=" + that.data.type)
    }
  },
  secondcancel: function () {
    var that = this
    that.setData({
      huodong: 1,
      fengmian: 0
    })
  },
  secondnext: function () {
    var that = this
    if (that.data.pic == "") {
      wx.showToast({
        title: '请选择活动封面',
        icon: 'success'
      })
    } else {
      that.setData({
        fengmian: 0,
        mingcheng: 1
      })
      console.log("图片" + that.data.pic)
    }

  },
  thirdcancel: function () {
    var that = this
    that.setData({
      fengmian: 1,
      mingcheng: 0
    })
  },
  thirdnext: function () {
    var that = this
    if (that.data.name == '') {
      wx.showToast({
        title: '请输入活动名称',
        icon: "loading"
      })
    } else {
      that.setData({
        mingcheng: 0,
        shijian: 1
      })
      console.log("活动名称=" + that.data.name)
    }
  },
  fourthcancel: function () {
    var that = this
    that.setData({
      mingcheng: 1,
      shijian: 0
    })
  },
  fourthnext: function () {
    var that = this
    var stime = that.data.sdata + that.data.stime
    var etime = that.data.edata + that.data.etime
    if (stime >= etime) {
      wx.showToast({
        title: '请输入正确的时间',
      })
    } else {
      that.setData({
        shijian: 0,
        feiyong: 1
      })
      console.log("活动时间=" + stime + "----" + etime)
    }
  },
  fifthcancel: function () {
    var that = this
    that.setData({
      shijian: 1,
      feiyong: 0
    })
  },
  fifthnext: function () {
    var that = this
    if (that.data.type == 1) {
      console.log("门票=" + that.data.money)
      that.upload()
    } else {
      that.setData({
        feiyong: 0,
        dizhi: 1
      })
      console.log("门票=" + that.data.money)
    }
  },
  sixthcancel: function () {
    var that = this
    that.setData({
      feiyong: 1,
      dizhi: 0
    })
  },
  confirm: function () {
    var that = this
    if (that.data.people == "" || that.data.address == "" || that.data.city == "") {
      wx.showToast({
        title: '请输入完成信息',
        icon: "loading"
      })
    } else {
      console.log("活动人数=" + that.data.people)
      console.log("活动地址=" + that.data.province + that.data.city + that.data.address)
      that.upload()
    }

  },
  /**
   * 名称
   */
  input: function (e) {
    this.setData({
      name: e.detail.value
    })

  },
  inputb: function (e) {
    this.setData({
      name: e.detail.value
    })
  },

  /**
   * 门票金额
   */
  inputm: function (e) {
    this.setData({
      money: e.detail.value
    })

  },
  inputmb: function (e) {
    this.setData({
      money: e.detail.value
    })
  },

  /**
   * 人数地址
   */
  inputa: function (e) {
    this.setData({
      address: e.detail.value
    })

  },
  inputab: function (e) {
    this.setData({
      address: e.detail.value
    })
  },
  inputp: function (e) {
    this.setData({
      people: e.detail.value
    })

  },
  inputpb: function (e) {
    this.setData({
      people: e.detail.value
    })
  },

  /**
   * 修改时间
   */
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
  /**
   * 封面
   */
  pic: function () {
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
            'method': 'Add_Activity_Pic',
          },
          success: function (uploadRes) {
            console.log("上传图片" + uploadRes.data)
            if (uploadRes.data == "0") {
              wx.showToast({
                title: '上传出错',
                icon: 'loading'
              })
            }
            else if (uploadRes.data == "-2") {
              wx.showToast({
                title: '图片格式错误',
                icon: 'loading'
              })
            } else if (uploadRes.data == "-3") {
              wx.showToast({
                title: '图片过大',
                icon: 'loading'
              })
            } else if (uploadRes.data == "-4") {
              wx.showToast({
                title: '文件为空',
                icon: 'loading'
              })
            } else {
              wx.showToast({
                title: '操作成功',
                icon: 'success'
              })
              that.setData({
                pic: uploadRes.data
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

  /**
   * 收费
   */
  mschange: function (e) {
    var that = this
    this.setData({
      check: e.detail.value
    })
    if (e.detail.value == false) {
      that.setData({
        money: 0
      })
    }
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
   * 线上活动
   */
  xianshang: function () {
    var that = this
    that.setData({
      type: 1
    })
  },

  /**
   * 线下活动
   */
  xianxia: function () {
    var that = this
    that.setData({
      type: 2
    })
  },
  /**
   * 添加活动
   */
  upload: function () {
    var that = this
    if (that.data.money == 0) {
      that.setData({
        ischarge: 0
      })
    } else {
      that.setData({
        ischarge: 1
      })
    }
    var stime = that.data.sdata + "-" + that.data.stime.replace(":", "-")
    var etime = that.data.edata + "-" + that.data.etime.replace(":", "-")
    console.log("stime=" + stime)
    console.log("etime=" + etime)
    wx.request({
      url: app.globalData.https + '/x/Operate/Activity.ashx',
      data: {
        method: "Add_Activity",
        memid: that.data.memid,
        name: encodeURI(that.data.name),
        year: stime.split("-")[0],
        month: stime.split("-")[1],
        day: stime.split("-")[2],
        hour: stime.split("-")[3],
        minute: stime.split("-")[4],
        end_year: etime.split("-")[0],
        end_month: etime.split("-")[1],
        end_day: etime.split("-")[2],
        end_hour: etime.split("-")[3],
        end_minute: etime.split("-")[4],
        province: that.data.province,
        city: that.data.city,
        address: that.data.address,
        people: that.data.people,
        ischarge: that.data.ischarge,
        chargemoney: that.data.money,
        type: that.data.type,
        pic: that.data.pic
      },
      success: function (res) {
        if (res.data == 1) {
          wx.showToast({
            title: '操作成功',
            icon: "success"
          })
          setTimeout(function(){
            wx.navigateBack({
              
            })
          },2000)
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