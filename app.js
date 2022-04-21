// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    //微信用户信息
    userInfo:{
      // 微信用户昵称
      nickName:"",
      // 头像地址
      avatarUrl:"",
      //用户性别 0未知 1男 2女
      gender:0,
      //用户唯一标识，这里不用openid，因为openid比较隐私
      id:0,
    },
    // 远程
    // wxRequestBaseUrl:"https://www.zwlserver.top",
    // 本地
    wxRequestBaseUrl:"http://localhost:8080",

    //静态文件的位置
    // static:"/static",
    static:"https://www.zwlserver.top/pictures"
  }
})
