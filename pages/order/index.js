import { request } from '../../request/index.js'
import regeneratorRuntime from "../../lib/regenerator/runtime";
Page({

    /**
     * 页面的初始数据
     */
    data: {
        orders: [],
        tabs: [{
                id: 0,
                value: '全部',
                isActive: true
            },
            {
                id: 1,
                value: '待付款',
                isActive: false
            },
            {
                id: 2,
                value: '待收货',
                isActive: false
            },
            {
                id: 3,
                value: '退款/退货',
                isActive: false
            }
        ]
    },
    onShow() {
        const token = wx.getStorageSync("token");
        if (!token) {
            wx.navigateTo({ url: '/pages/auth/index' })
            return
        }
        const pages = getCurrentPages()
        const { type } = pages[pages.length - 1].options
        this.getOrders(type)
        this.chooesTitle(type - 1)
    },
    async getOrders(type) {
        const res = await request({ url: "/my/orders/all", data: { type } })
        let { orders } = res.message
        orders = orders.map(v => ({...v, create_time_format: (new Date(v.create_time * 1000)).toLocaleString() }))
        this.setData({
            orders
        })
    },
    chooesTitle(index) {
        let { tabs } = this.data
        tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false)
        this.setData({
            tabs
        })
    },
    handletabItemChange(e) {
        const { index } = e.detail
        this.chooesTitle(index)
        this.getOrders(index + 1)
    }
})