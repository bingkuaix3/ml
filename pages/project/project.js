var app = getApp()
var pc = new Array();


pc[0] = new Array("全部", "");

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
    urlPath: app.globalData.https + "/images/",
    imgUrls: [],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    list: [],
    jiantou: 1,
    arrayname: ["默认","票数", "创建时间", "推荐"],
    array: [{ name: "默认", id: "votes" },{ name: "票数", id: "votes" }, { name: "创建时间", id: "createtime" }, { name: "推荐", id: "level" },],
    paixu: "默认",
    chaxun: "id",
    zhezhao: 0,
    ht: 0,
    sheng: [],
    shi: [],
    hangye: [],
    shengz: "",
    shiz: "",
    hangyez: "",
    disabled: 0,
    //上拉刷新是否显示
    topHidden: 'none',
    //下拉加载是否显示
    bottomHidden: 'none',
    //页码
    pageIndex: 1,
    //页容量
    pageSize: 5,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.lunbo()
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
    app.login(function (huiyuanInfo) {
     
          that.jiazailist(that.data.shengz, that.data.shiz, that.data.hangyez, that.data.chaxun, that.data.jiantou, "up")
        
      
     
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
    var that = this
    this.setData({
      pageIndex: 1
    })
    this.jiazailist(that.data.shengz, that.data.shiz, that.data.hangyez, that.data.chaxun, that.data.jiantou, "up")
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this
    this.setData({
      pageIndex: that.data.pageIndex + 1
    })
    this.jiazailist(that.data.shengz, that.data.shiz, that.data.hangyez, that.data.chaxun, that.data.jiantou, "down")
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  shengjiang: function () {
    var that = this
    var chaxun = that.data.chaxun
    var jiantou = that.data.jiantou
    that.setData({
      pageIndex: 1
    })
    if (chaxun == "id") {
      if (that.data.jiantou == 0) {
        that.setData({
          jiantou: 1
        })
      } else {
        that.setData({
          jiantou: 0
        })
      }
      console.log(123123)
      that.jiazailist(that.data.shengz, that.data.shiz, that.data.hangyez, "id", that.data.jiantou, "up")

    } else {
      if (that.data.jiantou == 0) {
        that.setData({
          jiantou: 1
        })
        that.jiazailist(that.data.shengz, that.data.shiz, that.data.hangyez, chaxun, that.data.jiantou, "up")
      } else {
        that.setData({
          jiantou: 0
        })
        that.jiazailist(that.data.shengz, that.data.shiz, that.data.hangyez, chaxun, that.data.jiantou, "up")
      }
    }
  },
  btnleft: function (e) {
    var that = this
    var array = that.data.array
    that.setData({
      pageIndex: 1,
      paixu: array[e.detail.value].name,
      chaxun: array[e.detail.value].id
    })
    that.jiazailist(that.data.shengz, that.data.shiz, that.data.hangyez, that.data.chaxun, that.data.jiantou, "up")
  },
  jiazailist: function (province, city, typename, order, ordertype, type) {
    var that = this
    var temp = []
    wx.request({
      url: app.globalData.https + '/x/Handler/Handler.ashx',
      data: {
        a: "Get_ProjectSelected",
        pagesize: that.data.pageSize,
        PageIndex: that.data.pageIndex,
        province: province,
        city: city,
        typename: typename,
        order: order,
        ordertype: ordertype
      },
      success: function (res) {
        wx.hideLoading()
        var data = JSON.stringify(res.data);
        var list = JSON.parse(data)
        if (type == "up") {

          that.setData({
            list: list.list_project
          })

          //  console.log(that.data.list)

          wx.stopPullDownRefresh();
        } else if (type == "down") {
          if (list.list_project.length > 0) {
            console.log("1")
            that.setData({
              list: that.data.list.concat(list.list_project)
            })
            console.log(that.data.list)
          }
          else {
            console.log("2")
            that.setData({
              pageIndex: that.data.pageIndex - 1
            })
          }
        }


        console.log(data)
      },
      fail: function (res) {
        console.log("失败" + JSON.stringify(res));
        setTimeout(function () {
          wx.hideLoading()
        }, 2000)
      }
    })
  },
  lunbo: function () {
    var that = this
    wx.request({
      url: app.globalData.https + '/x/Handler/Handler.ashx',
      data: {
        a: "Get_ProjectPic",
      },
      success: function (res) {
        var data = JSON.stringify(res.data);
        var list = JSON.parse(data)
        console.log(data)
        that.setData({
          imgUrls: list.pic_info
        })
      }
    })
  },
  //遮罩picker初始化
  shaixuan: function () {
    var that = this
    that.setData({
      zhezhao: 1
    })
    that.setData({
      ht: 1
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

    wx.request({
      url: app.globalData.https + '/x/Handler/Handler.ashx',
      data: {
        a: "Get_Project_Type",
      },
      success: function (res) {
        var data = JSON.stringify(res.data);
        var temp = []
        var list = JSON.parse(data)

        for (var i = 0; i < list.type_info.length; i++) {
          temp[i] = list.type_info[i].name
        }
        console.log("行业类型：" + temp)
        that.setData({
          hangye: temp
        })
      }
    })
  },
  queding: function () {
    var that = this
    that.setData({
      zhezhao: 0,
      ht: 0
    })
    console.log("提交数据:" + that.data.shengz + "-" + that.data.shiz + "-" + that.data.hangyez)
    if (that.data.shengz == "全部") {
      that.setData({
        shengz: "",
        shiz: "",
      })
    }
    if (that.data.hangyez == "全部") {
      that.setData({
        hangyez: "",
      })
    }
    that.jiazailist(that.data.shengz, that.data.shiz, that.data.hangyez, that.data.chaxun, that.data.jiantou, "up")
    console.log("市" + that.data.shi)
    console.log("市Z" + that.data.shiz)
  },
  xuanzesheng: function (e) {
    var that = this
    var sheng = that.data.sheng
    that.setData({
      shengz: sheng[e.detail.value],
      shi: pc[e.detail.value][1].split("|"),
      shiz: pc[e.detail.value][1].split("|")[0],
    })
    if (that.data.shengz == "全部") {
      that.setData({
        disabled: 1,
      })
    } else {
      that.setData({
        disabled: 0,
      })
    }

  },
  xuanzeshi: function (e) {
    var that = this
    var shi = that.data.shi
    that.setData({
      shiz: shi[e.detail.value]
    })
    // console.log(parseInt(e.detail.value) + 1)
    // console.log("市" + that.data.shi)
    // console.log("市z" + shi[parseInt(e.detail.value) + 1])
  },
  xuanzehangye: function (e) {
    var that = this
    var hangye = that.data.hangye
    that.setData({
      hangyez: hangye[e.detail.value]
    })
  },
  //进入项目详情
  goToDetail: function (e) {
    wx.navigateTo({
      url: '../../pages/project/details/details?id=' + e.currentTarget.dataset.id + "&type=2"
    })
  }
})