import { request } from '../../request/index.js'
import regeneratorRuntime from "../../lib/regenerator/runtime";
Page({
  /**
     * 页面的初始数据
     */
  data: {
    leftMenuList: [],
    rightMenuList: [],
    currentIndex: 0,
    scrollTop: 0
  },
  Cates: [],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const Cates = wx.getStorageSync('cates');
    if (!Cates) {
      this.getCateList()
    } else {
      if (Date.now() - Cates.time > 1000 * 10 * 60 * 5) {
        this.getCateList()
      } else {
        this.Cates = Cates.data
        let leftMenuList = this.Cates.map(v => v.cat_name)
        let rightMenuList = this.Cates[0].children
        this.setData({
          leftMenuList,
          rightMenuList
        })
      }
    }

  },
  // 获取分类列表
  async getCateList() {
    const res = await request({ url: "/categories" })
    this.Cates = res.message
    wx.setStorageSync('cates', { time: Date.now(), data: this.Cates });
    let leftMenuList = this.Cates.map(v => v.cat_name)
    let rightMenuList = this.Cates[0].children
    this.setData({
      leftMenuList,
      rightMenuList
    })
  },
  // 处理滚动视图切换
  handleItemTap(e) {
    const { index } = e.currentTarget.dataset
    let rightMenuList = this.Cates[index].children
    this.setData({
      currentIndex: index,
      rightMenuList,
      scrollTop: 0
    })
  }
})