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
    chairInfo:[],

    //设置房间的编号（那个房间）
    roomtype:"2"
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

  // 选座位界面切换房间
  onRoom:function(e){
    var roomtype = e.target.dataset.roomtype;
    this.setData({
      roomtype:roomtype
    })
    console.log(this.data.roomtype);
  },


//点击座位事件
  ontap:function(e){
    var that = this;
    console.log("点击座位...");
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