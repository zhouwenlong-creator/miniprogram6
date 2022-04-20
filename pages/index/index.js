Page({
    data:{
      swipers:["swiper-1.jpg","swiper-2.jpg","swiper-3.jpg","swiper-4.jpg","swiper-5.jpg","swiper-6.jpg","swiper-7.jpg"],

      //选择预约时间
    bespeaktime:0,
    // 预定的时长
    bespeakduration:1,
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
        isactive:1
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
    },


    onLoad(options){
    },
    onShow( ){

    },

    // 登录
  getUserInfo() {
    let self = this
    wx.getUserProfile({
      desc: "获取你的昵称、头像、地区及性别", // 不写不弹提示框
      success: res => {
        console.log(res)
        self.setData({
          userInfo: res.userInfo
        })
      },
      fail: res => {
        //拒绝授权
        wx.showToast({
          title: '您拒绝了授权',
          icon: 'none'
        })
        return;
      }
    })
  },

  // 登录
  logins(res){
    // 用that替换this
    const that = this;
    wx.request({
      //服务端地址
      url: 'http://localhost:8080/ssm2/student/hello.do',
      // 请求方法，默认 get
      method:"GET",
      data:{
        id:'233'
      },
      header:{
        // 请求头部
        'content-type':'application/json'
      },
      success(res){
        console.log(res);
        // console.log(that);
        // 给data域赋值
        that.setData({
          result:res.data
        })
        // 取data域的数据
        // console.log(that.data.result)
        console.log(that)
      }
    })
  },
  navigateToOrder(){
    wx.navigateTo({
      url: '/pages/bespeak/bespeak',
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

  //改变预约的方式
  onChangeBespeakWay:function(e){
    var that=this;
    console.log("改变预约方式。。。");
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

  // 选中预约的时长1
  onChooseBespeakDuration1:function(e){
    console.log("选中预约的时长并更新样式...");
    var that=this;
    var i=0;
    var bespeakduration=e.target.dataset.bespeakduration;
    // 更新样式
    for(i=0;i<that.data.bespeakwaytime0.length;i++){
      that.setData({
        [`bespeakwaytime0[${i}].isactive`]:0
      })
      if(that.data.bespeakwaytime0[i].id==bespeakduration){
        that.setData({
          [`bespeakwaytime0[${i}].isactive`]:1
        })
      }
    }
    //保存当前预约的时间
    that.setData({
      bespeakduration:bespeakduration
    })
    console.log("用户选中的预约时长"+bespeakduration+"小时");
  },
  // 选中预约的时长2
  onChooseBespeakDuration2:function(e){
    console.log("选中预约的时长并更新样式...");
    var that=this;
    var i=0;
    var bespeakduration=e.target.dataset.bespeakduration;
    // 更新样式
    for(i=0;i<that.data.bespeakwaytime1.length;i++){
      that.setData({
        [`bespeakwaytime1[${i}].isactive`]:0
      })
      if(that.data.bespeakwaytime1[i].id==bespeakduration){
        that.setData({
          [`bespeakwaytime1[${i}].isactive`]:1
        })
      }
    }
    //保存当前预约的时间
    that.setData({
      bespeakduration:bespeakduration
    })
    console.log("用户选中的预约时长"+bespeakduration+"小时");
  },
  onSwitchToBespeak:function(e){
    wx.navigateTo({
      url: '/pages/bespeak/bespeak',
    })
  }
})