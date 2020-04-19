const app = getApp()
const db = wx.cloud.database()

Page({
  data: {
    mode:'add',
    identityarray: ['添加','删除'],
    idindex:0,
    identity:'lecture1',
    input1: '姓名',
    canAdmin: false,
    date:'2000-01-01',
    birthday:new Date(),
  },

  input1: function (e) {
    this.setData({ input1: e.detail.value })
  },

  switch1Change:function(e){
    console.log(e.detail.value)
    this.setData({canAdmin:e.detail.value})
  },

  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    console.log(this.data.identityarray[e.detail.value])
    this.setData({
      idindex: e.detail.value
    })
  },

  bindDateChange: function (e) {
    console.log('date发送选择改变，携带值为', e.detail.value)
    console.log(e.detail.value)
    this.setData({
      date: e.detail.value,
      birthday: new Date(e.detail.value)
    })
  },

  deleteStudent:function(){
    var that=this;
    wx.showModal({
      title: '提醒',
      content: '确定要删除学生吗',
      success:function(res){
        if(res.confirm){
          wx.cloud.callFunction({
            name:'deleteStudent',
            data:{
              name:that.data.input1
            },
            success: function () {
              wx.showModal({
                title: '提示',
                content: '删除学生成功',
                showCancel: false,
                success: function (res) {
                  if (res.confirm) {
                    wx.navigateBack({})
                  }
                }
              })
            }
          })
        }
      }
    })
  },

  add: function () {
    var that = this;
    wx.showModal({
      title: '提醒',
      content: '确定要添加学生吗',
      success: function (res) {
        if (res.confirm) {
          wx.cloud.callFunction({
            name: 'addStudent',
            data: {
              name: that.data.input1,
              birthday:that.data.birthday,
              canAdmin: that.data.canAdmin,
            },
            success: function () {
              wx.showModal({
                title: '提示',
                content: '添加学生成功',
                showCancel: false,
                success: function (res) {
                  if (res.confirm) {
                    wx.navigateBack({})
                  }
                }
              })
            }
          })
        }
      }
    })
  },

})
