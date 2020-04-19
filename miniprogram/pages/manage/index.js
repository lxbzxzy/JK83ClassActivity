const app = getApp()
const db = wx.cloud.database()
Page({
  data:{
    term:'',week:1,day:'',
    basicInfo:{},fileSrc:''
  },

  transferDay: function (num) {
    if (num == 1) return '一'; if (num == 2) return '二';
    if (num == 3) return '三'; if (num == 4) return '四';
    if (num == 5) return '五'; if (num == 6) return '六';
    if (num == 7) return '日';
  },

  onLoad:function(){
    this.setData({
      basicInfo:app.globalData.userInfo,
      term: app.globalData.term,
      week: app.globalData.week,
      day: this.transferDay(app.globalData.day),
      fileSrc:app.globalData.fileSrc
    })
  },

  quit:function(){
    var name=this.data.basicInfo.name;
    wx.cloud.callFunction({
      name:'debind',
      data:{
        name:name
      },
      success:function(){
        wx.redirectTo({
          url: '/pages/login/index',
        })
      }
    })
  },

  addDDL:function(){
    wx.navigateTo({
      url: '/pages/addDDL/index?mode=add&direction=all',
    })
  },

  addMyDDL: function () {
    wx.navigateTo({
      url: '/pages/addDDL/index?mode=add&direction='+this.data.basicInfo.name,
    })
  },

  deleteMyDDL: function () {
    wx.navigateTo({
      url: '/pages/addDDL/index?mode=delete&direction='+this.data.basicInfo.name,
    })
  },

  basicSet:function(){
    wx.navigateTo({
      url: '/pages/basic/index',
    })
  },

  deleteDDL: function () {
    wx.navigateTo({
      url: '/pages/addDDL/index?mode=delete&direction=all',
    })
  },

  studentAdmin:function(){
    wx.navigateTo({
      url: '/pages/studentAdmin/index',
    })
  }

})
