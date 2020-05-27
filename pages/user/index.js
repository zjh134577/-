// pages/user/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {},
        collectNums: 0
    },
    onShow() {
        const userInfo = wx.getStorageSync("userInfo");
        this.setData({ userInfo })
        const collectNums = wx.getStorageSync("collect").length
        this.setData({ collectNums })
    }
})