// walkman.js
var app = getApp()
var timer;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    urlPath: app.globalData.https + "/images/",
    mp3: [
      'https://meilizhongguo.wang/upload/suishenting/mp3636274658293266526.mp3', 'https://meilizhongguo.wang/upload/suishenting/mp3636274663979213623.mp3'], poster: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000',
    name: '此时此刻',
    btn: '播',
    author: '许巍',
    time: '3:00',
    times: '0:00',
    poster: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000',
    src: 'https://meilizhongguo.wang/upload/suishenting/mp3636274658293266526.mp3',
    panel_status: '',
    cur_name: '',
    cur_jindu: 0,
    cur_jintu_value: 0,
    cur_time: '0:00',
    cur_jindu_time: '0:00',
    ctr_status: '1',
    ctr_status2: '1',
    cur_index: 0,
    cur_length: 0,
    cur_type: '',
    today_mp3: [],
    yesterday_mp3: [],
    before_mp3: [],
    pageIndex: 1,
    pageSize: 6,
    cur_mp3: [],
    cur_id: '',
    cur_wengao: '',
    cur_url: '',
    cur_dianzan: 0,
    cur_isDianzan: 0,
    bottomHidde: true,
    mp3Image: '',
    wengao_hidden: true,
    locl: false,
    isToday: "0"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.stopBackgroundAudio()
    this.setData({
      isToday: options.is_today
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
    that.setData({
      pageIndex: 1
    })
    that.loadMp3("up")

    timer = setInterval(function () {
      wx.getBackgroundAudioPlayerState({
        success: function (res) {
          if (res.status == "0") {//暂停中
            that.setData({
              cur_status: "1"
            })
          }
          else if (res.status == "1") {//播放中
            that.setData({
              cur_status: "0",
              cur_jindu_time: that.secToMin(res.currentPosition),
              cur_jindu_value: res.currentPosition
            })
            if (res.currentPosition >= that.minToSec(that.data.cur_time)) {
              if ((that.data.cur_index + 1) > that.data.cur_mp3.length) {
                wx.stopBackgroundAudio()
              }
              else {
                that.next()
              }
            }
          }
          else {//没有音乐播放

          }

        }
      })
    }, 100)

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
    that.setData({
      pageIndex: 1
    })
    that.loadMp3("up")
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this
    that.setData({
      pageIndex: that.data.pageIndex + 1
    })
    that.loadMp3("down")
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    console.log(res)
    var that = this
    return {
      title: '美丽互联',
      desc: '我正在美丽互联听《' + that.data.cur_name+'》!',
      path: '/pages/discover/discover'
    }
  },
  //进度转换
  secToJindu: function (sec) {
    var per = parseFloat(sec) / this.minToSec(this.data.cur_time)
    return (per * 100).toFixed(2)
  },
  //时间转换(秒变分)
  secToMin: function (sec) {
    if (parseInt(sec % 60) > 9) {
      return parseInt(sec / 60) + ":" + parseInt(sec % 60)
    }
    else {
      return parseInt(sec / 60) + ":0" + parseInt(sec % 60)
    }
  },
  //时间转换（分变秒）
  minToSec: function (min) {
    var m = min.split(':')[0]
    var s = min.split(':')[1]
    return parseInt(m) * 60 + parseInt(s)
  },
  //播放
  play: function () {
    var that = this
    var mp3 = that.data.cur_mp3[that.data.cur_index]
    console.log(mp3)
    wx.playBackgroundAudio({
      dataUrl: mp3.wenjian,
      title: mp3.biaoti + " " + mp3.fabuzhe,
      coverImgUrl: that.data.poster,
      success: function () {
        that.setData({
          ctr_status: "0",
          cur_jindu: that.minToSec(mp3.shichang),
          cur_name: mp3.biaoti,
          cur_wengao: decodeURI(mp3.wengao),
          cur_url: mp3.wenjian,
          cur_dianzan: mp3.dianzan,
          cur_isDianzan: mp3.isdianzan,
          cur_time: mp3.shichang,
          cur_id: mp3.id
        })
        if (that.data.cur_type == "0") {
          that.setData({
            cur_status2: "0"
          })
        }
      }
    })
  },
  //停止
  stop: function () {
    var that = this
    wx.pauseBackgroundAudio()
    that.setData({
      ctr_status: "1"
    })
    if (that.data.cur_type == "0") {
      that.setData({
        cur_status2: "1"
      })
    }
  },
  //上一首
  before: function () {
    var that = this
    if ((that.data.cur_index - 1) < 0) {
      that.setData({
        cur_index: that.data.cur_length - 1
      })
    }
    else {
      that.setData({
        cur_index: that.data.cur_index - 1
      })
    }
    that.setData({
      cur_jindu_vlaue: 0,
      cur_jindu_time: "0:00"
    })
    that.play()
  },
  //下一首
  next: function () {
    var that = this
    if ((that.data.cur_index + 1) > that.data.cur_length - 1) {
      that.setData({
        cur_index: 0
      })
    }
    else {
      that.setData({
        cur_index: that.data.cur_index + 1
      })
    }
    that.setData({
      cur_jindu_value: 0,
      cur_jindu_time: "0:00"
    })
    that.play()
  },
  //快进15秒
  kuaijin: function () {
    var that = this
    var jindu = that.minToSec(that.data.cur_jindu_time)
    if ((jindu + 15) > that.minToSec(that.data.cur_time)) {
      wx.seekBackgroundAudio({
        position: that.minToSec(that.data.cur_time),
        success: function () {
          that.setData({
            cur_jindu: that.minToSec(that.data.cur_time),
            cur_jindu_time: that.data.cur_time
          })
        }
      })
    }
    else {
      wx.seekBackgroundAudio({
        position: jindu + 15,
        success: function () {
          that.setData({
            cur_jindu_time: that.secToMin(jindu + 15),
            cur_jindu_value: jindu + 15
          })
        }
      })
    }
  },
  //倒退15秒
  daotui: function () {
    var that = this
    var jindu = that.minToSec(that.data.cur_jindu_time)
    if ((jindu - 15) < 0) {
      wx.seekBackgroundAudio({
        position: 0,
        success: function () {
          that.setData({
            cur_jindu_time: "0:00",
            cur_jindu_value: 0
          })
        }
      })

    }
    else {
      wx.seekBackgroundAudio({
        position: jindu - 15,
        success: function () {
          that.setData({
            cur_jindu_time: that.secToMin(jindu - 15),
            cur_jindu_value: jindu - 15
          })
        }
      })

    }
  },
  //滑动进度条
  sliderChange: function (e) {
    var that = this
    console.log("随身听进度：" + e.detail.value)
    that.setData({
      cur_jindu_time: that.secToMin(e.detail.value)
    })
    if (e.detail.value < that.data.cur_jindu) {
      that.play()
      var pos = e.detail.value

      wx.seekBackgroundAudio({
        position: pos,
      })
    }
    else {
      that.stop()
    }
  },
  //打开面板
  open: function () {
    var that = this;
    that.setData({
      panel_status: 'panel-status',
      locl: true
    })
  },
  //关闭面板
  close: function () {
    var that = this;
    that.setData({
      panel_status: '',
      locl: false
    })
  },
  //加载mp3
  loadMp3: function (type) {
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
            page: that.data.pageIndex,
            pagesize: that.data.pageSize,
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
              today_mp3: res.data.data[0].today,
              yesterday_mp3: res.data.data[1].yestoday,
              mp3Image: res.data.data[3].headpic
            })

            if (type == "up") {
              if (res.data.data[2].else.length > 0) {
                that.setData({
                  before_mp3: res.data.data[2].else
                })
              }
            }
            else {
              if (res.data.data[2].else.length > 0) {
                that.setData({
                  before_mp3: that.data.before_mp3.concat(res.data.data[2].else)
                })
              } else {
                that.setData({
                  pageIndex: that.data.pageIndex - 1
                })
              }
            }
          }
        })
      }
    })

  },
  //选择要播放的MP3
  selectMp3: function (e) {
    var that = this
    if (e.currentTarget.dataset.type == "0") {
      if (that.data.today_mp3.length == 0) {
        wx.showToast({
          title: '没有MP3可以播放'
        })
        return;
      }
      that.setData({
        cur_mp3: that.data.today_mp3,
        cur_index: 0,
        cur_length: that.data.today_mp3.length,
        cur_type: '0'
      })
    }
    else {
      var mp3 = [e.currentTarget.dataset.item]
      that.setData({
        cur_mp3: mp3,
        cur_index: 0,
        cur_length: 1,
        cur_type: '1'
      })
    }
    that.setData({
      bottomHidde: false
    })
    that.play()
  },
  //下载文档
  goToDownload: function () {
    var that = this
    wx.showLoading({
      title: "下载中",
      mask: true,
      success: function () {
        wx.downloadFile({
          url: that.data.cur_url,
          success: function (res) {
            wx.hideLoading()
            wx.showToast({
              title: '下载成功',
            })
            wx.playVoice({
              filePath: res.tempFilePath
            })
          }
        })
      }
    })
  },
  openWengao: function () {
    this.setData({
      wengao_hidden: false
    })
  },
  closeWengao: function () {
    this.setData({
      wengao_hidden: true
    })
  },
  dianzan: function () {
    var that = this
    if (that.data.cur_isDianzan == "0"){
      wx.request({
        url: app.globalData.https + '/x/Handler/Operate.ashx',
        data: ({
          a: "Add_mp3DianZan",
          memid: app.globalData.huiyuanInfo.userid,
          mp3_id: that.data.cur_id
        }),
        success: function (res) {
          var list = that.data.cur_mp3
          for(let i = 0 ; i< list.length;i++){
            if(list[i].id = that.data.cur_id){
              list[i].isDianzan = 1
              list[i].dianzan = list[i].dianzan+1
            }
          }
          that.setData({
            cur_mp3:list,
            cur_isDianzan:1,
            cur_dianzan:that.data.cur_dianzan+1
          })
        },
        fail: function () {
        }
      })
    }else{
      wx.request({
        url: app.globalData.https + '/x/Handler/Operate.ashx',
        data: ({
          a: "Del_mp3DianZan",
          memid: app.globalData.huiyuanInfo.userid,
          mp3_id: that.data.cur_id
        }),
        success: function (res) {
          var list = that.data.cur_mp3
          for (let i = 0; i < list.length; i++) {
            if (list[i].id = that.data.cur_id) {
              list[i].isDianzan =0
              list[i].dianzan = list[i].dianzan - 1
            }
          }
          that.setData({
            cur_mp3: list,
            cur_isDianzan: 0,
            cur_dianzan: that.data.cur_dianzan - 1
          })
        },
        fail: function () {
        }
      })
    }
  },
  share1: function () {
    wx.showShareMenu({
     
    })
  }
})