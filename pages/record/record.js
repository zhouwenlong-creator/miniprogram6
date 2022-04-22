// pages/record/record.js
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
    // 每次点击该页面 页面都刷新（每次进入该页面）

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
  }
})