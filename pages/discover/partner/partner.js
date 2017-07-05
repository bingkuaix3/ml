// partner.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
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
    city: '城市选择',
    newCity: '',
    key: '',
    list: [],
    isShow: false, // 显示区域选择框
    pageIndex: 1,
    pageSize: 10,
    markers: [{
      iconPath: "/images/user.png",
      id: 0,
      latitude: 23.099994,
      longitude: 113.324520,
      width: 50,
      height: 50,
      label:"100",
      title:"100"
    }] 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.pcInit()
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
    this.search()
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
    var that = this
    this.setData({
      pageIndex: that.data.pageIndex + 1
    })

    var shenfen = "";
    var chengshi = "";
    if (that.data.city != "城市选择" && that.data.city != "")
      chengshi = that.data.city
    if (that.data.chooseChuangke != "") {
      if (shenfen == "")
        shenfen += that.data.chooseChuangke
      else
        shenfen += "," + that.data.chooseChuangke
    }
    if (that.data.chooseJike != "") {
      if (shenfen == "")
        shenfen += that.data.chooseJike
      else
        shenfen += "," + that.data.chooseJike
    }
    if (that.data.chooseJinke != "") {
      if (shenfen == "")
        shenfen += that.data.chooseJinke
      else
        shenfen += "," + that.data.chooseJinke
    }
    if (that.data.chooseShuke != "") {
      if (shenfen == "")
        shenfen += that.data.chooseShuke
      else
        shenfen += "," + that.data.chooseShuke
    }
    if (that.data.chooseZhike != "") {
      if (shenfen == "")
        shenfen += that.data.chooseZhike
      else
        shenfen += "," + that.data.chooseZhike
    }
    if (that.data.chooseShike != "") {
      if (shenfen == "")
        shenfen += that.data.chooseShike
      else
        shenfen += "," + that.data.chooseShike
    }
    if (that.data.chooseWeike != "") {
      if (shenfen == "")
        shenfen += that.data.chooseWeike
      else
        shenfen += "," + that.data.chooseWeike
    }
    if (that.data.chooseHuike != "") {
      if (shenfen == "")
        shenfen += that.data.chooseHuike
      else
        shenfen += "," + that.data.chooseHuike
    }
    if (that.data.chooseHaike != "") {
      if (shenfen == "")
        shenfen += that.data.chooseHaike
      else
        shenfen += "," + that.data.chooseHaike
    }
    //请求数据
    wx.request({
      url: app.globalData.https + '/x/Operate/Home.ashx',
      data: {
        method: "Get_Hehuoren",
        xingming: that.data.key,
        shenfen: shenfen,
        chengshi: chengshi,
        page: that.data.pageIndex,
        pagesize: that.data.pageSize
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        wx.hideLoading()
        console.log(res.data)
        if (res.data.list.length > 0) {
          that.setData({
            list: that.data.list.concat(res.data.list)
          })
        }
        else {
          that.setData({
            pageIndx: that.data.pageIndex - 1
          })
        }
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  search: function () {
    var that = this
    this.setData({
      pageIndex: 1
    })
    this.pcInit()
    var that = this
    var shenfen = "";
    var chengshi = "";
    if (that.data.city != "城市选择" && that.data.city != "")
      chengshi = that.data.city
    if (that.data.chooseChuangke != "") {
      if (shenfen == "")
        shenfen += that.data.chooseChuangke
      else
        shenfen += "," + that.data.chooseChuangke
    }
    if (that.data.chooseJike != "") {
      if (shenfen == "")
        shenfen += that.data.chooseJike
      else
        shenfen += "," + that.data.chooseJike
    }
    if (that.data.chooseJinke != "") {
      if (shenfen == "")
        shenfen += that.data.chooseJinke
      else
        shenfen += "," + that.data.chooseJinke
    }
    if (that.data.chooseShuke != "") {
      if (shenfen == "")
        shenfen += that.data.chooseShuke
      else
        shenfen += "," + that.data.chooseShuke
    }
    if (that.data.chooseZhike != "") {
      if (shenfen == "")
        shenfen += that.data.chooseZhike
      else
        shenfen += "," + that.data.chooseZhike
    }
    if (that.data.chooseShike != "") {
      if (shenfen == "")
        shenfen += that.data.chooseShike
      else
        shenfen += "," + that.data.chooseShike
    }
    if (that.data.chooseWeike != "") {
      if (shenfen == "")
        shenfen += that.data.chooseWeike
      else
        shenfen += "," + that.data.chooseWeike
    }
    if (that.data.chooseHuike != "") {
      if (shenfen == "")
        shenfen += that.data.chooseHuike
      else
        shenfen += "," + that.data.chooseHuike
    }
    if (that.data.chooseHaike != "") {
      if (shenfen == "")
        shenfen += that.data.chooseHaike
      else
        shenfen += "," + that.data.chooseHaike
    }
    wx.showLoading({
      title: "加载中",
      mask: true,
      success: function () {
        //请求数据
        wx.request({
          url: app.globalData.https + '/x/Operate/Home.ashx',
          data: {
            method: "Get_Hehuoren",
            xingming: that.data.key,
            shenfen: shenfen,
            chengshi: chengshi,
            page: that.data.pageIndex,
            pagesize: that.data.pageSize
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            wx.hideLoading()
            console.log(res.data)

            that.setData({
              list: res.data.list
            })
          }
        })
      }
    })
  },
  recordKey: function (e) {
    this.setData({
      key: e.detail.value
    })
  },
  chooseChuangke: function () {
    if (this.data.chooseChuangke == "") {
      this.setData({
        chooseChuangke: "创客"
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
        chooseJike: "极客"
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
        chooseJinke: "今客"
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
        chooseShuke: "数客"
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
        chooseZhike: "智客"
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
        chooseShike: "师客"
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
        chooseWeike: "威客"
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
        chooseHuike: "慧客"
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
        chooseHaike: "嗨客"
      })
    }
    else {
      this.setData({
        chooseHaike: ""
      })
    }
  },
  showCityModal: function () {
   
    this.setData({
      isShow: true
    })
  },
  cityModalBindCancel: function () {
    var that = this;
    that.setData({
      isShow: false
    })
  },
  //设置城市
  cityModalBindConfirm: function () {
    var that = this;
    that.setData({
      isShow: false,
      city: that.data.newCity
    })
  },
  choosearea: function () {
    this.setData({
      isShow: true
    })
  },
  /**
   * 滑动事件
   */
  cityChange: function (e) {
    var that = this
    var c = []
    var citys = this.data.pc[e.detail.value[0]][1].split('|')
    for (var i = 0; i < citys.length; i++) {
      c.push(citys[i])
    }
    this.setData({
      cityData: c
    })
    if (e.detail.value[1] > 0) {
      this.setData({
        province: that.data.pc[e.detail.value[0]][0]
      })
    }
    this.setData({
      newCity: citys[e.detail.value[1]]
    })

  },
  //二级省市联动初始
  pcInit: function () {
    var that = this
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
    var p = []
    for (var i = 0; i < pc.length; i++) {
      console.log(pc[i][0])
      p.push(pc[i][0])
    }
    that.setData({
      pc: pc,
      proviceData: p,
      cityData: ["请选择"]
    })
  }
})