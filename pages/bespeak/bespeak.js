// pages/bespeak/bespeak.js
var information = getApp().globalData.chairInfo;
// console.log(information);
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 设置座位图的初始位置
    x:20, 
    y:20,
    scale:1,

    // 座位信息
    chairInfo:[]
   },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 初始化
    this.setData({
      chairInfo:information
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
  navigateToOrder(){
    wx.navigateTo({
      url: '../canvas/canvas',
      success(res){
        wx.showToast({
          title: "进入选座中", // 提示的内容
          icon: "loading", // 图标，默认success
          image: "", // 自定义图标的本地路径，image 的优先级高于 icon
          duration: 200, // 提示的延迟时间，默认1500
          mask: false, // 是否显示透明蒙层，防止触摸穿透
      })
      },
      fail(res){
        wx.showToast({
          title: "系统故障，请稍后再试！", // 提示的内容
          icon: "error", // 图标，默认success
          image: "", // 自定义图标的本地路径，image 的优先级高于 icon
          duration: 200, // 提示的延迟时间，默认1500
          mask: false, // 是否显示透明蒙层，防止触摸穿透
      })
      }
    })
  },
  ontap:function(e){
    var that = this;
    console.log(this);
    var id = e.target.dataset.id;
    // 更新座位的状态
    var cha1 = 'chairInfo['+parseInt(parseInt(id)-1)+'].chair_x';
    var cha2 = 'chairInfo['+parseInt(parseInt(id)-1)+'].chair_y';
    that.setData({
      [cha1]:"chair_3",
      [cha2]:"chair_4"

    })
  }
})