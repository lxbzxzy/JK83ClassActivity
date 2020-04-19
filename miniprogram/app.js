//app.js
App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: 'jk83basic-nx6u3',
        traceUser: true,
      })
    }
    var that=this;
    this.setTime();
  },

  setTime:function(){
    const db = wx.cloud.database();
    const basicSet='basicSet'
    var that = this;
    db.collection('basicSet').get().then(res => {
      var nowTerm = res.data[0].term;
      var termBegin = res.data[0].termBegin;
      //获取当前日期对应校历的周次和星期
      var endTime = -new Date(termBegin).getTime() / 1000 + parseInt(new Date().getTime() / 1000);
      //第一个设置参数是该学期开学时间，如2019-9-9 0:0:0
      if (endTime > 0) {
        var nowTime = parseInt(endTime / 86400);
        var nowWeek = parseInt(nowTime / 7) + 1;
        console.log(nowWeek);
        var nowDay = nowTime % 7 + 1;
        console.log(nowDay);
      }
      else {
        var nowTime = parseInt(endTime / 86400);
        var nowWeek = parseInt(nowTime / 7);
        console.log(nowWeek);
        var nowDay = 7 + nowTime % 7;
        console.log(nowDay);
      }
      getApp().globalData.week = nowWeek;
      getApp().globalData.day = nowDay;
      getApp().globalData.term = nowTerm;
      getApp().globalData.termBegin = termBegin;

    })
  },

  globalData: {
    term:'2020春',
    week: 0,
    day: 0,
    userInfo: {},
    dealtData:[],
    termBegin:'',
  }

})
