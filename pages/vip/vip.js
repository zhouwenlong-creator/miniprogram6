// pages/vip/vip.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 定义图片的默认地址
    choose:"http://47.99.33.173:8080/vip-imgs/1.jpg",
    // 默认所选择的导航栏
    tagId:'1',
    products:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options){
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },


  wxRequest(){
    // 微信小程序全局变量的使用
    var app = getApp();
    var that = this;
    wx.request({
      url:app.globalData.wxRequestBaseUrl+"/vip/selectAllVips.do",
      method:'GET',
      data:{
        choose:that.data.choose
      },
      header:{
          // 请求头部
          // 'content-type':'application/x-www-form-urlencoded'
          'content-type':'application/json'
      },
      // 请求成功返回什么
      success(res){
        console.log(res);
        that.setData({
          products:res.data
        })
      console.log(that.data.products)
      }
    })
  },
    /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (e) {
    this.wxRequest();
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
    console.log(e);
    that.setData({
      // 图片
      choose:e.currentTarget.dataset.choose,
      // 微信小程序前端传的参数只能是全部小写
      tagId:e.currentTarget.dataset.tagids
    })
    this.wxRequest();
  }

})

