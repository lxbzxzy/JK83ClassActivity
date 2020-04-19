const app = getApp()
const db = wx.cloud.database()

Page({
  data:{
    dealtData:[],
    basicInfo:{},
    week:0,
    day:0,
    selectedWeek:0,
    selectedDay:0,
    termBegin:'',

    calendar0:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
    calendar1:[],
    calendar2:[],
    thisWeekMonth:'',
    nextWeekMonth:'',

    available:true,
  },

  checkAvail:function(){
    for(let i in this.data.dealtData){
      if (this.data.dealtData[i].id - this.data.selectedWeek * 100 - this.data.selectedDay * 10 > 0 && this.data.dealtData[i].id - this.data.selectedWeek * 100 - this.data.selectedDay * 10 < 10){
        this.setData({
          available:false
        })
        return;
      }
    }
    this.setData({
      available: true
    })
  },

  changeSelected1:function(e){
    this.setData({
      selectedWeek:this.data.week,
      selectedDay:e.currentTarget.dataset.index+1
    })
    this.checkAvail();
  },

  changeSelected2: function (e) {
    this.setData({
      selectedWeek: this.data.week+1,
      selectedDay: e.currentTarget.dataset.index + 1
    })
    this.checkAvail();
  },

  dealWithCalendar:function(){
    var beginDate=new Date(this.data.termBegin);
    var thisMon=new Date(this.data.termBegin);
    var nextMon = new Date(this.data.termBegin);
    thisMon.setDate(thisMon.getDate() + (this.data.week-1)*7);
    nextMon.setDate(nextMon.getDate() + this.data.week * 7);
    console.log(thisMon); console.log(nextMon);
    this.setData({
      thisWeekMonth: this.transferMonth(thisMon.getMonth()),
      nextWeekMonth: this.transferMonth(nextMon.getMonth())
    })
    var dealingData1=[];
    for(var num=1;num<=7;num++){
      var dealingItem={
        week:this.data.week,day:num,date:0,
        homework:0, activity:0, exam:0,
      }     
      dealingItem.date=thisMon.getDate();
      thisMon.setDate(thisMon.getDate() + 1);
      for (let i in this.data.dealtData){
        if (this.data.dealtData[i].id - dealingItem.week * 100 - dealingItem.day * 10 > 0 && this.data.dealtData[i].id - dealingItem.week * 100 - dealingItem.day * 10 < 10){
          if (this.data.dealtData[i].mode=='作业') dealingItem.homework+=1;
          else if (this.data.dealtData[i].mode == '集体活动') dealingItem.activity += 1;
          else if (this.data.dealtData[i].mode == '考试') dealingItem.exam += 1;
        }
      }
      dealingData1.push(dealingItem);
    }
    this.setData({calendar1:dealingData1})
    var dealingData2 = [];
    for (var num = 1; num <= 7; num++) {
      var dealingItem2 = {
        week: this.data.week+1, day: num, date: 0,
        homework: 0, activity: 0, exam: 0
      }
      dealingItem2.date = nextMon.getDate();
      nextMon.setDate(nextMon.getDate() + 1);
      for (let i in this.data.dealtData) {
        if (this.data.dealtData[i].id - dealingItem2.week * 100 - dealingItem2.day * 10 > 0 && this.data.dealtData[i].id - dealingItem2.week * 100 - dealingItem2.day * 10 < 10) {
          if (this.data.dealtData[i].mode == '作业') dealingItem2.homework += 1;
          else if (this.data.dealtData[i].mode == '集体活动') dealingItem2.activity += 1;
          else if (this.data.dealtData[i].mode == '考试') dealingItem2.exam += 1;
        }
      }
      dealingData2.push(dealingItem2);
    }
    this.setData({ calendar2: dealingData2 })
  },

  transferMonth:function(num){
    if (num==0) return 'Jan.';else if (num==1) return 'Feb.';
    else if (num == 2) return 'Mar.'; else if (num == 3) return 'Apr.';
    else if (num == 4) return 'May.'; else if (num == 5) return 'Jun.';
    else if (num == 6) return 'Jul.'; else if (num == 7) return 'Aug.';
    else if (num == 8) return 'Sept.'; else if (num == 9) return 'Oct.';
    else if (num == 10) return 'Nov.'; else if (num == 11) return 'Dec.';
  },

  onLoad:function(){
    this.setData({
      basicInfo: app.globalData.userInfo,
      week: app.globalData.week,
      selectedWeek: app.globalData.week,
      selectedDay: app.globalData.day,
      day: app.globalData.day,
      dealtData: app.globalData.dealtData,
      termBegin:app.globalData.termBegin
    });
    this.checkAvail();
    this.dealWithCalendar()
  },

  gotoSheet:function(){
    wx.switchTab({
      url: '/pages/ddlSheet/index',
    })
  },
})