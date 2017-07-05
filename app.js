//app.js
App({
  onLaunch: function () {
    
  },
  onShow:function(){
    
  },
  //会员登录
  login: function (cb) {
    var that = this
    if (this.globalData.huiyuanInfo) {
      wx.request({
        url: that.globalData.https + '/x/Handler/Operate.ashx',
        data: {
          a: "Get_MemByID",
          memid: that.globalData.huiyuanInfo.userid
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (huiyuanRes) {
          that.globalData.huiyuanInfo = huiyuanRes.data
          typeof cb == "function" && cb(that.globalData.huiyuanInfo)
        },
        fail: function (res) {
          wx.showToast({
            title: '获取会员信息失败'
          })
        }
      })
    } else {
      //调用登录接口
      wx.showLoading({
        title: '登录中',
        mask: false,
        success: function () {
          wx.login({
            success: function (loginRes) {
              var code = loginRes.code
              //获取微信用户信息
              wx.getUserInfo({
                success: function (infoRes) {
                  //获取微信用户的openid
                  if (code) {
                    wx.request({
                      url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx44c7ce80cd9da41c&secret=a022b0f6a49faee333e49f10e211e67b&js_code=' + code + '&grant_type=authorization_code',
                      header: {
                        'content-type': 'application/json'
                      },
                      success: function (res) {
                        //获取会员信息
                        wx.request({
                          url: that.globalData.https + '/x/GetHuiYuan.aspx',
                          data: {
                            openid: res.data.openid,
                            tuijianrenid: that.globalData.userTjr,
                            xingming: infoRes.userInfo.nickName,
                            touxiangurl: infoRes.userInfo.avatarUrl
                          },
                          header: {
                            'content-type': 'application/json'
                          },
                          success: function (huiyuanRes) {
                            that.globalData.huiyuanInfo = huiyuanRes.data
                            typeof cb == "function" && cb(that.globalData.huiyuanInfo)
                            wx.hideLoading()
                          },
                          fail: function (res) {
                            wx.showToast({
                              title: '获取会员信息失败',
                            })
                          }
                        })
                      },
                      fail: function (res) {
                        wx.showToast({
                          title: '获取微信用户的openid失败',
                        })
                      }
                    })
                  }else{
                    console.log("sss")
                  }
                }
              })
            },
            fail:function(){
              console.log("登录失败")
            }
          })
        }
      })
    }
  },
  globalData: {
    isToday:false,
    playing: null,
    palyList: [{
      docid: "9137272983103274516",
      id: "107192078",
      mid: "003OUlho2HcRHC",
      name: "告白气球",
      singer: "周杰伦"
    }],
    huiyuanInfo: null,
    userTjr: '',
    https: 'http://qing.meilizhongguo.wang'
  }
})