// components/custom-component/custom-component.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    myProperty:{
      type:Object,
      value: {
        bg_color:"red",
        col:"yellow",
        flag:1
      }
    },
    commonHeadHeight: {
      type: Object,
      value: {
      }
    }
  },
  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    left_back:function(){
      console.log("left_back");
      wx.navigateTo({
        url: '/pages/index/index',
      })
    }
  },
  ready:function(){
    var that = this;
    wx.getSystemInfo({
      success:function(res){
        console.log(res.statusBarHeight);
        that.setData({
          "commonHeadHeight.titleHeight":res.statusBarHeight+46
        })
      }
    })
  }
})


