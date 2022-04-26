// pages/noticedetail/noticedetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    noticeInfo:[],
    noticeId:0,
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    that.setData({
      noticeInfo:wx.getStorageSync('noticeInfo'),
      noticeId:wx.getStorageSync('noticeId'),
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
    var that=this;
    that.setData({
      noticeInfo:wx.getStorageSync('noticeInfo'),
      noticeId:wx.getStorageSync('noticeId'),
    })
    console.log("hi欸选哪个吧  "+that.data.noticeId);
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

  }
})