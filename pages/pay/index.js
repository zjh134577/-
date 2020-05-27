import { getSetting, openSetting, chooseAddress, showModal, showToast} from "../../utils/asyncWx"
import regeneratorRuntime from "../../lib/regenerator/runtime";
import {request} from "../../request/index";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    totalPrice: 0,
    totalNum: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  // 页面展示触发
  onShow: function () {
    let address = wx.getStorageSync("address")
    let cart = wx.getStorageSync("cart") || []
    cart = cart.filter(v=>v.checked)
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
        totalPrice += v.num * v.goods_price
        totalNum += v.num
    })
    this.setData({
      cart,
      totalPrice,
      totalNum,
      address
    })
  },
  async orderPay(){
    const token = wx.getStorageSync("token");
    if(!token){
      wx.navigateTo({
        url: '/pages/auth/index',
      })
      return;
    }
    let  order_price = this.data.totalPrice,
        consignee_addr = this.data.address.all,
        cart = this.data.cart,
        goods = [];
    cart.forEach(v=>goods.push({
      goods_id:v.goods_id,
      goods_number:v.goods_number,
      goods_price:v.goods_price
    }))
    const orderParams = {
      order_price,
      consignee_addr,
      goods
    }
    const {message} = await request({url:"/my/orders/create",data:orderParams,method:"post"})
    const order_number = message.order_number
    const {pay} = await request({url:"/my/orders/req_unifiedorder",data:{order_number},method:"post"})
  }
})