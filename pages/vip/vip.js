// pages/vip/vip.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    choose:'0',
    src:"http://47.99.33.173:8080/vip-imgs/1.jpg"

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  // 点击选项的方法
  getChoose(e){
    var that = this;
    // console.log(e.currentTarget.dataset.choose);
    that.setData({
      choose:e.currentTarget.dataset.choose,
    })
    // if(that.data.choose=0){
    //   console.log(that.data.choose)
    //   that.setData({
    //     src:"http://47.99.33.173:8080/vip-imgs/2.jpg"
    //   })
    // }
    console.log(that.data.src);
    console.log(that.data.choose)
  }


})