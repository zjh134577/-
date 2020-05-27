import { request } from '../../request/index.js'
import regeneratorRuntime from "../../lib/regenerator/runtime";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        goodsObj: {},
        isCollect: false
    },
    GoodsInfo: {},
    /**
     * 生命周期函数--监听页面加载
     */
    onShow: function() {
        let pages = getCurrentPages()
        const { options } = pages[pages.length - 1]
        const { goods_id } = options
        this.getGoodsDetail(goods_id)
    },
    async getGoodsDetail(goods_id) {
        const { message } = await request({ url: '/goods/detail', data: { goods_id } })
        this.GoodsInfo = message
        const collect = wx.getStorageSync('collect') || []
        const isCollect = collect.some(v => v.goods_id === this.GoodsInfo.goods_id)
        this.setData({
            isCollect,
            goodsObj: {
                goods_name: message.goods_name,
                goods_price: message.goods_price,
                goods_introduce: message.goods_introduce.replace(/\.webp/g, ".jpg"),
                pics: message.pics
            }
        })
    },
    // 轮播图放大预览
    previewImage(e) {
        const urls = this.GoodsInfo.pics.map(v => v.pics_mid)
        const current = e.currentTarget.dataset.url
        wx.previewImage({
            current,
            urls
        })
    },
    // 点击商品收藏
    collectGoods() {
        let isCollect = false
        let collect = wx.getStorageSync('collect') || []
        let index = collect.findIndex(v => v.goods_id === this.GoodsInfo.goods_id)
        if (index === -1) {
            // 缓存中没有收藏商品，加入收藏并且修改图标显示
            collect.push(this.GoodsInfo)
            isCollect = true
            wx.showToast({
                title: '收藏成功',
                icon: 'success',
            })
        } else {
            // 缓存中存在收藏商品，iscollect值取反
            collect.splice(index, 1)
            isCollect = false
            wx.showToast({
                title: '取消收藏',
                icon: 'none',
            })
        }
        wx.setStorageSync('collect', collect)
        this.setData({ isCollect })
    },
    // 添加缓存
    handleCartAdd() {
        let Cart = wx.getStorageSync('cart') || [];
        let index = Cart.findIndex(v => v.goods_id === this.GoodsInfo.goods_id)
        console.log(index)
        if (index === -1) {
            // 第一次添加进购物车
            this.GoodsInfo.num = 1
            this.GoodsInfo.checked = true
            Cart.push(this.GoodsInfo)
        } else {
            // 已经存在购物车数据
            Cart[index].num++
        }
        wx.setStorageSync("cart", Cart);
        wx.showToast({
            title: '加入成功',
            icon: 'success',
            mask: true
        })
    }
})