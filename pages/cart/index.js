import { getSetting, openSetting, chooseAddress, showModal, showToast} from "../../utils/asyncWx"
import regeneratorRuntime from "../../lib/regenerator/runtime";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    allChecked: false,
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
    this.setData({ address })
    this.setCart(cart)
  },
  // 获取地址
  async handleAddressChoose() {
    try {
      const res = await getSetting()
      const scopeAddress = res.authSetting["scope.address"]
      if (scopeAddress === false) {
        await openSetting()
      }
      let address = await chooseAddress()
      address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo
      wx.setStorageSync('address', address)
    } catch (error) {
      console.log(error)
    }
  },
  //  商品选择按钮
  handleItemChange(e) {
    const goods_id = e.currentTarget.dataset.id
    // console.log(goods_id)
    const { cart } = this.data
    const index = cart.findIndex(v => v.goods_id === goods_id)
    cart[index].checked = !cart[index].checked
    this.setCart(cart)
  },
  // 全选按钮
  handleAllCheckChange() {
    let { cart, allChecked } = this.data
    allChecked = !allChecked
    cart.forEach(v => v.checked = allChecked)
    this.setCart(cart)
  },
  // 商品数量编辑
  async handleNumEdit(e) {
    const { operation, id } = e.currentTarget.dataset
    let { cart } = this.data
    const index = cart.findIndex(v => v.goods_id === id)
    if (cart[index].num === 1 && operation == -1) {
      const res = await showModal({ content: "是否删除商品" })
      if (res.confirm) {
        cart.splice(index, 1)
        this.setCart(cart)
      }
    } else {
      cart[index].num += operation * 1
      this.setCart(cart)
    }
  },
  // 结算功能
  async handlePay(){
    const {address,cart} = this.data
    if(!address.userName){
      await showToast({title:"您还没有选择收货地址"})
      return;
    }
    if(cart.length===0){
      await showToast({title:"您还没有选购商品"})
      return;
    }
    let hasone = cart.some(v=>v.checked)
    if(hasone){
      wx.navigateTo({
        url: '/pages/pay/index'
      })  
    }else{
      await showToast({title:"请勾选您要购买的商品"})
    }
  },
  // 设置数据
  setCart(cart) {
    let allChecked = true;
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
      if (v.checked) {
        totalPrice += v.num * v.goods_price
        totalNum += v.num
      } else {
        allChecked = false
      }
    })
    allChecked = cart.length != 0 ? allChecked : false
    this.setData({
      cart,
      allChecked,
      totalPrice,
      totalNum
    })
    wx.setStorageSync('cart', cart)
  }
})