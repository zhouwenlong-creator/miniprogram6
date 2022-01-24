Page({
    data:{
      swipers:["swiper-1.jpg","swiper-2.jpg","swiper-3.jpg","swiper-4.jpg","swiper-5.jpg","swiper-6.jpg","swiper-7.jpg"],
      result:'请求后台中.....',
      that:''
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
      url: '../order/order',
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
  }


})