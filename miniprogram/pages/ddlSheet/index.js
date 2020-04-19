const app = getApp()
const db = wx.cloud.database()
Page({
  data:{
    basicInfo:{},
    week:0,
    day:0,
    ddlInfo:[],
    dealtData:[],

    identityarray: ['全周', '第一周', '第二周', '第三周', '第四周', '第五周', '第六周', '第七周', '第八周', '第九周', '第十周', '第十一周', '第十二周', '第十三周', '第十四周', '第十五周', '第十六周'],
    identityarray2: ['all', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
    idindex: 0,//必须渲染一下这个要不渲染不出来
    identity1: 'all',
  },

  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    console.log(this.data.identityarray[e.detail.value])
    this.setData({
      idindex: e.detail.value,
      identity1: this.data.identityarray2[e.detail.value]
    })
  },

  transferNum: function (num) {
    if (num == 0) return 'lecture1';
    if (num == 1) return 'lecture2';
    if (num == 2) return 'lecture3';
    if (num == 3) return 'lecture4';
  },

  transferDay:function(num) {
    if (num == 1) return '一';if (num == 2) return '二';
    if (num == 3) return '三'; if (num == 4) return '四';
    if (num == 5) return '五'; if (num == 6) return '六';
    if (num == 7) return '日';
  },

  transferTime:function(num){
    if (num == 1) return '上午';
    if (num == 2) return '下午';
    if (num == 3) return '晚上';
  },

  dealWithData: function () {
    var ddlInfo = this.data.ddlInfo;
    var dealingData = [];
    var id = 0;
    for (let i in ddlInfo) {
      var dealingItem = {
        id: 111, time: '第一周周一上午',
        parstTime: false,
        mode: '', name:'', detail:'',
        week:1,direction:'all'
      }
      id = ddlInfo[i].time;
      dealingItem.id = id;
      dealingItem.mode = ddlInfo[i].mode;
      dealingItem.name = ddlInfo[i].name;
      dealingItem.detail = ddlInfo[i].detail;
      dealingItem.direction = ddlInfo[i].direction;
      dealingItem.week = parseInt(id / 100);
      dealingItem.time = '第' + parseInt(id / 100) + '周周' + this.transferDay(parseInt((id % 100) / 10)) + this.transferTime(id % 10);
      if (id < (this.data.week*100 + 10*this.data.day) ) { dealingItem.pastTime = true }
      else { dealingItem.pastTime = false }
      console.log(dealingItem);
      dealingData.push(dealingItem);
    }
    this.setData({ dealtData: dealingData })
  },

  onLoad:function(){
    console.log('页面加载中')
    wx.showToast({
      title: '加载中',
      duration:1000,
      icon:'loading'
    })
    this.setData({
      basicInfo: app.globalData.userInfo,
      week: app.globalData.week,
      day: app.globalData.day
    })
    var that = this;
    wx.cloud.callFunction({
      name:'allDDL',
      data:{direction:that.data.basicInfo.name},
      success:function(res){
        console.log(res.result.data)
        that.setData({ ddlInfo: res.result.data })
        that.dealWithData();
      }
    })
  },

  gotoCalendar:function(){
    app.globalData.dealtData=this.data.dealtData;
    wx.navigateTo({
      url: '/pages/calendar/index',
    })
  }
  
})
