import {request} from '../../request/index.js'
import regeneratorRuntime from "../../lib/regenerator/runtime";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:'综合',
        isActive:true
      },
      {
        id:1,
        value:'销量',
        isActive:false
      },
      {
        id:2,
        value:'价格',
        isActive:false
      }
    ],
    goodsList:[],
  },
  QueryParmas:{
    query:'',
    cid:'',
    pagenum:1,
    pagesize:10
  },
  // 总页数
  totalPage:1,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.QueryParmas.cid = options.cid
    this.getGoodList() 
  },
  // 获取商品列表数据
  async getGoodList(){
    const res = await request({url:"/goods/search",data:this.QueryParmas})
    const total = res.message.total
    this.totalPage = Math.ceil(total / this.QueryParmas.pagesize)
    this.setData({
      goodsList:[...this.data.goodsList,...res.message.goods]
    })
    wx.stopPullDownRefresh()
  },
  // 触底加载新数据
  onReachBottom(){
    if(this.QueryParmas.pagenum >= this.totalPage){
      wx.showToast({
        title: ' 没有数据了',
      })
    }else{
      this.QueryParmas.pagenum++
      this.getGoodList()
    }
  },
  // 下拉刷新功能
  onPullDownRefresh(){
    this.setData({
      goodsList:[]
    })
    this.QueryParmas.pagenum = 1,
    this.getGoodList()
  },
  // 处理标签页切换
  handletabItemChange(e){
    const {index} = e.detail
    let {tabs} = this.data
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false)
    this.setData({
      tabs
    })
  }
})