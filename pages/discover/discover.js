// faxian.js
var app = getApp()
var timer;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    urlPath: app.globalData.https + "/images/",
    userId: '',
    imgUrls: [],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    hehuoren_status: '',
    hehuoren_image: '',
    hehuoren_name: '',
    hehuoren_gongsi: '',
    hehuoren_zhiwu: '',
    hehuoren_chengshi: '',
    xiangmu_status: '',
    xiangmu_id: '',
    xiangmu_piao: '',
    xiangmu_flag: '',
    xiangmu_pic: '',
    xiangmu_name: '',
    xiangmu_city: '',
    xiangmu_memname: '',
    xiangmu_zhihe: '',
    xiangmu_renhe: '',
    xiangmu_zihe: '',
    xiangmu_guanchatuan: '',
    xiangmu_tiyantuan: '',
    xiangmu_zhuanjiatuan: '',
    xuexi_status: '',
    huodong_status: '',
    isPlay: false,
    cur_mp3: [],
    cur_index: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.loadInfo()
    // that.loadMp3()
    // timer = setInterval(function () {
    //   wx.getBackgroundAudioPlayerState({
    //     success: function (res) {
    //       if (res.status == "0") {//暂停中

    //       }
    //       else if (res.status == "1") {//播放中
    //         if (res.currentPosition >= that.minToSec(that.data.cur_mp3[that.data.cur_index].shichang)) {
    //           if ((that.data.cur_index + 1) > that.data.cur_mp3.length) {
    //             wx.stopBackgroundAudio()
    //           }
    //           else {
    //             that.setData({
    //               cur_index: that.data.cur_index + 1
    //             })
    //             var mp3 = that.data.cur_mp3[that.data.cur_index]
    //             wx.playBackgroundAudio({
    //               dataUrl: mp3.wenjian,
    //               title: mp3.biaoti + " " + mp3.fabuzhe,
    //               coverImgUrl: that.data.poster,
    //               success: function () {

    //               }
    //             })
    //           }

    //         }
    //       }
    //       else {//没有音乐播放

    //       }

    //     }
    //   })
    // }, 100)
  },
  //时间转换（分变秒）
  minToSec: function (min) {
    var m = min.split(':')[0]
    var s = min.split(':')[1]
    return parseInt(m) * 60 + parseInt(s)
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
  //加载信息
  loadInfo: function () {
    var that = this
    console.log("asdfasdfasdfsdf")
    wx.request({
      url: app.globalData.https + '/x/Handler/Operate.ashx',
      data: {
        a: "Get_HomePage",
        memid: app.globalData.huiyuanInfo.userid
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(JSON.stringify(res.data))
        console.log(res.data.data)
        that.setData({
          imgUrls: res.data.data[0].pic_info
        })
        //合伙人信息
        if (res.data.data[2].hehuoren_info.length > 0) {
          console.log(res.data.data[2].hehuoren_info)
          console.log(res.data.data[2].hehuoren_info[0].pic)
          that.setData({
            hehuoren_status: '1',
            hehuoren_image: res.data.data[2].hehuoren_info[0].pic,
            hehuoren_name: res.data.data[2].hehuoren_info[0].xingming,
            hehuoren_gongsi: res.data.data[2].hehuoren_info[0].gongsimingcheng,
            hehuoren_zhiwu: res.data.data[2].hehuoren_info[0].zhiwei,
            hehuoren_chengsi: res.data.data[2].hehuoren_info[0].shi
          })
        }
        else {
          that.setData({
            hehuoren_status: '0'
          })
        }
        //项目信息
        if (res.data.data[3].xiangmu_info.length > 0) {
          console.log(res.data.data[3].xiangmu_info)
          console.log(res.data.data[3].xiangmu_info[0].pic)
          that.setData({
            xiangmu_status: '1',
            xiangmu_id: res.data.data[3].xiangmu_info[0].id,
            xiangmu_piao: res.data.data[3].xiangmu_info[0].votes,
            xiangmu_flag: res.data.data[3].xiangmu_info[0].level,
            xiangmu_pic: res.data.data[3].xiangmu_info[0].pic,
            xiangmu_name: res.data.data[3].xiangmu_info[0].name,
            xiangmu_city: res.data.data[3].xiangmu_info[0].city,
            xiangmu_memname: res.data.data[3].xiangmu_info[0].memname,
            xiangmu_zhihe: res.data.data[3].xiangmu_info[0].zhihe,
            xiangmu_renhe: res.data.data[3].xiangmu_info[0].renhe,
            xiangmu_zihe: res.data.data[3].xiangmu_info[0].zihe,
            xiangmu_guanchatuan: res.data.data[3].xiangmu_info[0].guanchatuan,
            xiangmu_tiyantuan: res.data.data[3].xiangmu_info[0].tiyantuan,
            xiangmu_zhuanjiatuan: res.data.data[3].xiangmu_info[0].zhuanjiatuan,
          })
        }
        else {
          that.setData({
            xiangmu_status: '0'
          })
        }
        //学习信息
        if (res.data.data[4].huodong_info.length > 0) {
          console.log(res.data.data[4].huodong_info)
          console.log(res.data.data[4].huodong_info[0].pic)
          that.setData({
            huodong_status: '1',
          })
        }
        else {
          that.setData({
            huodong_status: '0'
          })
        }
        //活动信息
        if (res.data.data[5].xuexi_info.length > 0) {
          console.log(res.data.data[5].xuexi_info)
          console.log(res.data.data[5].xuexi_info[0].pic)
          that.setData({
            xuexi_status: '1',
          })
        }
        else {
          that.setData({
            xuexi_status: '0'
          })
        }
      }
    })

  },
  ctrlPlay: function () {
    var that = this
    if (this.data.cur_mp3.length > 0) {
      if (this.data.isPlay) {
        wx.stopBackgroundAudio()
      }
      else {
        var mp3 = that.data.cur_mp3[that.data.cur_index]
        wx.playBackgroundAudio({
          dataUrl: mp3.wenjian,
          title: mp3.biaoti + " " + mp3.fabuzhe,
          coverImgUrl: that.data.poster,
          success: function () {

          }
        })
      }
    }
    else {
      wx.showToast({
        title: '今日没有mp3',
        duration: 1500
      })
    }
  },
  loadMp3: function () {
    var that = this
    wx.showLoading({
      title: "加载中",
      mask: true,
      success: function () {
        //请求数据
        wx.request({
          url: app.globalData.https + '/x/Handler/Operate.ashx',
          data: {
            a: "Get_MP3List",
            page: 1,
            pagesize: 10,
            memid: app.globalData.huiyuanInfo.userid
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            wx.hideLoading()
            console.log("随身听" + JSON.stringify(res.data))
            console.log(res.data)
            that.setData({
              cur_mp3: res.data.data[0].today,
            })
            if (that.data.cur_mp3.length > 0) {
              timer = setInterval(function () {
                wx.getBackgroundAudioPlayerState({
                  success: function (res) {
                    if (res.status == "0") {//暂停中

                    }
                    else if (res.status == "1") {//播放中
                      if (res.currentPosition >= that.minToSec(that.data.cur_mp3[that.data.cur_index].shichang)) {
                        if ((that.data.cur_index + 1) > that.data.cur_mp3.length) {
                          wx.stopBackgroundAudio()
                        }
                        else {
                          that.setData({
                            cur_index: that.data.cur_index + 1
                          })
                          var mp3 = that.data.cur_mp3[that.data.cur_index]
                          wx.playBackgroundAudio({
                            dataUrl: mp3.wenjian,
                            title: mp3.biaoti + " " + mp3.fabuzhe,
                            coverImgUrl: that.data.poster,
                            success: function () {

                            }
                          })
                        }

                      }
                    }
                    else {//没有音乐播放

                    }

                  }
                })
              }, 100)
            }
          }
        })
      }
    })

  },
  //进入封面人物
  goToCover: function () {
    wx.navigateTo({
      url: '../../pages/discover/cover/cover'
    })
  },
  //进入活动
  goToActivity: function () {
    wx.navigateTo({
      url: '../../pages/discover/activity/activity'
    })
  },
  //进入合伙人
  goToPartner: function () {
    wx.navigateTo({
      url: '../../pages/discover/partner/partner'
    })
  },
  //进入主页
  goToHome: function () {
    wx.navigateTo({
      url: '../../pages/user/home/home?user_id=' + app.globalData.huiyuanInfo.userid
    })
  },
  goToXiangqing: function (e) {
    wx.navigateTo({
      url: '../../pages/project/details/details?id=' + e.currentTarget.dataset.id + "&type=2"
    })
  },
  //进入动态
  goToDynamic: function () {
    wx.navigateTo({
      url: '../../pages/discover/dynamic/dynamic',
    })
  },
  //进入随身听
  goToWalkman: function () {
    wx.navigateTo({
      url: '../../pages/discover/walkman/walkman',
    })
  },
  goToPartnerAll:function(){
    wx.navigateTo({
      url: '../../pages/discover/partner/partner'
    })
  }
})