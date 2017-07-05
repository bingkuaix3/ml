// pages/wo/caifubao/chongzhi/chongzhi.js
var app = getApp()
Page({
  //页面的初始数据
  data: {
    urlPath: app.globalData.https + "/images/",
    money: '1',
    boxState1: '',
    boxState2: '',
    boxState3: '',
    boxState4: '',
    boxState5: '',
    boxState6: '',
  },
  //生命周期函数--监听页面加载
  onLoad: function (options) {

  },
  //生命周期函数--监听页面初次渲染完成
  onReady: function () {

  },
  //生命周期函数--监听页面显示
  onShow: function () {

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
  //用户点击右上角分享
  onShareAppMessage: function () {

  },
  //金额输入
  recordMoney: function (e) {
    this.setData({
      money: e.detail.value
    })
  },
  //选择充值金额
  selectMoney: function (e) {

    this.setData({
      money: e.currentTarget.dataset.money
    })
    if (e.currentTarget.dataset.money == "50") {
      this.setData({
        boxState1: "box-active",
        boxState2: "",
        boxState3: "",
        boxState4: "",
        boxState5: "",
        boxState6: "",
      })
    } else if (e.currentTarget.dataset.money == "200") {
      this.setData({
        boxState1: "",
        boxState2: "box-active",
        boxState3: "",
        boxState4: "",
        boxState5: "",
        boxState6: "",
      })
    } else if (e.currentTarget.dataset.money == "500") {
      this.setData({
        boxState1: "",
        boxState2: "",
        boxState3: "box-active",
        boxState4: "",
        boxState5: "",
        boxState6: "",
      })
    } else if (e.currentTarget.dataset.money == "1000") {
      this.setData({
        boxState1: "",
        boxState2: "",
        boxState3: "",
        boxState4: "box-active",
        boxState5: "",
        boxState6: "",
      })
    } else if (e.currentTarget.dataset.money == "5000") {
      this.setData({
        boxState1: "",
        boxState2: "",
        boxState3: "",
        boxState4: "",
        boxState5: "box-active",
        boxState6: "",
      })
    } else if (e.currentTarget.dataset.money == "10000") {
      this.setData({
        boxState1: "",
        boxState2: "",
        boxState3: "",
        boxState4: "",
        boxState5: "",
        boxState6: "box-active",
      })
    }

  },
  //支付
  zhifu: function () {
    var that = this
    var money = parseInt(that.data.money);
    if (money > 20000) {
      wx.showToast({
        title: '最大不能超过20000元',
        icon: 'success'
      })
      return;
    }
    if (money < 0) {
      wx.showToast({
        title: '最小不能低于1元',
        icon: 'success'
      })
      return;
    }
    faqizhifu(that, money)
  }
})
//发起支付
function faqizhifu(that, jine) {
  wx.showToast({
    title: '正在生成支付',
    icon: 'loading',
    duration: 10000
  })
  //信息验证
  wx.request({
    url: app.globalData.https + '/x/Get_ZhiFu.aspx',
    data: {
      userid: app.globalData.huiyuanInfo.userid,
      jine: jine
    },
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    success: function (res) {
      var str = res.data;
      if (str == '未找到用户信息') {
        wx.showToast({
          title: str,
          icon: 'success'
        })
        return;
      }
      else if (str == '金额不正确') {
        wx.showToast({
          title: str,
          icon: 'success'
        })
        return;
      }
      else if (str == '生成支付失败') {
        wx.showToast({
          title: str,
          icon: 'success'
        })
        return;
      }
      else {
        var by = str.split(',');
        console.log(by);
        if (by.length != 6) {
          wx.showToast({
            title: '数据异常',
            icon: 'success'
          })
          return;
        }
        wx.hideToast();
        zhifuchenggong(that, "14958677872256", jine);
        //进行微信支付
        wx.requestPayment({
          'timeStamp': by[1],
          'nonceStr': by[2],
          'package': by[3],
          'signType': by[4],
          'paySign': by[5],
          'success': function (res) {
            if (res.errMsg == 'requestPayment:ok') {
              //支付成功
              zhifuchenggong(that, by[0], jine);
            }
            else {
              wx.showToast({
                title: '支付失败',
                icon: 'success'
              })
            }
          },
          'fail': function (res) {
            if (res.errMsg == 'requestPayment:fail cancel') {
              wx.showToast({
                title: '您已取消支付',
                icon: 'success'
              })
            }
          }
        })
      }
    },
    fail: function (res) {
      wx.hideToast();
      wx.navigateTo({
        url: '../error/error?error=' + res.data
      })
    }
  })
}
//支付成功
function zhifuchenggong(that, dingdanhao, jine) {
  wx.showToast({
    title: '正在处理支付',
    icon: 'loading',
    duration: 10000
  })
  //记录支付信息
  wx.request({
    url: app.globalData.https + '/x/Get_ZhiFuChengGong.aspx',
    data: {
      dingdanhao: dingdanhao
    },
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    success: function (res) {
      var str = res.data;
      if (str == 'yes') {
        wx.showToast({
          title: '支付成功',
          icon: 'success'
        })
        setTimeout(function () { wx.navigateBack();},2000)
        
      } else {
        wx.showToast({
          title: str,
          icon: 'success'
        })
        return;
      }
    },
    fail: function (res) {
      wx.hideToast();
    }
  })
}