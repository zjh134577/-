import { request } from '../../request/index.js'
import regeneratorRuntime from "../../lib/regenerator/runtime";
Page({
  data: {
    // 轮播数据容器
    swiperList: [],
    catesList: [],
    floorList: []
  },
  // 页面加载时请求数据
  onLoad: function (options) {
    this.getSwiperList()
    this.getCateList()
    this.getFloorList()
  },
  // 获取轮播图数据
  async getSwiperList() {
    const res = await request({ url: "/home/swiperdata" })
    this.setData({
      swiperList: res.message
    })
  },
  async getCateList() {
    const res = await request({ url: "/home/catitems" })
    this.setData({
      catesList: res.message
    })
  },
  async getFloorList() {
    const res = await request({ url: "/home/floordata" })
    this.setData({
      floorList: res.message
    })
  }
});