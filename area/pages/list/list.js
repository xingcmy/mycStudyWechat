// pages/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
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
    var _this=this;
    wx.request({
      url: 'http://127.0.0.1:7593/demo/superAdmin/listArea',
      method: 'GET',  //
      data: {},
      success: function(res){
        var list=res.data.areaList;
        if(list==null){
          var toastText = ''+res.data.error;
          wx.showToast({
            title: toastText,
            icon: '',
            duration: 2000 //2s
          });
        }else{
          _this.setData({
            list: list
          });
        }

      },
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
  addArea: function(){
    wx.navigateTo({
      url: '../operation/operation',
    })
  },
  /**
   * 删除信息
   * @param {*} e 
   */
  deleteArea: function(e){
    var _this =this;
    wx.showModal({
      title: '提示',
      content: ''+e.target.dataset.areaname,
      success: function(sm){
        if(sm.confirm){
          wx.request({
            url: 'http://127.0.0.1:7593/demo/superAdmin/removeArea',
            data: {"areaId":e.target.dataset.areaid},
            method: 'GET',
            success: function(res){
              var result = res.data.removeArea;
              var toastText = "删除成功";
              if(result!=true){
                toastText = "删除失败";
              }else{
                _this.data.list.splice(e.target.dataset.index,1);
                _this.setData({
                  list: _this.data.list
                })
              }
              wx.showToast({
                title: toastText,
                icon: '',
                duration: 2000
              })
            }
          })
        }
      }
    })
  }
})