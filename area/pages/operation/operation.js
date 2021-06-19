// pages/operation/operation.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    areaId: undefined,
    areaName: '',
    priority: '',
    addUrl: 'http://127.0.0.1:7593/demo/superAdmin/addArea',
    modifyUrl: 'http://127.0.0.1:7593/demo/superAdmin/modifyArea'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this=this;
    this.setData({
      areaId: options.areaId
    });
    if(options.areaId== undefined){
      return;
    }
    wx.request({
      url: 'http://127.0.0.1:7593/demo/superAdmin/areaId',
      data: {"areaId": options.areaId},
      method: 'GET',
      success: function(res){
        var area = res.data.area;
        if(area==undefined){
          var toastText = '获取失败'+res.data.error;
          wx.showToast({
            title: toastText,
            icon: '',
            duration: 2000
          });
        }else{
          _this.setData({
            areaName: area.areaName,
            priority: area.priority
          });
        }
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
  formSubmit: function(e){
    var _this=this;
    var formData=e.detail.value;
    var url =_this.data.addUrl;
    if(_this.data.areaId!=undefined){
      formData.areaId = _this.data.areaId;
      url=_this.data.modifyUrl;
    }
    wx.request({
      url: url,
      data: JSON.stringify(formData),
      method: 'POST',
      header: {
        'Content-Type' : 'application/json'
      },
      success: function(res){
        var result =res.data.modifyArea;
        if(result==undefined){
          result=res.data.addArea;
        }
        var toastTest = "操作成功";
        if(result!= true){
          toastTest = "操作失败"+res.data.error;
        }
        wx.showToast({
          title: toastTest,
          icon: '',
          duration: 2000
        });
        if(_this.data.areaId == undefined){
          wx.redirectTo({
            url: '../list/list',
          });
        }
      }
    })
  }
})