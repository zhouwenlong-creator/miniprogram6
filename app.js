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
    userInfo: null,
    // 远程
    wxRequestBaseUrl:"https://www.zwlserver.top",
    // 本地
    // wxRequestBaseUrl:"http://localhost:8080",

    // 座位信息
    chairInfo:[{
      // 座位号
      id:1,
      // 座位描述
      txt:"你好",
      // 座位样式  
      chair_x:"chair_1",
      chair_y:"chair_2",
      // 0:表示空闲   1：表示已被订
      chair_status:0    
    },
    {
      // 座位号
      id:2,
      // 座位描述
      txt:"你好",
      // 座位样式
      chair_x:"chair_1",
      chair_y:"chair_2"
    },
    {
      // 座位号
      id:3,
      // 座位描述
      txt:"你好",
      // 座位样式
      chair_x:"chair_1",
      chair_y:"chair_2"
    },
    {
      // 座位号
      id:4,
      // 座位描述
      txt:"你好",
      // 座位样式
      chair_x:"chair_1",
      chair_y:"chair_2"
    },
    {
      // 座位号
      id:5,
      // 座位描述
      txt:"你好",
      // 座位样式
      chair_x:"chair_1",
      chair_y:"chair_2"
    },
    {
      // 座位号
      id:6,
      // 座位描述
      txt:"你好",
      // 座位样式
      chair_x:"chair_1",
      chair_y:"chair_2"
    },
    {
      // 座位号
      id:7,
      // 座位描述
      txt:"你好",
      // 座位样式
      chair_x:"chair_1",
      chair_y:"chair_2"
    },
    {
      // 座位号
      id:8,
      // 座位描述
      txt:"你好",
      // 座位样式
      chair_x:"chair_1",
      chair_y:"chair_2"
    },
    {
      // 座位号
      id:9,
      // 座位描述
      txt:"你好",
      // 座位样式
      chair_x:"chair_1",
      chair_y:"chair_2"
    },
    {
      // 座位号
      id:10,
      // 座位描述
      txt:"你好",
      // 座位样式
      chair_x:"chair_1",
      chair_y:"chair_2"
    },
    {
      // 座位号
      id:11,
      // 座位描述
      txt:"你好",
      // 座位样式
      chair_x:"chair_1",
      chair_y:"chair_2"
    },
    {
      // 座位号
      id:12,
      // 座位描述
      txt:"你好",
      // 座位样式
      chair_x:"chair_1",
      chair_y:"chair_2"
    }
]

  }
})
