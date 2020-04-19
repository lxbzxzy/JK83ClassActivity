const app = getApp()
const db = wx.cloud.database()

Page({
  data: {
    direction:'all',
    mode:'add',
    identityarray: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],
    idindex:0,//必须渲染一下这个要不渲染不出来
    identity1:1,
    identityarray2: ['一', '二', '三', '四', '五', '六', '日'],
    identityarray20: [1, 2, 3, 4, 5, 6, 7],
    idindex2: 0,//必须渲染一下这个要不渲染不出来
    identity2: 1,
    identityarray3: ['上午', '下午', '晚上'],
    identityarray30: [1, 2, 3],
    idindex3: 0,//必须渲染一下这个要不渲染不出来
    identity3: 1,
    identityarray4: ['作业', '集体活动', '考试'],
    idindex4: 0,//必须渲染一下这个要不渲染不出来
    identity4: '作业',
    input5:'',
    input6:''
  },
  input5: function (e) {
    this.setData({ input5: e.detail.value })
  },
  input6: function (e) {
    this.setData({ input6: e.detail.value })
  },

  bindPickerChange:function(e){
    console.log('picker发送选择改变，携带值为', e.detail.value)
    console.log(this.data.identityarray[e.detail.value])
    this.setData({
      idindex: e.detail.value,
      identity1: this.data.identityarray[e.detail.value]
    })
  },
  
  bindPickerChange2: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    console.log(this.data.identityarray[e.detail.value])
    this.setData({
      idindex2: e.detail.value,
      identity2: this.data.identityarray20[e.detail.value]
    })
  },

  bindPickerChange4: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      idindex4: e.detail.value,
      identity4: this.data.identityarray4[e.detail.value]
    })
  },

  bindPickerChange3: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    console.log(this.data.identityarray[e.detail.value])
    this.setData({
      idindex3: e.detail.value,
      identity3: this.data.identityarray30[e.detail.value]
    })
  },

  onLoad:function(options){
    console.log(options);
    this.setData({
      mode:options.mode,
      direction:options.direction
    })
  },

  submit:function(){
    var that=this;
    var time = parseInt(that.data.identity1 * 100 + that.data.identity2 * 10 + that.data.identity3);
    console.log(time);
    var towhom = this.data.direction == "all" ? '班级' : '个人';
    wx.showModal({
      title: '提示',
      content: '确认要添加' + towhom +'活动吗？',
      success:function(re){
        if(re.confirm){
          wx.cloud.callFunction({
            name:'addDDL',
            data:{
              time:time,
              mode:that.data.identity4,
              name:that.data.input5,
              detail:that.data.input6,
              direction:that.data.direction
            },
            success:function(res){
              console.log(res);
              wx.showModal({
                title: '提示',
                content: '添加成功',
                showCancel: false,
                success: function (res) {
                  if (res.confirm) {
                    wx.reLaunch({
                      url: '/pages/ddlSheet/index',
                    })
                  }
                }
              })
            }
          })
        }
      }
    })
  },

  submit2: function () {
    var that = this;
    var time = parseInt(that.data.identity1 * 100 + that.data.identity2 * 10 + that.data.identity3);
    console.log(time);
    var towhom=this.data.direction=="all"?'班级':'个人';
    wx.showModal({
      title: '提示',
      content: '确认要删除该时间段所有'+towhom+'活动吗？删除后请及时恢复多余删除的项目',
      success: function (re) {
        if (re.confirm) {
          wx.cloud.callFunction({
            name: 'deleteDDL',
            data: {
              time: time,
              direction: that.data.direction
            },
            success: function (res) {
              console.log(res);
              wx.showModal({
                title: '提示',
                content: '删除成功',
                showCancel: false,
                success:function(res){
                  if(res.confirm){
                    wx.reLaunch({
                      url: '/pages/ddlSheet/index',
                    })
                  }
                }
              })
            }
          })
        }
      }
    })
  }

})
