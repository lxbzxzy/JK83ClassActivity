const app = getApp()
const db = wx.cloud.database()

Page({
  data: {
    date: new Date(),
    input2: '2020-1-01',
    input1:'',
  },

  formatNumber: function (n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  },

  formatTime: function (date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()
    return [year, month, day].map(this.formatNumber).join('-')
  }, 

  onLoad: function () {
    var nowdate = this.formatTime(new Date());
    console.log(nowdate)
    this.setData({
      date: nowdate,
      input2: nowdate
    })
  },

  input1: function (e) {
    this.setData({ input1: e.detail.value })
  },

  bindDateChange: function (e) {
    console.log('date发送选择改变，携带值为', e.detail.value)
    console.log(e.detail.value)
    this.setData({
      date: e.detail.value,
      input2: e.detail.value
    })
  },

  submit:function(){
    var that=this;
    wx.showModal({
      title: '提示',
      content: '确认要修改基本配置吗？修改学期后，本学期所有班级活动和ddl一并删除。请慎重考虑',
      success:function(re){
        if(re.confirm){
          wx.cloud.callFunction({
            name:'basicSet',
            data:{
              term:that.data.input1,
              termBegin:that.data.input2
            },
            success:function(res){
              console.log(res);
              wx.cloud.callFunction({
                name:'deleteAllDDL',
                data:{},
                success:function(){
                  wx.showModal({
                    title: '提示',
                    content: '修改成功，请重新启动小程序',
                    showCancel: false
                  })
                }
              })
            }
          })
        }
      }
    })
  }

})
