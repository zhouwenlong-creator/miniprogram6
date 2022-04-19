// pages/order/order.js
var url=getApp().globalData.wxRequestBaseUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
      // 上一个页面传过来的
        //选择预约时间
        bespeaktime:0,
        // 预定的时长
        bespeakduration:1,
        //当前选中的座位，默认为0，就表示不能预约
        seat:40,
        //日期转化成字符串格式
        bespeaktimeToString:"",
        //当前座位所属的房间（显示第一行用的）
        roomName:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    //获取bespeak传过来的数据（通过缓存ss）
    var bespeaktime=wx.getStorageSync('bespeaktime');
    var bespeakduration=wx.getStorageSync('bespeakduration');
    var seat=wx.getStorageSync('seat');
    if(bespeaktime==0){
      var bespeaktime=new Date();
    }
    // 将日期转化成字符串类型
    var bespeaktimeToString=bespeaktime.toLocaleString();
    that.setData({
      bespeaktime:bespeaktime,
      bespeakduration:bespeakduration,
      seat:seat,
      bespeaktimeToString:bespeaktimeToString
    })

    //获取当前座位的房间
    wx.request({
      url: url+'/seat/selectRoomBySeat.do',
      header: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
      method:'POST',
      data:{
        // "id":"长江大学"
        "seatId":this.data.seat
      },
      success:function(e){
        that.setData({
          roomName:e.data.roomName
        })
      }
    });
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


  onChangeVip:function(e){
    wx.switchTab({
      url: '/pages/vip/vip'
    })
  }
})