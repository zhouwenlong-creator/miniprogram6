// pages/bespeak/bespeak.js
var information = getApp().globalData.chairInfo;
var url=getApp().globalData.wxRequestBaseUrl;
// console.log(url);
// console.log(information);

const date = new Date();//获取系统日期
const years = [];
const months = [];
const days = [];
const hours = [];
const minutes = [];
const bigMonth = [1, 3, 5, 7, 8, 10, 12];
//将日期分开写入对应数组
//年
years.push(date.getFullYear());
//月
months.push(date.getMonth()+1);
//日
var day = date.getDate();
console.log(day)
for (let i = day; i <= 31; i++) {
days.push(i);
}
// 获取小时
var hour=date.getHours();
console.log(hour);
for (let i = hour; i <= 23; i++) {
var k = i;
if (0 <= i && i < 10) {
k = "0" + i;
}
hours.push(k)
}
// 获取分钟
var minute=date.getMinutes();
console.log(minute);
for (let i = minute; i <= 59; i++) {
var k = i;
if (0 <= i && i < 10) {
k = "0" + i
}
minutes.push(k)
}

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
    roomtype:"0",

    // 设置平面图底部的预定按钮
    bottombespeak:"in_in_bottom_bespeak_2",

    //选择预约时间
    bespeaktime:0,

    // 预定的时长
    bespeakduration:1,

    //当前选中的座位，默认为0，就表示不能预约
    seat:0,

    // 跟日期时间相关的变量
    years: years,
    year: date.getFullYear(),
    months: months,
    month: date.getMonth(),
    days: days,
    day: date.getDate(),
    value: [9999, 1, 1],
    hours: hours,
    hour: date.getHours(),
    minutes: minutes,
    minute: date.getMinutes(),

    // 设置预约时长数组
    time:[
      {
        id:1,
        name:"1小时"
      },
      {
        id:2,
        name:"2小时"
      },
      {
        id:3,
        name:"3小时"
      },
      {
        id:4,
        name:"4小时"
      },
      {
        id:5,
        name:"5小时"
      },
      {
        id:6,
        name:"6小时"
      },
      {
        id:7,
        name:"7小时"
      },
      {
        id:8,
        name:"8小时"
      },
      {
        id:9,
        name:"9小时"
      },
      {
        id:10,
        name:"10小时"
      },
      {
        id:11,
        name:"11小时"
      },
      {
        id:12,
        name:"12小时"
      },
    ],

    room:[
      {
        roomtype:0,
        roomname:"公共区",
        isactive:1
      },
      {
        roomtype:1,
        roomname:"电脑屋",
        isactive:0
      },
      {
        roomtype:2,
        roomname:"小黑屋",
        isactive:0
      },
      {
        roomtype:3,
        roomname:"独立屋",
        isactive:0

      },
      {
        roomtype:4,
        roomname:"小白屋",
        isactive:0
      }
    ]
   },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 初始化
    // this.setData({
    //   chairInfo:information
    // })
    var that=this;
    var app=getApp();
    wx.request({
      url: app.globalData.wxRequestBaseUrl+"/seat/selectAllSeats.do",
      method:'GET',
      header:{
        // 请求头部
        // 'content-type':'application/x-www-form-urlencoded'
        'content-type':'application/json'
    },
    // 请求成功返回什么
    success(res){
      console.log(res);
      that.setData({
        chairInfo:res.data
      })
    console.log(that.data.chairInfo[0]);
    }
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
    console.log("切换平面图...");
    //接受前台传来的那个room
    var roomtypes = e.target.dataset.roomtype;
    var roomlength=this.data.room.length;
    var i=0;
    for(i=0;i<roomlength;i++){
      if(this.data.room[i].isactive==1)
      //每次只有一个为选中的状态
        this.setData({
          //修改数组中的元素
          [`room[${i}].isactive`]:0,
        })
      if(this.data.room[i].roomtype==roomtypes){
        this.setData({
          [`room[${i}].isactive`]:1,
        })
      }
    };
    this.setData({
      //用于刷新座位图
      roomtype:roomtypes
    });
  },


//点击座位事件
  ontap:function(e){
    var that = this;
    console.log("点击座位...");
    var id = e.target.dataset.id;
    //座位id是从1开始
    id=id-1;
    // 更新座位的状态
    // var cha1 = 'chairInfo['+parseInt(parseInt(id)-1)+'].seatStyle1';
    // var cha2 = 'chairInfo['+parseInt(parseInt(id)-1)+'].seatStyle2';
    // console.log(cha1);
    if(this.data.chairInfo[id].seatStyle1=="chair_1"){
      that.setData({
        [`chairInfo[${id}].seatStyle1`]:"chair_3",
        [`chairInfo[${id}].seatStyle2`]:"chair_4",
        bottombespeak:"in_in_bottom_bespeak_2_select",
        //选中就传当前座位的值
        seat:id+1
      })
    }else{
      that.setData({
        [`chairInfo[${id}].seatStyle1`]:"chair_1",
        [`chairInfo[${id}].seatStyle2`]:"chair_2",
        bottombespeak:"in_in_bottom_bespeak_2",
        //选中就传当前座位的值
        seat:0
       })
    }
    console.log(this.data.seat);
    
  },
  // 选择日期时间
  datesubmit:function(e){
    // 点击之后背景变灰色
    this.setData({
      showModal: true
      })
  },
  // 在showModel中点击确定
  go: function (e) {
    var that=this;
    //显示平面图
    this.setData({
    showModal: false
    })
    //后续操作
  },
  // 时长选取
  timesubmit:function(e){
    console.log("timesubmit...");
    // 点击之后背景变灰色
    this.setData({
      showModal1: true
      })
  },
    // 在showModel中点击确定
    go1: function () {
      this.setData({
      showModal1: false
      })
      //后续操作
    },
    bindChange1:function(e){
      var that=this;
      console.log("bindChange1...");
      var val=e.detail.value;
      var bespeakdurations = this.data.time[val[0]].id;
      that.setData({
        bespeakduration:bespeakdurations
      })
      console.log(this.data.bespeakduration);
    },
  
  //判断元素是否在一个数组
  contains: function (arr, obj) {
    var i = arr.length;
    while (i--) {
      if (arr[i] === obj) {
      return true;
      }
    }
    return false;
  },

  setDays: function (day) {
    const temp = [];
    for (let i = 1; i <= day; i++) {
    temp.push(i);
    }
    this.setData({
      days: temp
    })
  },
  //选择滚动器改变触发事件
  bindChange: function (e) {
    var that = this;
    const val = e.detail.value;
    console.log(e);
    //判断月的天数
    const setYear = this.data.years[val[0]];
    const setMonth = this.data.months[val[1]];
    const setDay = this.data.days[val[2]];
    const setHour = this.data.hours[val[3]];
    const setMinute = this.data.minutes[val[4]];
    //闰年
    if (setMonth === 2) {
      if (setYear % 4 === 0 && setYear % 100 !== 0) {
      // console.log('闰年')
      this.setDays(29);
      }else {
      // console.log('非闰年')
      this.setDays(28);
      }
    } else {
    //大月
    if (this.contains(bigMonth, setMonth)) {
      this.setDays(31)
    } else {
      this.setDays(30)
    }
  }
    this.setData({
    year: setYear,
    month: setMonth,
    day: setDay,
    hour: setHour,
    minute: setMinute
    })
    console.log("打印时间！");
    const dateTime=setYear+"-"+setMonth+"-"+setDay+"- "+setHour+":"+setMinute;
    var datatime1 = new Date(dateTime);
    //将选取的时间
    that.setData({
      //将最终的事件给js保存
      bespeaktime:datatime1
    })
  },

  submitbespeak:function(e){
    console.log("submitbespeak...");
    var that=this;
    if(that.data.seat!=0){
      wx.navigateTo({
        url: '/pages/order/order',
      })
    }
  }

})