// register.js
var app = getApp()
var timer = null
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    sex: "1",
    phone: '',
    code: '',
    birth: '请选择出生日期',
    xueli: '请选择学历',
    address: '',
    items: [
      { name: '男', value: '男', checked: 'true' },
      { name: '女', value: '女' },
    ],
    urlPath: app.globalData.https + "/images/",
    newCode: '',
    btnDisabled: false,
    btnText: '获取验证码',
    status1:'',
    status2:'',
    status3:'',
    xueli_items:['本科以下','本科','研究生','博士','博士以上'],
    jd1:'backBlue',
    jd2:'backGrey',
    jd3:'true',
    first:'block',
    second:'none',
    third:'none',
    chuangke:'1',
    jike:'0',
    jinke:'0',
    shuke:'0',
    zhike:'0',
    shike:'0',
    weike:'0',
    huike:'0',
    haike:'0',
    wait:60,
    isShow: false, // 显示区域选择框
    showDistrict: false, // 默认为省市区三级区域选择
    pc: [],
    proviceData: [],
    cityData: [],
    province: '',
    newProvince:'',
    newCity:'请选择所在省市'
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
  recordName: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  recordPhone: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  recordNewCode: function (e) {
    this.setData({
      newCode: e.detail.value
    })
  },
  sexChange: function (e) {
    this.setData({
      sex: e.detail.value
    })
  },
  birthChange: function (e) {
    this.setData({
      birth: e.detail.value
    })
  },
  recordAddress: function (e) {
    this.setData({
      address: e.detail.value
    })
  },
  xueliChange:function(e){
    var that = this
    this.setData({
      xueli: that.data.xueli_items[e.detail.value]
    })
  },
  sendCode: function () {
    var that = this;
    if (that.data.phone == '') {
      wx.showToast({
        title: '请输入您的手机号',
        icon: 'success'
      })
      return;
    }
    if (that.data.phone.length != 11) {
      wx.showToast({
        title: '请输入11位手机号',
        icon: 'success'
      })
      return;
    }
    that.setData({
      btnDisabled: true
    })
    //发送手机验证码
    var code = that.createCode()
    that.setData({
      code: code
    })
    wx.request({
      url: app.globalData.https + '/x/PhoneCode.aspx',
      data: {
        shoujihao: that.data.phone,
        code: code
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        var info = res.data;
        if (info == 'yes') {
          timer = setInterval(function () {
            that.setData({
              wait: that.data.wait - 1,
              btnText: (that.data.wait - 1) + "s"
            })
            if (that.data.wait <= 0) {
              clearInterval(timer)
              that.setData({
                wait: 60,
                btnDisabled: false,
                btnText: "获取验证码",
                code: ''
              })
            }
          }, 1000)
        }
        else {
          wx.showToast({
            title: "验证码发送失败",
            icon: 'success'
          })
          that.setData({
            btnDisabled: false
          })
        }
      },
      fail: function (res) {

      }
    })
  },
  createCode: function () {
    var charactors = "1234567890";
    var val = '', i;
    for (var j = 1; j <= 4; j++) {
      i = parseInt(10 * Math.random());
      val = val + charactors.charAt(i);
    }
    return val;
  },
  /**
   * 第一层下一步
   */
  firstNext:function(){
    if(this.data.name ==''){
      wx.showToast({
        title: '请输入姓名',
        duration:1500
      })
      return;
    }
    if (this.data.sex == '') {
      wx.showToast({
        title: '请选择性别',
        duration: 1500
      })
      return;
    }
    if (this.data.phone == '' || this.data.phone.length != 11) {
      wx.showToast({
        title: '请输入手机号',
        duration: 1500
      })
      return;
    }
    if (this.data.newCode == '') {
      wx.showToast({
        title: '请输入验证码',
        duration: 1500
      })
      return;
    }
    if (this.data.newCode != this.data.code) {
      wx.showToast({
        title: '验证码错误',
        duration: 1500
      })
      return;
    }
    if (this.data.birth == '') {
      wx.showToast({
        title: '请输入生日',
        duration: 1500
      })
      return;
    }
    if (this.data.xueli == '' || this.data.xueli =='请选择学历') {
      wx.showToast({
        title: '请选择学历',
        duration: 1500
      })
      return;
    }
    if (this.data.newCity == '' || this.data.newCity =='请选择所在省市') {
      wx.showToast({
        title: '请选择所在省市',
        duration: 1500
      })
      return;
    }
    if (this.data.address == '') {
      wx.showToast({
        title: '请输入详细地址',
        duration: 1500
      })
      return;
    }
    this.setData({
      jd1:'backGrey',
      jd2:'backBlue',
      jd3:'false',
      first:'none',
      second:'block',
      third:'none'
    })
  },
  /**
   * 第二层下一步
   */
  secondNext: function () {
    var shenfen="";
    if(this.data.chuangke == '1')
      shenfen='创客'
    if (this.data.jike == '1')
      shenfen = '极客'
    if (this.data.jinke == '1')
      shenfen = '金客'
    if (this.data.shuke == '1')
      shenfen = '数客'
    if (this.data.zhike == '1')
      shenfen = '智客'
    if (this.data.shike == '1')
      shenfen = '师客'
    if (this.data.weike == '1')
      shenfen = '威客'
    if (this.data.huike == '1')
      shenfen = '慧客'
    if (this.data.haike == '1')
      shenfen = '嗨客'
    if (this.data.chuangke == '1')
      shenfen = '创客'
    if (this.data.chuangke == '1')
      shenfen = '创客'
    if (shenfen == '') {
      wx.showToast({
        title: '请选择生态位',
        duration: 1500
      })
      return;
    }
    var that = this
    wx.showModal({
      title: '提示',
      content: '您确定要注册合伙人吗',
      success: function (res) {
        if (res.confirm) {
          wx.showLoading({
            title: '处理中',
            mask: true,
            success: function () {
              //请求数据
              wx.request({
                url: app.globalData.https + '/x/Operate/Home.ashx',
                data: {
                  method: "Register",
                  openid: app.globalData.huiyuanInfo.openid,
                  xingbie:that.data.sex,
                  xingming:that.data.name,
                  xueli:that.data.xueli,
                  province:that.data.newProvince,
                  city: that.data.newCity,
                  district:that.data.address,
                  shoujihao:that.data.phone,
                  shenfen:shenfen
                },
                header: {
                  'content-type': 'application/json'
                },
                success: function (res) {
                  wx.hideLoading()
                  console.log(res)
                  if (res.data == "yes") {
                    that.setData({
                      jd1: 'backBlue',
                      jd2: 'backGrey',
                      jd3: 'false',
                      first: 'none',
                      second: 'none',
                      third: 'block'
                    })
                    setTimeout(function(){
                      wx.navigateBack({
                        
                      })
                    },3000)
                  }
                  else {
                    wx.showToast({
                      title: '注册失败',
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
  /**
   * 选择创客
   */
  chooseChuangke:function(){
    this.setData({
      chuangke: '1',
      jike: '0',
      jinke: '0',
      shuke: '0',
      zhike: '0',
      shike: '0',
      weike: '0',
      huike: '0',
      haike: '0'
    })
  },
  /**
   * 选择极客
   */
  chooseJike: function () {
    this.setData({
      chuangke: '0',
      jike: '1',
      jinke: '0',
      shuke: '0',
      zhike: '0',
      shike: '0',
      weike: '0',
      huike: '0',
      haike: '0'
    })
  },
  /**
   * 选择金客
   */
  chooseJinke: function () {
    this.setData({
      chuangke: '0',
      jike: '0',
      jinke: '1',
      shuke: '0',
      zhike: '0',
      shike: '0',
      weike: '0',
      huike: '0',
      haike: '0'
    })
  },
  /**
   * 选择数客
   */
  chooseShuke: function () {
    this.setData({
      chuangke: '0',
      jike: '0',
      jinke: '0',
      shuke: '1',
      zhike: '0',
      shike: '0',
      weike: '0',
      huike: '0',
      haike: '0'
    })
  },
  /**
   * 选择智客
   */
  chooseZhike: function () {
    this.setData({
      chuangke: '0',
      jike: '0',
      jinke: '0',
      shuke: '0',
      zhike: '1',
      shike: '0',
      weike: '0',
      huike: '0',
      haike: '0'
    })
  },
  /**
   * 选择师客
   */
  chooseShike:function () {
    this.setData({
      chuangke: '0',
      jike: '0',
      jinke: '0',
      shuke: '0',
      zhike: '0',
      shike: '1',
      weike: '0',
      huike: '0',
      haike: '0'
    })
  },
  /**
   * 选择威客
   */
  chooseWeike: function () {
    this.setData({
      chuangke: '0',
      jike: '0',
      jinke: '0',
      shuke: '0',
      zhike: '0',
      shike: '0',
      weike: '1',
      huike: '0',
      haike: '0'
    })
  },
  /**
   * 选择慧客
   */
  chooseHuike: function () {
    this.setData({
      chuangke: '0',
      jike: '0',
      jinke: '0',
      shuke: '0',
      zhike: '0',
      shike: '0',
      weike: '0',
      huike: '1',
      haike: '0'
    })
  },
  /**
   * 选择嗨客
   */
  chooseHaike: function () {
    this.setData({
      chuangke: '0',
      jike: '0',
      jinke: '0',
      shuke: '0',
      zhike: '0',
      shike: '0',
      weike: '0',
      huike: '0',
      haike: '1'
    })
  },
  cityModalBindConfirm:function(){
    this.setData({
      isShow: false
    })
  },
  cityModalBindCancel:function(){
    this.setData({
      isShow: false
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
    console.log(e)
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
        newProvince: that.data.pc[e.detail.value[0]][0]
      })
    }
    this.setData({
      newProvince: that.data.pc[e.detail.value[0]][0],
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