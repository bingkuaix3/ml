var app = getApp()
const API = app.globalData.https + "/x/Handler/Operate.ashx?a=Get_Province_City&data="
var timer = null
Page({
  //页面的初始数据
  data: {
    urlPath: app.globalData.https + "/images/",
    head: '',
    name: '',
    newName: '',
    nameModalHidden: true,
    sex: '',
    newSex: '',
    sexModalHidden: true,
    sexItems: [
      { name: '男', value: '男' },
      { name: '女', value: '女' }
    ],
    birth: '',
    newBirth: '',
    birthModalHidden: true,
    guanzhu: '',
    newGuanzhu: '',
    guanzhuModalHidden: true,
    guanzhuItems: [{ name: '合伙人', value: '合伙人' },
    { name: '项目', value: '项目' },
    { name: '活动', value: '活动' },
    { name: '学习', value: '学习' }],
    city: '',
    newCity: '',
    cityModalHidden: true,
    hangye: '',
    newHangye: '',
    hangyeModalHidden: true,
    hangyeItems: ['请选择行业', '互联网', '计算机软件', '数码通讯', '汽车', '化工', '制药', '生物技术', '机械', '餐饮食品', '医疗健康', '轻工生产', '零售类', '运输', '金融类', '旅游', '房产类', '传媒', '中介咨询', '其他'],
    hangyeIndex: 0,
    email: '',
    newEmail: '',
    emailModalHidden: true,
    company: '',
    newCompany: '',
    companyModalHidden: true,
    zhiwei: '',
    newZhiwei: '',
    zhiweiModalHidden: true,
    phone: '',
    newPhone: '',
    code: '',
    newCode: '',
    phoneModalHidden: true,
    btnDisabled: false,
    btnText: '获取验证码',
    wait: 60,
    bangong: '',
    newBangong: '',
    bangongModalHidden: true,
    mingpian: '',
    newMingPian: '',
    mingpianModalHidden: true,
    shuohuo: '',
    newShouhuo: '',
    shouhuoModalHidden: true,
    isShow: false, // 显示区域选择框
    showDistrict: false, // 默认为省市区三级区域选择
    pc: [],
    proviceData: [],
    cityData: [],
    province: ''
  },
  // 生命周期函数--监听页面加载
  onLoad: function (options) {
    this.pcInit()
  },
  //生命周期函数--监听页面初次渲染完成
  onReady: function () {

  },
  // 生命周期函数--监听页面显示
  onShow: function () {
    this.setData({
      head: app.globalData.huiyuanInfo.touxiangurl,
      name: app.globalData.huiyuanInfo.xingming,
      sex: app.globalData.huiyuanInfo.xingbie,
      birth: app.globalData.huiyuanInfo.birthday,
      guanzhu: app.globalData.huiyuanInfo.focus,
      city: app.globalData.huiyuanInfo.city,
      hangye: app.globalData.huiyuanInfo.hangye,
      email: app.globalData.huiyuanInfo.email,
      company: app.globalData.huiyuanInfo.gongsimingcheng,
      zhiwei: app.globalData.huiyuanInfo.zhiwei,
      phone: app.globalData.huiyuanInfo.shoujihao,
      bangong: app.globalData.huiyuanInfo.workplace,
      mingpian: app.globalData.huiyuanInfo.namecard,
      shuohuo: app.globalData.huiyuanInfo.shoppingaddress
    })
  },
  //生命周期函数--监听页面隐藏
  onHide: function () {

  },
  //生命周期函数--监听页面卸载
  onUnload: function () {

  },
  //页面相关事件处理函数--监听用户下拉动作
  onPullDownRefresh: function () {

  },

  //页面上拉触底事件的处理函数
  onReachBottom: function () {

  },
  // 用户点击右上角分享
  onShareAppMessage: function () {

  },
  settingHead: function () {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: app.globalData.https + "/x/Handler/Operate.ashx",
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'a': 'Update_MemInfo',
            'memid': app.globalData.huiyuanInfo.userid,
            'type': "5",
            'value': ''
          },
          success: function (uploadRes) {
            console.log(uploadRes)
            that.setData({
              head: uploadRes.data.data
            })
          },
          fail: function (res) {
            console.log("上传头像失败" + JSON.stringify(res))
          }
        })
      }
    })
  },
  //打开设置姓名模态框
  showNameModal: function () {
    var that = this;
    that.setData({
      nameModalHidden: false,
      name: that.data.name
    })
  },
  //监听姓名设置
  nameInput: function (e) {
    this.setData({
      newName: e.detail.value
    })
  },
  //设置姓名
  nameModalBindConfirm: function () {
    var that = this;
    if (that.data.newName == '') {
      wx.showToast({
        title: '请输入您的姓名',
        icon: 'success'
      })
      return;
    }
    wx.showLoading({
      title: '设置中',
      mask: true,
      success: function () {
        //请求数据
        wx.request({
          url: app.globalData.https + '/x/Handler/Operate.ashx',
          data: {
            'a': 'Update_MemInfo',
            'memid': app.globalData.huiyuanInfo.userid,
            'type': "1",
            'value': that.data.newName
          },
          method: "post",
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success(res) {
            wx.hideLoading()
            console.lgo(res)
            if (res.data == "1") {
              that.setData({
                nameModalHidden: true,
                name: that.data.newName
              })
              wx.showToast({
                title: '姓名设置成功',
                icon: 'success'
              })
            }
            else if (res.data == "-1") {
              wx.showToast({
                title: '会员不存在',
                icon: 'success'
              })
            } else {
              wx.showToast({
                title: '姓名设置失败',
                icon: 'success'
              })
            }
          }
        })
      }
    })
  },
  //关闭姓名模态框
  nameModalBindCancel: function () {
    this.setData({
      nameModalHidden: true
    })
  },
  //打开设置性别模态框
  showSexModal: function () {
    var that = this;
    that.setData({
      sexModalHidden: false,
      sex: that.data.sex
    })
  },
  //设置性别
  sexModalBindConfirm: function () {
    var that = this;
    if (that.data.newSex == '') {
      wx.showToast({
        title: '请选择您的性别',
        icon: 'success'
      })
      return;
    }
    wx.showLoading({
      title: '设置中',
      mask: true,
      success: function () {
        //请求数据
        wx.request({
          url: app.globalData.https + '/x/Handler/Operate.ashx',
          data: {
            'a': 'Update_MemInfo',
            'memid': app.globalData.huiyuanInfo.userid,
            'type': "2",
            'value': that.data.newSex
          },
          method: "post",
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success(res) {
            wx.hideLoading()
            if (res.data == "1") {
              that.setData({
                sexModalHidden: true,
                sex: that.data.newSex
              })
              wx.showToast({
                title: '性别设置成功',
                icon: 'success'
              })
            }
            else if (res.data == "-1") {
              wx.showToast({
                title: '会员不存在',
                icon: 'success'
              })
            } else {
              wx.showToast({
                title: '性别设置失败',
                icon: 'success'
              })
            }
          }
        })
      }
    })
  },
  //关闭设置性别模态框
  sexModalBindCancel: function () {
    this.setData({
      sexModalHidden: true
    })
  },
  //监听性别选择
  sexChange: function (e) {
    this.setData({
      newSex: e.detail.value
    })
  },
  //打开设置生日模态框
  showBirthModal: function () {
    var that = this;
    that.setData({
      birthModalHidden: false,
      birth: that.data.birth,
      newBirth: that.data.birth
    })
  },
  //设置生日
  birthModalBindConfirm: function () {
    var that = this;
    if (that.data.newBirth == '') {
      wx.showToast({
        title: '请选择您的生日',
        icon: 'success'
      })
      return;
    }
    wx.showLoading({
      title: '设置中',
      mask: true,
      success: function () {
        //请求数据
        wx.request({
          url: app.globalData.https + '/x/Handler/Operate.ashx',
          data: {
            'a': 'Update_MemInfo',
            'memid': app.globalData.huiyuanInfo.userid,
            'type': "3",
            'value': that.data.newBirth
          },
          method: "post",
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success(res) {
            wx.hideLoading()
            if (res.data == "1") {
              that.setData({
                birthModalHidden: true,
                birth: that.data.newBirth
              })
              wx.showToast({
                title: '生日设置成功',
                icon: 'success'
              })
            }
            else if (res.data == "-1") {
              wx.showToast({
                title: '会员不存在',
                icon: 'success'
              })
            } else {
              wx.showToast({
                title: '生日设置失败',
                icon: 'success'
              })
            }
          }
        })
      }
    })
  },
  //关闭设置生日模态框
  birthModalBindCancel: function () {
    this.setData({
      birthModalHidden: true
    })
  },
  //监听生日选择
  birthChange: function (e) {
    this.setData({
      newBirth: e.detail.value
    })
  },
  //打开设置关注点模态框
  showGuanzhuModal: function () {
    var that = this;
    that.setData({
      guanzhuModalHidden: false,
      guanzhu: that.data.guanzhu
    })
  },
  //设置关注
  guanzhuModalBindConfirm: function () {
    var that = this;
    if (that.data.newGuanzhu == '') {
      wx.showToast({
        title: '请选择您的关注点',
        icon: 'success'
      })
      return;
    }
    var guanzhu=""
    for (let i = 0; i < that.data.newGuanzhu.length;i++){
      if(guanzhu == '')
        guanzhu += that.data.newGuanzhu[i]
      else
        guanzhu += ","+that.data.newGuanzhu[i]
    }
    wx.showLoading({
      title: '设置中',
      mask: true,
      success: function () {
        //请求数据
        wx.request({
          url: app.globalData.https + '/x/Handler/Operate.ashx',
          data: {
            'a': 'Update_MemInfo',
            'memid': app.globalData.huiyuanInfo.userid,
            'type': "4",
            'value': guanzhu
          },
          method: "post",
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success(res) {
            wx.hideLoading()
            if (res.data == "1") {
              that.setData({
                guanzhuModalHidden: true,
                guanzhu: that.data.newGuanzhu
              })
              wx.showToast({
                title: '关注点设置成功',
                icon: 'success'
              })
            }
            else if (res.data == "-1") {
              wx.showToast({
                title: '会员不存在',
                icon: 'success'
              })
            } else {
              wx.showToast({
                title: '生日设置失败',
                icon: 'success'
              })
            }
          }
        })
      }
    })
    
  },
  //关闭设置关注点模态框
  guanzhuModalBindCancel: function () {
    this.setData({
      guanzhuModalHidden: true
    })
  },
  //监听关注选择
  guanzhuChange: function (e) {
    this.setData({
      newGuanzhu: e.detail.value
    })
  },
  //打开设置城市模态框
  showCityModal: function () {
    this.pcInit()
    this.setData({
      isShow: true
    })
    // that.setData({
    //   cityModalHidden: false
    // })
    // wx.showLoading({
    //   title: '正在定位中',
    //   mask: true,
    //   success: function () {
    //     //获得地址位置
    //     wx.getLocation({
    //       success: function (res) {
    //         var latitude = res.latitude
    //         var longitude = res.longitude
    //         wx.request({
    //           url: 'https://apis.map.qq.com/ws/geocoder/v1/?location=' + latitude + ',' + longitude + '&key=635BZ-QRSKF-6O2JD-J3SFC-OB24T-UHBD6',
    //           header: {
    //             'content-type': 'application/json'
    //           },
    //           success: function (res) {
    //             wx.hideLoading()
    //             if (res.data.status != 0) {
    //               wx.showToast({
    //                 title: info.message,
    //                 icon: 'success'
    //               })
    //               return;
    //             }
    //             that.setData({
    //               newCity: res.data.result.address_component.city
    //             })
    //           },
    //           fail: function (res) {
    //             wx.hideLoading()
    //           }
    //         })
    //       },
    //       fail: function (res) {
    //         wx.hideLoading()
    //       }
    //     })
    //   },
    //   fail: function () {
    //     wx.hideLoading()
    //   }
    // })
  },
  //设置城市
  cityModalBindConfirm: function () {
    var that = this;

    var that = this;
    if (that.data.newCity == '' || that.data.newCity == "请选择") {
      wx.showToast({
        title: '请选择城市',
        icon: 'success'
      })
      return;
    }
    wx.showLoading({
      title: '设置中',
      mask: true,
      success: function () {
        //请求数据
        wx.request({
          url: app.globalData.https + '/x/Handler/Operate.ashx',
          data: {
            'a': 'Update_MemInfo',
            'memid': app.globalData.huiyuanInfo.userid,
            'type': "6",
            'value': that.data.province + "," + that.data.newCity
          },
          method: "post",
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success(res) {
            wx.hideLoading()
            if (res.data == "1") {
              that.setData({
                isShow: false,
                city: that.data.newCity
              })
              wx.showToast({
                title: '城市设置成功',
                icon: 'success'
              })
            }
            else if (res.data == "-1") {
              wx.showToast({
                title: '会员不存在',
                icon: 'success'
              })
            } else {
              wx.showToast({
                title: '城市设置失败',
                icon: 'success'
              })
            }
          }
        })
      }
    })
  },
  /**
   * 页面选址触发事件
   */
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
  //关闭设置城市模态框
  cityModalBindCancel: function () {
    this.setData({
      isShow: false
    })
  },
  //打开设置行业模态框
  showHangyeModal: function () {
    var that = this;
    that.setData({
      hangyeModalHidden: false,
      hangye: that.data.hangye
    })
  },
  //设置行业
  hangyeModalBindConfirm: function () {
    var that = this;
    if (that.data.newHangye == '' || that.data.newHangye == '请选择行业') {
      wx.showToast({
        title: '请选择您的所属行业',
        icon: 'success'
      })
      return;
    }
    that.setData({
      hangyeModalHidden: true,
      hangye: that.data.newHangye
    })
    wx.showToast({
      title: '行业设置成功',
      icon: 'success'
    })
  },
  //关闭设置行业模态框
  hangyeModalBindCancel: function () {
    this.setData({
      hangyeModalHidden: true
    })
  },
  //监听行业选择
  hangyeChange: function (e) {
    var that = this;
    if (that.data.hangyeItems[e.detail.value] != '请选择行业') {
      that.setData({
        newHangye: that.data.hangyeItems[e.detail.value]
      })
    }
  },
  //打开设置邮箱模态框
  showEmailModal: function () {
    var that = this;
    that.setData({
      emailModalHidden: false,
      email: that.data.email
    })
  },
  //监听邮箱设置
  emailInput: function (e) {
    this.setData({
      newEmail: e.detail.value
    })
  },
  //设置邮箱
  emailModalBindConfirm: function () {
    var that = this;
    if (that.data.newEmail == '') {
      wx.showToast({
        title: '请输入您邮箱',
        icon: 'success'
      })
      return;
    }
    wx.showLoading({
      title: '设置中',
      mask: true,
      success: function () {
        //请求数据
        wx.request({
          url: app.globalData.https + '/x/Handler/Operate.ashx',
          data: {
            'a': 'Update_MemInfo',
            'memid': app.globalData.huiyuanInfo.userid,
            'type': "11",
            'value': that.data.newEmail
          },
          method: "post",
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success(res) {
            wx.hideLoading()
            if (res.data == "1") {
              that.setData({
                emailModalHidden: true,
                email: that.data.newEmail
              })
              wx.showToast({
                title: '邮箱设置成功',
                icon: 'success'
              })
            }
            else if (res.data == "-1") {
              wx.showToast({
                title: '会员不存在',
                icon: 'success'
              })
            } else {
              wx.showToast({
                title: '邮箱设置失败',
                icon: 'success'
              })
            }
          }
        })
      }
    })

  },
  //关闭邮箱模态框
  emailModalBindCancel: function () {
    this.setData({
      emailModalHidden: true
    })
  },
  //打开设置公司模态框
  showCompanyModal: function () {
    var that = this;
    that.setData({
      companyModalHidden: false,
      company: that.data.company
    })
  },
  //监听公司设置
  companyInput: function (e) {
    this.setData({
      newCompany: e.detail.value
    })
  },
  //设置公司
  companyModalBindConfirm: function () {
    var that = this;
    if (that.data.newCompany == '') {
      wx.showToast({
        title: '请输入您的公司',
        icon: 'success'
      })
      return;
    }
    wx.showLoading({
      title: '设置中',
      mask: true,
      success: function () {
        //请求数据
        wx.request({
          url: app.globalData.https + '/x/Handler/Operate.ashx',
          data: {
            'a': 'Update_MemInfo',
            'memid': app.globalData.huiyuanInfo.userid,
            'type': "8",
            'value': that.data.newCompany
          },
          method: "post",
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success(res) {
            wx.hideLoading()
            if (res.data == "1") {
              that.setData({
                companyModalHidden: true,
                company: that.data.newCompany
              })
              wx.showToast({
                title: '公司设置成功',
                icon: 'success'
              })
            }
            else if (res.data == "-1") {
              wx.showToast({
                title: '会员不存在',
                icon: 'success'
              })
            } else {
              wx.showToast({
                title: '公司设置失败',
                icon: 'success'
              })
            }
          }
        })
      }
    })
  },
  //关闭姓名模态框
  companyModalBindCancel: function () {
    this.setData({
      companyModalHidden: true
    })
  },
  //打开设置职位模态框
  showZhiweiModal: function () {
    var that = this;
    that.setData({
      zhiweiModalHidden: false,
      zhiwei: that.data.zhiwei
    })
  },
  //监听职位设置
  zhiweiInput: function (e) {
    this.setData({
      newZhiwei: e.detail.value
    })
  },
  //设置职位
  zhiweiModalBindConfirm: function () {
    var that = this;
    if (that.data.newZhiwei == '') {
      wx.showToast({
        title: '请输入您的职位',
        icon: 'success'
      })
      return;
    }
    wx.showLoading({
      title: '设置中',
      mask: true,
      success: function () {
        //请求数据
        wx.request({
          url: app.globalData.https + '/x/Handler/Operate.ashx',
          data: {
            'a': 'Update_MemInfo',
            'memid': app.globalData.huiyuanInfo.userid,
            'type': "9",
            'value': that.data.newZhiwei
          },
          method: "post",
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success(res) {
            wx.hideLoading()
            if (res.data == "1") {
              that.setData({
                zhiweiModalHidden: true,
                zhiwei: that.data.newZhiwei
              })
              wx.showToast({
                title: '职位设置成功',
                icon: 'success'
              })
            }
            else if (res.data == "-1") {
              wx.showToast({
                title: '会员不存在',
                icon: 'success'
              })
            } else {
              wx.showToast({
                title: '职位设置失败',
                icon: 'success'
              })
            }
          }
        })
      }
    })
  },
  //关闭职位模态框
  zhiweiModalBindCancel: function () {
    this.setData({
      zhiweiModalHidden: true
    })
  },
  //打开设置手机号模态框
  showPhoneModal: function () {
    var that = this;
    that.setData({
      phoneModalHidden: false,
      phone: that.data.phone,
      code: '',
      newCode: '',
      wait: 60,
      btnDisabled: false,
      btnText: "获取验证码",
    })
    clearInterval(timer)
  },
  //监听验证码设置
  codeInput: function (e) {
    this.setData({
      newCode: e.detail.value
    })
  },
  //监听手机号设置
  phoneInput: function (e) {
    this.setData({
      newPhone: e.detail.value
    })
  },
  //发送验证码
  sendCode: function () {
    var that = this;
    if (that.data.newPhone == '') {
      wx.showToast({
        title: '请输入您的手机号',
        icon: 'success'
      })
      return;
    }
    if (that.data.newPhone.length != 11) {
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
        shoujihao: that.data.newPhone,
        code: code
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        wx.hideToast();
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
  //设置手机号
  phoneModalBindConfirm: function () {
    var that = this;
    if (that.data.newPhone == '') {
      wx.showToast({
        title: '请输入您的手机号',
        icon: 'success'
      })
      return;
    }
    if (that.data.newPhone.length != 11) {
      wx.showToast({
        title: '请输入11位手机号',
        icon: 'success'
      })
      return;
    }
    if (that.data.newCode == '') {
      wx.showToast({
        title: '请输入验证码',
        icon: 'success'
      })
      return;
    }
    if (that.data.newCode != that.data.code) {
      wx.showToast({
        title: '验证码错误',
        icon: 'success'
      })
      return;
    }
    wx.showLoading({
      title: '设置中',
      mask: true,
      success: function () {
        //请求数据
        wx.request({
          url: app.globalData.https + '/x/Handler/Operate.ashx',
          data: {
            'a': 'Update_MemInfo',
            'memid': app.globalData.huiyuanInfo.userid,
            'type': "10",
            'value': that.data.newPhone
          },
          method: "post",
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success(res) {
            wx.hideLoading()
            if (res.data == "1") {
              that.setData({
                phoneModalHidden: true,
                phone: that.data.newPhone
              })
              wx.showToast({
                title: '手机号设置成功',
                icon: 'success'
              })
            }
            else if (res.data == "-1") {
              wx.showToast({
                title: '会员不存在',
                icon: 'success'
              })
            } else {
              wx.showToast({
                title: '手机号设置失败',
                icon: 'success'
              })
            }
          }
        })
      }
    })
  },
  //关闭设置手机号模态框
  phoneModalBindCancel: function () {
    this.setData({
      phoneModalHidden: true
    })
  },
  //创建验证码
  createCode: function () {
    var charactors = "1234567890";
    var val = '', i;
    for (var j = 1; j <= 4; j++) {
      i = parseInt(10 * Math.random());
      val = val + charactors.charAt(i);
    }
    return val;
  },
  //打开设置办公模态框
  showBangongModal: function () {
    var that = this;
    that.setData({
      bangongModalHidden: false,
      bangong: that.data.bangong
    })
  },
  //监听办公设置
  bangongInput: function (e) {
    this.setData({
      newBangong: e.detail.value
    })
  },
  //设置职位
  bangongModalBindConfirm: function () {
    var that = this;
    if (that.data.newBangong == '') {
      wx.showToast({
        title: '请输入您的办公地址',
        icon: 'success'
      })
      return;
    }
    wx.showLoading({
      title: '设置中',
      mask: true,
      success: function () {
        //请求数据
        wx.request({
          url: app.globalData.https + '/x/Handler/Operate.ashx',
          data: {
            'a': 'Update_MemInfo',
            'memid': app.globalData.huiyuanInfo.userid,
            'type': "14",
            'value': that.data.newBangong
          },
          method: "post",
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success(res) {
            wx.hideLoading()
            if (res.data == "1") {
              that.setData({
                bangongModalHidden: true,
                zhiwei: that.data.newBangong
              })
              wx.showToast({
                title: '办公地址设置成功',
                icon: 'success'
              })
            }
            else if (res.data == "-1") {
              wx.showToast({
                title: '会员不存在',
                icon: 'success'
              })
            } else {
              wx.showToast({
                title: '办公地址设置失败',
                icon: 'success'
              })
            }
          }
        })
      }
    })

  },
  //关闭办公模态框
  bangongModalBindCancel: function () {
    this.setData({
      bangongModalHidden: true
    })
  },
  //打开设置收货模态框
  showShouhuoModal: function () {
    var that = this;
    that.setData({
      shouhuoModalHidden: false,
      shouhuo: that.data.shouhuo
    })
  },
  //监听办公设置
  shouhuoInput: function (e) {
    this.setData({
      newShouhuo: e.detail.value
    })
  },
  //设置职位
  shouhuoModalBindConfirm: function () {
    var that = this;
    if (that.data.newShuohou == '') {
      wx.showToast({
        title: '请输入您的收货地址',
        icon: 'success'
      })
      return;
    }
    wx.showLoading({
      title: '设置中',
      mask: true,
      success: function () {
        //请求数据
        wx.request({
          url: app.globalData.https + '/x/Handler/Operate.ashx',
          data: {
            'a': 'Update_MemInfo',
            'memid': app.globalData.huiyuanInfo.userid,
            'type': "13",
            'value': that.data.newShouhuo
          },
          method: "post",
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success(res) {
            wx.hideLoading()
            if (res.data == "1") {
              that.setData({
                shouhuoModalHidden: true,
                shouhuo: that.data.newShouhuo
              })
              wx.showToast({
                title: '收货址设置成功',
                icon: 'success'
              })
            }
            else if (res.data == "-1") {
              wx.showToast({
                title: '会员不存在',
                icon: 'success'
              })
            } else {
              wx.showToast({
                title: '收货地址设置失败',
                icon: 'success'
              })
            }
          }
        })
      }
    })

  },
  //关闭收货模态框
  shouhuoModalBindCancel: function () {
    this.setData({
      shouhuoModalHidden: true
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
