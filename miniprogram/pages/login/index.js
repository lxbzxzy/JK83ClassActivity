const app = getApp()
const db = wx.cloud.database()
Page({
  onShareAppMessage: function () {
    return {
      title: '登录界面',
      path: '/pages/login/index'
    }
  },

  data:{
    intro:'\t\t班级小程序目前拥有ddl与班级活动的时间登记与查询功能，以及生日祝福功能，欢迎大家为班级小程序的开发提供意见建议。',
    logo:'https://mmbiz.qpic.cn/mmbiz_jpg/icQPHj1lgiaSrZh01Zia9AppLlaPZDl7N4JicYE6aic7pqZ2t7NwiazXMXGk4daACricRkCvc45JiczXg7I5WWXoNOWyng/0?wx_fmt=jpeg',
    input1:'',
    wxId:'',
    name:'',
    disabled:true
  },
  //输入框函数
  input1:function(e){
    this.setData({input1:e.detail.value})
  },
  
  //先确认微信登录
  onLoad:function(){
    wx.showToast({
      title: '查询中',
      icon:'loading',
      duration:800
    })
    var that=this;//回调中不能使用this
    this.directLogin();
  },

  directLogin:function(){
    var that=this;
    wx.cloud.callFunction({
      name: 'directLogin',
      success: function (res) {
        console.log(res.result.data);
        if (res.result.data.length == 0) {
          that.setData({ disabled: false })
          return;
        }
        wx.showToast({
          title: '登录成功',
          icon:'success',
          duration:500
        })
        app.globalData.userInfo = res.result.data[0];
        wx.switchTab({
          url: '/pages/manage/index',
        })
      }
    })
  },

  login:function(){
    wx.showToast({
      title: '登录中',
      icon: 'loading',
      duration: 800
    })
    var that = this;
    wx.cloud.callFunction({
      name:'register',
      data:{
        name:that.data.input1
      },
      success:function(res){
        console.log(res.result.stats.updated);
        if (res.result.stats.updated==0){
          wx.showModal({
            title: '提示',
            content: '姓名查询错误',
            showCancel:false
          })
        }
        else{
          that.directLogin();
        }
      }
    })
  },

})
