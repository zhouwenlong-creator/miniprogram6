// pages/record/record.js
var url=getApp().globalData.wxRequestBaseUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 用户record_top的显示
    recordlist:[
      {
        recordtopid:1,
        recordname:"全部",
        isactive:1
      },
      {
        recordtopid:2,
        recordname:"未消费",
        isactive:0
      },
      {
        recordtopid:3,
        recordname:"已消费",
        isactive:0
      },
      {
        recordtopid:4,
        recordname:"已取消",
        isactive:0
      }
    ],

    // 属性 订单id id    订单创建时间   create_time  订单开始时间 order_begin_time 订单结束时间 order_stop_time  订单持续时间 bespeakduration    订单座位号  order_seat_id      金额 money     订单所属的用户   user_id    订单的状态 order_status     订单的套餐名 还是个联合查询
    orderInfo:[],
    userInfo:getApp().globalData.userInfo,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    that.setData({
      userInfo:getApp().globalData.userInfo,
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
    // 每次点击该页面 页面都刷新（每次进入该页面）
    //每次进入该页面，就刷新订单记录页面
    var that=this;
    wx.request({
      url:url+'/order/selectOrdersByUserId.do',
      method:'POST',
      header: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
      success(res){
        console.log(res);
        console.log("查询成功");
        that.setData({
          orderInfo:res.data
        })
        // 设置是否消费，以及设置在哪个房间
        var i=0;
        for(i=0;i<that.data.orderInfo.length;i++){
          var time=that.data.orderInfo[i].orderBeginTime;
          var str=time.split(" ");
          that.setData({
            [`orderInfo[${i}].orderBeginTimeToStringDate`]:str[0],
            [`orderInfo[${i}].orderBeginTimeToStringTime`]:str[1],
          })
          var time1=that.data.orderInfo[i].orderStopTime;
          var str1=time1.split(" ");
          that.setData({
            [`orderInfo[${i}].orderStopTimeToStringDate`]:str1[0],
            [`orderInfo[${i}].orderStopTimeToStringTime`]:str1[1],
          })

          // //查看当前的时间看是否能开门
          // var timeStart=new Date(that.data.orderInfo[i].orderBeginTime);
          // var timeEnd=new Date(that.data.orderInfo[i].orderStopTime);
          // var timeNow=new Date();
          // // console.log(timeStart);
          // // console.log(timeNow);
          // var timeSub=timeStart-timeNow;
          // //如果在30分钟以内，就可以扫码；在30分钟之前 就不能扫码入座；在30min以后，自动释放座位
          // //30分钟之后，就释放座位
          // if(timeSub<-1800000){
          //   console.log("释放座位");
          //   that.setData({
          //     [`orderInfo[${i}].orderflag`]:0
          //   })
          //   // 在座位的前后30min，就可以 扫码入座
          // }else if(timeSub>=-1800000 && timeSub<=1800000){
          //   //30分钟之后了,释放座位
          //   console.log("扫码入座");
          //   that.setData({
          //     [`orderInfo[${i}].orderflag`]:1
          //   })
          // //在30min之前来，提示，还没到时间
          // }else{
          //   console.log("还没到时间");
          //   that.setData({
          //     [`orderInfo[${i}].orderflag`]:2
          //   })
          // }
        }
        console.log(that.data.orderInfo);
      },
      fail(res){
        console.log("查询失败！");
      },
      data:{
        "userid":that.data.userInfo.id,
      }
    })

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
  onChangeRecord:function(e){
    console.log("change record-top...");
    var that=this;
    var recordtopid=e.target.dataset.recordtopid;
    var recordlist=that.data.recordlist;
    var i=0;
    for(i=0;i<recordlist.length;i++){
      //1. 将所有的isactive设为false
      that.setData({
        //设置数组中属性的值
        [`recordlist[${i}].isactive`]:0,
      })
      //2.将选中的recordtopid的isactive设置为1
      if(recordlist[i].recordtopid==recordtopid)
      that.setData({
        [`recordlist[${i}].isactive`]:1,
      })
    }
  },
  // 点击扫码入座
  onSitDown:function(res){
    console.log("扫码入座！");
    var that=this;
    // 更新flag的值为1 说明占座了，
    console.log(res);
    wx.request({
      url:url+'/order/updateOrderSitflagByUserId.do',
      method:'POST',
      header: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
      data:{
        "sitflag":1,
        "id":res.target.dataset.id,
      },
      success(res){
        console.log("更新sitflag成功");
        wx.showToast({
          title: '入座成功',
          icon: 'success',
          duration: 1000
        })
        that.onShow();
      },
      fail(res){
        console.log("更新sitflag失败");
      }
    })
  }
})