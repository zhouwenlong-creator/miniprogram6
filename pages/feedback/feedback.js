// pages/feedback/feedback.js
var url=getApp().globalData.wxRequestBaseUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue:"",
    // 用户信息
    userInfo:getApp().globalData.userInfo,
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
    // 加载用户信息
    var that=this;
    that.setData({
      userInfo:getApp().globalData.userInfo
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
  //获取输入的反馈
  onBindinput(res){
    var that=this;
    that.setData({
      inputValue:res.detail.value,
    })
  },
  onFeedbackCommit(){
    var that=this;
    console.log("提交用户的反馈！");
    var feedbackCreateTime=new Date();
    var feedbackCreateTimeToString=feedbackCreateTime.getFullYear()+'-'+(feedbackCreateTime.getMonth()+1)+'-'+feedbackCreateTime.getDate()+' '+feedbackCreateTime.getHours()+':'+feedbackCreateTime.getMinutes()+':'+feedbackCreateTime.getSeconds();
    wx.request({
      url:url+'/feedback/insertFeedback.do',
      method:'POST',
      header:{
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
      },
      data:{
        "userId":that.data.userInfo.id,
        "text":that.data.inputValue,
        "feedbackCreateTime":feedbackCreateTimeToString,
      },
      success(res){
        console.log("反馈成功！");
        // wx.showToast({
        //   title: '您拒绝了请求！',
        //   icon: 'error',
        //   duration: 2000
        // });
        wx.showToast({
          title: '非常感谢您的反馈！',
          icon:'success',
          duration:1000,
          success:function(){
            setTimeout(function(){
            wx.switchTab({
              url: '/pages/index/index',
            })
            },500);
          }
        })
      },
      fail(res){
        console.log("反馈失败");
      }
    })
  }
})