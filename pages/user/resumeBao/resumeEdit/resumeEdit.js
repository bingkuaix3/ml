// pages/wo/jianli/jianli.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jianliname: "",
    createtime: "",
    updatetime: "",
    name: "",
    sex: 0,
    radiom: false,
    radiof: false,
    modal: true,
    xmm: true,
    input: "",
    jbxxh: 0,
    jyjlh: 0,
    gzjyh: 0,
    headpic: "",
    id: 0,
    birthday: "",
    phone: '',
    sname: "",
    sstarttime: '',
    sendtime: "",
    slevel: "",
    smajorname: "",
    cname: '',
    cstarttime: "",
    cendtime: "",
    clevel: "",
    cjob_name: "",
    cjob_type: "",
    cdescs: "",
    inputxm: "",
    telm: true,
    inputtel: "",
    pc: [],
    proviceData: [],
    cityData: [],
    isShow: false,
    cityt: "",
    xxm: true,
    inputxx: "",
    study: ["中专", "大专", "本科", "硕士", "博士"],
    inits: [],
    initj: [],
    gsm: true,
    inputgs: "",
    zwm: true,
    inputzw: "",
    edu_id: "",
    job_id: "",
    zyid: "",
    znid: "",
    mc: false,
    fc: true,
    qc: false,
    jc: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("id=" + options.id)
    var id = options.id
    var that = this
    that.setData({
      memid: app.globalData.huiyuanInfo.userid,
      id: id
    })
    wx.showLoading({
      title: "加载中",
      mask: false,
      success: function () {
        that.init(id)
        that.pcInit()
        that.inits()
        that.initj()
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
  //初始化学科
  inits() {
    var that = this
    wx.request({
      url: app.globalData.https + '/x/Handler/Operate.ashx',
      data: ({
        a: "Get_MajorList",
        type: 1
      }),
      success: function (res) {
        var data = JSON.stringify(res.data);
        var list = JSON.parse(data)
        // console.log("学科数据" + data)
        that.setData({
          inits: list.data[1].info2
        })

      },
      fail: function () {

      }
    })
  },
  //初始化行业
  initj() {
    var that = this
    wx.request({
      url: app.globalData.https + '/x/Handler/Operate.ashx',
      data: ({
        a: "Get_MajorList",
        type: 2
      }),
      success: function (res) {
        var data = JSON.stringify(res.data);
        var list = JSON.parse(data)
        console.log("专业数据" + data)
        that.setData({
          initj: list.data[1].info2
        })
        // console.log(JSON.stringify(list.data[0].info2))
        // console.log(JSON.stringify(that.data.initj))
      },
      fail: function () {

      }
    })
  },
  //初始化数据
  init: function (id) {
    var that = this
    wx.request({
      url: app.globalData.https + '/x/Handler/Operate.ashx',
      data: {
        a: "Get_CVDetail",
        id: that.data.id,
        memid: that.data.memid
      },
      success: function (res) {
        setTimeout(function () {
          wx.hideLoading()
        }, 2000)
        var data = JSON.stringify(res.data);
        var list = JSON.parse(data)
        console.log("简历数据" + data)
        that.setData({
          jianliname: decodeURI(list.data[0].CV_info[0].name),
          createtime: decodeURI(list.data[0].CV_info[0].createtime.substr(0, list.data[0].CV_info[0].createtime.length - 8)),
          updatetime: decodeURI(list.data[0].CV_info[0].updatetime.substr(0, list.data[0].CV_info[0].updatetime.length - 8)),
          headpic: "https://qing.meilizhongguo.wang/" + list.data[0].CV_info[0].headpic,
          birthday: decodeURI(list.data[0].CV_info[0].birthday.substr(0, list.data[0].CV_info[0].createtime.length - 8)),
          name: decodeURI(list.data[0].CV_info[0].memname),
          phone: decodeURI(list.data[0].CV_info[0].phone),
          city: decodeURI(list.data[0].CV_info[0].live_city),
          edu_id: decodeURI(list.data[1].school_info[0].ID),
          sname: decodeURI(list.data[1].school_info[0].name),
          sstarttime: decodeURI(list.data[1].school_info[0].starttime.substr(0, list.data[1].school_info[0].starttime.length - 8)),
          sendtime: decodeURI(list.data[1].school_info[0].endtime.substr(0, list.data[1].school_info[0].endtime.length - 8)),
          slevel: decodeURI(list.data[1].school_info[0].level),
          smajorname: decodeURI(list.data[1].school_info[0].majorname),
          job_id: decodeURI(list.data[2].job_info[0].ID),
          cname: decodeURI(list.data[2].job_info[0].name),
          cstarttime: decodeURI(list.data[2].job_info[0].starttime.substr(0, list.data[2].job_info[0].starttime.length - 8)),
          cendtime: decodeURI(list.data[2].job_info[0].endtime.substr(0, list.data[2].job_info[0].endtime.length - 8)),
          clevel: decodeURI(list.data[2].job_info[0].level),
          cjob_name: decodeURI(list.data[2].job_info[0].job_name),
          cjob_type: decodeURI(list.data[2].job_info[0].job_type),
          cdescs: decodeURI(list.data[2].job_info[0].descs),
        })
        //console.log("birthday=" + list.data[0].CV_info[0].birthday.split(" ")[0])
        // console.log(that.data.value)

        if (list.data[2].job_info[0].job_type == "兼职") {
          that.setData({
            jc: true,
            qc: false,
          })
        } else {
          that.setData({
            qc: true,
            jc: false,
          })
        }
        if (list.data[0].CV_info[0].sex == 0) {
          that.setData({
            fc: true,
            mc: false,
          })
        } else {
          that.setData({
            fc: false,
            mc: true,
          })
        }
      },
    })
  },
  // <modal title= "职位名称" hidden= "{{zwm}}" confirm- text="确定" cancel- text="取消" bindconfirm= "zwco" bindcancel= "zwca" >
  // <input placeholder="请输入姓名" bindinput= "inputzw" />
  // </modal>

  //修改职位名称
  zwchange: function () {
    var that = this
    that.setData({
      zwm: false
    })
  },

  inputzw: function (e) {
    this.setData({
      inputzw: e.detail.value
    })
  },
  zwco: function () {
    var that = this
    if (that.data.inputzw.length > 20) {
      that.setData({
        zwm: false,
      })
      wx.showToast({
        title: '输入字符过长（20以内）',
        icon: 'loading',
      })
    } else if (that.data.inputzw.length == 0) {
      that.setData({
        zwm: false,
      })
      wx.showToast({
        title: '内容不能为空',
        icon: 'loading',
      })
    } else {
      that.setData({
        zwm: true,
        cjob_name: that.data.inputzw
      })
    }
  },
  //弹出框取消事件
  zwca: function () {
    var that = this
    that.setData({
      zwm: true,
    })
  },

  //修改公司名称
  gschange: function () {
    var that = this
    that.setData({
      gsm: false
    })
  },

  inputgs: function (e) {
    this.setData({
      inputgs: e.detail.value
    })
  },
  gsco: function () {
    var that = this
    if (that.data.inputgs.length > 20) {
      that.setData({
        gsm: false,
      })
      wx.showToast({
        title: '输入字符过长（20以内）',
        icon: 'loading',
      })
    } else if (that.data.inputgs.length == 0) {
      that.setData({
        gsm: false,
      })
      wx.showToast({
        title: '内容不能为空',
        icon: 'loading',
      })
    } else {
      that.setData({
        gsm: true,
        cname: that.data.inputgs
      })
    }
  },
  //弹出框取消事件
  gsca: function () {
    var that = this
    that.setData({
      gsm: true,
    })
  },


  //修改学校名称
  xxchange: function () {
    var that = this
    that.setData({
      xxm: false
    })
  },

  inputxx: function (e) {
    this.setData({
      inputxx: e.detail.value
    })
  },
  xxco: function () {
    var that = this
    if (that.data.inputxx.length > 20) {
      that.setData({
        xxm: false,
      })
      wx.showToast({
        title: '输入字符过长（20以内）',
        icon: 'loading',
      })
    } else if (that.data.inputxx.length == 0) {
      that.setData({
        xxm: false,
      })
      wx.showToast({
        title: '内容不能为空',
        icon: 'loading',
      })
    } else {
      that.setData({
        xxm: true,
        sname: that.data.inputxx
      })
    }
  },
  //弹出框取消事件
  xxca: function () {
    var that = this
    that.setData({
      xxm: true,
    })
  },

  //修改手机号
  telchange: function () {
    var that = this
    that.setData({
      telm: false
    })
  },

  inputtel: function (e) {
    this.setData({
      inputtel: e.detail.value
    })
  },
  telco: function () {
    var that = this
    if (that.data.inputtel.length != 11) {
      that.setData({
        telm: false,
      })
      wx.showToast({
        title: '号码位数错误',
        icon: 'loading',
      })
    } else {
      that.setData({
        telm: true,
        phone: that.data.inputtel
      })
    }
  },
  //弹出框取消事件
  telca: function () {
    var that = this
    that.setData({
      telm: true,
    })
  },



  //修改姓名
  xmchange: function () {
    var that = this
    that.setData({
      xmm: false
    })
  },

  inputxm: function (e) {
    this.setData({
      inputxm: e.detail.value
    })
  },
  xmco: function () {
    var that = this
    if (that.data.inputxm.length > 20) {
      that.setData({
        xmm: true,
      })
      wx.showToast({
        title: '输入内容过长(20个字符以内)',
        icon: 'loading',
      })
    } else if (that.data.inputxm.length == 0) {
      that.setData({
        xmm: false,
      })
      wx.showToast({
        title: '内容不能为空',
        icon: 'loading',
      })
    } else {
      that.setData({
        xmm: true,
        name: that.data.inputxm
      })
    }
  },
  //弹出框取消事件
  xmca: function () {
    var that = this
    that.setData({
      xmm: true,
    })
  },

  //选择名称
  xiugaimingcheng: function () {
    var that = this
    that.setData({
      modal: false
    })
  },
  //弹出框确认事件
  modalconfirm: function () {
    var that = this
    if (that.data.input.length > 20) {
      that.setData({
        modal: true,
      })
      wx.showToast({
        title: '输入内容过长(20个字符以内)',
        icon: 'loading',
      })
    } else if (that.data.inputxm.length == 0) {
      that.setData({
        modal: false,
      })
      wx.showToast({
        title: '内容不能为空',
        icon: 'loading',
      })
    } else {
      that.setData({
        modal: true,
        jianliname: that.data.input
      })
    }
  },
  //弹出框取消事件
  modalcancel: function () {
    var that = this
    that.setData({
      modal: true,
    })
  },
  //弹出框输入
  input: function (e) {
    this.setData({
      input: e.detail.value
    })
  }
  ,
  //内容隐藏/展开
  xxzhankai: function () {
    var that = this
    if (that.data.jbxxh == 0) {
      that.setData({
        jbxxh: 1
      })
    } else {
      that.setData({
        jbxxh: 0
      })
    }
    //  console.log(that.data.jbxxh)
  },
  jlzhankai: function () {
    var that = this
    if (that.data.jyjlh == 0) {
      that.setData({
        jyjlh: 1
      })
    } else {
      that.setData({
        jyjlh: 0
      })
    }
    console.log(that.data.jyjlh)
  },
  jyzhankai: function () {
    var that = this
    if (that.data.gzjyh == 0) {
      that.setData({
        gzjyh: 1
      })
    } else {
      that.setData({
        gzjyh: 0
      })
    }
    console.log(that.data.gzjyh)
  },
  updataheadpic: function () {

  },
  sex: function (e) {

    var that = this
    that.setData({
      sex: e.detail.value
    })
    console.log("sex=" + e.detail.value)
  },
  jobtype: function (e) {

    var that = this
    if (e.detail.value == 1) {
      that.setData({
        cjob_type: "全职"
      })
    } else {
      that.setData({
        cjob_type: "兼职"
      })
    }

    console.log("cjob_type=" + that.data.cjob_type)
  },

  //专业变化

  zychange: function (e) {
    var that = this
    var val = e.detail.value
    that.setData({
      smajorname: that.data.inits[val].name,
      zyid: that.data.inits[val].id
    })
  },
  //职能变化
  znchange: function (e) {
    var that = this
    var val = e.detail.value
    that.setData({
      clevel: that.data.initj[val].name,
      znid: that.data.initj[val].id
    })
  },
  //学历变化
  slchange: function (e) {
    var that = this
    var val = e.detail.value
    that.setData({
      slevel: that.data.study[val]
    })
    console.log("val=" + val)
  },
  //日期变化
  bindDateChange: function (e) {
    var that = this
    var val = e.detail.value.replace(/-/g, '/')
    that.setData({
      birthday: val
    })
    console.log("birthday=" + that.data.birthday)
  },
  //日期变化

  cschange: function (e) {
    var that = this
    var val = e.detail.value.replace(/-/g, '/')
    that.setData({
      cstarttime: val
    })
    console.log("cstarttime=" + that.data.cstarttime)
  },
  cechange: function (e) {
    var that = this
    var val = e.detail.value.replace(/-/g, '/')
    that.setData({
      cendtime: val
    })
    console.log("cendtime=" + that.data.cendtime)
  },
  sschange: function (e) {
    var that = this
    var val = e.detail.value.replace(/-/g, '/')
    that.setData({
      sstarttime: val
    })
    console.log("sstarttime=" + that.data.sstarttime)
  },
  //日期变化
  sechange: function (e) {
    var that = this
    var val = e.detail.value.replace(/-/g, '/')
    that.setData({
      sendtime: val
    })
    console.log("sendtime=" + that.data.sendtime)
  },
  /**
  * 保存
  */
  baocun: function () {
    console.log("保存")
    var that = this
    wx.request({
      url: app.globalData.https + "/x/Handler/Operate.ashx",
      data: ({
        a: "Update_CV",
        cv_id: that.data.id,
        edu_id: that.data.edu_id,
        job_id: that.data.job_id,
        memid: that.data.memid,
        cv_name: that.data.jianliname,
        mem_name: that.data.name,
        sex: that.data.sex,
        birthday: that.data.birthday,
        phone: that.data.phone,
        live_province: "",
        live_city: that.data.city,
        edu_name: that.data.sname,
        edu_starttime: that.data.sstarttime,
        edu_endtime: that.data.sendtime,
        edu_level: that.data.slevel,
        edu_major_id: that.data.zyid,
        company_name: that.data.cname,
        job_starttime: that.data.cstarttime,
        job_endtime: that.data.cendtime,
        job_major_id: that.data.znid,
        job_name: that.data.cjob_name,
        job_type: that.data.cjob_type,
        job_desc: that.data.cdescs
      }),
      success: function (res) {
        if (res.data == 1) {
          wx.showToast({
            title: '更新成功',
            icon: 'success',
          })
        } else {
          wx.showToast({
            title: '更新失败',
            icon: 'loading',
          })
        }
      },
      fail: function () {

      }
    })
  },
  /**
  * 后退
  */
  houtui: function () {
    console.log("后退")
  }
  ,
  /**
  * 修改头像
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
          url: app.globalData.https + "/x/Handler/Operate.ashx",
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'a': 'Update_CV_Headpic',
            "memid": that.data.memid,
            "cv_id": that.data.id
          },
          success: function (uploadRes) {
            console.log("上传图片" + uploadRes.data)
            if (uploadRes.data == "1") {
              wx.showToast({
                title: '图片上传成功',
                icon: 'success',
              })
              that.setData({
                headpic: tempFilePaths[0]
              })
              console.log(tempFilePaths[0])
            }
            else if (uploadRes.data == "-2") {
              wx.showToast({
                title: '图片格式错误',
                icon: 'loading',
              })
            }
            else if (uploadRes.data == "-3") {
              wx.showToast({
                title: '图片过大',
                icon: 'loading',
              })
            } else if (uploadRes.data == "-4") {
              wx.showToast({
                title: '图片为空',
                icon: 'loading',
              })
            } else if (uploadRes.data == "-5") {
              wx.showToast({
                title: '数据库更新失败',
                icon: 'loading',
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
  //数组初始化
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
      //console.log(pc[i][0])
      p.push(pc[i][0])
    }
    that.setData({
      pc: pc,
      proviceData: p,
      cityData: ["请选择"]
    })
    // console.log("pc="+that.data.pc)
    // console.log("proviceData=" + that.data.proviceData)
    // console.log("cityData=" + that.data.cityData)
  },
  //选择城市
  city: function () {
    var that = this
    that.setData({
      isShow: true
    })
  },
  //选择城市取消
  cityModalBindCancel: function () {
    var that = this
    that.setData({
      isShow: false
    })
  },
  //选择城市确定
  cityModalBindConfirm: function () {
    var that = this
    that.setData({
      isShow: false,
      city: that.data.cityt
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
      cityt: citys[e.detail.value[1]]
    })


  },
  //textarea
  textarea: function (e) {
    this.setData({
      cdescs: encodeURI(e.detail.value)
    })
    console.log(this.data.cdescs)
  }


})