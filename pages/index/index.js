var url=getApp().globalData.wxRequestBaseUrl;
var static1=getApp().globalData.static;
Date.prototype.format = function(format) {
  var date = {
         "M+": this.getMonth() + 1,
         "d+": this.getDate(),
         "h+": this.getHours(),
         "m+": this.getMinutes(),
         "s+": this.getSeconds(),
         "q+": Math.floor((this.getMonth() + 3) / 3),
         "S+": this.getMilliseconds()
  };
  if (/(y+)/i.test(format)) {
         format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (var k in date) {
         if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1
                       ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
         }
  }
  return format;
}
Page({
    data:{
      static:"",
      swipers:["swiper-1.jpg","swiper-2.jpg","swiper-3.jpg","swiper-4.jpg","swiper-5.jpg","swiper-6.jpg","swiper-7.jpg"],
        //当前选中的预约方式
        bespeakway:[
          {
            wayName:'在线预约',
            isactive:1
          },
          {
            wayName:'直接入座',
            isactive:0
          }
        ],
        bespeakway1:0,

      // 设置预约时长数组
        bespeakwaytime0:[
        {
          id:2,
          name:"2小时",
          isactive:0
        },
        {
          id:4,
          name:"4小时",
          isactive:0
        },
        {
          id:6,
          name:"6小时",
          isactive:0
        },
        {
          id:8,
          name:"8小时",
          isactive:0
        }
      ],
      // 设置预约时长数组
      bespeakwaytime1:[
        {
          id:1,
          name:"1小时",
          isactive:0
        },
        {
          id:2,
          name:"2小时",
          isactive:0
        },
        {
          id:3,
          name:"3小时",
          isactive:0
        },
        {
          id:4,
          name:"4小时",
          isactive:0
        },
        {
          id:6,
          name:"6小时",
          isactive:0
        },
        {
          id:8,
          name:"8小时",
          isactive:0
        },
        {
          id:10,
          name:"10小时",
          isactive:0
        },
        {
          id:12,
          name:"12小时",
          isactive:0
        }
      ],
      
      //预约开始时间
      bespeaktimeStart:0,
      //预约时间的字符串类型
      bespeaktimeToString:"",

      //预定的时长
      bespeakduration1:0,
      //预定的时长
      bespeakduration2:0,
      // 预定的时长
      bespeakduration:0,
      //预约结束时间
      bespeaktimeEnd:0,
      //预约结束时间的字符串类型
      bespeaktimeEndToString:"",
      //设置当前预约结束时间的格式
      bespeaktimeEndIsActive:0,

      //微信用户信息(数组类型)
      userInfo:{
        // 微信用户昵称
        nickName:"",
        // 头像地址
        avatarUrl:"",
        //用户性别 0未知 1男 2女
        gender:0,
      },

    },
    // 获取微信用户的昵称 头像 性别
  getUserInfo() {
    var that=this;
    wx.showModal({
      title: '温馨提示',
      content: '亲，授权微信登录后才能正常使用小程序功能',
      success(res) {
        //如果用户点击了确定按钮
        if (res.confirm) {
          wx.getUserProfile({
            desc: '获取你的昵称、头像、地区及性别',
            success: res => {
              console.log(res);
              console.log("获取昵称，头像，地区，性别成功！");
              //给当前页面数组赋值
              that.setData({
                ['userInfo.nickName']:res.userInfo.nickName,
                ['userInfo.avatarUrl']:res.userInfo.avatarUrl,
                ['userInfo.gender']:res.userInfo.gender,
              })
              //给全局空间赋值
              getApp().globalData.userInfo=that.data.userInfo;
              console.log("用户："+getApp().globalData.userInfo.nickName);
              //登录
              wx.login({
                // 如果成功的话，success中就会返回 res.code，主要用的就是res.code 用来传到后端，再通过code3json接口获取openid(微信唯一标识) 和session_key
                success(res){
                  wx.request({
                    url: url+'/user/userLoginAndRegister.do',
                    method:"POST",
                    header:{
                      // 'Content-Type': 'text/plain;charset=ISO-8859-1'
                      'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
                      // 'content-type':'application/json;'
                    },
                    //后台通过request.getPatameter("name")来接受
                    data:{
                      "nickName":getApp().globalData.userInfo.nickName,
                      "avatarUrl":getApp().globalData.userInfo.avatarUrl,
                      "gender":getApp().globalData.userInfo.gender,
                      "code":res.code,
                    },
                    // 请求成功返回什么
                    success(res){
                      console.log(res);
                      that.setData({
                        //虽然说回传了很多信息，但是我只要id，openid对前台需隐私
                        ['userInfo.id']:res.data.id,
                      })
                    },
                    fail(res){
                      console.log("登录/注册失败，请稍后再试！");
                    }
                  })
                  
                },
               
              })
            },
            fail: res => {
              //拒绝授权
              wx.showToast({
                title: '您拒绝了请求！',
                icon: 'error',
                duration: 2000
              });
              return;
            }
          });
        } else if (res.cancel) {
          //如果用户点击了取消按钮
          wx.showToast({
            title: '您拒绝了请求！',
            icon: 'error',
            duration: 2000
          });
          return;
        }
      }
    });    
  },
  //改变预约的方式
  onChangeBespeakWay:function(e){
    var that=this;
    console.log("change bespeakway...");
    var isactive=e.target.dataset.isactive;
    //如果点击的是未选中的，就直接两者交换
    if(isactive==0){
      var isactive1=that.data.bespeakway[0].isactive;
      var isactive2=that.data.bespeakway[1].isactive;
      that.setData({
        [`bespeakway[0].isactive`]:isactive2,
        [`bespeakway[1].isactive`]:isactive1
      })
    }
  },

  //时间转成字符串
  

  // 选中预约的时长1
  onChooseBespeakDuration1:function(e){
    console.log("choose bespeakduration1...");
    var that=this;
    var i=0;
    var bespeakduration1=e.target.dataset.bespeakduration1;
    // 更新样式
    for(i=0;i<that.data.bespeakwaytime0.length;i++){
      that.setData({
        [`bespeakwaytime0[${i}].isactive`]:0
      })
      if(that.data.bespeakwaytime0[i].id==bespeakduration1){
        that.setData({
          [`bespeakwaytime0[${i}].isactive`]:1
        })
      }
    }
    //获取预约开始时间
    var bespeaktimeStart=that.data.bespeaktimeStart;
    //设置预约开始时间的  字符串格式（用于新建预约结束时间，，（为什么不直接 end=start   因为两个时间值一样，会保存在同一个常量池中，更新一个另一个也会随着更新））
    var bespeaktimeStartToString=bespeaktimeStart.format('yyyy/MM/dd h:m:s');
    //通过上面格式的字符串来新建一个Date对象（Date方法中只能通过这种格式的字符串来新建对象）
    var bespeaktimeEnd=new Date(bespeaktimeStartToString);
    //设置当前预约结束的小时
    var hourNow=bespeaktimeEnd.getHours()+bespeakduration1;
    bespeaktimeEnd.setHours(hourNow);
    //预约结束的时间字符串
    var bespeaktimeEndToString=bespeaktimeEnd.toLocaleString();
    //保存当前预约结束时间，预约结束时间字符串，预约持续时间
    that.setData({
      bespeaktimeEndIsActive:1,
      bespeaktimeEnd:bespeaktimeEnd,
      bespeaktimeEndToString:bespeaktimeEndToString,
      bespeakduration1:bespeakduration1
    })
    console.log(that.data.bespeaktimeEndToString);
  },

  // 选中预约的时长2
  onChooseBespeakDuration2:function(e){
    console.log("choose bespeakduration2...");
    var that=this;
    var i=0;
    var bespeakduration2=e.target.dataset.bespeakduration2;
    // 更新样式
    for(i=0;i<that.data.bespeakwaytime1.length;i++){
      that.setData({
        [`bespeakwaytime1[${i}].isactive`]:0
      })
      if(that.data.bespeakwaytime1[i].id==bespeakduration2){
        that.setData({
          [`bespeakwaytime1[${i}].isactive`]:1
        })
      }
    }
    //保存当前预约的时间
    that.setData({
      bespeakduration2:bespeakduration2
    })
    console.log("bespeakduration:"+bespeakduration2+"hour");
  },
  onSwitchToBespeak:function(e){
    var that=this;
    // 获取两个预约时长
    var bespeakduration1=that.data.bespeakduration1;
    var bespeakduration2=that.data.bespeakduration2;
    var bespeakduration=0;
    //获取刚传过来的值 到地址 在线预约的 值 还是 直接入座的值
    var bespeakway=e.target.dataset.bespeakway;
    console.log(typeof(bespeakway));
    if(bespeakway=="1"){
      bespeakduration=bespeakduration1;
    }else{
      bespeakduration=bespeakduration2;
    }
    that.setData({
      bespeakduration:bespeakduration,
      bespeakway1:bespeakway,
    })
    //如果未选择预约时间
    if(bespeakduration==0){
      wx.showToast({
        title: '请选择预约时间！',
        icon: 'error',
        duration: 1000
      })
    }else{
      console.log("bespeak loading...");
      wx.setStorageSync('bespeaktime',that.data.bespeaktimeStart);
      //设置预约时长 分享所有页面（主要bespeak order页面）
      wx.setStorageSync('bespeakduration',that.data.bespeakduration);
      //设置什么方式进入，选择哪个方式
      //bespeakway=="1"  表示第一个在线预约     =="2" 表示第二个直接入座
      wx.setStorageSync('bespeakway1', that.data.bespeakway1)
      wx.navigateTo({
        url: '/pages/bespeak/bespeak',
        success(res){
          wx.showToast({
            title: "进入选座中", // 提示的内容
            icon: "loading", // 图标，默认success
            image: "", // 自定义图标的本地路径，image 的优先级高于 icon
            duration: 500, // 提示的延迟时间，默认1500
            mask: false, // 是否显示透明蒙层，防止触摸穿透
        })
        },
        fail(res){
          wx.showToast({
            title: "The system is wrong,please try again later!", // 提示的内容
            icon: "error", // 图标，默认success
            image: "", // 自定义图标的本地路径，image 的优先级高于 icon
            duration: 200, // 提示的延迟时间，默认1500
            mask: false, // 是否显示透明蒙层，防止触摸穿透
        })
        }
      })
    }
  },

  //刚加载时，需要加载当前时间
  onLoad:function(e){
    var that=this;
    // 加载静态资源
    that.setData({
      static:static1
    })
    //获取用户的昵称 头像地址 性别等
    that.getUserInfo();
    console.log("index loading...");
    var dateTimeNow=new Date();
    var minutesNow=dateTimeNow.getMinutes();
    var hourNow=dateTimeNow.getHours();
    // 存储更新后的 小时 分钟
    var minutesAfter=0;
    var hourAfter=0;
    var secondAfter=0;
    if(minutesNow>0 && minutesNow<=30){
      minutesAfter=30;
      hourAfter=hourNow;
    }else if(minutesNow>30 && minutesNow<60){
      minutesAfter=0;
      hourAfter=hourNow+1;
    }else{
      hourAfter=hourNow;
      minutesAfter=minutesNow;
    }
    // 设置预约开始时间
    dateTimeNow.setHours(hourAfter);
    dateTimeNow.setMinutes(minutesAfter);
    dateTimeNow.setSeconds(secondAfter);
    //将时间转化成字符串类型
    var bespeaktimeToString = dateTimeNow.toLocaleString();
    that.setData({
      bespeaktimeStart:dateTimeNow,
      bespeaktimeToString:bespeaktimeToString
    })
    console.log(that.data.bespeaktimeStart);
  }
})